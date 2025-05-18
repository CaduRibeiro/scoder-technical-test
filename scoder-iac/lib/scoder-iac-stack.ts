import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as rds from "aws-cdk-lib/aws-rds";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";

export class ScoderIacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ✅ 1. VPC - Rede privada e pública distribuída em 2 AZs
    const vpc = new ec2.Vpc(this, "ScoderVpc", {
      maxAzs: 2,
      natGateways: 1,
    });

    // ✅ 2. Cluster ECS
    const cluster = new ecs.Cluster(this, "ScoderCluster", {
      vpc,
      containerInsights: true, // observabilidade
    });

    // ✅ 3. Secret para o banco RDS (senha segura)
    const dbCredentials = new secretsmanager.Secret(this, "DBCredentials", {
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: "admin" }),
        excludePunctuation: true,
        includeSpace: false,
        generateStringKey: "password",
      },
    });

    // ✅ 4. Banco de dados RDS MySQL
    const rdsInstance = new rds.DatabaseInstance(this, "ScoderDB", {
      engine: rds.DatabaseInstanceEngine.mysql({ version: rds.MysqlEngineVersion.VER_8_0 }),
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
      credentials: rds.Credentials.fromSecret(dbCredentials),
      multiAz: false,
      allocatedStorage: 20,
      maxAllocatedStorage: 100,
      allowMajorVersionUpgrade: false,
      autoMinorVersionUpgrade: true,
      backupRetention: cdk.Duration.days(7),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      deletionProtection: false,
      publiclyAccessible: false,
    });

    // ✅ 5. ECS Fargate Service com Load Balancer (ALB)
    const fargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      "ScoderService",
      {
        cluster,
        cpu: 256,
        memoryLimitMiB: 512,
        desiredCount: 2,
        listenerPort: 80,
        taskImageOptions: {
          image: ecs.ContainerImage.fromRegistry("node:18"), // Troque por imagem da sua app
          containerPort: 3000,
          environment: {
            NODE_ENV: "production",
          },
        },
        publicLoadBalancer: true,
      }
    );

    // ✅ 6. Auto-scaling do serviço
    const scaling = fargateService.service.autoScaleTaskCount({
      minCapacity: 2,
      maxCapacity: 4,
    });

    scaling.scaleOnCpuUtilization("CpuScaling", {
      targetUtilizationPercent: 50,
      scaleInCooldown: cdk.Duration.seconds(60),
      scaleOutCooldown: cdk.Duration.seconds(60),
    });

    // ✅ Permitir que o serviço ECS acesse o banco RDS
    rdsInstance.connections.allowFrom(
      fargateService.service,
      ec2.Port.tcp(3306),
      "Allow ECS to RDS"
    );
  }
}

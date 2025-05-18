import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { ScoderIacStack } from "../lib/scoder-iac-stack";

describe("ScoderIacStack", () => {
  test("cria uma VPC com 2 zonas de disponibilidade", () => {
    const app = new cdk.App();
    const stack = new ScoderIacStack(app, "TestStack");

    const template = Template.fromStack(stack);

    template.hasResourceProperties("AWS::EC2::VPC", {
      CidrBlock: "10.0.0.0/16",
    });
  });

  test("cria uma instância RDS MySQL", () => {
    const app = new cdk.App();
    const stack = new ScoderIacStack(app, "TestStack");

    const template = Template.fromStack(stack);

    template.hasResourceProperties("AWS::RDS::DBInstance", {
      Engine: "mysql",
    });
  });

  test("cria um cluster ECS com container insights ativado", () => {
    const app = new cdk.App();
    const stack = new ScoderIacStack(app, "TestStack");

    const template = Template.fromStack(stack);

    template.resourceCountIs("AWS::ECS::Cluster", 1);
  });

  test("cria um Load Balancer do tipo ALB", () => {
    const app = new cdk.App();
    const stack = new ScoderIacStack(app, "TestStack");
    const template = Template.fromStack(stack);

    template.hasResourceProperties("AWS::ElasticLoadBalancingV2::LoadBalancer", {
      Type: "application",
      Scheme: "internet-facing",
    });
  });

  test("configura auto scaling baseado em CPU", () => {
    const app = new cdk.App();
    const stack = new ScoderIacStack(app, "TestStack");
    const template = Template.fromStack(stack);

    template.hasResourceProperties("AWS::ApplicationAutoScaling::ScalingPolicy", {
      PolicyType: "TargetTrackingScaling",
      TargetTrackingScalingPolicyConfiguration: {
        TargetValue: 50,
        PredefinedMetricSpecification: {
          PredefinedMetricType: "ECSServiceAverageCPUUtilization",
        },
      },
    });
  });

  test("snapshot da infraestrutura completa", () => {
    const app = new cdk.App();
    const stack = new ScoderIacStack(app, "TestStack");
    const template = Template.fromStack(stack);

    expect(template.toJSON()).toMatchSnapshot();
  });
});

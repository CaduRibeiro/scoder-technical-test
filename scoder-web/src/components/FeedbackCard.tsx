type Props = {
  rating: number;
  comment: string;
  createdAt: string;
};

export function FeedbackCard({ rating, comment, createdAt }: Props) {
  return (
    <li className="card border-b pb-2">
      <div className="text-sm font-semibold">Nota: {rating}</div>
      <div className="text-xs text-gray-500">Comentário: {comment?.trim() || "(vazio)"}</div>
      <div className="text-xs text-gray-400">{new Date(createdAt).toLocaleString()}</div>
    </li>
  );
}

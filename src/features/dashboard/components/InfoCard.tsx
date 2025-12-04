interface InfoCardProps {
  title: string;
  description?: string;
}

export const InfoCard = ({ title, description }: InfoCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h4 className="text-sm font-medium text-gray-900 mb-1">{title}</h4>
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
};
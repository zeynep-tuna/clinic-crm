type FeatureCardProps = {
  title: string;
  description: string;
};

export default function FeatureCard({
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
    <h3 className="text-xl font-semibold text-slate-800">
      {title}
    </h3>

    <p className="mt-3 text-gray-600">
      {description}
    </p>

    <a
      href="#"
      className="mt-4 inline-block font-medium text-sky-600 hover:text-sky-700"
    >
      İncele →
    </a>
  </div>
  );
}
export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Projet {id}</h1>
      {/* Contenu du projet à venir */}
    </div>
  );
} 
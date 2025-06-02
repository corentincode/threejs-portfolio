import ProjectsScene from '../../components/ProjectsScene';

export default function ProjectsPage() {
  return (
    <div className="relative w-full h-screen bg-black">
      {/* La scène Three.js prendra tout l'espace */}
      <ProjectsScene />

      {/* Overlay pour d'éventuels éléments UI comme un titre ou une intro */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-10 p-8">
        <h1 className="text-white text-4xl font-bold text-center mt-10">
          Mes Projets 3D
        </h1>
        {/* Autres éléments UI ici si nécessaire */}
      </div>
    </div>
  );
} 
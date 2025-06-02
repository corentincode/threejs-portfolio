import Scene from '@/components/Scene';

export default function Home() {
  return (
    <main className="relative">
      <Scene />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-6xl font-bold text-white text-center">
          <span className="block">Développeur Créatif</span>
          <span className="block text-4xl mt-4">Portfolio</span>
        </h1>
      </div>
    </main>
  );
}

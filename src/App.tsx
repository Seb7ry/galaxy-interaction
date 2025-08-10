import GalaxyMap from "./components/GalaxyMap";

export default function App() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Header transparente sobre el contenido */}
      <header className="pointer-events-none fixed top-0 left-0 right-0 z-40">
        <div className="pointer-events-auto bg-transparent backdrop-blur-md">
          <div className="flex items-center justify-between px-2 h-14 md:h-16">
            <span className="font-header text-white/90 text-lg font-[300] px-3">Galaxia interactiva</span>
            <span className="font-header text-white/90 text-sm font-[300] px-3">Sebastián Murillo</span>
          </div>
        </div>
      </header>


      {/* Contenido: ocupa TODO el viewport; solo empujamos bajo el header */}
      <section className="w-full h-full pt-14 md:pt-16">
        <GalaxyMap />
      </section>
    </main>
  );
}

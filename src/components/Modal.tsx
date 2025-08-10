// src/components/Modal.tsx
import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  title: string;
  onClose: () => void;
  images?: string[];
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({ title, onClose, children, images }) => {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") startClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function startClose() {
    if (!closing) setClosing(true);
  }

  const imgA = images?.[0];
  const imgB = images?.[1];

  // 👇 Renderizamos en portal para salir de cualquier stacking context
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={startClose}
      onAnimationEnd={(e) => {
        if (closing && (e.target as HTMLElement) === e.currentTarget) onClose();
      }}
      className={[
        "fixed inset-0 z-[9999] flex items-center justify-center p-4", // z altísimo
        "bg-black/30 supports-[backdrop-filter]:bg-black/20",
        "backdrop-blur-sm supports-[backdrop-filter]:backdrop-blur-md",
        closing ? "animate-backdropOut" : "animate-backdropIn",
      ].join(" ")}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={[
          "relative w-full max-w-3xl rounded-2xl",
          "bg-white/10 border border-white/20",
          "backdrop-blur-lg shadow-2xl",
          "p-6 text-white [&_*]:text-white/90",
          closing ? "animate-modalOut" : "animate-modalIn",
        ].join(" ")}
        style={{ zIndex: 10000 }} // opcional, por encima del overlay
      >
        <button
          aria-label="Cerrar"
          onClick={startClose}
          className="absolute right-3 top-3 rounded-md p-1 text-white/70 hover:bg-white/10"
        >
          ✕
        </button>

        <h2 className="font-header mb-4 text-xl">{title}</h2>

        {/* dos columnas: texto + fotos */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex items-center justify-center md:justify-start text-center md:text-left">
            <div className="font-header text-sm leading-relaxed">{children}</div>
          </div>

          <div className="relative mx-auto h-48 w-36 sm:h-56 sm:w-40 md:h-64 md:w-48 lg:h-72 lg:w-56">
            <div
              className="absolute left-0 top-0 h-40 w-28 sm:h-48 sm:w-32 md:h-56 md:w-36 lg:h-64 lg:w-44 -rotate-6
                         rounded-xl overflow-hidden shadow-xl border border-white/20
                         bg-gradient-to-br from-white/30 to-white/10"
              style={imgA ? {
                backgroundImage: `url(${imgA})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              } : {}}
            />
            <div
              className="absolute right-0 bottom-0 h-40 w-28 sm:h-48 sm:w-32 md:h-56 md:w-36 lg:h-64 lg:w-44 rotate-6
                         rounded-xl overflow-hidden shadow-xl border border-white/20
                         bg-gradient-to-br from-white/30 to-white/10"
              style={imgB ? {
                backgroundImage: `url(${imgB})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              } : {}}
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

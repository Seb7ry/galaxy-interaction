import Stars from "./Stars";
import Modal from "./Modal";
import Planet from "./Planet";
import { categories as baseCategories } from "../data/categories";
import type { Category } from "../types/types";
import { useMemo, useState } from "react";

type Selected = Category | null;

const RING_FACTORS = [0.34, 0.47, 0.60, 0.72, 0.84, 0.94];

function seededRand(seed: number) {
    let x = seed >>> 0;
    x = (1664525 * x + 1013904223) >>> 0;
    x = (1664525 * x + 1013904223) >>> 0;
    x = (1664525 * x + 1013904223) >>> 0;
    return x / 0xffffffff;
}

export default function GalaxyMap() {
    const [selected, setSelected] = useState<Selected>(null);

    const rings = useMemo(() => {
        const map = new Map<number, Category>();
        baseCategories.forEach((c) => {
            const r = c.ring ?? 0;
            if (!map.has(r)) map.set(r, c);
        });
        return Array.from(map.entries()).sort((a, b) => a[0] - b[0]).slice(0, 6);
    }, []);

    const N = rings.length || 1;

    return (
        <div className="relative isolate flex h-full w-full items-center justify-center overflow-hidden">
            <Stars />

            {/* nébulas suaves */}
            <div className="pointer-events-none absolute inset-0 opacity-70">
                <div className="absolute left-1/3 top-1/4 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
                <div className="absolute right-1/4 bottom-1/5 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
            </div>

            {/* SOL con etiqueta debajo */}
            <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <button
                    aria-label="Yo"
                    onClick={() =>
                        setSelected({
                            id: 0,
                            name: "Yo",
                            description: "Nodo central: una síntesis de quién soy.",
                            color: "bg-white",
                            ring: -1,
                        })
                    }
                    className={[
                        "relative flex items-center justify-center rounded-full bg-white/95 text-black font-semibold shadow-xl",
                        "h-16 w-16 md:h-24 md:w-24",
                        "will-change-transform transition-all duration-150 hover:scale-[1.08] focus-visible:scale-105",
                        "filter hover:brightness-110 focus-visible:brightness-110",
                        "ring-0 hover:ring-2 hover:ring-[rgba(129,140,248,.45)] focus-visible:ring-2 focus-visible:ring-[rgba(129,140,248,.45)]",
                        "after:pointer-events-none after:absolute after:inset-0 after:rounded-full",
                        "after:opacity-0 hover:after:opacity-100 focus-visible:after:opacity-100 after:transition-opacity after:duration-150",
                        "after:shadow-[0_0_26px_12px_rgba(129,140,248,.45)]",
                    ].join(" ")}
                    style={{
                        boxShadow:
                            "inset 10px -10px 24px rgba(255,255,255,.24), inset -14px 16px 28px rgba(0,0,0,.35), 0 8px 22px rgba(0,0,0,.25)",
                    }}
                >
                    {/* aura suave detrás del sol */}
                    <span
                        className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-2xl"
                        style={{ backgroundColor: "rgba(129,140,248,.22)" }}
                    />
                </button>

                {/* etiqueta debajo, igual que en los planetas */}
                <span
                    className="mt-2 select-none whitespace-nowrap text-white/85 font-planet tracking-wide"
                    style={{ fontSize: "clamp(10px, 1.3vmin, 14px)" }}
                >
                    Yo
                </span>
            </div>

            {/* Contenedor central de la galaxia (nunca excede la vista) */}
            <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                    ["--galaxyD" as any]: "min(86vmin, calc(100vw - 2rem), calc(100svh - 6rem))",
                }}
            >
                {rings.map(([ringIndex, cat], idx) => {
                    const factor = RING_FACTORS[ringIndex] ?? (0.3 + ringIndex * 0.1);
                    const ringDiameter = `calc(var(--galaxyD) * ${factor})`;
                    const ringRadius = `calc(${ringDiameter} / 2)`;

                    const evenDeg = (360 / N) * idx;
                    const jitter = seededRand(cat.id * 77 + ringIndex * 131) * 48 - 24;
                    const baseDeg = evenDeg + jitter;

                    const floatDur = (3.5 + seededRand(cat.id + 999) * 2.4).toFixed(2) + "s";

                    return (
                        <div key={ringIndex} className="relative">
                            {/* ÓRBITA (no bloquea clics) */}
                            <div
                                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                                style={{ width: ringDiameter, height: ringDiameter }}
                                aria-hidden
                            />

                            {/* PLANETA sobre la órbita */}
                            <div
                                className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                                style={{ transform: `rotate(${baseDeg}deg)` }}
                            >
                                <div style={{ transform: `translateX(${ringRadius})` }}>
                                    <div className="animate-floatY" style={{ animationDuration: floatDur }}>
                                        <div style={{ transform: `rotate(${-baseDeg}deg)` }}>
                                            <div className="flex flex-col items-center">
                                                <Planet
                                                    colorClass={cat.color}
                                                    onClick={() => setSelected(cat)}
                                                    size="clamp(24px,3vmin,48px)"
                                                    sizeScale={cat.sizeScale ?? 1}
                                                    title={cat.name}
                                                    texture={cat.texture as any}
                                                    textureImg={cat.textureImg}
                                                />
                                                <span
                                                    className="select-none whitespace-nowrap text-white/85 font-planet tracking-wide"
                                                    style={{
                                                        fontSize: "clamp(10px, 1.3vmin, 14px)",
                                                        marginTop: "clamp(6px, 0.9vmin, 10px)",
                                                    }}
                                                >
                                                    {cat.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {selected && (
                <Modal
                    title={selected.name}
                    onClose={() => setSelected(null)}
                    images={selected.images}
                >
                    {selected.description && <p className="mb-3">{selected.description}</p>}
                    {Boolean(selected.body) && <p className="mb-3 text-sm text-gray-800">{selected.body}</p>}
                    {Array.isArray(selected.bullets) && (
                        <ul className="mb-2 list-disc space-y-1 pl-5 text-sm text-gray-800">
                            {selected.bullets.map((li, i) => <li key={i}>{li}</li>)}
                        </ul>
                    )}
                </Modal>
            )}
        </div>
    );
}

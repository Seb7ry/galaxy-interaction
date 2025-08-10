// src/components/Stars.tsx

import { useMemo, type FC } from "react";

type Layer = { count: number; r: number; alpha: number; fade: number };

function seededRand(seed: number) {
    let x = seed >>> 0;
    x = (1664525 * x + 1013904223) >>> 0;
    x = (1664525 * x + 1013904223) >>> 0;
    x = (1664525 * x + 1013904223) >>> 0;
    return x / 0xffffffff;
}

const Stars: FC = () => {
    const bgImage = useMemo(() => {
        const layers: Layer[] = [
            { count: 240, r: 1, alpha: 0.30, fade: 65 },
            { count: 140, r: 2, alpha: 0.40, fade: 60 },
            { count: 70, r: 3, alpha: 0.55, fade: 55 },
        ];

        let seed = 777;
        const parts: string[] = [];
        layers.forEach((L, li) => {
            for (let i = 0; i < L.count; i++) {
                const rx = seededRand((seed += 97 + li * 13 + i)) * 100;
                const ry = seededRand((seed += 131 + li * 17 + i)) * 100;
                parts.push(
                    `radial-gradient(circle ${L.r}px at ${rx}% ${ry}%, rgba(255,255,255,${L.alpha}) 0, rgba(255,255,255,0) ${L.fade}%)`
                );
            }
        });
        return parts.join(", ");
    }, []);

    return (
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
                backgroundImage: bgImage,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                opacity: 0.6,
            }}
        >
            <div className="w-full h-full animate-twinkle" />
        </div>
    );
};

export default Stars;

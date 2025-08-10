import type { FC, CSSProperties } from "react";

export type TextureKind = "soft" | "banded" | "rings" | "speckle" | "customImg" | undefined;

function textureStyles(kind: TextureKind, imgUrl?: string): CSSProperties {
    switch (kind) {
        case "banded":
            return {
                backgroundImage: `
          radial-gradient(60% 60% at 30% 28%, rgba(255,255,255,.20), rgba(255,255,255,0) 60%),
          radial-gradient(85% 85% at 72% 75%, rgba(0,0,0,.24), rgba(0,0,0,0) 55%),
          repeating-linear-gradient(25deg, rgba(255,255,255,.06) 0 6px, rgba(255,255,255,0) 6px 14px)
        `,
                backgroundBlendMode: "soft-light, normal, overlay",
            };
        case "rings":
            return {
                backgroundImage: `
          radial-gradient(65% 65% at 32% 30%, rgba(255,255,255,.20), rgba(255,255,255,0) 60%),
          radial-gradient(85% 85% at 70% 72%, rgba(0,0,0,.22), rgba(0,0,0,0) 55%),
          conic-gradient(from 0deg, rgba(255,255,255,.06) 0deg, rgba(255,255,255,0) 30deg, rgba(255,255,255,.06) 60deg, rgba(255,255,255,0) 90deg, rgba(255,255,255,.06) 120deg, rgba(255,255,255,0) 150deg, rgba(255,255,255,.06) 180deg, rgba(255,255,255,0) 210deg, rgba(255,255,255,.06) 240deg, rgba(255,255,255,0) 270deg, rgba(255,255,255,.06) 300deg, rgba(255,255,255,0) 330deg)
        `,
                backgroundBlendMode: "soft-light, normal, overlay",
            };
        case "speckle":
            return {
                backgroundImage: `
          radial-gradient(60% 60% at 30% 28%, rgba(255,255,255,.18), rgba(255,255,255,0) 60%),
          radial-gradient(85% 85% at 72% 75%, rgba(0,0,0,.22), rgba(0,0,0,0) 55%),
          radial-gradient(0.8px 0.8px at 20% 30%, rgba(255,255,255,.09) 99%, transparent),
          radial-gradient(0.8px 0.8px at 60% 60%, rgba(255,255,255,.09) 99%, transparent),
          radial-gradient(0.8px 0.8px at 35% 75%, rgba(255,255,255,.09) 99%, transparent),
          radial-gradient(0.8px 0.8px at 75% 40%, rgba(255,255,255,.09) 99%, transparent)
        `,
                backgroundBlendMode: "soft-light, normal, normal, normal, normal, normal",
            };
        case "customImg":
            return {
                backgroundImage: `${imgUrl ? `url(${imgUrl}),` : ""} radial-gradient(60% 60% at 30% 28%, rgba(255,255,255,.24), rgba(255,255,255,0) 60%), radial-gradient(85% 85% at 72% 75%, rgba(0,0,0,.24), rgba(0,0,0,0) 55%)`,
                backgroundBlendMode: imgUrl ? "overlay, soft-light, normal" : "soft-light, normal",
                backgroundSize: imgUrl ? "cover, 100% 100%, 100% 100%" : undefined,
            };
        case "soft":
        default:
            return {
                backgroundImage: `
          radial-gradient(60% 60% at 30% 28%, rgba(255,255,255,.24), rgba(255,255,255,0) 60%),
          radial-gradient(85% 85% at 72% 75%, rgba(0,0,0,.24), rgba(0,0,0,0) 55%),
          conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,.06) 0deg, rgba(255,255,255,0) 120deg)
        `,
                backgroundBlendMode: "soft-light, normal, overlay",
            };
    }
}

const GLOW_MAP: Record<string, string> = {
    "bg-sky-400": "rgba(56,189,248,.45)",
    "bg-pink-400": "rgba(244,114,182,.45)",
    "bg-emerald-400": "rgba(52,211,153,.45)",
    "bg-amber-400": "rgba(251,191,36,.5)",
    "bg-violet-400": "rgba(167,139,250,.5)",
    "bg-orange-400": "rgba(251,146,60,.5)",
    "bg-white": "rgba(255,255,255,.5)",
};

type PlanetProps = {
    colorClass: string;
    onClick: () => void;
    size?: string;
    sizeScale?: number;
    title?: string;
    texture?: TextureKind;
    textureImg?: string;
};

const Planet: FC<PlanetProps> = ({
    colorClass,
    onClick,
    size = "clamp(24px,3vmin,48px)",
    sizeScale = 1,
    title,
    texture = "soft",
    textureImg,
}) => {
    const overlayStyle = textureStyles(texture, textureImg);
    const glow = GLOW_MAP[colorClass] ?? "rgba(255,255,255,.45)";

    return (
        <button
            onClick={onClick}
            title={title}
            aria-label={title}
            style={{
                ["--psize" as any]: size,
                ["--scale" as any]: sizeScale,
                ["--glow" as any]: glow,
                width: "calc(var(--psize) * var(--scale))",
                height: "calc(var(--psize) * var(--scale))",
                boxShadow:
                    "inset 10px -10px 24px rgba(255,255,255,.16), inset -12px 14px 26px rgba(0,0,0,.35), 0 6px 18px rgba(0,0,0,.25)",
            }}
            className={[
                colorClass,
                "relative rounded-full outline-none will-change-transform",
                "transition-all duration-150 hover:scale-[1.08] focus-visible:scale-105",
                "filter hover:brightness-110 focus-visible:brightness-110",
                "ring-0 hover:ring-2 hover:ring-[var(--glow)] focus-visible:ring-2 focus-visible:ring-[var(--glow)]",
                "after:pointer-events-none after:absolute after:inset-0 after:rounded-full",
                "after:opacity-0 hover:after:opacity-100 focus-visible:after:opacity-100 after:transition-opacity after:duration-150",
                "after:shadow-[0_0_26px_12px_var(--glow)]",
            ].join(" ")}
        >
            {/* textura/iluminación */}
            <span className="pointer-events-none absolute inset-0 rounded-full" style={overlayStyle} />
            <span className="pointer-events-none absolute inset-0 rounded-full" style={{ boxShadow: "0 0 16px 4px rgba(255,255,255,.05) inset" }} />
        </button>
    );
};

export default Planet;
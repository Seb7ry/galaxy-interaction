// src/data/categories.ts
import type { Category } from "../types/types";

export const categories: Category[] = [
  {
    id: 1,
    name: "Mi historia",
    description: "Origen, momentos clave y giros que me formaron.",
    color: "bg-sky-400",
    ring: 0,
    texture: "soft",
    sizeScale: 1,
    speedSec: 24,
    body:
      "Un breve recorrido por los lugares, personas y experiencias que marcaron mi camino. ¿Qué aprendí de cada etapa?",
    bullets: [
      "De dónde vengo y cómo crecí",
      "Experiencias que me transformaron",
      "Lecciones que llevo conmigo",
    ],
    images: ["/images/historia-1.jpg", "/images/historia-2.jpg"],
  },
  {
    id: 2,
    name: "Lo que me apasiona",
    description: "Temas y actividades que me encienden por dentro.",
    color: "bg-pink-400",
    ring: 3,
    texture: "banded",
    sizeScale: 1.2,
    speedSec: 26,
    body:
      "Aquello que hago aunque no me lo pidan. Mis curiosidades naturales y los temas que me hacen perder la noción del tiempo.",
    bullets: [
      "Áreas que investigo por gusto",
      "Proyectos personales",
      "Cómo se refleja en mi día a día",
    ],
    images: ["/images/pasion-1.jpg", "/images/pasion-2.jpg"],
  },
  {
    id: 3,
    name: "Mis habilidades",
    description: "Lo que sé hacer y cómo lo pongo en juego.",
    color: "bg-emerald-400",
    ring: 5,
    texture: "rings",
    sizeScale: 1.35,
    speedSec: 28,
    body:
      "Listado breve de habilidades técnicas, blandas y creativas, con ejemplos concretos de uso.",
    bullets: [
      "Técnicas: herramientas, lenguajes, metodologías",
      "Blandas: comunicación, liderazgo, colaboración",
      "Creativas: ideación, prototipado, storytelling",
    ],
    images: ["/images/habilidades-1.jpg", "/images/habilidades-2.jpg"],
  },
  {
    id: 4,
    name: "Mis valores",
    description: "Principios que guían mis decisiones.",
    color: "bg-amber-400",
    ring: 1,
    texture: "speckle",
    sizeScale: 1,
    speedSec: 25,
    body:
      "Aquello que para mí es no negociable. Cómo se ve en mis acciones cotidianas.",
    bullets: [
      "Honestidad y responsabilidad",
      "Aprendizaje continuo",
      "Empatía y colaboración",
    ],
    images: ["/images/valores-1.jpg", "/images/valores-2.jpg"],
  },
  {
    id: 5,
    name: "Mi estilo",
    description: "Mi forma de trabajar y diferenciarme.",
    color: "bg-violet-400",
    ring: 4,
    texture: "customImg",
    textureImg: "/textures/noise-soft.png",
    sizeScale: 1.6,
    speedSec: 27,
    body:
      "Cómo abordo los retos, mis rituales de trabajo, qué me caracteriza cuando ejecuto.",
    bullets: [
      "Proceso claro, cuidado por los detalles",
      "Comunicación simple y visual",
      "Iteración rápida con feedback",
    ],
    images: ["/images/estilo-1.jpg", "/images/estilo-2.jpg"],
  },
  {
    id: 6,
    name: "Lo que quiero ofrecer",
    description: "La propuesta de valor que puedo aportar.",
    color: "bg-orange-400",
    ring: 2,
    texture: "soft",
    sizeScale: 2,
    speedSec: 26,
    labelOffset: -10,
    body:
      "Idea inicial de servicio o contribución: a quién ayudo, con qué, y por qué debería importarle.",
    bullets: [
      "Problema que resuelvo",
      "Resultado esperado",
      "Próximos pasos para validarlo",
    ],
    images: ["/images/ofrecer-1.jpg", "/images/ofrecer-2.jpg"],
  },
];
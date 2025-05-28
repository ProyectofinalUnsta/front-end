import fotojose from "../assets/josemaria.webp";
import fotopato from "../assets/pato.webp";
import fotojuan from "../assets/juanmanuel.webp";
import fotomartinR from "../assets/martinrotger.webp";
import fotomartin from "../assets/martinmitre.webp";
import fotomateo from "../assets/mateo.webp";
import { CardSobreNosotros } from "./components/CardSobreNosotros";

const cardsSobreNosotros = [
  {
    id: 1,
    title: "José María Atonur",
    text: "QA - Desarrollador, Estudiante de la TEC. UNIV. EN DES. Y CALIDAD DE SOFTWARE",
    image: fotojose,
    url: "https://github.com/jose-maria13",
  },
  {
    id: 2,
    title: "Mateo Lozano",
    text: "Desarrollador, Estudiante de la TEC. UNIV. EN DES. Y CALIDAD DE SOFTWARE",
    image: fotomateo,
    url: "https://github.com/MateoLoz",
  },
  {
    id: 3,
    title: "Patricio Sosa",
    text: "Desarrollador, Estudiante de la TEC. UNIV. EN DES. Y CALIDAD DE SOFTWARE",
    image: fotopato,
    url: "https://github.com/patososa1",
  },
  {
    id: 4,
    title: "Juan Manuel Gimenez",
    text: "Desarrollador, Estudiante de la TEC. UNIV. EN DES. Y CALIDAD DE SOFTWARE",
    image: fotojuan,
    url: "https://github.com/juanmakorn",
  },
  {
    id: 5,
    title: "Martin Rotger",
    text: "Scrum Master - QA, Estudiante de la TEC. UNIV. EN DES. Y CALIDAD DE SOFTWARE",
    image: fotomartinR,
    url: "https://github.com/MartinRotger",
  },
  {
    id: 6,
    title: "Martin Mitre",
    text: "Desarrollador - QA, Estudiante de la TEC. UNIV. EN DES. Y CALIDAD DE SOFTWARE",
    image: fotomartin,
    url: "https://github.com/martinmitre",
  },
];

export default function CardsSobreNosotros() {
  return (
   <>
    {cardsSobreNosotros.map((card) => (
        <CardSobreNosotros
        key={card.id}
          title={card.title}
          text={card.text}
          imageSource={card.image}
          url={card.url}/>
    ))}
 </>
  );
}
import fotojose from "../assets/josemaria.jpeg";
import fotopato from "../assets/pato.jpeg";
import fotojuan from "../assets/juanmanuel.jpeg";
import fotomartinR from "../assets/martinrotger.jpeg";
import fotomartin from "../assets/martinmitre.jpeg";
import fotomateo from "../assets/mateo.jpeg";
import { Col, Row, Container } from "react-bootstrap";
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
   <Container className="px-4">
  <Row className="justify-content-center">
    {cardsSobreNosotros.map((card) => (
      <Col key={card.id} xs={12} sm={6} md={4} className="mb-4">
        <CardSobreNosotros
          title={card.title}
          text={card.text}
          imageSource={card.image}
          url={card.url}
        />
      </Col>
    ))}
  </Row>
</Container>
  );
}
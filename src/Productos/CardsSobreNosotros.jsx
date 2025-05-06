import image4 from "../assets/481072575.jpg";
import { Col, Row, Container } from "react-bootstrap";
import { CardSobreNosotros } from "./components/CardSobreNosotros";

const cardsSobreNosotros = [
  {
    id: 1,
    title: "José María Atonur",
    text: " QA - Desarrollador, Estudiante de la TEC. UNIV. EN DES. Y CALIDAD DE SOFTWARE",
    image: image4,
    url: "https://github.com/jose-maria13",
  },
  {
    id: 2,
    title: "Mateo Lozano",
    text: "Desarrollador, Estudiante de la TEC. UNIV. EN DES. Y CALIDAD DE SOFTWARE",
    image: image4,
    url: "https://github.com/MateoLoz",
  },
  {
    id: 3,
    title: "Patricio Sosa",
    text: "Desarrollador, Estudiante de la TEC. UNIV. EN DES. Y CALIDAD DE SOFTWARE",
    image: image4,
    url: "https://github.com/patososa1",
  },
  {
    id: 4,
    title: "Juan Manuel Gimenez",
    text: "Desarrollador, Estudiante de la TEC. UNIV. EN DES. Y CALIDAD DE SOFTWARE",
    image: image4,
    url: "https://github.com/juanmakorn",
  },
  {
    id: 5,
    title: "Martin Rotger",
    text: "Scrum Master - QA , Estudiante de la TEC. UNIV. EN DES. Y CALIDAD DE SOFTWARE",
    image: image4,
    url: "https://github.com/MartinRotger",
  },
  {
    id: 6,
    title: "Martin Mitre",
    text: "Desarrollador - QA , Estudiante de la TEC. UNIV. EN DES. Y CALIDAD DE SOFTWARE",
    image: image4,
    url: "https://github.com/martinmitre",
  },
];

function CardsSobreNos() {
    return (
      <Container className="text-center my-4">
        <Row className="d-flex justify-content-center">
          {cardsSobreNosotros.map(({ title, image, url, id, text }) => (
            <Col sm={12} md={6} lg={4} className="p-3" key={id}>
              <CardSobreNosotros
                imageSource={image}
                title={title}
                url={url}
                text={text}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
  
export default CardsSobreNos;

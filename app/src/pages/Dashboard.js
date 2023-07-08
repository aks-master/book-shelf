import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReadingList from "../componets/ReadList";
import Social from "../componets/Social.js";
import { useEffect, useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <Row>
        <Col sm={8}>
          <ReadingList />
        </Col>
        <Col>
          <Social />
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;

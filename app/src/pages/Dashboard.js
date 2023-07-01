import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReadingList from '../componets/ReadList';
import Social from '../componets/Social.js';
import { useEffect,useContext } from 'react';
import { AuthContext } from "../authContext/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const {user}=useContext(AuthContext);
  const navigate=useNavigate();
  useEffect(()=>{
    if(user){
      return navigate("/")
    }
  },[]);

  return (
    <Container>
      <Row>
        <Col sm={6}><ReadingList/></Col>
        <Col><Social/></Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
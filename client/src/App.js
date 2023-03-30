import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './containers/Navbar';

function App() {
  return (
    <>
    <Container fluid>
      <NavBar />
    </Container>
    <Container className="md-4 mt-50">
    </Container>
  </>
  );
}

export default App;

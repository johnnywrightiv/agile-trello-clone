import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import NavBar from './containers/Navbar';
import HomePage from './components/HomePage';
import NotFound from './components/NotFound';

function App() {
  return (
    <>
      {/* Nav Container */}
      <Container fluid>
        <NavBar />
      </Container>

      {/* Body Container (render components within this container. can just use rows in the components i think)*/}
      <Container className="md-4 mt-5">
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage/>} />
            <Route path="/NotFound" element={<NotFound/>} />
          </Routes>
        </Router>
        
      </Container>
    </>
  );
}


export default App;

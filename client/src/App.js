import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import NavBar from './containers/Navbar';
import HomePage from './components/HomePage';
import NotFound from './components/NotFound';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import BoardsView from './containers/BoardsView';

function App() {
  return (
    <>
      {/* Nav Container */}
      <Container fluid>
        <NavBar />
      </Container>

      {/* Body Container (render components within this container. can just use rows in the components i think)*/}
      <Container className="md-4 mt-5">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/NotFound" element={<NotFound />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route exact path="/login" element={<LoginForm />} />
            <Route path="/boards" element={<BoardsView />} />
          </Routes>
      </Container>
    </>
  );
}


export default App;

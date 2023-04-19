import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import NavBar from './components/Navbar';
import HomePage from './components/HomePage';
import NotFound from './components/NotFound';
import SignUpForm from './components/SignUpForm';
import LoginForm from './containers/LoginForm';
import BoardView from './containers/BoardView';

function App() {
  return (
    <>
      <Container fluid>
        <NavBar />
      </Container>
    <br />
      <DndProvider backend={HTML5Backend}>
        <Container className="body-content md-4 pt-5 mt-5">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/boards/:boardId" element={<BoardView />} />
              <Route path="/NotFound" element={<NotFound />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route exact path="/login" element={<LoginForm />} />
            </Routes>
        </Container>
      </DndProvider>
    </>
  );
}


export default App;

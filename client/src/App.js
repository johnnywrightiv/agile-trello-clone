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
      {/* Nav Container */}
      <Container fluid>
        <NavBar />
      </Container>

    <br />
    
      {/* Body Container (render components within this container. can just use rows in the components i think)*/}
      <DndProvider backend={HTML5Backend}>
        <Container className="md-4 mt-5">
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

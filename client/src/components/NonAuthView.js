import React from 'react';
import { Container, Button } from 'react-bootstrap';


function Home() {
  return (
    <Container className="py-5">
      <h1>Welcome to Tre-Hello</h1>
      <p>The smarter way to manage your task and projects</p>
      <Button variant="primary" size="lg" href="/login">Login</Button>{' '}
      <Button variant="outline-primary" size="lg" href="/signup">Sign up</Button>{' '}
    </Container>
  )
}

export default Home;

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

const Header = () => {
  return (
    <Navbar className="cleanly-navbar" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Cleanly</Navbar.Brand>

        <Nav className="ms-auto">
          <Nav.Link href="#features">How It Works</Nav.Link>
          <Nav.Link href="#services">Our Services</Nav.Link>

          <Button variant="info" className="me-3">
            Book a Cleaning
          </Button>

          <Button variant="outline-light">Login</Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;

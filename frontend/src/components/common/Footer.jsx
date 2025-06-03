import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={6}>
            <h5 className="fw-bold mb-3">WES Portal</h5>
            <p className="text-muted">
              World Education Services helps international students and professionals 
              get their academic credentials evaluated for use in Canada and the United States.
            </p>
          </Col>
          <Col md={3}>
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-muted text-decoration-none">Home</Link></li>
              <li><Link to="/login" className="text-muted text-decoration-none">Sign In</Link></li>
              <li><Link to="/register" className="text-muted text-decoration-none">Sign Up</Link></li>
              <li><Link to="/about" className="text-muted text-decoration-none">About Us</Link></li>
            </ul>
          </Col>
          <Col md={3}>
            <h6 className="fw-bold mb-3">Support</h6>
            <ul className="list-unstyled">
              <li><Link to="/help" className="text-muted text-decoration-none">Help Center</Link></li>
              <li><Link to="/contact" className="text-muted text-decoration-none">Contact Us</Link></li>
              <li><Link to="/terms" className="text-muted text-decoration-none">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-muted text-decoration-none">Privacy Policy</Link></li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row>
          <Col className="text-center">
            <p className="text-muted mb-0">
              © {new Date().getFullYear()} WES Portal. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

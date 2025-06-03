import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">
                Your Gateway to Global Education Recognition
              </h1>
              <p className="lead mb-4">
                World Education Services (WES) helps international students and professionals 
                get their academic credentials evaluated for use in Canada and the United States.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Button as={Link} to="/register" variant="light" size="lg">
                  Get Started
                </Button>
                <Button as={Link} to="/login" variant="outline-light" size="lg">
                  Sign In
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <div className="bg-light rounded-3 p-4 shadow">
                <h3 className="text-dark mb-3">Quick Start</h3>
                <div className="text-dark">
                  <div className="d-flex align-items-center mb-2">
                    <span className="badge bg-primary me-2">1</span>
                    Create your account
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <span className="badge bg-primary me-2">2</span>
                    Submit your application
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="badge bg-primary me-2">3</span>
                    Track your evaluation progress
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold mb-3">Why Choose WES?</h2>
              <p className="lead text-muted">
                Trusted by millions worldwide for accurate and reliable credential evaluations
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                         style={{ width: '60px', height: '60px' }}>
                      <i className="fas fa-certificate fa-lg"></i>
                    </div>
                  </div>
                  <h5 className="fw-bold">Trusted Expertise</h5>
                  <p className="text-muted">
                    50+ years of experience in international credential evaluation.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                         style={{ width: '60px', height: '60px' }}>
                      <i className="fas fa-clock fa-lg"></i>
                    </div>
                  </div>
                  <h5 className="fw-bold">Fast Processing</h5>
                  <p className="text-muted">
                    Quick turnaround times with regular status updates.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <div className="bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                         style={{ width: '60px', height: '60px' }}>
                      <i className="fas fa-shield-alt fa-lg"></i>
                    </div>
                  </div>
                  <h5 className="fw-bold">Secure Platform</h5>
                  <p className="text-muted">
                    Your documents are protected with enterprise-grade security.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default HomePage;
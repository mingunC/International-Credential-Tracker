import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ApplicationPage = () => {
  const { user } = useAuth();
  const [showNewAppModal, setShowNewAppModal] = useState(false);
  const [applications] = useState([
    // 샘플 데이터
    {
      id: 1,
      type: 'Document-by-Document',
      status: 'In Progress',
      submittedDate: '2024-01-15',
      estimatedCompletion: '2024-02-15'
    },
    {
      id: 2,
      type: 'Course-by-Course',
      status: 'Completed',
      submittedDate: '2023-12-01',
      estimatedCompletion: '2024-01-01'
    }
  ]);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'warning';
      case 'Pending':
        return 'secondary';
      default:
        return 'primary';
    }
  };

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="mb-2">My Applications</h1>
              <p className="text-muted">Track and manage your credential evaluation applications</p>
            </div>
            <Button as={Link} to="/application/new" variant="primary" size="lg">
              New Application
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Application History</h5>
            </Card.Header>
            <Card.Body>
              {applications.length > 0 ? (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Application ID</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Submitted Date</th>
                      <th>Est. Completion</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app.id}>
                        <td>#{app.id.toString().padStart(6, '0')}</td>
                        <td>{app.type}</td>
                        <td>
                          <Badge bg={getStatusVariant(app.status)}>
                            {app.status}
                          </Badge>
                        </td>
                        <td>{new Date(app.submittedDate).toLocaleDateString()}</td>
                        <td>{new Date(app.estimatedCompletion).toLocaleDateString()}</td>
                        <td>
                          <Button variant="outline-primary" size="sm" className="me-2">
                            View
                          </Button>
                          <Button variant="outline-secondary" size="sm">
                            Download
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center py-5">
                  <h5 className="text-muted">No applications found</h5>
                  <p className="text-muted mb-4">You haven't submitted any applications yet.</p>
                  <Button as={Link} to="/application/new" variant="primary">Start Your First Application</Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <h5 className="card-title">Need Help?</h5>
              <p className="card-text">Get support with your application process.</p>
              <Button variant="outline-primary">Contact Support</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <h5 className="card-title">Application Guidelines</h5>
              <p className="card-text">Learn about requirements and processing times.</p>
              <Button variant="outline-primary">View Guidelines</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* New Application Modal */}
      <Modal show={showNewAppModal} onHide={() => setShowNewAppModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Start New Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Choose the type of credential evaluation you need:</p>
          <div className="d-grid gap-2">
            <Button variant="outline-primary" onClick={() => setShowNewAppModal(false)}>
              Document-by-Document Evaluation
            </Button>
            <Button variant="outline-primary" onClick={() => setShowNewAppModal(false)}>
              Course-by-Course Evaluation
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ApplicationPage;
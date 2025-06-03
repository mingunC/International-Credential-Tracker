import React from 'react';
import { Container, Row, Col, Card, Button, Badge, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user, applications } = useAuth();

  // 최근 3개 applications만 보여주기
  const recentApplications = applications.slice(-3).reverse();

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
          <h1 className="mb-4">Welcome to Your Dashboard</h1>
          <p className="lead text-muted mb-4">
            Hello {user?.firstName}! Here you can manage your WES applications and track their progress.
          </p>
        </Col>
      </Row>
      
      <Row>
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <h5 className="card-title">My Applications</h5>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="display-6 fw-bold text-primary">{applications.length}</span>
                <Badge bg="info">Total</Badge>
              </div>
              <p className="card-text">View and manage your credential evaluation applications.</p>
              <Button as={Link} to="/application" variant="primary">View All Applications</Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <h5 className="card-title">Profile Settings</h5>
              <p className="card-text">Update your personal information and account settings.</p>
              <Button as={Link} to="/profile" variant="outline-primary">Edit Profile</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <h5 className="card-title">Quick Start</h5>
              <p className="card-text">Submit a new credential evaluation application.</p>
              <Button as={Link} to="/application/new" variant="success">New Application</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Applications</h5>
              {applications.length > 3 && (
                <Button as={Link} to="/application" variant="outline-primary" size="sm">
                  View All
                </Button>
              )}
            </Card.Header>
            <Card.Body>
              {recentApplications.length > 0 ? (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Submitted</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentApplications.map((app) => (
                      <tr key={app.id}>
                        <td>#{app.id.toString().padStart(6, '0')}</td>
                        <td>
                          {app.evaluationType === 'document' 
                            ? 'Document-by-Document' 
                            : 'Course-by-Course'}
                        </td>
                        <td>
                          <Badge bg={getStatusVariant(app.status)}>
                            {app.status}
                          </Badge>
                        </td>
                        <td>{new Date(app.submittedDate).toLocaleDateString()}</td>
                        <td>
                          <Button as={Link} to="/application" variant="outline-primary" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center py-4">
                  <h6 className="text-muted">No applications yet</h6>
                  <p className="text-muted mb-3">Get started by submitting your first application</p>
                  <Button as={Link} to="/application/new" variant="primary">
                    Submit Application
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
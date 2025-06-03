import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, ProgressBar, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ApplicationFormPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // 폼 데이터
  const [formData, setFormData] = useState({
    // 기본 정보
    evaluationType: '',
    purpose: '',
    
    // 개인 정보
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: '',
    countryOfBirth: '',
    
    // 교육 정보
    institutionName: '',
    institutionCountry: '',
    degreeType: '',
    fieldOfStudy: '',
    graduationDate: '',
    language: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 파일 업로드 핸들러
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2), // MB
      type: getFileType(file.name),
      uploadProgress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // 파일 업로드 시뮬레이션
    newFiles.forEach(fileObj => {
      simulateUpload(fileObj.id);
    });
  };

  const getFileType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    if (['pdf'].includes(extension)) return 'PDF Document';
    if (['jpg', 'jpeg', 'png'].includes(extension)) return 'Image';
    if (['doc', 'docx'].includes(extension)) return 'Word Document';
    return 'Other';
  };

  const simulateUpload = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadedFiles(prev => 
        prev.map(file => 
          file.id === fileId 
            ? { ...file, uploadProgress: progress }
            : file
        )
      );
      
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  // 드래그 앤 드롭 핸들러
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const event = { target: { files } };
    handleFileUpload(event);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 실제로는 API 호출
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Application submitted successfully!');
      navigate('/application');
    } catch (error) {
      toast.error('Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <Card.Header>
              <h5 className="mb-0">Step 1: Evaluation Type</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-4">
                <Form.Label>Choose Evaluation Type *</Form.Label>
                <div className="d-grid gap-3">
                  <Card 
                    className={`border ${formData.evaluationType === 'document' ? 'border-primary bg-light' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleInputChange({ target: { name: 'evaluationType', value: 'document' } })}
                  >
                    <Card.Body>
                      <Form.Check
                        type="radio"
                        name="evaluationType"
                        value="document"
                        checked={formData.evaluationType === 'document'}
                        onChange={handleInputChange}
                        label={
                          <div>
                            <strong>Document-by-Document</strong>
                            <p className="text-muted mb-0 small">
                              Basic credential evaluation that confirms your education is authentic and lists U.S. equivalent.
                            </p>
                          </div>
                        }
                      />
                    </Card.Body>
                  </Card>
                  
                  <Card 
                    className={`border ${formData.evaluationType === 'course' ? 'border-primary bg-light' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleInputChange({ target: { name: 'evaluationType', value: 'course' } })}
                  >
                    <Card.Body>
                      <Form.Check
                        type="radio"
                        name="evaluationType"
                        value="course"
                        checked={formData.evaluationType === 'course'}
                        onChange={handleInputChange}
                        label={
                          <div>
                            <strong>Course-by-Course</strong>
                            <p className="text-muted mb-0 small">
                              Detailed course analysis showing subject-by-subject breakdown and GPA calculation.
                            </p>
                          </div>
                        }
                      />
                    </Card.Body>
                  </Card>
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Purpose of Evaluation *</Form.Label>
                <Form.Select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select purpose</option>
                  <option value="immigration">Immigration</option>
                  <option value="employment">Employment</option>
                  <option value="education">Further Education</option>
                  <option value="licensing">Professional Licensing</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
            </Card.Body>
          </Card>
        );

      case 2:
        return (
          <Card>
            <Card.Header>
              <h5 className="mb-0">Step 2: Personal Information</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth *</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Country of Birth *</Form.Label>
                    <Form.Select
                      name="countryOfBirth"
                      value={formData.countryOfBirth}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select country</option>
                      <option value="South Korea">South Korea</option>
                      <option value="Japan">Japan</option>
                      <option value="China">China</option>
                      <option value="India">India</option>
                      <option value="Philippines">Philippines</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );

      case 3:
        return (
          <Card>
            <Card.Header>
              <h5 className="mb-0">Step 3: Education Information</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Institution Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleInputChange}
                  placeholder="Enter the name of your educational institution"
                  required
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Institution Country *</Form.Label>
                    <Form.Select
                      name="institutionCountry"
                      value={formData.institutionCountry}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select country</option>
                      <option value="South Korea">South Korea</option>
                      <option value="Japan">Japan</option>
                      <option value="China">China</option>
                      <option value="India">India</option>
                      <option value="Philippines">Philippines</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Degree Type *</Form.Label>
                    <Form.Select
                      name="degreeType"
                      value={formData.degreeType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select degree type</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="master">Master's Degree</option>
                      <option value="doctorate">Doctorate/PhD</option>
                      <option value="diploma">Diploma</option>
                      <option value="certificate">Certificate</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Field of Study *</Form.Label>
                    <Form.Control
                      type="text"
                      name="fieldOfStudy"
                      value={formData.fieldOfStudy}
                      onChange={handleInputChange}
                      placeholder="e.g., Computer Science, Business Administration"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Graduation Date *</Form.Label>
                    <Form.Control
                      type="month"
                      name="graduationDate"
                      value={formData.graduationDate}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Language of Instruction *</Form.Label>
                <Form.Select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select language</option>
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="chinese">Chinese</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
            </Card.Body>
          </Card>
        );

      case 4:
        return (
          <Card>
            <Card.Header>
              <h5 className="mb-0">Step 4: Document Upload</h5>
            </Card.Header>
            <Card.Body>
              <Alert variant="info" className="mb-4">
                <strong>Required Documents:</strong>
                <ul className="mb-0 mt-2">
                  <li>Official transcripts (sealed)</li>
                  <li>Degree/Diploma certificate</li>
                  <li>Passport copy (identification pages)</li>
                  <li>Any additional supporting documents</li>
                </ul>
              </Alert>

              {/* 파일 업로드 영역 */}
              <div 
                className="border border-dashed border-3 rounded p-4 text-center mb-4"
                style={{ borderColor: '#dee2e6', backgroundColor: '#f8f9fa' }}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="mb-3">
                  📄
                </div>
                <h5>Drag & Drop Files Here</h5>
                <p className="text-muted mb-3">or click to browse files</p>
                <Form.Control
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="file-upload"
                />
                <Button 
                  variant="outline-primary"
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  Choose Files
                </Button>
                <small className="d-block text-muted mt-2">
                  Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB each)
                </small>
              </div>

              {/* 업로드된 파일 목록 */}
              {uploadedFiles.length > 0 && (
                <div>
                  <h6 className="mb-3">Uploaded Documents ({uploadedFiles.length})</h6>
                  {uploadedFiles.map(file => (
                    <Card key={file.id} className="mb-2">
                      <Card.Body className="py-2">
                        <Row className="align-items-center">
                          <Col>
                            <div className="d-flex align-items-center">
                              <span className="me-2">📄</span>
                              <div>
                                <div className="fw-medium">{file.name}</div>
                                <small className="text-muted">
                                  {file.size} MB • <Badge bg="secondary">{file.type}</Badge>
                                </small>
                              </div>
                            </div>
                          </Col>
                          <Col xs="auto">
                            {file.uploadProgress < 100 ? (
                              <div style={{ width: '100px' }}>
                                <ProgressBar 
                                  now={file.uploadProgress} 
                                  size="sm"
                                  label={`${file.uploadProgress}%`}
                                />
                              </div>
                            ) : (
                              <Badge bg="success">Uploaded</Badge>
                            )}
                          </Col>
                          <Col xs="auto">
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => removeFile(file.id)}
                            >
                              🗑️
                            </Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <div className="mb-4">
            <h1 className="mb-2">New Credential Evaluation Application</h1>
            <p className="text-muted">Complete all steps to submit your application</p>
          </div>

          {/* 진행률 표시 */}
          <Card className="mb-4">
            <Card.Body className="py-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-medium">Progress</span>
                <span className="text-muted">Step {currentStep} of 4</span>
              </div>
              <ProgressBar now={(currentStep / 4) * 100} />
            </Card.Body>
          </Card>

          <Form onSubmit={handleSubmit}>
            {renderStep()}

            {/* 네비게이션 버튼 */}
            <Card className="mt-4">
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <Button 
                    variant="outline-secondary"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  
                  <div>
                    {currentStep < 4 ? (
                      <Button 
                        variant="primary"
                        onClick={nextStep}
                        disabled={!formData.evaluationType && currentStep === 1}
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button 
                        type="submit"
                        variant="success"
                        disabled={loading || uploadedFiles.length === 0}
                        className="px-4"
                      >
                        {loading ? 'Submitting...' : 'Submit Application'}
                      </Button>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplicationFormPage;
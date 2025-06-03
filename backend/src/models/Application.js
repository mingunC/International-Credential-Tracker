const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  applicationNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  // 개인 정보
  applicantName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Applicant name is required' }
    }
  },
  applicantEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: { msg: 'Please provide a valid email' }
    }
  },
  // 학위 정보
  institutionName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Institution name is required' }
    }
  },
  institutionCountry: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Institution country is required' }
    }
  },
  degreeType: {
    type: DataTypes.ENUM(
      'High School Diploma',
      'Associate Degree',
      'Bachelor\'s Degree',
      'Master\'s Degree',
      'Doctoral Degree',
      'Professional Degree',
      'Other'
    ),
    allowNull: false
  },
  fieldOfStudy: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Field of study is required' }
    }
  },
  graduationYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: { args: 1950, msg: 'Graduation year must be after 1950' },
      max: { args: new Date().getFullYear(), msg: 'Graduation year cannot be in the future' }
    }
  },
  // 신청 목적
  evaluationPurpose: {
    type: DataTypes.ENUM(
      'Immigration',
      'Employment',
      'Further Education',
      'Professional Licensing',
      'Other'
    ),
    allowNull: false
  },
  urgentProcessing: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  // 상태 관리
  status: {
    type: DataTypes.ENUM(
      'draft',
      'submitted',
      'under_review',
      'documents_required',
      'in_progress',
      'completed',
      'cancelled'
    ),
    defaultValue: 'draft'
  },
  // 관리자 노트
  adminNotes: {
    type: DataTypes.TEXT
  },
  reviewedBy: {
    type: DataTypes.UUID,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  reviewedAt: {
    type: DataTypes.DATE
  },
  // 완료 정보
  completedAt: {
    type: DataTypes.DATE
  },
  estimatedCompletionDate: {
    type: DataTypes.DATE
  },
  // 결제 정보
  fee: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'paid', 'refunded'),
    defaultValue: 'pending'
  },
  paymentDate: {
    type: DataTypes.DATE
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: (application) => {
      if (!application.applicationNumber) {
        const timestamp = Date.now().toString();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        application.applicationNumber = `WES-${timestamp}-${random}`;
      }
    }
  }
});

module.exports = Application;
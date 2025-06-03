const { Sequelize } = require('sequelize');

// PostgreSQL 연결 설정
const sequelize = new Sequelize(
  process.env.DB_NAME || 'wes_portal',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// 데이터베이스 연결 함수
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Database connected successfully');
    
    // 개발 환경에서만 동기화 (프로덕션에서는 마이그레이션 사용)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('📊 Database synchronized');
    }
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    console.log('⚠️ Make sure PostgreSQL Docker container is running:');
    console.log('   docker run --name postgres-wes -e POSTGRES_PASSWORD=password -e POSTGRES_DB=wes_portal -p 5432:5432 -d postgres:14');
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectDB
};
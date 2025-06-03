echo 'const getStatus = (req, res) => {
  res.json({
    success: true,
    message: "API is working!",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
};

const getUsers = (req, res) => {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" }
  ];
  
  res.json({
    success: true,
    data: users
  });
};

module.exports = {
  getStatus,
  getUsers
};' > src/controllers/testController.js
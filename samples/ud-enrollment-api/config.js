module.exports = {
  email: process.env.EMAIL || 'email@email.com',
  port: process.env.PORT || '3000',
  company: {
    apiUrl: process.env.API_URL || 'http://api.company.com'
  }
};

const config = {
  // Base URLs
  baseUrl: 'https://pln-fe.dev.embrio.id',
  loginUrl: 'https://pln-fe.dev.embrio.id/login?redirect=%2F',
  
  // Test credentials
  credentials: {
    valid: {
      email: 'admin@vhiweb.com',
      password: 'Admin123@'
    },
    invalid: {
      email: 'invalid@test.com',
      password: 'wrongpassword'
    }
  },
  
  // Timeouts
  timeouts: {
    short: 5000,
    medium: 10000,
    long: 30000,
    veryLong: 60000
  },
  
  // Browser settings
  browser: {
    headless: false,
    slowMo: 100,
    viewport: {
      width: 1280,
      height: 720
    }
  },
  
  // Test data
  testData: {
    expectedTitle: 'PLN EMPSD',
    expectedHeading: 'EMPSD'
  },
  
  // Screenshot settings
  screenshots: {
    enabled: true,
    path: 'test-results/screenshots/',
    onFailure: true
  }
};

module.exports = config;

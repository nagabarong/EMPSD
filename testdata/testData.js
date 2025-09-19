const testData = {
  // User credentials
  users: {
    admin: {
      email: 'admin@vhiweb.com',
      password: 'Admin123!',
      role: 'admin'
    },
    user: {
      email: 'user@test.com',
      password: 'User123@',
      role: 'user'
    },
    invalid: {
      email: 'invalid@test.com',
      password: 'wrongpassword',
      role: 'invalid'
    }
  },

  // Test URLs
  urls: {
    baseUrl: 'https://pln-fe.dev.embrio.id',
    loginUrl: 'https://pln-fe.dev.embrio.id/login?redirect=%2F',
    dashboardUrl: 'https://pln-fe.dev.embrio.id/dashboard',
    homeUrl: 'https://pln-fe.dev.embrio.id/'
  },

  // Expected text content
  expectedText: {
    pageTitle: 'PLN EMPSD',
    loginPageTitle: 'PLN EMPSD',
    dashboardHeading: 'EMPSD',
    loginButton: 'Masuk',
    emailPlaceholder: 'Alamat email',
    passwordPlaceholder: 'Password'
  },

  // Error messages
  errorMessages: {
    invalidCredentials: 'Invalid email or password',
    requiredField: 'This field is required',
    invalidEmail: 'Please enter a valid email address'
  },

  // Test scenarios
  scenarios: {
    validLogin: {
      description: 'Valid user login',
      email: 'admin@vhiweb.com',
      password: 'Admin123@',
      expectedResult: 'success'
    },
    invalidEmail: {
      description: 'Login with invalid email',
      email: 'invalid@test.com',
      password: 'Admin123@',
      expectedResult: 'failure'
    },
    invalidPassword: {
      description: 'Login with invalid password',
      email: 'admin@vhiweb.com',
      password: 'wrongpassword',
      expectedResult: 'failure'
    },
    emptyCredentials: {
      description: 'Login with empty credentials',
      email: '',
      password: '',
      expectedResult: 'failure'
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
    viewport: {
      desktop: { width: 1280, height: 720 },
      tablet: { width: 768, height: 1024 },
      mobile: { width: 375, height: 667 }
    }
  }
};

module.exports = testData;

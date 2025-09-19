# PLN EMPSD Test Automation

This project implements automated testing for the PLN EMPSD application using Playwright with Page Object Model (POM) pattern.

## 🏗️ Project Structure

```
EMPSD/
├── config/
│   └── config.js              # Configuration settings
├── pages/
│   ├── BasePage.js            # Base page class
│   ├── LoginPage.js           # Login page object
│   └── DashboardPage.js       # Dashboard page object
├── src/testcases/
│   └── Feature/
│       ├── Authentication/
│       │   └── Authentication.spec.js
│       └── Load-forecast/
├── testdata/
│   └── testData.js            # Test data and constants
├── utils/
│   ├── helpers.js             # Custom expect helpers
│   └── testUtils.js           # Test utility functions
├── playwright.config.ts       # Playwright configuration
└── package.json               # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the project**
   ```bash
   git clone <repository-url>
   cd EMPSD
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npm run install:browsers
   ```

## 🧪 Running Tests

### Basic Test Commands

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug
```

### Creating and Running Your Tests

1. Create your spec files under `src/testcases/`, for example:
   - `src/testcases/example/Authentication.spec.js`
   - `src/testcases/example/Dashboard.spec.js`

2. Run all tests:
```bash
npm test
```

3. Run a specific file:
```bash
npx playwright test src/testcases/Feature/Authentication/Authentication.spec.js
```

### Specific Test Suites

```bash
# Run authentication tests only
npm run test:auth

# Run dashboard tests only
npm run test:dashboard
```

### Browser-Specific Tests

```bash
# Run tests in Chrome only
npm run test:chrome

# Run tests in Firefox only
npm run test:firefox

# Run tests in WebKit (Safari) only
npm run test:webkit

# Run tests in mobile viewport
npm run test:mobile
```

### Test Reports

```bash
# Show test report
npm run test:report

# Show trace viewer
npm run trace
```

## 🔧 Development Tools

```bash
# Generate test code
npm run codegen

# Run specific test file
npx playwright test src/testcases/example/Authentication.spec.js

# Run tests with specific browser
npx playwright test --project=chromium

# Run tests in headed mode with slow motion
npx playwright test --headed --slow-mo=1000
```

## 📋 Test Coverage

### Authentication Tests (includes login functionality)
- ✅ Login page verification
- ✅ Successful login with valid credentials
- ✅ Login with invalid email
- ✅ Login with invalid password
- ✅ Login with empty credentials (button disabled)
- ✅ Password visibility toggle
- ✅ Form field clearing
- ✅ Dashboard elements verification

### Dashboard Tests
- ✅ Dashboard loads after login
- ✅ EMPSD heading visibility
- ✅ Navigation elements
- ✅ Page title verification
- ✅ Responsive layout
- ✅ Performance check
- ✅ Error handling
- ✅ User menu functionality
- ✅ Accessibility checks

## 🏛️ Page Object Model (POM)

This project follows the Page Object Model pattern for better maintainability:

### BasePage.js
- Common functionality for all pages
- Navigation methods
- Element interaction methods
- Utility methods

### LoginPage.js
- Login-specific functionality
- Form field interactions
- Login validation
- Error handling

### DashboardPage.js
- Dashboard-specific functionality
- Element verification
- User interactions
- Content validation

## ⚙️ Configuration

### config/config.js
- Base URLs
- Test credentials
- Timeout settings
- Browser settings
- Test data

### playwright.config.ts
- Test directory configuration
- Browser projects
- Reporter settings
- Global test settings

## 🛠️ Utilities

### helpers.js
- Custom expect functions
- Error message formatting
- Assertion enhancements

### testUtils.js
- Common test utilities
- Screenshot functions
- Data generation
- Retry mechanisms

## 📊 Test Data

### testdata/testData.js
- User credentials
- Test URLs
- Expected text content
- Error messages
- Test scenarios

## 🔍 Best Practices

1. **Page Object Model**: All page interactions are encapsulated in page objects
2. **Data Separation**: Test data is separated from test logic
3. **Reusable Components**: Common functionality is in base classes
4. **Error Handling**: Comprehensive error handling and reporting
5. **Maintainability**: Clear structure and naming conventions
6. **Documentation**: Well-documented code and methods

## 📚 Resources

* [Playwright Documentation](https://playwright.dev/docs/intro)
* [Playwright API Reference](https://playwright.dev/docs/api/class-playwright/)
* [Playwright Changelog](https://github.com/microsoft/playwright/releases)
* [Page Object Model Pattern](https://playwright.dev/docs/pom)

## 🤝 Contributing

1. Follow the existing code structure
2. Add tests for new functionality
3. Update documentation as needed
4. Ensure all tests pass before submitting

## 📝 License

This project is licensed under the ISC License.

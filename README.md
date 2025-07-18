# ottometric_assignment

## to setup localy run these comands
```
npm init -y
npm init playwright@latest
npm install axios
nom git init
npm install --save-dev cross-env
```

## Overview
Assignment tests you may find in: 
```
../tests/Assignment.spec.ts
```
Online report (GitHub pages) on: 
```
https://malbaski021.github.io/ottometric_assignment/
```
This project is a Playwright-based end-to-end test automation suite for the Ottoviz web application. It demonstrates advanced QA engineering practices, including:
- Page Object Model (POM) structure
- Environment and configuration management
- Custom assertion helpers
- Data-driven and tag-based test execution
- CI/CD integration and reporting

## Project Structure
```
ottometric_assignment/
├── elements/         # Page element locators and base wrappers
├── fixtures/         # Playwright fixtures and custom test context
├── helpers/          # Environment config and utility functions
├── pages/            # Page object classes (actions)
├── tests/            # Main test specs
├── tests-examples/   # Example/demo tests
├── playwright.config.ts  # Playwright configuration
├── global-setup.ts      # Global setup logic
├── properties.txt       # Test credentials and URLs
├── package.json         # Project dependencies and scripts
└── .github/workflows/   # CI/CD pipeline
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
```
npm install
```

### Environment Configuration
- All environment variables are managed via `helpers/envConfig.ts` and can be set using `.env` files or via CLI/CI variables.
- Supported environments: `qa`, `prod`
- Supported URL: `ottoviz.ominf.net`
- Example `.env` file:
  ```
  ENV=qa
  URL=ottoviz.ominf.net
  USERNAME=test_user_123@test.com
  PASSWORD=rusaiilzsmtvnhet
  ```

## Running Tests

### Standard Test Run
```
npm test
```

### Smoke AND Regression Tests by Environment
```
npm run test:smoke-qa   # Runs @smoke tests on QA (THIS ONE WORKS)
npm run test:smoke-prod # Runs @smoke tests on PROD (Note: This is just an example)
npm run test:regression-qa # Runs @regression tests on PROD (Note: This is just an example)
npm run test:regression-prod # Runs @regression tests on PROD (Note: This is just an example)
```

### Custom Test Tags
```
npx playwright test --grep @yourTag
```

## Reporting
- Playwright HTML reports are generated in `playwright-report/` after each run.
- To view the report:
  ```
  npx playwright show-report
  ```
- (Optional) Integrate Allure for advanced reporting.

## CI/CD Integration
- GitHub Actions workflow is provided in `.github/workflows/playwright.yml`.
- On each push/PR, tests run and reports are published to GitHub Pages.

## Page Object Model (POM)
- All page actions are implemented in `pages/`.
- Element locators are defined in `elements/`.
- Base wrappers and custom assertions are in `BasePageElements.ts`.

## Custom Assertion Helpers
- Soft assertions are implemented via `SoftAssertHelper`.
- Use `finalAssert()` in tests to aggregate assertion results.

## Test Data Management
- Credentials and URLs are stored in `properties.txt` (for demo purposes).
- For production, use environment variables or secure vaults.

## Linting & Formatting
```
npm run lint
npm run format
```
(Add ESLint/Prettier config as needed)

## Troubleshooting
- If tests fail due to environment/config, check `.env` and `properties.txt`.
- For Playwright errors, consult the HTML report for details and screenshots.
- For CI/CD issues, review GitHub Actions logs and artifact uploads.

## Contributing
- Fork the repo and create a feature branch.
- Add/modify tests in the appropriate folder.
- Ensure all tests pass and reports are generated.
- Submit a pull request with a summary of changes.

## Contact
For questions or support, contact the project maintainer or open an issue on GitHub.

---

**Professional QA Automation. Built with Playwright, TypeScript, and best practices.**

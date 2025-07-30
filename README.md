# 📋 Project Context
This project was originally a technical assignment given by a company to demonstrate skills in:
- Table data manipulation and validation
- Advanced test automation approaches
- Data-driven testing methodologies

Since platform access is no longer available, this repository now serves as a **portfolio example** showcasing professional QA automation practices and problem-solving capabilities.

## Overview
This is a Playwright-based end-to-end test automation suite for the Ottoviz web application. It demonstrates advanced QA engineering practices, including:
- Page Object Model (POM) structure
- Centralized test data management with TypeScript interfaces
- Custom assertion helpers and soft assertions
- Data-driven test execution
- CI/CD integration with automated reporting

Assignment tests you may find in: 
```
../tests/Assignment.spec.ts
```
Online report (GitHub pages) on: 
```
https://malbaski021.github.io/ottometric_assignment/
```

## Project Structure
```
ottometric_assignment/
├── elements/         # Page element locators and base wrappers
├── fixtures/         # Playwright fixtures and custom test context
├── helpers/          # Environment config and utility functions
├── pages/            # Page object classes (actions)
├── testData/         # Centralized test data with TypeScript interfaces
│   ├── assignmentTestData.ts    # Test-specific data (columns, KPI options)
│   ├── loginTestData.ts         # Login scenarios and error messages
│   ├── commonTestData.ts        # Shared data across test suites
│   └── index.ts                 # Centralized exports
├── tests/            # Main test specs
├── playwright.config.ts  # Playwright configuration
├── global-setup.ts      # Global setup logic
├── properties.txt       # Test credentials and URLs
├── package.json         # Project dependencies and scripts
└── .github/workflows/   # CI/CD pipeline
```

## Key Features

### 🎯 Test Data Management
- **Centralized Architecture**: All test data managed through TypeScript interfaces
- **Type Safety**: Compile-time validation prevents data structure errors  
- **Maintainability**: Single source of truth for test configurations
- **Flexibility**: Supports both centralized and classic test naming approaches

### 🔧 Advanced Table Manipulation
- Dynamic column verification with data-driven loops
- Soft assertion helpers for comprehensive validation
- Complex table sorting and filtering capabilities

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Quick Setup
```bash
npm install
npx playwright install
```

### Running Tests
```bash
npm test                    # Run all tests
npm run test:smoke-qa      # Run smoke tests on QA environment
```

## Technical Highlights

### 📊 Table Data Validation
- **Sum Verification**: Validates that column totals match calculated sums across all rows
- **Dynamic Column Processing**: Uses loops instead of hardcoded verifications for maintainability
- **Soft Assertions**: Collects all validation errors before final assertion

### 🏗️ Architecture Decisions
- **Page Object Model**: Clean separation of concerns with element locators and page actions
- **Data-Driven Testing**: Centralized test data eliminates hardcoded values
- **TypeScript Interfaces**: Strong typing ensures data structure consistency

### ⚡ Performance Optimizations
- Optimized loader waiting with combined selectors
- Efficient element detection and interaction patterns

## Reporting
- Automated HTML reports generated after each test run
- GitHub Pages deployment for online report access
- Screenshots and videos captured on test failures

---

**Professional QA Automation Portfolio Example**  
*Demonstrates advanced Playwright, TypeScript, and test automation best practices*

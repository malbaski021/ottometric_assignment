// The global-setup script in Playwright is executed once before all tests begin. 
// It’s designed for preparing the test environment globally, 
// before any test runs and before any browser context is created.

// This setup file is particularly useful 
// when certain actions need to be done only once per test run, 
// rather than repeating them in each test or beforeAll block.

//EXAMPLES:
// Authenticating once and saving the session state
// Seeding or cleaning test data in a database
// Setting environment variables
// Starting/stopping external services (e.g., test servers)
// Reading configuration or global tokens
// Performing initial API calls to prepare the test environment

//TO USE THIS CLASS, ADD A FUNCTION AND UN-COMMENT IT IN PLATWRIGHT.CONFIG.TS
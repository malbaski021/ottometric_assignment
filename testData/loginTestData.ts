/**
 * Test data for Login/Logout tests
 * Centralized data objects for login scenarios and error messages
 */

export interface ErrorMessages {
    emailRequired: string;
    passwordRequired: string;
}

export interface LoginTestData {
    errorMessages: ErrorMessages;
    testScenarios: {
        loginLogout: string;
        loginWithoutEmail: string;
        loginWithoutPassword: string;
    };
}

export const loginTestData: LoginTestData = {
    errorMessages: {
        emailRequired: 'Email is required, please try again',
        passwordRequired: 'Password is required, please try again'
    },
    testScenarios: {
        loginLogout: '@smoke Verify that user can login and logout',
        loginWithoutEmail: '@smoke Verify that user cant login without email',
        loginWithoutPassword: '@smoke Verify that user cant login without password'
    }
};

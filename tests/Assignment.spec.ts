import { test, prefixed } from '../fixtures/fixtures';
import { DetailsPage } from '../pages/DetailsPage';
import { assignmentTestData } from '../testData';

// NOTE: This file uses classic test naming approach (hardcoded test names)
// Test names are NOT extracted to centralized data, they remain as string literals
// Only test data is pulled from assignmentTestData object
// This demonstrates flexibility - you can combine centralized data with classic test naming

test.beforeEach(async ({ basePage, landingPage, navigationPage }) => {
    const url = await basePage.getPropertyValue('url');
    const username = await basePage.getPropertyValue('username');
    const password = await basePage.getPropertyValue('password');
    await basePage.openBrowser(url);
    await landingPage.loginUser(username, password)
    await navigationPage.verifyUserIsLogedIn();
})

//Check if the sum of values from each row corresponds with the value from the total row (do this for every column in the table).
//Image: Task1.jpg in the root of the project is visual representation of task
test(prefixed('@smoke Test 1 / Login > Camera system VT1 > KPI Senzors > FCM > Lanes'), async ({ navigationPage, kPISensorPage }) => {
    const testData = assignmentTestData.test1;
    
    await navigationPage.clickProgramDropdown();
    await navigationPage.choseProgram(testData.program);
    await navigationPage.verifyProgramIsChosen(testData.program);
    await navigationPage.clickKPIsensor();
    await navigationPage.clickKPIsensorOption(testData.kpiOption.category, testData.kpiOption.option);
    await kPISensorPage.verifyKPISensorPageIsOpened('lanes');

    // Loop through all columns to verify instead of hardcoding each verification
    for (const columnData of testData.columnsToVerify) {
        for (const option of columnData.options) {
            await kPISensorPage.verifyTotalSumOfColumn(columnData.column, option);
        }
    }
    await kPISensorPage.finalAssert();
})

// Open the first seven DTIDs and count the FN events in the timeline.
//Image: Task2.jpg and Task3.jpg in the root of the project are visual representation of task
test(prefixed('@smoke Test 2 / Login > Camera System VI1 > KPI Feature > ISA > Zone1'), async ({ context, navigationPage, kPIFeaturePage }) => {
    const testData = assignmentTestData.test2;
    
    await navigationPage.clickProgramDropdown();
    await navigationPage.choseProgram(testData.program);
    await navigationPage.verifyProgramIsChosen(testData.program);
    await navigationPage.clickKPIfeature();
    await navigationPage.clickKPIfeatureOption(testData.kpiFeature.category, testData.kpiFeature.option);
    await kPIFeaturePage.verifyKPIFeaturePageIsOpened('zone1');
    await kPIFeaturePage.sortTableValuesBy(testData.sortColumn, testData.sortOption);
    await kPIFeaturePage.verifyTableIsSorted(testData.sortColumn, testData.sortOption);
    await kPIFeaturePage.selectFirstNthDTIDs(testData.amount);
    //new tab is opened so we need newPage to pass for test to continue
    const newPage = await kPIFeaturePage.clickSeeDetailsButton(context);
    const detailsPage = new DetailsPage(newPage);
    await detailsPage.verifyDetailsPageIsOpened('Zone1');
    const count = await detailsPage.countEventsFromTimeLine(testData.eventName);
    console.log(`Count for first ${testData.amount} DTIDs in timeline for ${testData.eventName} is: ${count}`);
})

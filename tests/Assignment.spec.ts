import { test, prefixed } from '../fixtures/fixtures';

test.beforeEach(async ({ basePage, landingPage, navigationPage }) => {
    const url = await basePage.getPropertyValue('url');
    const username = await basePage.getPropertyValue('username');
    const password = await basePage.getPropertyValue('password');
    await basePage.openBrowser(url);
    await landingPage.loginUser(username, password)
    await navigationPage.verifyUserIsLogedIn();
})

//Check if the sum of values from each row corresponds with the value from the total row (do this for every column in the table).
test(prefixed('@smoke Test 1 / Login > Camera system VT1 > KPI Senzors > FCM > Lanes'), async ({ navigationPage, kPISensorPage }) => {
    await navigationPage.clickProgramDropdown();
    await navigationPage.choseProgram('Camera System VT1');
    await navigationPage.verifyProgramIsChosen('Camera System VT1');
    await navigationPage.clickKPIsensor();
    await navigationPage.clickKPIsensorOption('FCM', 'Lanes');
    await kPISensorPage.verifyKPISensorPageIsOpened('lanes');

    await kPISensorPage.verifyTotalSumOfColumn('Lane Present', 'EGO Left');
    await kPISensorPage.verifyTotalSumOfColumn('Lane Present', 'EGO Right');

    await kPISensorPage.verifyTotalSumOfColumn('Lateral Position 30m', 'EGO Left');
    await kPISensorPage.verifyTotalSumOfColumn('Lateral Position 30m', 'EGO Right');

    await kPISensorPage.verifyTotalSumOfColumn('Lateral Position 60m', 'EGO Left');
    await kPISensorPage.verifyTotalSumOfColumn('Lateral Position 60m', 'EGO Right');

    await kPISensorPage.verifyTotalSumOfColumn('Lateral Position Conical', 'EGO Left');
    await kPISensorPage.verifyTotalSumOfColumn('Lateral Position Conical', 'EGO Right');

    await kPISensorPage.verifyTotalSumOfColumn('Type Classification Rate', 'EGO Left');
    await kPISensorPage.verifyTotalSumOfColumn('Type Classification Rate', 'EGO Right');

    await kPISensorPage.verifyTotalSumOfColumn('Color Host Lane Boundaries White', 'EGO Left');
    await kPISensorPage.verifyTotalSumOfColumn('Color Host Lane Boundaries White', 'EGO Right');

    await kPISensorPage.verifyTotalSumOfColumn('Color Host Lane Boundaries Yellow', 'EGO Left');
    await kPISensorPage.verifyTotalSumOfColumn('Color Host Lane Boundaries Yellow', 'EGO Right');

    await kPISensorPage.finalAssert();
})

// Open the first seven DTIDs and count the FN events in the timeline.
test(prefixed('@smoke Test 2 / Login > Camera System VI1 > KPI Feature > ISA > Zone1'), async ({ navigationPage, kPIFeaturePage }) => {
    await navigationPage.clickProgramDropdown();
    await navigationPage.choseProgram('Camera System VI1');
    await navigationPage.verifyProgramIsChosen('Camera System VI1');
    await navigationPage.clickKPIfeature();
    await navigationPage.clickKPIfeatureOption('ISA', 'Zone1');
    await kPIFeaturePage.verifyKPIFeaturePageIsOpened('zone1');
    await kPIFeaturePage.sortTableValuesBy('Zone1', 'FALSE');
    await kPIFeaturePage.verifyTableIsSorted('Zone1', 'FALSE');
    const eventCount = await kPIFeaturePage.collectEventsFromFirstNthDTIDs(7);
    console.log(`Event count for first 7 DTIDs sorted by FALSE is: ${eventCount}`);
})

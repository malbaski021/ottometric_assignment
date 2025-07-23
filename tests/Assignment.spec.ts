import { test, prefixed } from '../fixtures/fixtures';
import { DetailsPage } from '../pages/DetailsPage';


// Posle izvrsenog Run-a se moze pronaci na https://malbaski021.github.io/ottometric_assignment/


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
// U ovom testu dobijam ove rezultate, ne znam da li mozda postoji neka dozvoljena tolerancija ili je mozda drugacije zaokruzivanje na sajtu 
// Lane Present >> EGO Left: Expected average: 87.5, but got 88
// Lane Present >> EGO Right: Expected average: 82.4, but got 82.3
// Lateral Position 60m >> EGO Right: Expected average: 99.9, but got 100
// Type Classification Rate >> EGO Left: Expected average: 81.5, but got 81.9
// Type Classification Rate >> EGO Right: Expected average: 77, but got 76.9
// Color Host Lane Boundaries White >> EGO Left: Expected average: 93.1, but got 93.2
// Color Host Lane Boundaries White >> EGO Right: Expected average: 89.3, but got 89.1
})

// Open the first seven DTIDs and count the FN events in the timeline.
test(prefixed('@smoke Test 2 / Login > Camera System VI1 > KPI Feature > ISA > Zone1'), async ({ context, navigationPage, kPIFeaturePage }) => {
    const amount = 7;
    const eventName = 'FN';
    await navigationPage.clickProgramDropdown();
    await navigationPage.choseProgram('Camera System VI1');
    await navigationPage.verifyProgramIsChosen('Camera System VI1');
    await navigationPage.clickKPIfeature();
    await navigationPage.clickKPIfeatureOption('ISA', 'Zone1');
    await kPIFeaturePage.verifyKPIFeaturePageIsOpened('zone1');
    await kPIFeaturePage.sortTableValuesBy('Zone1', 'FALSE');
    await kPIFeaturePage.verifyTableIsSorted('Zone1', 'FALSE');
    await kPIFeaturePage.selectFirstNthDTIDs(amount);
    //new tab is opened so we need newPage to pass for test to continue
    const newPage = await kPIFeaturePage.clickSeeDetailsButton(context);
    const detailsPage = new DetailsPage(newPage);
    await detailsPage.verifyDetailsPageIsOpened('Zone1');
    const count = await detailsPage.countEventsFromTimeLine(eventName);
    console.log(`Count for first ${amount} DTIDs in timeline for ${eventName} is: ${count}`);
})

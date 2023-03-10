import { byId, click, getLogger, log, login, logResults, setText, waitForElementVisible } from '../helpers.cafe';

const email = 'nightwatch@solidstategroup.com';
const password = 'str0ngp4ssw0rd!';
const logger = getLogger();

fixture`Project Tests`
    .page`http://localhost:3000/`
    .requestHooks(logger);

test('Project Test', async () => {
    log('Login', 'Project Test');
    await login(email, password);
    await click('#project-select-0');
    log('Edit Project', 'Project Test');
    await click('#project-settings-link');
    await setText("[name='proj-name']", 'Test Project');
    await click('#save-proj-btn');
    await waitForElementVisible(byId('switch-project-test project-active'));
}).after(async (t) => {
    console.log('Start of Project Requests');
    await logResults(logger.requests);
    console.log('End of Project Errors');
});

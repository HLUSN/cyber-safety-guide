const { Builder, By, until } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');

// Jest timeout for the entire test suite.
// Set to a generous value (e.g., 60 seconds) to account for browser startup.
jest.setTimeout(60000); 

describe("UI Test - Add Task", () => {
  let driver;

  beforeAll(async () => {
    // Build the WebDriver with a specific browser.
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000"); // Navigate to the frontend
  });

  afterAll(async () => {
    // Ensure the browser window is closed after all tests are done.
    if (driver) {
      await driver.quit();
    }
  });

  test("adds a task through UI", async () => {
    // Define the timeout for this specific test case.
    jest.setTimeout(25000); 

    const input = await driver.findElement(By.css("input[placeholder='Enter task']"));
    await input.sendKeys("Learn Selenium");

    const addButton = await driver.findElement(By.xpath("//button[contains(text(),'Add')]"));
    await addButton.click();

    const task = await driver.wait(until.elementLocated(By.xpath("//*[text()='Learn Selenium']")), 10000);
    expect(await task.getText()).toBe("Learn Selenium");
  });
});
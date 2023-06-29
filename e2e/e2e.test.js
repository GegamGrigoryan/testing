import puppetteer, { Page } from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000); // default puppeteer timeout

describe("Credit Card Validator form", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeEach(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  test("BTN/Valid/Green", async () => {
    await page.goto(baseUrl);

    const input = await page.$(".input");
    let btn = await page.$(".btn");
    await input.type("4111111111111111");
    await btn.click();

    let valueText = await page.$eval(".btn", (el) => el.innerText);
    let color = await page.$eval(".btn", (el) => el.style.backgroundColor);
    await expect(valueText).toEqual("Valid");
    await expect(color).toEqual("green");
  });

  test("BTN/inValid/Red", async () => {
    await page.goto(baseUrl);

    const input = await page.$(".input");
    let btn = await page.$(".btn");
    await input.type("9111111111111111");
    await btn.click();

    let valueText = await page.$eval(".btn", (el) => el.innerText);
    let color = await page.$eval(".btn", (el) => el.style.backgroundColor);
    await expect(valueText).toEqual("InValid");
    await expect(color).toEqual("red");
  });

  test("Visa/Mask", async () => {
    await page.goto(baseUrl);
    const input = await page.$(".input");
    const img = await page.$(".visa");
    await input.type("41");
    let mask = await page.$eval(".visa", (el) => {
      if (el.classList.contains("mask")) {
        return false;
      } else {
        return true;
      }
    });
    await expect(mask).toEqual(true);
  });

  test("Amex/Mask", async () => {
    await page.goto(baseUrl);
    const input = await page.$(".input");
    const img = await page.$(".amex");
    await input.type("34");
    let mask = await page.$eval(".amex", (el) => {
      if (el.classList.contains("mask")) {
        console.log(el.style.opacity);
        return false;
      } else {
        return true;
      }
    });
    await expect(mask).toEqual(true);
  });
  test(".dinners/Mask", async () => {
    await page.goto(baseUrl);
    const input = await page.$(".input");
    const img = await page.$(".dinners");
    await input.type("36");
    let mask = await page.$eval(".dinners", (el) => {
      if (el.classList.contains("mask")) {
        return false;
      } else {
        return true;
      }
    });
    await expect(mask).toEqual(true);
  });
  test(".mir/Mask", async () => {
    await page.goto(baseUrl);
    const input = await page.$(".input");
    const img = await page.$(".mir");
    await input.type("2200");
    let mask = await page.$eval(".mir", (el) => {
      if (el.classList.contains("mask")) {
        return false;
      } else {
        return true;
      }
    });
    await expect(mask).toEqual(true);
  });
  test(".jsb/Mask", async () => {
    await page.goto(baseUrl);
    const input = await page.$(".input");
    const img = await page.$(".jsb");
    await input.type("5428");
    let mask = await page.$eval(".jsb", (el) => {
      if (el.classList.contains("mask")) {
        return false;
      } else {
        return true;
      }
    });
    await expect(mask).toEqual(true);
  });

  test(".mastercard/Mask", async () => {
    await page.goto(baseUrl);
    const input = await page.$(".input");
    const img = await page.$(".mastercard");
    await input.type("51");
    let mask = await page.$eval(".mastercard", (el) => {
      if (el.classList.contains("mask")) {
        return false;
      } else {
        return true;
      }
    });
    await expect(mask).toEqual(true);
  });
  afterEach(async () => {
    await browser.close();
    server.kill();
  });
});

import puppeteer from "puppeteer";

export const getTournamentInfo = async () => {
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();

    const url = "https://liquipedia.net/dota2/Dota_Pro_Circuit/2017-18";
    await page.goto(url, { waitUntil: "load" });

    const newPage = await page.evaluate(() => {
      const elements = Array.prototype.slice.call(
        document.getElementsByClassName("divRow")
      );

      //return elements[0].children[0].children[1].children[0].href

      // @ts-ignore
      return elements.map((e) => {
        // const child = e.children[0];
        return {
          name: e.children[0].innerText.trim(),
          link: e.children[0].children[1].children[0].href,
          date: e.children[1].innerText
        };
      });
    });
    browser.close();
    return newPage;
  } catch (err) {
    console.log("ERROR FROM REQDPC1718");
    console.log(err);
    return null;
  }
};

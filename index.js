const express = require('express')
const path = require('path')
const lighthouse = require('lighthouse');
const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');

const PORT = process.env.PORT || 5001

const runLighthouse = async (url) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const wsEndpoint = browser.wsEndpoint();
    const { port } = new URL(wsEndpoint);

    const options = {
      logLevel: 'info',
      output: 'json',
      maxWaitForLoad: 50000,
      port: port,
    };

    const runnerResult = await lighthouse(url, options);

    const report =
      typeof runnerResult.report !== 'string' ? JSON.stringify(runnerResult.report, null, 2) : runnerResult.report;

    if (!runnerResult || !report) {
      throw new Error('Lighthouse did not return a valid report');
    }

    const results = runnerResult.lhr;
    await browser.close();
    return { results };
  } catch (error) {
    console.error('Error running Lighthouse:', error);
    if (browser) {
      await browser.close();
    }
    throw error;
  }
};

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/fullhouse', async (req, res) => {
  //const { url } = req.query;
    const url = 'https://www.fullstory.com'

  if (!url) {
    console.error('URL is required');
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    console.log(`Running Lighthouse for URL: ${url}`);
    const { results } = await runLighthouse(url);

    console.log('Sending results:', results);

    return res.status(200).json({ results });
  } catch (error) {
    console.error('Error in serverless handler:', error);
    return res.status(500).json({ error: error.message });
  }
})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

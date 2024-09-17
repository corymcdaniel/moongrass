const express = require('express')
const path = require('path')
const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');
const fsReport = require('./db/fs-run.json')
const fullhouseReport = require('./db/fullhouse.json');

const PORT = process.env.PORT || 5001
let reportDB = {};
let report;

// const runLighthouse = async (url) => {
//   return {report: fsReport};
// }

const runLighthouse = async (url) => {
  //return {report: fsReport};
  const { default: lighthouse } = await import('lighthouse');
  const autoconfigure = (await import('./tools/temp/main-config.mjs')).default;

  let browser;
  try {
    //await chromium.executablePath(
    //         "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    //       )
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
    console.log('loading browser....')
    console.log(options);

    const runnerResult = await lighthouse(url, options, autoconfigure);
    console.log('retrieved report....');
    console.log(typeof runnerResult.report)
    report = runnerResult.report;

    if (!runnerResult || !report) {
      throw new Error('Lighthouse did not return a valid report');
    }

    const results = runnerResult.lhr;
    await browser.close();
    // just return the json report in full:
    return report;
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
    const { url } = req.query;
    //const url = 'https://www.fullstory.com'
    console.log('starting....')

  if (!url) {
    console.error('URL is required');
    return res.status(400).json({ error: 'URL is required' });
  }

  //check database:
  if (reportDB[url]) {
    console.log(`sending stored report for ${url}`)
    return res.status(200).json(reportDB[url]);
  }

  try {
    console.log(`Running Lighthouse for URL: ${url}`);
    const newReport = await runLighthouse(url);

    console.log('Storing and sending results');
    reportDB[url] = newReport;

    return res.status(200).json(newReport);
  } catch (error) {
    console.error('Error in serverless handler:', error);
    return res.status(500).json({ error: error.message });
  }
})
  .get('/report', async (req,res) => {
    return res.status(200).json(fsReport)
  })
  .get('/fhreport', async (req,res) => {
    return res.status(200).json(fullhouseReport)
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');
const fsReport = require('./db/fs-run.json');
const fullhouseReport = require('./db/fullhouse.json');

const PORT = process.env.PORT || 5001;
let mappedReportDB = {};
let mappedReport;

// const runLighthouse = async (url) => {
//   return {report: fsReport};
// }

const performance = (results) => {
  /*
  'engagement-and-retention',
    'user-frustration-mitigation',
    'practices-and-efficiency',
   */
  const enr = (results.categories?.['engagement-and-retention']?.score || 0) * 0.3;
  const ufm = (results.categories?.['user-frustration-mitigation']?.score || 0) * 0.5;
  const pne = (results.categories?.['practices-and-efficiency']?.score || 0) * 0.2;
  return enr + ufm + pne;
};

const security = (results) => results.categories?.['security-and-trust']?.score || 0;

const seo = (results) => results.categories?.seo?.score || 0;

const dataRichness = (results) => results.categories?.['data-richness']?.score || 0;

const mapResultsToResponse = (results) => {
  if (!results || !results.categories) {
    console.log(`Could not find results...`);
    return null;
  }

  const response = {
    categories: [
      { performance: performance(results) },
      { 'best-practices': security(results) },
      { seo: seo(results) },
      { accessibility: dataRichness(results) },
    ],
  };

  console.log(`Sending score results: ${response}`);
  return response;
};

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
    console.log('loading browser....');
    console.log(options);

    const runnerResult = await lighthouse(url, options, autoconfigure);
    console.log('retrieved report....');
    console.log(typeof runnerResult.report);
    const report = runnerResult.report;

    if (!runnerResult || !report) {
      throw new Error('Lighthouse did not return a valid report');
    }

    //const results = runnerResult.lhr;
    await browser.close();
    // just return the json report in full:
    try {
      mappedReport = mapResultsToResponse(report);
    } catch (e) {
      if (browser) await browser.close();
      console.log(`Error mapping: ${url}`);
      console.error(e);
    }
    return mappedReport;
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
    console.log(`starting for ${url}....`);

    if (!url) {
      console.error('URL is required');
      return res.status(400).json({ error: 'URL is required' });
    }

    //check database:
    let keys = [];
    for (let key in mappedReportDB) {
      keys.push(key);
    }
    console.log(`keys: ${keys}`);
    if (mappedReportDB[url]) {
      console.log(`sending stored report for ${url}`);
      return res.status(200).json(mappedReportDB[url]);
    }

    try {
      console.log(`Running Lighthouse for URL: ${url}`);
      const newReport = await runLighthouse(url);

      console.log('Storing and sending results');
      mappedReportDB[url] = newReport;

      return res.status(200).json(newReport);
    } catch (error) {
      console.error('Error in serverless handler:', error);
      return res.status(500).json({ error: error.message });
    }
  })
  .get('/report', async (req, res) => {
    return res.status(200).json(fsReport);
  })
  .get('/fhreport', async (req, res) => {
    return res.status(200).json(fullhouseReport);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

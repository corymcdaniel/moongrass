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

export default (results) => {
  if (!results || !results.categories) return null;

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

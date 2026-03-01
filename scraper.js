const { chromium } = require('playwright');

async function scrapeSums() {
  const browser = await chromium.launch({ headless: true });
  let grandTotal = 0;
  
  const urls = [
    'https://sanand0.github.io/tdsdata/js_table/?seed=70',
    'https://sanand0.github.io/tdsdata/js_table/?seed=71',
    'https://sanand0.github.io/tdsdata/js_table/?seed=72',
    'https://sanand0.github.io/tdsdata/js_table/?seed=73',
    'https://sanand0.github.io/tdsdata/js_table/?seed=74',
    'https://sanand0.github.io/tdsdata/js_table/?seed=75',
    'https://sanand0.github.io/tdsdata/js_table/?seed=76',
    'https://sanand0.github.io/tdsdata/js_table/?seed=77',
    'https://sanand0.github.io/tdsdata/js_table/?seed=78',
    'https://sanand0.github.io/tdsdata/js_table/?seed=79'
  ];

  for (const url of urls) {
    console.log(`Scraping: ${url}`);
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Wait for tables to load (dynamic content)
    await page.waitForSelector('table');
    
    // Find all table cells with numbers
    const numbers = await page.evaluate(() => {
      const nums = [];
      document.querySelectorAll('table td, table th').forEach(cell => {
        const text = cell.textContent.trim();
        const num = parseFloat(text);
        if (!isNaN(num)) nums.push(num);
      });
      return nums;
    });
    
    const pageSum = numbers.reduce((a, b) => a + b, 0);
    grandTotal += pageSum;
    console.log(`Page sum: ${pageSum.toFixed(2)}`);
    
    await page.close();
  }
  
  await browser.close();
  console.log(`🎉 GRAND TOTAL: ${grandTotal.toFixed(2)}`);
  return grandTotal;
}

scrapeSums();

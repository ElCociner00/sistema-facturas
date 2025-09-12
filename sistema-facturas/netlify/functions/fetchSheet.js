// Formato 100% compatible con Netlify
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    console.log('Fetching Google Sheets data...');
    
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRBrazhlZ91OI-rcjqCCefnYmrOKm-pnqVqTGYhl1r_VnjS3u1PzdhnMT2GEKo0QPMXxXY84hcb_Eno/pub?output=csv');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.text();
    console.log('Data fetched successfully');
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/csv; charset=utf-8'
      },
      body: data
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: 'Failed to fetch data',
        message: error.message 
      })
    };
  }
};
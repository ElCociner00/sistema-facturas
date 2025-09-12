// Función serverless simplificada sin dependencias externas
exports.handler = async function(event, context) {
  try {
    // URL de tu Google Sheet
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRBrazhlZ91OI-rcjqCCefnYmrOKm-pnqVqTGYhl1r_VnjS3u1PzdhnMT2GEKo0QPMXxXY84hcb_Eno/pub?output=csv';
    
    // Usamos fetch nativo de Node.js (disponible en Node.js 18+)
    const response = await fetch(sheetUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.text();
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/csv; charset=utf-8',
        'Cache-Control': 'no-cache'
      },
      body: data
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: 'Failed to fetch data from Google Sheets',
        message: error.message 
      })
    };
  }
};
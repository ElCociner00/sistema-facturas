const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    try {
        const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRBrazhlZ91OI-rcjqCCefnYmrOKm-pnqVqTGYhl1r_VnjS3u1PzdhnMT2GEKo0QPMXxXY84hcb_Eno/pub?output=csv';
        
        const response = await fetch(sheetUrl);
        const data = await response.text();
        
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/csv; charset=utf-8'
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
            body: JSON.stringify({ error: 'Failed to fetch data' })
        };
    }
};
// Edge Function moderna - TypeScript
export default async (request: Request) => {
  try {
    const response = await fetch(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vRBrazhlZ91OI-rcjqCCefnYmrOKm-pnqVqTGYhl1r_VnjS3u1PzdhnMT2GEKo0QPMXxXY84hcb_Eno/pub?output=csv'
    );

    if (!response.ok) {
      return new Response('Failed to fetch data', { status: response.status });
    }

    const data = await response.text();
    
    return new Response(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/csv; charset=utf-8',
      },
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};

// Configuración para Netlify Edge Functions
export const config = {
  path: '/api/fetchSheet',
};
interface NewsLink {
  title: string;
  author: string;
  source: string;
  url: string;
  time: string;
  category: string;
  paywall: boolean;
}

export async function fetchNewsFromSheets(): Promise<NewsLink[]> {
  try {
    // Replace with your actual Google Sheets URL
    // Format: https://docs.google.com/spreadsheets/d/SHEET_ID/edit#gid=0
    // API URL: https://sheets.googleapis.com/v4/spreadsheets/SHEET_ID/values/Sheet1!A2:G?key=API_KEY
    
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
    
    if (!SHEET_ID || !API_KEY) {
      console.warn('Google Sheets credentials not configured, using fallback data');
      return getFallbackNews();
    }

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A2:G?key=${API_KEY}`,
      { 
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Google Sheets');
    }

    const data = await response.json();
    
    return data.values?.map((row: string[]) => ({
      title: row[0] || '',
      author: row[1] || '',
      source: row[2] || '',
      url: row[3] || '#',
      time: row[4] || '',
      category: row[5] || 'General',
      paywall: row[6]?.toLowerCase() === 'true' || false
    })) || [];

  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    return getFallbackNews();
  }
}

function getFallbackNews(): NewsLink[] {
  return [
    {
      title: "Los desafíos de Jara para romper su techo electoral",
      author: "Francisca Castillo",
      source: "El Mostrador",
      url: "https://www.elmostrador.cl/politica/2025/08/06/los-desafios-de-jara-para-romper-su-techo-electoral/",
      time: "Hace 1 hora",
      category: "Análisis",
      paywall: false
    },
    {
      title: "Dupla Sutil-Coloma hace fuerte reestructuración de la campaña de Matthei bajo el lema 'Levantar Chile'",
      author: "Equipo Ex-Ante",
      source: "Ex-Ante",
      url: "https://www.ex-ante.cl/dupla-sutil-coloma-hace-fuerte-reestructuracion-de-la-campana-de-matthei-bajo-el-lema-levantar-chile/",
      time: "Hace 1 hora",
      category: "Campaña",
      paywall: false
    },
    {
      title: "La candidata que no se quiere encasillar",
      author: "Columnista",
      source: "El Líbero",
      url: "https://ellibero.cl/columnas-de-opinion/la-candidata-que-no-se-quiere-encasillar/",
      time: "Hace 2 horas",
      category: "Opinión",
      paywall: false
    },
    {
      title: "El tabú en las presidenciales: la posibilidad de que Franco Parisi pase a segunda vuelta",
      author: "Redacción",
      source: "Interferencia",
      url: "https://interferencia.cl/articulos/el-tabu-en-las-presidenciales-la-posibilidad-de-que-franco-parisi-pase-segunda-vuelta",
      time: "Hace 3 horas",
      category: "Análisis",
      paywall: false
    },
    {
      title: "Análisis: Las claves del debate presidencial y su impacto en las encuestas",
      author: "María José Hoffmann",
      source: "La Tercera",
      url: "#",
      time: "Hace 4 horas",
      category: "Análisis",
      paywall: true
    },
    {
      title: "Encuesta Cadem: Boric mantiene ventaja pero se estrecha la diferencia",
      author: "Carlos Peña",
      source: "Emol",
      url: "#",
      time: "Hace 5 horas",
      category: "Encuestas",
      paywall: false
    },
    {
      title: "Kast presenta nueva propuesta económica para enfrentar la inflación",
      author: "Rodrigo Álvarez",
      source: "El Mercurio",
      url: "#",
      time: "Hace 6 horas",
      category: "Economía",
      paywall: true
    },
    {
      title: "Provoste critica falta de propuestas concretas en seguridad ciudadana",
      author: "Andrea Parra",
      source: "CNN Chile",
      url: "#",
      time: "Hace 8 horas",
      category: "Seguridad",
      paywall: false
    },
    {
      title: "Sichel busca diferenciarse con propuesta de reforma tributaria",
      author: "Luis Cordero",
      source: "Radio Cooperativa",
      url: "#",
      time: "Hace 10 horas",
      category: "Economía",
      paywall: false
    },
    {
      title: "Expertos analizan el impacto de las redes sociales en la campaña",
      author: "Javiera Olivares",
      source: "Ciper Chile",
      url: "#",
      time: "Hace 12 horas",
      category: "Tecnología",
      paywall: false
    }
  ];
}

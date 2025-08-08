import { promises as fs } from 'fs';
import path from 'path';

export interface NewsLink {
  id: string;
  title: string;
  author: string;
  source: string;
  url: string;
  time: string;
  category: string;
  paywall: boolean;
  createdAt: string;
}

const DB_PATH = path.join(process.cwd(), 'data', 'news.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Get all news links
export async function getAllNews(): Promise<NewsLink[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return default data
    return getDefaultNews();
  }
}

// Save news links
async function saveNews(news: NewsLink[]) {
  await ensureDataDir();
  await fs.writeFile(DB_PATH, JSON.stringify(news, null, 2));
}

// Add new news link
export async function addNews(newsData: Omit<NewsLink, 'id' | 'createdAt'>): Promise<NewsLink> {
  const news = await getAllNews();
  const newNews: NewsLink = {
    ...newsData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  
  news.unshift(newNews); // Add to beginning
  await saveNews(news);
  return newNews;
}

// Update news link
export async function updateNews(id: string, updates: Partial<NewsLink>): Promise<NewsLink | null> {
  const news = await getAllNews();
  const index = news.findIndex(n => n.id === id);
  
  if (index === -1) return null;
  
  news[index] = { ...news[index], ...updates };
  await saveNews(news);
  return news[index];
}

// Delete news link
export async function deleteNews(id: string): Promise<boolean> {
  const news = await getAllNews();
  const filteredNews = news.filter(n => n.id !== id);
  
  if (filteredNews.length === news.length) return false;
  
  await saveNews(filteredNews);
  return true;
}

// Default news data
function getDefaultNews(): NewsLink[] {
  return [
    {
      id: '1',
      title: "Los desafíos de Jara para romper su techo electoral",
      author: "Francisca Castillo",
      source: "El Mostrador",
      url: "https://www.elmostrador.cl/politica/2025/08/06/los-desafios-de-jara-para-romper-su-techo-electoral/",
      time: "Hace 1 hora",
      category: "Análisis",
      paywall: false,
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      title: "Dupla Sutil-Coloma hace fuerte reestructuración de la campaña de Matthei bajo el lema 'Levantar Chile'",
      author: "Equipo Ex-Ante",
      source: "Ex-Ante",
      url: "https://www.ex-ante.cl/dupla-sutil-coloma-hace-fuerte-reestructuracion-de-la-campana-de-matthei-bajo-el-lema-levantar-chile/",
      time: "Hace 1 hora",
      category: "Campaña",
      paywall: false,
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      title: "La candidata que no se quiere encasillar",
      author: "Columnista",
      source: "El Líbero",
      url: "https://ellibero.cl/columnas-de-opinion/la-candidata-que-no-se-quiere-encasillar/",
      time: "Hace 2 horas",
      category: "Opinión",
      paywall: false,
      createdAt: new Date().toISOString()
    },
    {
      id: '4',
      title: "El tabú en las presidenciales: la posibilidad de que Franco Parisi pase a segunda vuelta",
      author: "Redacción",
      source: "Interferencia",
      url: "https://interferencia.cl/articulos/el-tabu-en-las-presidenciales-la-posibilidad-de-que-franco-parisi-pase-segunda-vuelta",
      time: "Hace 3 horas",
      category: "Análisis",
      paywall: false,
      createdAt: new Date().toISOString()
    },
    {
      id: '5',
      title: "Análisis: Las claves del debate presidencial y su impacto en las encuestas",
      author: "María José Hoffmann",
      source: "La Tercera",
      url: "#",
      time: "Hace 4 horas",
      category: "Análisis",
      paywall: true,
      createdAt: new Date().toISOString()
    }
  ];
}

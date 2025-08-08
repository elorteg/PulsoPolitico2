import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, TrendingUp, Calendar, Lock, Menu, ChevronDown, ChevronUp } from 'lucide-react'
import Link from "next/link"

// Simple data fetching function
async function getNewsData() {
  const SHEET_ID = process.env.GOOGLE_SHEET_ID;
  const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

  if (!SHEET_ID || !API_KEY) {
    return getFallbackNews();
  }

  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Recomendados!A2:G20?key=${API_KEY}`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) throw new Error('Failed to fetch');

    const data = await response.json();
    
    return data.values?.map((row: string[]) => ({
      title: row[0] || '',
      author: row[1] || '',
      source: row[2] || '',
      url: row[3] || '#',
      time: row[4] || '',
      category: row[5] || 'General',
      paywall: row[6]?.toLowerCase() === 'true'
    })).filter((item: any) => item.title) || getFallbackNews();

  } catch (error) {
    console.error('Google Sheets error:', error);
    return getFallbackNews();
  }
}

function getFallbackNews() {
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
    }
  ];
}

export default async function HomePage() {
  const newsLinks = await getNewsData();

  const calculateDaysUntilElection = () => {
    const electionDate = new Date('2025-11-16');
    const today = new Date();
    const diffTime = electionDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilElection = calculateDaysUntilElection();

  const pollAverage = [
    { candidate: "Gabriel Boric", party: "Frente Amplio", percentage: 38.2, change: +1.2, color: "bg-red-500" },
    { candidate: "José Antonio Kast", party: "Partido Republicano", percentage: 32.7, change: -0.8, color: "bg-blue-600" },
    { candidate: "Evelyn Matthei", party: "UDI", percentage: 15.4, change: +2.1, color: "bg-purple-600" },
    { candidate: "Yasna Provoste", party: "Partido Socialista", percentage: 8.4, change: -0.3, color: "bg-green-600" },
    { candidate: "Franco Parisi", party: "Partido de la Gente", percentage: 5.3, change: +0.5, color: "bg-orange-500" }
  ]

  const recentPolls = [
    { pollster: "Cadem", date: "13-15 Ene", boric: 39, kast: 33, matthei: 16, provoste: 8, parisi: 4 },
    { pollster: "Criteria", date: "10-12 Ene", boric: 38, kast: 32, matthei: 15, provoste: 9, parisi: 6 },
    { pollster: "Activa Research", date: "8-10 Ene", boric: 37, kast: 34, matthei: 15, provoste: 8, parisi: 6 },
    { pollster: "MORI", date: "6-8 Ene", boric: 39, kast: 31, matthei: 16, provoste: 9, parisi: 5 },
    { pollster: "Ipsos", date: "3-5 Ene", boric: 38, kast: 33, matthei: 14, provoste: 8, parisi: 7 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">PN</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Pulso Nacional</h1>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              <Link href="#" className="text-gray-600 hover:text-gray-900 font-medium">Encuestas</Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 font-medium">Noticias</Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 font-medium">Análisis</Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 font-medium">Elecciones</Link>
              <Link href="/admin" className="text-blue-600 hover:text-blue-800 font-medium">Admin</Link>
            </nav>

            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Poll Average */}
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-xl md:text-2xl font-bold text-gray-800">
                        MetaEncuesta
                      </span>
                    </CardTitle>
                    <CardDescription>
                      Elección Presidencial 2025
                    </CardDescription>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="text-lg md:text-2xl font-bold text-red-600">{daysUntilElection}</div>
                    <div className="text-xs text-gray-500">Días hasta Primera Vuelta</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="current" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 text-xs md:text-sm">
                    <TabsTrigger value="current">Promedio Actual</TabsTrigger>
                    <TabsTrigger value="evolution">Evolución</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="current" className="mt-6">
                    <div className="mb-4">
                      <p className="text-xs md:text-sm text-gray-600">Promedio Agregado de Encuestas más recientes (Actualizado: 15 de enero, 2024)</p>
                    </div>
                    <div className="space-y-3 md:space-y-4">
                      {pollAverage.map((candidate, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 md:gap-3">
                              <div className={`w-3 h-3 md:w-4 md:h-4 rounded ${candidate.color}`}></div>
                              <div>
                                <span className="font-semibold text-sm md:text-base">{candidate.candidate}</span>
                                <span className="text-xs md:text-sm text-gray-500 ml-1 md:ml-2 hidden sm:inline">({candidate.party})</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xl md:text-2xl font-bold">{candidate.percentage}%</span>
                              <Badge variant={candidate.change > 0 ? "default" : "secondary"} className="text-xs">
                                {candidate.change > 0 ? '+' : ''}{candidate.change}%
                              </Badge>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
                            <div 
                              className={`h-2 md:h-3 rounded-full ${candidate.color}`}
                              style={{ width: `${candidate.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="evolution" className="mt-6">
                    <div className="mb-4">
                      <p className="text-xs md:text-sm text-gray-600">Gráfico de evolución próximamente</p>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-8 text-center bg-gray-50">
                      <div className="text-gray-400 mb-4">
                        <TrendingUp className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-2" />
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-gray-600 mb-2">Gráfico de Evolución</h3>
                      <p className="text-xs md:text-sm text-gray-500 mb-4">
                        Próximamente: Gráfico interactivo mostrando la evolución de las encuestas en el tiempo
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Recent Polls Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Encuestas Recientes
                </CardTitle>
                <CardDescription>
                  Desglose detallado de las encuestas más recientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-semibold">Encuestadora</th>
                        <th className="text-left py-2 font-semibold">Fecha</th>
                        <th className="text-center py-2 font-semibold">Boric</th>
                        <th className="text-center py-2 font-semibold">Kast</th>
                        <th className="text-center py-2 font-semibold">Matthei</th>
                        <th className="text-center py-2 font-semibold">Provoste</th>
                        <th className="text-center py-2 font-semibold">Parisi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPolls.map((poll, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-2 font-medium">{poll.pollster}</td>
                          <td className="py-2 text-gray-600">{poll.date}</td>
                          <td className="py-2 text-center font-semibold text-red-600">{poll.boric}%</td>
                          <td className="py-2 text-center font-semibold text-blue-600">{poll.kast}%</td>
                          <td className="py-2 text-center font-semibold text-purple-600">{poll.matthei}%</td>
                          <td className="py-2 text-center font-semibold text-green-600">{poll.provoste}%</td>
                          <td className="py-2 text-center font-semibold text-orange-600">{poll.parisi}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Más Análisis y Opinión
                </CardTitle>
                <CardDescription>
                  Enlaces de interés de todo el espectro político
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">Análisis</Badge>
                  <h4 className="font-medium text-sm leading-tight">
                    "La estrategia de Boric para mantener el liderazgo"
                  </h4>
                  <div className="text-xs text-gray-500">
                    Por Carlos Peña • El Mostrador • Hace 2 horas
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Un análisis sobre las tácticas de campaña del candidato oficialista y cómo busca consolidar su ventaja en las encuestas...
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">Opinión</Badge>
                  <h4 className="font-medium text-sm leading-tight">
                    "El factor Parisi: ¿sorpresa electoral o espejismo?"
                  </h4>
                  <div className="text-xs text-gray-500">
                    Por María Olivia Mönckeberg • La Tercera • Hace 4 horas
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    La candidatura del economista genera expectación, pero ¿tiene realmente posibilidades de llegar a segunda vuelta?
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">Investigación</Badge>
                  <h4 className="font-medium text-sm leading-tight">
                    "Encuestas vs. realidad: lecciones de elecciones pasadas"
                  </h4>
                  <div className="text-xs text-gray-500">
                    Por Axel Callís • Ciper Chile • Hace 6 horas
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Un repaso histórico sobre la precisión de las encuestas en Chile y qué esperar para noviembre...
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Recomendados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {newsLinks.slice(0, 7).map((news, index) => (
                  <div key={index} className="space-y-1">
                    <Link href={news.url} target="_blank" rel="noopener noreferrer" className="block hover:text-blue-600 transition-colors">
                      <h4 className="font-medium text-xs leading-tight flex items-start gap-2">
                        {news.title}
                        {news.paywall && <Lock className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />}
                      </h4>
                    </Link>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span className="text-xs">{news.author}, {news.source}</span>
                      <span className="text-xs">{news.time}</span>
                    </div>
                    {index < Math.min(newsLinks.length, 7) - 1 && <Separator className="mt-2" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Lo más Leído
                </CardTitle>
                <CardDescription className="hidden md:block">
                  Artículos más populares de la semana
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-start gap-2">
                    <span className="text-lg font-bold text-red-600 min-w-[20px]">1</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-xs leading-tight">
                        Encuesta CEP: Boric lidera con 43% de las preferencias
                      </h4>
                      <div className="text-xs text-gray-500 mt-1">
                        El Mercurio • 15.2k lecturas
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-1">
                  <div className="flex items-start gap-2">
                    <span className="text-lg font-bold text-red-600 min-w-[20px]">2</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-xs leading-tight">
                        Kast presenta plan económico para combatir la inflación
                      </h4>
                      <div className="text-xs text-gray-500 mt-1">
                        La Tercera • 12.8k lecturas
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-1">
                  <div className="flex items-start gap-2">
                    <span className="text-lg font-bold text-red-600 min-w-[20px]">3</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-xs leading-tight">
                        Análisis: ¿Puede Provoste llegar a segunda vuelta?
                      </h4>
                      <div className="text-xs text-gray-500 mt-1">
                        CNN Chile • 9.4k lecturas
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

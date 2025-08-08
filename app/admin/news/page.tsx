'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, Edit, Trash2, ExternalLink, Lock, LogOut } from 'lucide-react'
import { NewsLink } from '@/lib/news-db'

export default function AdminNews() {
  const [news, setNews] = useState<NewsLink[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsLink | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    source: '',
    url: '',
    time: '',
    category: 'Análisis',
    paywall: false
  })
  const router = useRouter()

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/admin/news')
      if (response.status === 401) {
        router.push('/admin')
        return
      }
      const data = await response.json()
      setNews(data)
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const method = editingNews ? 'PUT' : 'POST'
      const body = editingNews 
        ? { id: editingNews.id, ...formData }
        : formData

      const response = await fetch('/api/admin/news', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (response.ok) {
        await fetchNews()
        resetForm()
      }
    } catch (error) {
      console.error('Error saving news:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este artículo?')) return

    try {
      const response = await fetch(`/api/admin/news?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchNews()
      }
    } catch (error) {
      console.error('Error deleting news:', error)
    }
  }

  const handleEdit = (newsItem: NewsLink) => {
    setEditingNews(newsItem)
    setFormData({
      title: newsItem.title,
      author: newsItem.author,
      source: newsItem.source,
      url: newsItem.url,
      time: newsItem.time,
      category: newsItem.category,
      paywall: newsItem.paywall
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      source: '',
      url: '',
      time: '',
      category: 'Análisis',
      paywall: false
    })
    setEditingNews(null)
    setShowForm(false)
  }

  const handleLogout = () => {
    document.cookie = 'admin-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    router.push('/admin')
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div>Cargando...</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin - Gestión de Noticias</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  {editingNews ? 'Editar Artículo' : 'Agregar Artículo'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Título</Label>
                    <Textarea
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Título del artículo"
                      required
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="author">Autor</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                      placeholder="Nombre del autor"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="source">Fuente</Label>
                    <Input
                      id="source"
                      value={formData.source}
                      onChange={(e) => setFormData({...formData, source: e.target.value})}
                      placeholder="El Mostrador, La Tercera, etc."
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({...formData, url: e.target.value})}
                      placeholder="https://..."
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="time">Tiempo</Label>
                    <Input
                      id="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      placeholder="Hace 1 hora"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Categoría</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Análisis">Análisis</SelectItem>
                        <SelectItem value="Encuestas">Encuestas</SelectItem>
                        <SelectItem value="Economía">Economía</SelectItem>
                        <SelectItem value="Campaña">Campaña</SelectItem>
                        <SelectItem value="Opinión">Opinión</SelectItem>
                        <SelectItem value="Seguridad">Seguridad</SelectItem>
                        <SelectItem value="Tecnología">Tecnología</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="paywall"
                      checked={formData.paywall}
                      onChange={(e) => setFormData({...formData, paywall: e.target.checked})}
                    />
                    <Label htmlFor="paywall">Artículo con paywall</Label>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      {editingNews ? 'Actualizar' : 'Agregar'}
                    </Button>
                    {(showForm || editingNews) && (
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancelar
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* News List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Artículos Actuales ({news.length})</CardTitle>
                <CardDescription>
                  Gestiona los enlaces de noticias que aparecen en el sitio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {news.map((item, index) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          {item.paywall && <Lock className="w-3 h-3 text-gray-400" />}
                        </div>
                        <h4 className="font-medium text-sm leading-tight mb-1">
                          {item.title}
                        </h4>
                        <div className="text-xs text-gray-500 mb-2">
                          {item.author}, {item.source} • {item.time}
                        </div>
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                        >
                          Ver artículo <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {index < news.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

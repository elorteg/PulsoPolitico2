import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getAllNews, addNews, updateNews, deleteNews } from '@/lib/news-db'

// Check if user is authenticated
function isAuthenticated() {
  const cookieStore = cookies()
  return cookieStore.get('admin-session')?.value === 'authenticated'
}

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const news = await getAllNews()
    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const newsData = await request.json()
    const newNews = await addNews(newsData)
    return NextResponse.json(newNews)
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id, ...updates } = await request.json()
    const updatedNews = await updateNews(id, updates)
    
    if (!updatedNews) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 })
    }
    
    return NextResponse.json(updatedNews)
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }
    
    const deleted = await deleteNews(id)
    
    if (!deleted) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

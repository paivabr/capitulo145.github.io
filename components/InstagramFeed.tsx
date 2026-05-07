'use client'

import { useState, useEffect } from 'react'
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react'
import { InstagramPost } from '@/types'

interface InstagramFeedProps {
  limit?: number
}

export default function InstagramFeed({ limit = 8 }: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchInstagramPosts()
  }, [])

  const fetchInstagramPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/instagram')
      
      if (!response.ok) {
        throw new Error('Falha ao buscar posts do Instagram')
      }
      
      const data = await response.json()
      setPosts(data.data.slice(0, limit))
    } catch (err) {
      console.error('Erro ao buscar posts do Instagram:', err)
      setError('Não foi possível carregar os posts do Instagram')
      
      // Dados mockados para fallback
      setPosts([
        {
          id: '1',
          media_url: 'https://via.placeholder.com/400x400/FFD700/000000?text=Nike+Mercurial',
          caption: 'Novas chuteiras Nike Mercurial já disponíveis! ⚽',
          media_type: 'IMAGE',
          timestamp: new Date().toISOString(),
          permalink: '#'
        },
        {
          id: '2',
          media_url: 'https://via.placeholder.com/400x400/FFA500/000000?text=Camisa+Brasil',
          caption: 'Camisa oficial do Brasil 2024 🇧🇷',
          media_type: 'IMAGE',
          timestamp: new Date().toISOString(),
          permalink: '#'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(limit)].map((_, i) => (
          <div key={i} className="aspect-square bg-gray-800 animate-pulse rounded-lg"></div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <Instagram className="mx-auto text-gray-600 mb-4" size={48} />
        <p className="text-gray-400">{error}</p>
        <button 
          onClick={fetchInstagramPosts}
          className="mt-4 text-yellow-500 hover:text-yellow-400 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {posts.map((post) => (
        <div 
          key={post.id} 
          className="relative group overflow-hidden rounded-lg border border-yellow-600/20 card-hover"
        >
          <div className="aspect-square">
            {post.media_type === 'VIDEO' ? (
              <video
                src={post.media_url}
                className="w-full h-full object-cover"
                muted
                loop
                autoPlay
                playsInline
              />
            ) : (
              <img
                src={post.media_url}
                alt={post.caption || 'Post do Instagram'}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            )}
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {post.caption && (
                <p className="text-white text-sm mb-3 line-clamp-2">
                  {post.caption}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-yellow-500 hover:text-yellow-400 transition-colors text-sm"
                >
                  <ExternalLink size={14} className="mr-1" />
                  Ver no Instagram
                </a>
                
                <div className="flex items-center space-x-3 text-white/80 text-xs">
                  <span className="flex items-center">
                    <Heart size={12} className="mr-1" />
                    {/* Aqui você pode adicionar a contagem de curtidas se disponível */}
                  </span>
                  <span className="flex items-center">
                    <MessageCircle size={12} className="mr-1" />
                    {/* Aqui você pode adicionar a contagem de comentários se disponível */}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ícone de vídeo para posts de vídeo */}
          {post.media_type === 'VIDEO' && (
            <div className="absolute top-2 right-2 bg-black/60 rounded-full p-2">
              <div className="w-0 h-0 border-l-8 border-l-white border-y-4 border-y-transparent"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

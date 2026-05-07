import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { supabaseAdmin } from '@/lib/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Buscar configurações do Instagram do banco de dados
    const { data: settings, error } = await supabaseAdmin
      .from('admin_settings')
      .select('instagram_access_token, instagram_user_id')
      .single()

    if (error || !settings?.instagram_access_token || !settings?.instagram_user_id) {
      console.error('Instagram credentials not configured in database')
      
      // Retornar dados mockados se não estiver configurado
      const mockPosts = [
        {
          id: 'mock_1',
          media_url: 'https://via.placeholder.com/400x400/FFD700/000000?text=Nike+Mercurial',
          caption: 'Novas chuteiras Nike Mercurial já disponíveis! ⚽',
          media_type: 'IMAGE',
          timestamp: new Date().toISOString(),
          permalink: '#'
        },
        {
          id: 'mock_2',
          media_url: 'https://via.placeholder.com/400x400/FFA500/000000?text=Camisa+Brasil',
          caption: 'Camisa oficial do Brasil 2024 🇧🇷',
          media_type: 'IMAGE',
          timestamp: new Date().toISOString(),
          permalink: '#'
        },
        {
          id: 'mock_3',
          media_url: 'https://via.placeholder.com/400x400/B8860B/FFFFFF?text=Adidas+Predator',
          caption: 'Adidas Predator: precisão e potência 🔥',
          media_type: 'IMAGE',
          timestamp: new Date().toISOString(),
          permalink: '#'
        },
        {
          id: 'mock_4',
          media_url: 'https://via.placeholder.com/400x400/FFD700/000000?text=Nike+Phantom',
          caption: 'Nike Phantom: controle total da partida ⚡',
          media_type: 'IMAGE',
          timestamp: new Date().toISOString(),
          permalink: '#'
        }
      ]

      return res.status(200).json({
        success: true,
        data: mockPosts,
        total: mockPosts.length,
        mock: true,
        message: 'Configure as credenciais do Instagram no painel administrativo'
      })
    }

    // Buscar posts do Instagram Basic Display API
    const response = await axios.get(
      `https://graph.instagram.com/${settings.instagram_user_id}/media`,
      {
        params: {
          fields: 'id,media_type,media_url,caption,timestamp,permalink,thumbnail_url',
          access_token: settings.instagram_access_token,
          limit: 20
        }
      }
    )

    const posts = response.data.data || []

    // Formatar os posts
    const formattedPosts = posts.map((post: any) => ({
      id: post.id,
      media_url: post.media_url || post.thumbnail_url,
      caption: post.caption || '',
      media_type: post.media_type,
      timestamp: post.timestamp,
      permalink: post.permalink
    }))

    res.status(200).json({
      success: true,
      data: formattedPosts,
      total: formattedPosts.length
    })

  } catch (error: any) {
    console.error('Error fetching Instagram posts:', error)
    
    // Se houver erro na API, retornar dados mockados para desenvolvimento
    const mockPosts = [
      {
        id: 'mock_1',
        media_url: 'https://via.placeholder.com/400x400/FFD700/000000?text=Nike+Mercurial',
        caption: 'Novas chuteiras Nike Mercurial já disponíveis! ⚽',
        media_type: 'IMAGE',
        timestamp: new Date().toISOString(),
        permalink: '#'
      },
      {
        id: 'mock_2',
        media_url: 'https://via.placeholder.com/400x400/FFA500/000000?text=Camisa+Brasil',
        caption: 'Camisa oficial do Brasil 2024 🇧🇷',
        media_type: 'IMAGE',
        timestamp: new Date().toISOString(),
        permalink: '#'
      },
      {
        id: 'mock_3',
        media_url: 'https://via.placeholder.com/400x400/B8860B/FFFFFF?text=Adidas+Predator',
        caption: 'Adidas Predator: precisão e potência 🔥',
        media_type: 'IMAGE',
        timestamp: new Date().toISOString(),
        permalink: '#'
      },
      {
        id: 'mock_4',
        media_url: 'https://via.placeholder.com/400x400/FFD700/000000?text=Nike+Phantom',
        caption: 'Nike Phantom: controle total da partida ⚡',
        media_type: 'IMAGE',
        timestamp: new Date().toISOString(),
        permalink: '#'
      }
    ]

    res.status(200).json({
      success: true,
      data: mockPosts,
      total: mockPosts.length,
      mock: true // Indica que são dados mockados
    })
  }
}

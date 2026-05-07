import { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '@/lib/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { data: settings, error } = await supabaseAdmin
        .from('admin_settings')
        .select('*')
        .single()

      if (error && error.code !== 'PGRST116') {
        return res.status(500).json({ error: 'Erro ao buscar configurações' })
      }

      // Se não existir, criar configurações padrão
      if (!settings) {
        const { data: newSettings, error: insertError } = await supabaseAdmin
          .from('admin_settings')
          .insert({
            email: 'admin@vjclub.com.br',
            smtp_host: 'smtp.gmail.com',
            smtp_port: 587,
            instagram_username: '@vjclub.oficial'
          })
          .select()
          .single()

        if (insertError) {
          return res.status(500).json({ error: 'Erro ao criar configurações' })
        }

        return res.status(200).json({
          success: true,
          settings: newSettings
        })
      }

      return res.status(200).json({
        success: true,
        settings: settings
      })

    } catch (error) {
      console.error('Erro ao buscar configurações:', error)
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  if (req.method === 'PUT') {
    try {
      const settingsData = req.body

      // Atualizar configurações
      const { data: settings, error } = await supabaseAdmin
        .from('admin_settings')
        .upsert({
          id: '00000000-0000-0000-0000-000000000001', // ID fixo para manter apenas um registro
          ...settingsData,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        console.error('Erro ao atualizar configurações:', error)
        return res.status(500).json({ error: 'Erro ao salvar configurações' })
      }

      return res.status(200).json({
        success: true,
        settings: settings,
        message: 'Configurações atualizadas com sucesso'
      })

    } catch (error) {
      console.error('Erro ao atualizar configurações:', error)
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  res.setHeader('Allow', ['GET', 'PUT'])
  return res.status(405).json({ error: 'Method not allowed' })
}

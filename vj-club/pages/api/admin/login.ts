import { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '@/lib/supabase'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' })
    }

    // Buscar usuário no banco
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !user) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }

    // Verificar se é admin
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Acesso negado' })
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password_hash)
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }

    // Gerar token JWT
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    // Salvar sessão
    await supabaseAdmin
      .from('user_sessions')
      .insert({
        user_id: user.id,
        token_hash: token, // Em produção, fazer hash do token
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 dias
      })

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    console.error('Erro no login:', error)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

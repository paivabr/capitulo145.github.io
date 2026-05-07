import { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '@/lib/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Buscar estatísticas
    const [
      productsResult,
      ordersResult,
      usersResult,
      recentOrdersResult
    ] = await Promise.all([
      // Total de produtos
      supabaseAdmin
        .from('products')
        .select('id', { count: 'exact', head: true }),
      
      // Total de pedidos
      supabaseAdmin
        .from('orders')
        .select('id', { count: 'exact', head: true }),
      
      // Total de usuários
      supabaseAdmin
        .from('users')
        .select('id', { count: 'exact', head: true }),
      
      // Pedidos recentes com informações do usuário
      supabaseAdmin
        .from('orders')
        .select(`
          id,
          total,
          status,
          created_at,
          users!inner(
            name
          )
        `)
        .order('created_at', { ascending: false })
        .limit(10)
    ])

    // Calcular faturamento total (soma de pedidos pagos)
    const { data: revenueData } = await supabaseAdmin
      .from('orders')
      .select('total')
      .eq('status', 'paid')

    const totalRevenue = revenueData?.reduce((sum, order) => sum + order.total, 0) || 0

    const dashboardData = {
      totalProducts: productsResult.count || 0,
      totalOrders: ordersResult.count || 0,
      totalUsers: usersResult.count || 0,
      totalRevenue: totalRevenue,
      recentOrders: recentOrdersResult.data?.map(order => ({
        ...order,
        user_name: order.users?.name || 'Cliente'
      })) || []
    }

    return res.status(200).json(dashboardData)

  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

'use client'

import { useState, useEffect } from 'react'
import { Package, Users, ShoppingCart, TrendingUp, DollarSign } from 'lucide-react'

interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalUsers: number
  totalRevenue: number
  recentOrders: any[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    recentOrders: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900 border border-yellow-600/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total de Produtos</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.totalProducts}</p>
            </div>
            <Package className="text-yellow-500" size={32} />
          </div>
        </div>

        <div className="bg-gray-900 border border-yellow-600/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total de Pedidos</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.totalOrders}</p>
            </div>
            <ShoppingCart className="text-yellow-500" size={32} />
          </div>
        </div>

        <div className="bg-gray-900 border border-yellow-600/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total de Clientes</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.totalUsers}</p>
            </div>
            <Users className="text-yellow-500" size={32} />
          </div>
        </div>

        <div className="bg-gray-900 border border-yellow-600/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Faturamento Total</p>
              <p className="text-3xl font-bold text-white mt-2">
                R$ {stats.totalRevenue.toFixed(2)}
              </p>
            </div>
            <DollarSign className="text-yellow-500" size={32} />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-gray-900 border border-yellow-600/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Pedidos Recentes</h2>
        
        {stats.recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400">ID</th>
                  <th className="text-left py-3 px-4 text-gray-400">Cliente</th>
                  <th className="text-left py-3 px-4 text-gray-400">Total</th>
                  <th className="text-left py-3 px-4 text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 text-gray-400">Data</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-800">
                    <td className="py-3 px-4 text-white">#{order.id.slice(0, 8)}</td>
                    <td className="py-3 px-4 text-white">{order.user_name}</td>
                    <td className="py-3 px-4 text-white">R$ {order.total.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'paid' ? 'bg-green-900 text-green-300' :
                        order.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-gray-700 text-gray-300'
                      }`}>
                        {order.status === 'paid' ? 'Pago' :
                         order.status === 'pending' ? 'Pendente' : order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400">
                      {new Date(order.created_at).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">Nenhum pedido encontrado</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a 
          href="/admin/produtos/novo"
          className="bg-gray-900 border border-yellow-600/20 rounded-lg p-6 hover:border-yellow-500/50 transition-colors block"
        >
          <h3 className="text-lg font-semibold text-white mb-2">Adicionar Produto</h3>
          <p className="text-gray-400">Cadastrar novo produto no catálogo</p>
        </a>

        <a 
          href="/admin/pedidos"
          className="bg-gray-900 border border-yellow-600/20 rounded-lg p-6 hover:border-yellow-500/50 transition-colors block"
        >
          <h3 className="text-lg font-semibold text-white mb-2">Gerenciar Pedidos</h3>
          <p className="text-gray-400">Visualizar e atualizar status dos pedidos</p>
        </a>

        <a 
          href="/admin/configuracoes"
          className="bg-gray-900 border border-yellow-600/20 rounded-lg p-6 hover:border-yellow-500/50 transition-colors block"
        >
          <h3 className="text-lg font-semibold text-white mb-2">Configurações</h3>
          <p className="text-gray-400">Ajustar configurações da loja</p>
        </a>
      </div>
    </div>
  )
}

import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/admin/login')
  }

  // Verificar se é admin
  const { data: user } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single()

  if (user?.role !== 'admin') {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 border-r border-yellow-600/20 min-h-screen">
          <div className="p-6">
            <h2 className="text-2xl font-bold gold-text mb-8">Painel Admin</h2>
            
            <nav className="space-y-2">
              <a href="/admin" className="block px-4 py-3 text-gray-300 hover:text-yellow-500 hover:bg-gray-800 rounded-lg transition-colors">
                Dashboard
              </a>
              <a href="/admin/produtos" className="block px-4 py-3 text-gray-300 hover:text-yellow-500 hover:bg-gray-800 rounded-lg transition-colors">
                Produtos
              </a>
              <a href="/admin/pedidos" className="block px-4 py-3 text-gray-300 hover:text-yellow-500 hover:bg-gray-800 rounded-lg transition-colors">
                Pedidos
              </a>
              <a href="/admin/clientes" className="block px-4 py-3 text-gray-300 hover:text-yellow-500 hover:bg-gray-800 rounded-lg transition-colors">
                Clientes
              </a>
              <a href="/admin/menu" className="block px-4 py-3 text-gray-300 hover:text-yellow-500 hover:bg-gray-800 rounded-lg transition-colors">
                Menu do Site
              </a>
              <a href="/admin/configuracoes" className="block px-4 py-3 text-gray-300 hover:text-yellow-500 hover:bg-gray-800 rounded-lg transition-colors">
                Configurações
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <header className="bg-gray-900 border-b border-yellow-600/20 px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-white">Painel Administrativo</h1>
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">Admin</span>
                <button 
                  onClick={() => supabase.auth.signOut()}
                  className="text-yellow-500 hover:text-yellow-400 transition-colors"
                >
                  Sair
                </button>
              </div>
            </div>
          </header>
          
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

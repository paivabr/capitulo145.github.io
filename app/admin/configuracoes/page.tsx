'use client'

import { useState, useEffect } from 'react'
import { Save, Instagram, Mail, CreditCard, Settings } from 'lucide-react'

interface AdminSettings {
  email: string
  instagram_username: string
  instagram_access_token: string
  instagram_user_id: string
  smtp_host: string
  smtp_port: number
  smtp_user: string
  smtp_pass: string
  mercado_pago_access_token: string
  mercado_pago_public_key: string
}

export default function AdminConfiguracoes() {
  const [settings, setSettings] = useState<AdminSettings>({
    email: '',
    instagram_username: '',
    instagram_access_token: '',
    instagram_user_id: '',
    smtp_host: '',
    smtp_port: 587,
    smtp_user: '',
    smtp_pass: '',
    mercado_pago_access_token: '',
    mercado_pago_public_key: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      const data = await response.json()
      if (data.success) {
        setSettings(data.settings)
      }
    } catch (error) {
      console.error('Erro ao buscar configurações:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      const data = await response.json()
      
      if (data.success) {
        setMessage('Configurações salvas com sucesso!')
      } else {
        setMessage('Erro ao salvar configurações')
      }
    } catch (error) {
      setMessage('Erro ao salvar configurações')
      console.error('Erro:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    setSettings(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <Settings className="text-yellow-500 mr-3" size={28} />
        <h1 className="text-3xl font-bold text-white">Configurações da Loja</h1>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.includes('sucesso') ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Configurações Gerais */}
        <div className="bg-gray-900 border border-yellow-600/20 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Mail className="mr-2" size={20} />
            Configurações Gerais
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">E-mail Oficial da Loja</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                placeholder="contato@vjclub.com.br"
                required
              />
            </div>
          </div>
        </div>

        {/* Configurações do Instagram */}
        <div className="bg-gray-900 border border-yellow-600/20 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Instagram className="mr-2" size={20} />
            Integração com Instagram
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">@ do Instagram</label>
              <input
                type="text"
                name="instagram_username"
                value={settings.instagram_username}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                placeholder="@vjclub.oficial"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Instagram Access Token</label>
              <input
                type="password"
                name="instagram_access_token"
                value={settings.instagram_access_token}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                placeholder="Token de acesso da API do Instagram"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Instagram User ID</label>
              <input
                type="text"
                name="instagram_user_id"
                value={settings.instagram_user_id}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                placeholder="ID do usuário do Instagram"
              />
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-400 text-sm mb-2">
                <strong>Como obter as credenciais do Instagram:</strong>
              </p>
              <ol className="text-gray-400 text-sm list-decimal list-inside space-y-1">
                <li>Acesse o Facebook Developers</li>
                <li>Crie um novo aplicativo</li>
                <li>Configure o Instagram Basic Display</li>
                <li>Obtenha o Access Token e User ID</li>
                <li>Configure as permissões necessárias</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Configurações de E-mail */}
        <div className="bg-gray-900 border border-yellow-600/20 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Mail className="mr-2" size={20} />
            Configurações de E-mail (SMTP)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Servidor SMTP</label>
              <input
                type="text"
                name="smtp_host"
                value={settings.smtp_host}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                placeholder="smtp.gmail.com"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Porta SMTP</label>
              <input
                type="number"
                name="smtp_port"
                value={settings.smtp_port}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                placeholder="587"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Usuário SMTP</label>
              <input
                type="email"
                name="smtp_user"
                value={settings.smtp_user}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                placeholder="seuemail@gmail.com"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Senha SMTP</label>
              <input
                type="password"
                name="smtp_pass"
                value={settings.smtp_pass}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                placeholder="Sua senha ou app password"
              />
            </div>
          </div>
        </div>

        {/* Configurações Mercado Pago */}
        <div className="bg-gray-900 border border-yellow-600/20 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <CreditCard className="mr-2" size={20} />
            Mercado Pago
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Access Token (Privado)</label>
              <input
                type="password"
                name="mercado_pago_access_token"
                value={settings.mercado_pago_access_token}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                placeholder="Token de acesso do Mercado Pago"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Public Key (Público)</label>
              <input
                type="text"
                name="mercado_pago_public_key"
                value={settings.mercado_pago_public_key}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                placeholder="Chave pública do Mercado Pago"
              />
            </div>
          </div>
        </div>

        {/* Botão Salvar */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="gold-button px-8 py-3 flex items-center disabled:opacity-50"
          >
            <Save size={20} className="mr-2" />
            {loading ? 'Salvando...' : 'Salvar Configurações'}
          </button>
        </div>
      </form>
    </div>
  )
}

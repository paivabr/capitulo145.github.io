'use client'

import { useState, useEffect } from 'react'
import { Search, ShoppingCart, User, Menu, X, Instagram, ChevronRight, Star } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [instagramPosts, setInstagramPosts] = useState<any[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([])

  // Dados mockados para demonstração
  useEffect(() => {
    // Mock de posts do Instagram
    setInstagramPosts([
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
      },
      {
        id: '3',
        media_url: 'https://via.placeholder.com/400x400/B8860B/FFFFFF?text=Adidas+Predator',
        caption: 'Adidas Predator: precisão e potência 🔥',
        media_type: 'IMAGE',
        timestamp: new Date().toISOString(),
        permalink: '#'
      },
      {
        id: '4',
        media_url: 'https://via.placeholder.com/400x400/FFD700/000000?text=Nike+Phantom',
        caption: 'Nike Phantom: controle total da partida ⚡',
        media_type: 'IMAGE',
        timestamp: new Date().toISOString(),
        permalink: '#'
      }
    ])

    // Mock de produtos em destaque
    setFeaturedProducts([
      {
        id: '1',
        name: 'Nike Mercurial Superfly',
        price: 899.90,
        image: 'https://via.placeholder.com/300x300/1a1a1a/FFD700?text=Mercurial',
        category: 'chuteira',
        rating: 4.8
      },
      {
        id: '2',
        name: 'Camisa Brasil 2024',
        price: 349.90,
        image: 'https://via.placeholder.com/300x300/1a1a1a/FFA500?text=Brasil+2024',
        category: 'camisa',
        rating: 4.9
      },
      {
        id: '3',
        name: 'Adidas Predator Edge',
        price: 799.90,
        image: 'https://via.placeholder.com/300x300/1a1a1a/B8860B?text=Predator',
        category: 'chuteira',
        rating: 4.7
      },
      {
        id: '4',
        name: 'Camisa Corinthians',
        price: 299.90,
        image: 'https://via.placeholder.com/300x300/1a1a1a/FFD700?text=Corinthians',
        category: 'camisa',
        rating: 4.6
      }
    ])
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-yellow-600/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <img 
                src="/logo.png" 
                alt="VJ Club Logo" 
                className="w-12 h-12 object-contain"
              />
              <span className="text-2xl font-bold gold-text hidden sm:block">CLUB</span>
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/produtos" className="text-gray-300 hover:text-yellow-500 transition-colors">Produtos</Link>
              <Link href="/chuteiras" className="text-gray-300 hover:text-yellow-500 transition-colors">Chuteiras</Link>
              <Link href="/camisas" className="text-gray-300 hover:text-yellow-500 transition-colors">Camisas</Link>
              <Link href="/ofertas" className="text-gray-300 hover:text-yellow-500 transition-colors">Ofertas</Link>
              <Link href="/contato" className="text-gray-300 hover:text-yellow-500 transition-colors">Contato</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-yellow-500 transition-colors">
                <Search size={20} />
              </button>
              <button className="text-gray-300 hover:text-yellow-500 transition-colors">
                <User size={20} />
              </button>
              <button className="text-gray-300 hover:text-yellow-500 transition-colors relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-500 text-black text-xs rounded-full flex items-center justify-center">0</span>
              </button>
              <button 
                className="md:hidden text-gray-300 hover:text-yellow-500 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-yellow-600/20">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <Link href="/produtos" className="block text-gray-300 hover:text-yellow-500 transition-colors">Produtos</Link>
              <Link href="/chuteiras" className="block text-gray-300 hover:text-yellow-500 transition-colors">Chuteiras</Link>
              <Link href="/camisas" className="block text-gray-300 hover:text-yellow-500 transition-colors">Camisas</Link>
              <Link href="/ofertas" className="block text-gray-300 hover:text-yellow-500 transition-colors">Ofertas</Link>
              <Link href="/contato" className="block text-gray-300 hover:text-yellow-500 transition-colors">Contato</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="block text-white mb-2">ESTILO</span>
            <span className="block gold-text">PREMIUM</span>
            <span className="block text-white mt-2">EM CAMPO</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Chuteiras e camisas das melhores marcas para você dominar o jogo com estilo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="gold-button text-lg px-8 py-4">
              Comprar Agora
            </button>
            <button className="border-2 border-yellow-500 text-yellow-500 px-8 py-4 rounded-lg hover:bg-yellow-500 hover:text-black transition-all duration-300">
              Ver Coleção
            </button>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-yellow-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gold-text">Produtos</span> em Destaque
            </h2>
            <p className="text-gray-400 text-lg">As melhores chuteiras e camisas do momento</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="card-hover bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-yellow-600/20">
                <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category === 'chuteira' ? 'Chuteira' : 'Camisa'}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'fill-current' : ''} />
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm ml-2">({product.rating})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold gold-text">R$ {product.price.toFixed(2)}</span>
                    <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors">
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-gray-900/50 to-black">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Instagram size={32} className="text-yellow-500 mr-3" />
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="gold-text">Instagram</span> Feed
              </h2>
            </div>
            <p className="text-gray-400 text-lg">Siga nossas novidades e lançamentos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {instagramPosts.map((post) => (
              <div key={post.id} className="card-hover relative group overflow-hidden rounded-lg border border-yellow-600/20">
                <div className="aspect-square">
                  <img 
                    src={post.media_url} 
                    alt={post.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm mb-2 line-clamp-2">{post.caption}</p>
                    <a 
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-500 text-sm flex items-center hover:text-yellow-400"
                    >
                      Ver no Instagram <ChevronRight size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="gold-button px-8 py-4">
              Seguir @vjclub.oficial
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-yellow-500/20"></div>
        <div className="container mx-auto relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gold-text">Pronto para</span> Dominar?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Descubra a coleção completa de chuteiras e camisas que vão elevar seu jogo a outro nível
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="gold-button text-lg px-8 py-4">
              Ver Todos os Produtos
            </button>
            <button className="border-2 border-yellow-500 text-yellow-500 px-8 py-4 rounded-lg hover:bg-yellow-500 hover:text-black transition-all duration-300">
              Receber Ofertas
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-yellow-600/20 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-xl">VJ</span>
                </div>
                <span className="text-2xl font-bold gold-text">CLUB</span>
              </div>
              <p className="text-gray-400">
                Sua loja premium de chuteiras e camisas de futebol
              </p>
            </div>
            
            <div>
              <h3 className="text-yellow-500 font-semibold mb-4">Produtos</h3>
              <ul className="space-y-2">
                <li><Link href="/chuteiras" className="text-gray-400 hover:text-yellow-500 transition-colors">Chuteiras</Link></li>
                <li><Link href="/camisas" className="text-gray-400 hover:text-yellow-500 transition-colors">Camisas</Link></li>
                <li><Link href="/ofertas" className="text-gray-400 hover:text-yellow-500 transition-colors">Ofertas</Link></li>
                <li><Link href="/novidades" className="text-gray-400 hover:text-yellow-500 transition-colors">Novidades</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-yellow-500 font-semibold mb-4">Institucional</h3>
              <ul className="space-y-2">
                <li><Link href="/sobre-nos" className="text-gray-400 hover:text-yellow-500 transition-colors">Sobre Nós</Link></li>
                <li><Link href="/contato" className="text-gray-400 hover:text-yellow-500 transition-colors">Contato</Link></li>
                <li><Link href="/trocas" className="text-gray-400 hover:text-yellow-500 transition-colors">Trocas e Devoluções</Link></li>
                <li><Link href="/privacidade" className="text-gray-400 hover:text-yellow-500 transition-colors">Política de Privacidade</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-yellow-500 font-semibold mb-4">Atendimento</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">WhatsApp: (11) 99999-9999</li>
                <li className="text-gray-400">E-mail: contato@vjclub.com.br</li>
                <li className="text-gray-400">Horário: Seg-Sex 9h-18h</li>
              </ul>
              <div className="flex space-x-4 mt-4">
                <Instagram className="text-yellow-500 hover:text-yellow-400 cursor-pointer transition-colors" size={20} />
                <Facebook className="text-yellow-500 hover:text-yellow-400 cursor-pointer transition-colors" size={20} />
                <Twitter className="text-yellow-500 hover:text-yellow-400 cursor-pointer transition-colors" size={20} />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 VJ Club. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Adicionar import do Facebook e Twitter
import { Facebook, Twitter } from 'lucide-react'

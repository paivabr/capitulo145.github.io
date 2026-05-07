import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'VJ Club - Chuteiras e Camisas de Futebol',
  description: 'Loja premium de chuteiras e camisas de futebol com as melhores marcas e preços.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="bg-black text-white">
      <body className={inter.className}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#FFD700',
              border: '1px solid #FFD700',
            },
          }}
        />
      </body>
    </html>
  )
}

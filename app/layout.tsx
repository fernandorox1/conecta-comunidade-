import type {Metadata} from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import './globals.css'; // Global styles

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Conecta Comunidade',
  description: 'Aplicativo de conexões locais, oportunidades de trabalho e serviços.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${beVietnamPro.variable}`}>
      <body className="font-sans antialiased text-on-surface bg-surface min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

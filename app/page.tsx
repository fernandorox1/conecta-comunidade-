'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  Bell,
  ChevronRight,
  Search,
  Briefcase,
  Store,
  MapPin,
  User,
  Home,
  Wrench,
  BookOpen,
  Heart,
  Share2,
  Compass,
  ArrowLeft,
  Check,
  X,
  Plus,
  Minus,
  Settings,
  HelpCircle,
  Send,
  Calendar,
  DollarSign,
  AlertCircle,
  Eye,
  LogOut,
  Edit2
} from 'lucide-react';
import { cn } from '@/lib/utils';

// TYPES
interface Job {
  id: string;
  title: string;
  company: string;
  type: 'Tempo Integral' | 'Meio Período' | 'Remoto' | 'Estágio';
  salary: string;
  location: string;
  category: 'vaga';
  isNew?: boolean;
  iconName: 'store' | 'restaurant' | 'headset_mic' | 'building';
  description: string;
  requirements: string[];
  applied?: boolean;
  saved?: boolean;
}

interface Service {
  id: string;
  title: string;
  provider: string;
  category: 'serviço';
  location: string;
  rating: number;
  reviews: number;
  iconName: 'wrench' | 'home' | 'storefront';
  description: string;
  contact: string;
  saved?: boolean;
}

interface CommunityAction {
  id: string;
  title: string;
  organization: string;
  category: 'ação';
  location: string;
  date: string;
  time: string;
  description: string;
  joined?: boolean;
  participants: number;
  image?: string;
  highlight?: string;
}

interface ChatMessage {
  id: string;
  user: string;
  avatarLetter: string;
  text: string;
  timestamp: string;
  isMe?: boolean;
}

export default function HomeLayout() {
  // NAVIGATION TAB STATE
  const [activeTab, setActiveTab] = React.useState<'inicio' | 'oportunidades' | 'servicos' | 'projetos' | 'perfil'>('inicio');

  // AUTH SYSTEM STATE
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState({
    username: 'gabriel',
    name: 'Gabriel Martins',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0vQhFExfL0b6f-c8y4lY3AGBTF86ppslMnxPkyRFT6KbVE5BDwMzBFNJ4K6G1MDBotAbyPfKJQM-w1z4TNwfmPTiSqpTV7PN6aW0HrlAab27lcAeER0m900tuqVix5ltW8JCHJKLqmMfK6hUQfk4vzTTSnT69coewjD0g203g4WoUf3ddAJS59eTj1zP3vKPweUXXHs0-O_vbW1IA4Lv5MMvfmTHvA4B8D7TD_zVeU01ey8ynXNSij8TDPqZGtvmVoxzGKPE7JD4'
  });
  const [registeredUsers, setRegisteredUsers] = React.useState([
    {
      username: 'gabriel',
      password: '123',
      name: 'Gabriel Martins',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0vQhFExfL0b6f-c8y4lY3AGBTF86ppslMnxPkyRFT6KbVE5BDwMzBFNJ4K6G1MDBotAbyPfKJQM-w1z4TNwfmPTiSqpTV7PN6aW0HrlAab27lcAeER0m900tuqVix5ltW8JCHJKLqmMfK6hUQfk4vzTTSnT69coewjD0g203g4WoUf3ddAJS59eTj1zP3vKPweUXXHs0-O_vbW1IA4Lv5MMvfmTHvA4B8D7TD_zVeU01ey8ynXNSij8TDPqZGtvmVoxzGKPE7JD4'
    }
  ]);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [authTab, setAuthTab] = React.useState<'login' | 'register'>('login');
  
  // Auth Form Fields
  const [authName, setAuthName] = React.useState('');
  const [authUsername, setAuthUsername] = React.useState('');
  const [authPassword, setAuthPassword] = React.useState('');
  const [authSelectedAvatar, setAuthSelectedAvatar] = React.useState('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100');

  // APP GLOBAL STATE
  const [profile, setProfile] = React.useState({
    name: 'Gabriel Martins',
    location: 'Ponta Grossa - PR',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0vQhFExfL0b6f-c8y4lY3AGBTF86ppslMnxPkyRFT6KbVE5BDwMzBFNJ4K6G1MDBotAbyPfKJQM-w1z4TNwfmPTiSqpTV7PN6aW0HrlAab27lcAeER0m900tuqVix5ltW8JCHJKLqmMfK6hUQfk4vzTTSnT69coewjD0g203g4WoUf3ddAJS59eTj1zP3vKPweUXXHs0-O_vbW1IA4Lv5MMvfmTHvA4B8D7TD_zVeU01ey8ynXNSij8TDPqZGtvmVoxzGKPE7JD4',
    servicesCount: 12,
  });

  // MENU DRAWER STATE
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  // HELP CENTER STATE
  const [isHelpModalOpen, setIsHelpModalOpen] = React.useState(false);
  const [helpSearchQuery, setHelpSearchQuery] = React.useState('');
  const [helpMessage, setHelpMessage] = React.useState('');
  const [helpEmail, setHelpEmail] = React.useState('');
  
  // NOTIFICATIONS STATE
  const [notifications, setNotifications] = React.useState([
    { id: '1', text: 'Novo convite para a Feira de Sábado!', isNew: true },
    { id: '2', text: 'Prefeitura aprovou o curso gratuito!', isNew: true },
    { id: '3', text: 'Você salvou a vaga de Auxiliar de Cozinha', isNew: false }
  ]);
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState(false);

  // AUTH PERSISTENCE UTILITIES
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUsers = localStorage.getItem('cc_registered_users');
      if (storedUsers) {
        try {
          const parsed = JSON.parse(storedUsers);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setTimeout(() => {
              setRegisteredUsers(parsed);
            }, 0);
          }
        } catch (e) {
          console.error('Error loading registered users from localStorage', e);
        }
      }

      const storedIsLoggedIn = localStorage.getItem('cc_is_logged_in');
      if (storedIsLoggedIn !== null) {
        setTimeout(() => {
          setIsLoggedIn(storedIsLoggedIn === 'true');
        }, 0);
      }

      const storedCurrentUser = localStorage.getItem('cc_current_user');
      if (storedCurrentUser) {
        try {
          const parsed = JSON.parse(storedCurrentUser);
          setTimeout(() => {
            setCurrentUser(parsed);
          }, 0);
        } catch (e) {
          console.error('Error loading current user from localStorage', e);
        }
      }

      const storedProfile = localStorage.getItem('cc_profile');
      if (storedProfile) {
        try {
          const parsed = JSON.parse(storedProfile);
          setTimeout(() => {
            setProfile(parsed);
          }, 0);
        } catch (e) {
          console.error('Error loading profile from localStorage', e);
        }
      }

      setTimeout(() => {
        setIsInitialized(true);
      }, 50);
    }
  }, []);

  React.useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('cc_registered_users', JSON.stringify(registeredUsers));
    }
  }, [registeredUsers, isInitialized]);

  React.useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('cc_is_logged_in', String(isLoggedIn));
      localStorage.setItem('cc_current_user', JSON.stringify(currentUser));
      localStorage.setItem('cc_profile', JSON.stringify(profile));
    }
  }, [isLoggedIn, currentUser, profile, isInitialized]);

  // TOAST STATE
  const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const triggerToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // JOBS STATE
  const [jobs, setJobs] = React.useState<Job[]>([
    {
      id: 'job-1',
      title: 'Auxiliar Administrativo',
      company: 'Empresa Local Ltda',
      type: 'Tempo Integral',
      salary: 'R$ 2.100,00',
      location: 'Presencial - Centro, Ponta Grossa',
      category: 'vaga',
      isNew: true,
      iconName: 'building',
      description: 'Responsável por auxiliar nas rotinas administrativas, atendimento ao cliente, arquivamento de documentos, e lançamentos em planilhas internas. Ótima oportunidade de crescimento!',
      requirements: ['Ensino Médio completo', 'Conhecimento básico de Excel', 'Boa comunicação verbal e escrita'],
      saved: false,
      applied: false,
    },
    {
      id: 'job-2',
      title: 'Vendedor de Loja',
      company: 'Moda & Estilo S.A.',
      type: 'Tempo Integral',
      salary: 'R$ 1.800,00 + Comissões',
      location: 'Shopping Palladium, Centro',
      category: 'vaga',
      isNew: true,
      iconName: 'store',
      description: 'Atuar no atendimento ao cliente, apresentação de vestuários, organização de araras e prateleiras, e fechamento de vendas. Oferecemos comissões agressivas de até 5%!',
      requirements: ['Experiência anterior em vendas é um diferencial', 'Disponibilidade de horário aos finais de semana', 'Proatividade'],
      saved: true,
      applied: false,
    },
    {
      id: 'job-3',
      title: 'Auxiliar de Cozinha',
      company: 'Sabor do Bairro',
      type: 'Meio Período',
      salary: 'R$ 1.650,00',
      location: 'Uvaranas - Local',
      category: 'vaga',
      isNew: false,
      iconName: 'restaurant',
      description: 'Preparo de ingredientes, higienização da cozinha, montagem de pratos simples e auxílio direto ao Chefe. Perfeito para quem estuda à noite ou quer iniciar na gastronomia.',
      requirements: ['Organização extrema', 'Vontade de aprender', 'Disponibilidade para o turno da manhã/tarde'],
      saved: false,
      applied: false,
    },
    {
      id: 'job-4',
      title: 'Suporte ao Cliente',
      company: 'Tech Soluções Digitais',
      type: 'Remoto',
      salary: 'R$ 2.200,00',
      location: 'Remoto / Home Office',
      category: 'vaga',
      isNew: false,
      iconName: 'headset_mic',
      description: 'Atendimento via chat e e-mail para usuários de nossa plataforma de serviços locais. Resolver dúvidas simples e registrar feedbacks de melhoria tecnológica.',
      requirements: ['Computador próprio de boa performance', 'Internet estável', 'Empatia extrema com usuários'],
      saved: false,
      applied: false,
    },
    {
      id: 'job-5',
      title: 'Estagiário de Ti / Suporte',
      company: 'Digital Ponta Grossa',
      type: 'Estágio',
      salary: 'R$ 1.200,00',
      location: 'Nova Rússia',
      category: 'vaga',
      isNew: true,
      iconName: 'building',
      description: 'Apoio na configuração de redes e computadores locais para pequenos estabelecimentos da região.',
      requirements: ['Cursando Análise de Sistemas ou afins', 'Residir próximo a Nova Rússia'],
      saved: false,
      applied: false,
    },
    {
      id: 'job-6',
      title: 'Recepcionista',
      company: 'Clínica Odonto Vida',
      type: 'Tempo Integral',
      salary: 'R$ 1.950,05',
      location: 'Centro, Ponta Grossa',
      category: 'vaga',
      isNew: true,
      iconName: 'building',
      description: 'Atendimento presencial e telefônico, agendamento de consultas médicas pelo sistema, controle de prontuários e organização da recepção.',
      requirements: ['Ensino Médio completo', 'Facilidade com informática', 'Experiência em clínicas é um diferencial'],
      saved: false,
      applied: false,
    },
    {
      id: 'job-7',
      title: 'Operador de Caixa',
      company: 'Supermercados Tozetto',
      type: 'Tempo Integral',
      salary: 'R$ 1.850,00',
      location: 'Estrela, Ponta Grossa',
      category: 'vaga',
      isNew: false,
      iconName: 'store',
      description: 'Registro de mercadorias, recebimento de pagamentos, atendimento cordial ao cliente e fechamento diário do caixa.',
      requirements: ['Ensino Médio parcial ou completo', 'Disponibilidade de horário para escala de revezamento', 'Agilidade'],
      saved: false,
      applied: false,
    },
    {
      id: 'job-8',
      title: 'Auxiliar de Estoque',
      company: 'Distribuidora PG Express',
      type: 'Tempo Integral',
      salary: 'R$ 1.900,00',
      location: 'Uvaranas, Ponta Grossa',
      category: 'vaga',
      isNew: true,
      iconName: 'building',
      description: 'Recebimento de mercadorias, conferência de notas fiscais, etiquetagem, triagem de pedidos para entrega e organização das prateleiras do estoque.',
      requirements: ['Disposição física', 'Ensino Médio completo preferencial', 'Atenção aos detalhes'],
      saved: false,
      applied: false,
    },
    {
      id: 'job-9',
      title: 'Padeiro Aprendiz',
      company: 'Panificadora Kipão',
      type: 'Tempo Integral',
      salary: 'R$ 2.000,00',
      location: 'Oficinas, Ponta Grossa',
      category: 'vaga',
      isNew: true,
      iconName: 'restaurant',
      description: 'Auxiliar na fabricação de pães, salgados, bolos e doces. Organização e limpeza do local de trabalho de panificação. Oportunidade de aprender com experientes mestres padeiros.',
      requirements: ['Maior de 18 anos', 'Vontade de trabalhar de madrugada/cedo', 'Higiene rigorosa e asseio pessoal'],
      saved: false,
      applied: false,
    },
    {
      id: 'job-10',
      title: 'Repositor de Mercadorias',
      company: 'Mercado Muffato',
      type: 'Tempo Integral',
      salary: 'R$ 1.820,00',
      location: 'Olarias, Ponta Grossa',
      category: 'vaga',
      isNew: true,
      iconName: 'store',
      description: 'Abastecimento, organização e precificação de mercadorias nas gôndolas do supermercado. Controle de prazos de validade e auxílio no inventário do estoque da loja.',
      requirements: ['Ensino Médio completo ou em andamento', 'Facilidade para trabalhar em equipe', 'Disposição para carga e descarga leve de produtos'],
      saved: false,
      applied: false,
    },
    {
      id: 'job-11',
      title: 'Auxiliar de Limpeza / Zeladoria',
      company: 'Condomínio Spazio',
      type: 'Meio Período',
      salary: 'R$ 1.300,00',
      location: 'Estrela, Ponta Grossa',
      category: 'vaga',
      isNew: false,
      iconName: 'building',
      description: 'Responsável pela varrição, lavação e organização das áreas comuns do condomínio residencial de Oficinas (hall de entrada, corredores e churrasqueiras de uso comum).',
      requirements: ['Experiência básica em limpeza predial residencial', 'Ser proativo(a) e extremamente detalhista', 'Residir de preferência próximo à região de Estrela / Oficinas'],
      saved: false,
      applied: false,
    }
  ]);

  // SERVICES STATE
  const [services, setServices] = React.useState<Service[]>([
    {
      id: 'serv-1',
      title: 'Encanador',
      provider: 'Carlos Eduardo',
      category: 'serviço',
      location: 'Oficinas - Atende em domicílio',
      rating: 4.8,
      reviews: 32,
      iconName: 'wrench',
      description: 'Caça-vazamentos, reparo de pias, canos rompidos e manutenção hidráulica emergencial 24h na zona oeste.',
      contact: '(42) 98888-7777',
      saved: false
    },
    {
      id: 'serv-2',
      title: 'Eletricista Residencial',
      provider: 'Roseli Mendes',
      category: 'serviço',
      location: 'Estrela e Região',
      rating: 4.9,
      reviews: 45,
      iconName: 'wrench',
      description: 'Instalação de tomadas, chuveiros, fiação completa e painéis elétricos com laudo e garantia total.',
      contact: '(42) 94444-5555',
      saved: false
    },
    {
      id: 'serv-3',
      title: 'Costura e Ajustes',
      provider: 'Sandra Moers',
      category: 'serviço',
      location: 'Oficinas - Próximo à Rua Vicente Machado',
      rating: 5.0,
      reviews: 68,
      iconName: 'wrench',
      description: 'Consertos rápidos de roupas, bainhas, ajustes de costura em geral com acabamento impecável e entrega rápida.',
      contact: '(42) 99122-3344',
      saved: false
    },
    {
      id: 'serv-4',
      title: 'Pintor Residencial',
      provider: 'Marcos Silva',
      category: 'serviço',
      location: 'Atende em toda Ponta Grossa',
      rating: 4.7,
      reviews: 19,
      iconName: 'wrench',
      description: 'Pinturas internas e externas, aplicação de massa corrida, textura rústica e selador. Orçamento rápido.',
      contact: '(42) 98777-1234',
      saved: false
    },
    {
      id: 'serv-5',
      title: 'Montador de Móveis',
      provider: 'Juliana Souza',
      category: 'serviço',
      location: 'Centro e Bairros adjacentes',
      rating: 4.9,
      reviews: 28,
      iconName: 'wrench',
      description: 'Montagem e desmontagem de armários, racks, guarda-roupas e cômodas de qualquer marca ou loja.',
      contact: '(42) 99555-4321',
      saved: false
    },
    {
      id: 'serv-6',
      title: 'Técnico de Refrigeração',
      provider: 'Ricardo Santana',
      category: 'serviço',
      location: 'Uvaranas e Região',
      rating: 4.6,
      reviews: 14,
      iconName: 'wrench',
      description: 'Limpeza, higienização, recarga de gás e manutenção geral em ar-condicionado de split e janela.',
      contact: '(42) 99222-8899',
      saved: false
    },
    {
      id: 'serv-7',
      title: 'Diarista e Organizadora',
      provider: 'Dona Maria de Lourdes',
      category: 'serviço',
      location: 'Olarias e Centro',
      rating: 4.9,
      reviews: 52,
      iconName: 'wrench',
      description: 'Limpeza residencial detalhada, organização de armários e faxinas pós-obra completas. Compromisso, pontualidade e ótimas referências no bairro.',
      contact: '(42) 99111-2233',
      saved: false
    },
    {
      id: 'serv-8',
      title: 'Chaveiro Residencial 24h',
      provider: 'Chaveiro Pontual',
      category: 'serviço',
      location: 'Nova Rússia - Atendimento rápido',
      rating: 4.8,
      reviews: 41,
      iconName: 'wrench',
      description: 'Abertura de portas, cópias de chaves, troca de segredo de fechaduras comerciais e residenciais. Plantão 24 horas inclusive aos domingos.',
      contact: '(42) 98822-4466',
      saved: false
    },
    {
      id: 'serv-9',
      title: 'Aulas de Reforço Escolar',
      provider: 'Profª Cláudia Silva',
      category: 'serviço',
      location: 'Jardim América - Presencial ou Online',
      rating: 5.0,
      reviews: 30,
      iconName: 'wrench',
      description: 'Acompanhamento pedagógico em Matemática, Português e Ciências para Ensino Fundamental I e II. Metodologia didática e paciente.',
      contact: '(42) 99933-7711',
      saved: false
    },
    {
      id: 'serv-10',
      title: 'Cuidador de Idosos',
      provider: 'Marcos de Oliveira',
      category: 'serviço',
      location: 'Uvaranas - Atendimentos domicílio ou hospital',
      rating: 4.9,
      reviews: 16,
      iconName: 'wrench',
      description: 'Técnico de Enfermagem com especialização em geriatria. Administração rigorosa de medicamentos, acompanhamento em consultas médicas e auxílio nas rotinas diárias.',
      contact: '(42) 99555-6677',
      saved: false
    },
    {
      id: 'serv-11',
      title: 'Pet Sitter & Dog Walker',
      provider: 'Patrícia G. Bueno',
      category: 'serviço',
      location: 'Centro, Estrela e Oficinas',
      rating: 4.8,
      reviews: 25,
      iconName: 'wrench',
      description: 'Passeios individuais de 40 minutos para cães de todas as raças e hospedagem amorosa em ambiente familiar para pets durante suas viagens.',
      contact: '(42) 99100-8800',
      saved: false
    },
    {
      id: 'serv-12',
      title: 'Manicure e Designer de Unhas',
      provider: 'Ana Beatriz Ramos',
      category: 'serviço',
      location: 'Ronda - Salão local ou em domicílio',
      rating: 4.9,
      reviews: 37,
      iconName: 'wrench',
      description: 'Especialista em unhas de gel, fibra de vidro e esmaltação comum ou em gel. Material 100% esterilizado em autoclave garantindo segurança.',
      contact: '(42) 98844-3322',
      saved: false
    },
    {
      id: 'serv-13',
      title: 'Adestrador de Cães',
      provider: 'Thiago Adestramento',
      category: 'serviço',
      location: 'Toda região de Ponta Grossa',
      rating: 4.7,
      reviews: 18,
      iconName: 'wrench',
      description: 'Adestramento comportamental positivo para cães agitados, agressivos ou com ansiedade de separação. Soluções práticas sem violência.',
      contact: '(42) 99221-5432',
      saved: false
    },
    {
      id: 'serv-14',
      title: 'Técnico de Informática',
      provider: 'Felipe Neto G.',
      category: 'serviço',
      location: 'Oficinas e Centro',
      rating: 4.9,
      reviews: 50,
      iconName: 'wrench',
      description: 'Formatação de computadores e notebooks, remoção de vírus, instalação de softwares e Office, upgrades rápidos com SSD e limpeza interna completa.',
      contact: '(42) 99988-1122',
      saved: false
    }
  ]);

  // ACTIONS STATE
  const [actions, setActions] = React.useState<CommunityAction[]>([
    {
      id: 'act-1',
      title: 'Feira Comunitária da Esperança',
      organization: 'Associação de Moradores da Esperança',
      category: 'ação',
      location: 'Av. Vicente Machado, 123',
      date: 'Sábado (06 de Junho)',
      time: '08:00 às 18:00',
      description: 'Uma iniciativa local para fortalecer a economia do bairro. Encontre produtos orgânicos, artesanato feito por vizinhos e serviços de reparo gratuito. Toda quarta e sábado!',
      joined: false,
      participants: 124,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHA2ey8f2lt1bePpDY2nOYKzBC2iHXvGCzLwZoAO-EubWihBKHQ_ZaUdYYowZ-RV6zP8A390eL2JAaO7C0l6VNyymMG0j7J2SYXsTeCh3wS-11KJRRkFw1p7P12pq_2fMheBMsUeDDcGkLGJrs4XYknf4YDzuAVCP6MoUfA14FfRR3oACG98VqkXM0ASYjDcptpNGgZ9iAIDBBHVU7LxqUoKkJVhfke6KTLlRW1wMdGBNE3ZEWQ5e8zwH3msZXWlyLHKCl4gqx8_o',
      highlight: 'Cestas de café da manhã a partir de R$ 35,00'
    },
    {
      id: 'act-2',
      title: 'Horta Comunitária Urbana',
      organization: 'Amigos de Ponta Grossa',
      category: 'ação',
      location: 'Parque Ambiental',
      date: 'Domingo (07 de Junho)',
      time: '09:00 às 12:00',
      description: 'Mutirão sustentável para plantar mudas de hortaliças, temperos e plantar as sementes da nossa horta comunitária. Traga um sorriso e uma pá pequena!',
      joined: false,
      participants: 48
    },
    {
      id: 'act-3',
      title: 'Coleta de Livros e Brinquedos',
      organization: 'Associação Lar de Luz',
      category: 'ação',
      location: 'Rua Benjamin Constant, S/N',
      date: 'Sexta (12 de Junho)',
      time: '14:00 às 17:00',
      description: 'Arrecadação e triagem de brinquedos e livros infantis para doação a creches locais do nosso bairro. Traga suas doações e participe dessa rede de solidariedade!',
      joined: false,
      participants: 32
    },
    {
      id: 'act-4',
      title: 'Mutirão de Pintura da Escola Bairro',
      organization: 'Conselho Escolar Oficinas',
      category: 'ação',
      location: 'Escola Municipal Profa. Maria',
      date: 'Sábado (13 de Junho)',
      time: '08:00 às 13:00',
      description: 'Voluntariado alegre para revitalizar os muros e salas de aula da escola do nosso bairro. Tintas, lanches e pincéis inclusos para todos os vizinhos colaboradores!',
      joined: false,
      participants: 56
    },
    {
      id: 'act-5',
      title: 'Oficina de Redação de Currículos',
      organization: 'Jovens de Ponta Grossa',
      category: 'ação',
      location: 'Salão da Igreja Oficinas',
      date: 'Segunda (15 de Junho)',
      time: '19:00 às 21:00',
      description: 'Orientação especializada gratuita para criar um currículo competitivo para vagas locais de emprego e se preparar para dinâmica de entrevista. Vagas limitadas!',
      joined: false,
      participants: 19
    },
    {
      id: 'act-6',
      title: 'Sopa Solidária no Frio',
      organization: 'Grupo Solidário PG',
      category: 'ação',
      location: 'Praça da Catedral, Centro',
      date: 'Quarta-feira (17 de Junho)',
      time: '19:00 às 22:00',
      description: 'Distribuição voluntária de sopa quente e agasalhos para moradores em situação de vulnerabilidade nas noites frias de inverno. Ajude no preparo ou participe da entrega conosco.',
      joined: false,
      participants: 65,
      image: 'https://images.unsplash.com/photo-1541802645635-11f2286a7482?auto=format&fit=crop&q=80&w=300',
      highlight: 'Arrecadação de cobertores aberta'
    },
    {
      id: 'act-7',
      title: 'Campanha de Castração Solidária',
      organization: 'ONG Patinhas de Anjo',
      category: 'ação',
      location: 'Clínica Escola UEPG',
      date: 'Sábado (20 de Junho)',
      time: '08:00 às 17:00',
      description: 'Inscrições abertas para moradores de baixa renda realizarem a castração gratuita ou com custo social de seus cães e gatos. Evento informativo com veterinários voluntários.',
      joined: false,
      participants: 110,
      image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=300',
      highlight: 'Cadastramento prévio no local'
    },
    {
      id: 'act-8',
      title: 'Treino Funcional Grátis no Parque',
      organization: 'Estúdio Saúde e Vigor',
      category: 'ação',
      location: 'Parque de Olarias',
      date: 'Domingo (21 de Junho)',
      time: '08:30 às 10:00',
      description: 'Treino coletivo saudável e recreativo ao ar livre para todas as idades promovendo saúde e bem-estar na comunidade. Traga sua garrafa de água e vista roupas leves.',
      joined: false,
      participants: 72,
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=300',
      highlight: 'Apoio de professores de Ed. Física'
    },
    {
      id: 'act-9',
      title: 'Cine Bairro na Praça',
      organization: 'Coletivo Cultural PG',
      category: 'ação',
      location: 'Praça da Nova Rússia',
      date: 'Sexta-feira (26 de Junho)',
      time: '18:30 às 21:00',
      description: 'Exibição de cinema infantil ao ar livre para toda a família com distribuição voluntária de pipoca gratuita. Traga sua cadeira de praia e venha curtir a noite com os vizinhos!',
      joined: false,
      participants: 85,
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=300',
      highlight: 'Pipoca grátis para as crianças'
    },
    {
      id: 'act-10',
      title: 'Arrecadação de Lixo Eletrônico',
      organization: 'Ponta Grossa Sustentável',
      category: 'ação',
      location: 'Ecoponto Oficinas',
      date: 'Sábado (27 de Junho)',
      time: '09:00 às 16:00',
      description: 'Descarte correto e ecológico de computadores, monitores, carregadores, pilhas e eletrodomésticos quebrados. Evite contaminação e colabore com a reciclagem local!',
      joined: false,
      participants: 41,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=300',
      highlight: 'Sorteio de brindes ecológicos'
    }
  ]);

  // SEARCH AND CHIPS FILTERING
  const [searchQuery, setSearchQuery] = React.useState('');
  const [serviceSearchQuery, setServiceSearchQuery] = React.useState('');
  const [actionSearchQuery, setActionSearchQuery] = React.useState('');
  const [activeChip, setActiveChip] = React.useState<string>('Todas');

  // MAP SCREEN DETAILS
  const [mapCategory, setMapCategory] = React.useState<'Tudo' | 'Serviços' | 'Vagas' | 'Ações'>('Tudo');
  const [selectedMarkerId, setSelectedMarkerId] = React.useState<string | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false);
  const [zoomLevel, setZoomLevel] = React.useState(14);
  const [showAnimatedRoute, setShowAnimatedRoute] = React.useState(false);
  const [mapCenter, setMapCenter] = React.useState({ x: 50, y: 50 }); // simulated panning offsets

  // DETAILED FULL-SCREEN MODALS / DRAWERS
  const [selectedJobDetail, setSelectedJobDetail] = React.useState<Job | null>(null);
  const [currentModalAction, setCurrentModalAction] = React.useState<'servicos' | 'acoes' | 'fale' | 'curso' | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);

  // CHAT / "FALE COM A COMUNIDADE" STATE
  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([
    { id: '1', user: 'Maria Aparecida', avatarLetter: 'M', text: 'Bom dia pessoal! Alguém recomenda uma costureira no bairro?', timestamp: '09:12' },
    { id: '2', user: 'Carlos Eduardo', avatarLetter: 'C', text: 'A dona Sandra Moers das Oficinas é excelente, ótima costureira!', timestamp: '09:20' },
    { id: '3', user: 'Sandra Moers', avatarLetter: 'S', text: 'Obrigada Carlos pela indicação! Fica meu contato na Rua Vicente Machado para quem precisar.', timestamp: '09:44' }
  ]);
  const [newCommentText, setNewCommentText] = React.useState('');

  // INFORMATICS COURSE STATE
  const [courseJoined, setCourseJoined] = React.useState(false);

  // COUNTERS FOR BENTO GRID IN PROFILE
  const savedJobsCount = jobs.filter(j => j.saved).length;

  // TOGGLING FAV/APPLY HANDLERS
  const toggleSaveJob = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setJobs(prev =>
      prev.map(j => {
        if (j.id === id) {
          const newState = !j.saved;
          triggerToast(newState ? `Vaga "${j.title}" salva com sucesso!` : `Vaga removida dos favoritos.`);
          return { ...j, saved: newState };
        }
        return j;
      })
    );
  };

  const handleApplyJob = (id: string) => {
    setJobs(prev =>
      prev.map(j => {
        if (j.id === id) {
          if (j.applied) {
            triggerToast('Você já se candidatou a esta vaga.', 'info');
            return j;
          }
          triggerToast(`Candidatura enviada para "${j.title}" em ${j.company}!`);
          return { ...j, applied: true };
        }
        return j;
      })
    );
    // Auto update selected job details modal
    setSelectedJobDetail(prev => prev ? { ...prev, applied: true } : null);
  };

  const handleJoinAction = (id: string) => {
    setActions(prev =>
      prev.map(a => {
        if (a.id === id) {
          const newState = !a.joined;
          triggerToast(newState ? `Inscrição confirmada na ação comunitária!` : `Você se retirou da ação comunitária.`);
          return { ...a, joined: newState, participants: newState ? a.participants + 1 : a.participants - 1 };
        }
        return a;
      })
    );
  };

  const toggleSaveService = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setServices(prev =>
      prev.map(s => {
        if (s.id === id) {
          const newState = !s.saved;
          triggerToast(newState ? `Serviço de "${s.provider}" salvo com sucesso!` : `Serviço de "${s.provider}" removido dos favoritos.`);
          return { ...s, saved: !s.saved };
        }
        return s;
      })
    );
  };

  const submitChatMessage = () => {
    if (!newCommentText.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      user: profile.name,
      avatarLetter: profile.name.slice(0, 1),
      text: newCommentText,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };
    setChatMessages(prev => [...prev, userMsg]);
    setNewCommentText('');
  };

  // EDIT PROFILE LOGIC
  const [editNameField, setEditNameField] = React.useState(profile.name);
  const [editAvatarField, setEditAvatarField] = React.useState(profile.avatar);
  const saveProfileSettings = () => {
    if (!editNameField.trim()) {
      triggerToast('Por favor, preencha o seu nome.', 'error');
      return;
    }
    setProfile(prev => ({ ...prev, name: editNameField, avatar: editAvatarField }));
    setIsEditProfileOpen(false);
    triggerToast('Perfil atualizado com sucesso!');
  };

  // FILTERED LISTINGS
  const filteredServices = services.filter(s =>
    s.title.toLowerCase().includes(serviceSearchQuery.toLowerCase()) ||
    s.provider.toLowerCase().includes(serviceSearchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(serviceSearchQuery.toLowerCase()) ||
    s.location.toLowerCase().includes(serviceSearchQuery.toLowerCase())
  );

  const filteredActions = actions.filter(a =>
    a.title.toLowerCase().includes(actionSearchQuery.toLowerCase()) ||
    a.organization.toLowerCase().includes(actionSearchQuery.toLowerCase()) ||
    a.description.toLowerCase().includes(actionSearchQuery.toLowerCase()) ||
    a.location.toLowerCase().includes(actionSearchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 relative font-sans select-none overflow-x-hidden pb-16">
      
      {/* 1. TOP HEADER APP BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm flex justify-between items-center px-4 h-16 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button 
            id="menu-toggle-btn"
            onClick={() => setIsMenuOpen(true)}
            className="p-2 -ml-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors relative cursor-pointer"
            aria-label="Abrir menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <span className="font-bold text-lg md:text-xl text-slate-800 tracking-tight flex items-center gap-1.5 md:gap-2 select-none">
            Conecta Comunidade <span className="text-blue-600 font-medium text-[10px] md:text-xs border border-blue-100 px-1.5 py-0.5 rounded bg-blue-50">v1.4</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Sessão / Auth Button */}
          {isLoggedIn ? (
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="hidden xs:flex flex-col items-end leading-none">
                <span className="text-[10px] font-extrabold text-slate-700 select-none">Olá, {currentUser.name.split(' ')[0]}</span>
                <span className="text-[8px] text-slate-400 font-mono select-none">@{currentUser.username}</span>
              </div>
              <button 
                onClick={() => {
                  setIsLoggedIn(false);
                  setCurrentUser({ username: '', name: '', avatar: '' });
                  setProfile(prev => ({ ...prev, name: 'Visitante', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100' }));
                  triggerToast('Você saiu da sua conta.');
                }}
                className="text-[9px] font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-150 px-2 md:px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Sair
              </button>
            </div>
          ) : (
            <button 
              onClick={() => {
                setAuthTab('login');
                setIsAuthModalOpen(true);
              }}
              className="text-[10px] font-extrabold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1.5 rounded-lg transition-all hover:bg-blue-100 cursor-pointer flex items-center gap-1"
            >
              <User className="w-3 h-3" /> Entrar / Registrar
            </button>
          )}

          {/* Notifications Trigger */}
          <div className="relative">
            <button 
              id="notifications-btn"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors relative cursor-pointer"
              aria-label="Notificações"
            >
              <Bell className="w-5 h-5" />
              {notifications.some(n => n.isNew) && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            <AnimatePresence>
              {isNotificationsOpen && (
                <>
                  <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsNotificationsOpen(false)}></div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                      <span className="font-semibold text-sm text-slate-800">Notificações</span>
                      <button 
                        onClick={() => {
                          setNotifications(prev => prev.map(n => ({ ...n, isNew: false })));
                          triggerToast('Todas as notificações foram marcadas como lidas');
                        }}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Limpar novas
                      </button>
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                      {notifications.length === 0 ? (
                        <p className="p-6 text-center text-xs text-slate-500">Vazio.</p>
                      ) : (
                        notifications.map(notif => (
                          <div key={notif.id} className={cn("p-4 text-xs transition-colors", notif.isNew ? "bg-blue-50/40" : "bg-white")}>
                            <div className="flex gap-2.5 items-start">
                              <span className={cn("w-2 h-2 mt-1.5 rounded-full", notif.isNew ? "bg-blue-600" : "bg-slate-300")} />
                              <p className="text-slate-700 flex-grow leading-relaxed">{notif.text}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* HAMBURGER DRAWER */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 shadow-xl flex flex-col p-6 border-r border-slate-200"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cidade</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 text-base mt-0.5">
                    <MapPin className="w-4 h-4 text-blue-600" /> Ponta Grossa - PR
                  </span>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="flex-grow space-y-2">
                <button
                  onClick={() => { setActiveTab('inicio'); setIsMenuOpen(false); }}
                  className={cn("w-full flex items-center gap-3.5 p-3 rounded-lg transition-all text-left cursor-pointer text-sm font-medium", activeTab === 'inicio' ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-50 text-slate-600 hover:text-slate-900")}
                >
                  <Home className="w-5 h-5" /> <span>Início</span>
                </button>
                <button
                  onClick={() => { setActiveTab('oportunidades'); setIsMenuOpen(false); }}
                  className={cn("w-full flex items-center gap-3.5 p-3 rounded-lg transition-all text-left cursor-pointer text-sm font-medium", activeTab === 'oportunidades' ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-50 text-slate-600 hover:text-slate-900")}
                >
                  <Briefcase className="w-5 h-5" /> <span>Oportunidades</span>
                </button>
                <button
                  onClick={() => { setActiveTab('servicos'); setIsMenuOpen(false); }}
                  className={cn("w-full flex items-center gap-3.5 p-3 rounded-lg transition-all text-left cursor-pointer text-sm font-medium", activeTab === 'servicos' ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-50 text-slate-600 hover:text-slate-900")}
                >
                  <Wrench className="w-5 h-5" /> <span>Serviços Locais</span>
                </button>
                <button
                  onClick={() => { setActiveTab('projetos'); setIsMenuOpen(false); }}
                  className={cn("w-full flex items-center gap-3.5 p-3 rounded-lg transition-all text-left cursor-pointer text-sm font-medium", activeTab === 'projetos' ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-50 text-slate-600 hover:text-slate-900")}
                >
                  <Store className="w-5 h-5" /> <span>Projetos Sociais</span>
                </button>
                <button
                  onClick={() => { setActiveTab('perfil'); setIsMenuOpen(false); }}
                  className={cn("w-full flex items-center gap-3.5 p-3 rounded-lg transition-all text-left cursor-pointer text-sm font-medium", activeTab === 'perfil' ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-50 text-slate-600 hover:text-slate-900")}
                >
                  <User className="w-5 h-5" /> <span>Perfil e Atividade</span>
                </button>
              </nav>

              <div className="mt-auto pt-6 border-t border-slate-100 flex gap-4 items-center">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-200">
                  <Image 
                    src={profile.avatar}
                    alt="Current user avatar"
                    fill
                    sizes="44px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">{profile.name}</h4>
                  <p className="text-xs text-slate-500">{profile.location.split(',')[0]}</p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 2. MAIN ACTIVE GRAPHICAL TAB SECTION */}
      <main className="flex-grow pt-20 px-4 max-w-sm md:max-w-xl lg:max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: INÍCIO */}
          {activeTab === 'inicio' && (
            <motion.div
              key="inicio-pane"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6 py-4"
            >
              {/* Logo Header Illustration */}
              <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center flex flex-col items-center">
                <div className="relative w-24 h-24 mb-4">
                  <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRElabvdVeukzxlWO7K68TZbISdVld_pVu016aaFscHM9N3xCQD2Ad2S7uctDlUbZo4jDiPCuPn1OQJLjgiLqvgReoKd9QQqaScPKyN3d8UQGSVvBInZlp0CdGVTm80IHg8W0BjomFjYOT5wDbU4eOtrThzJ3p9skjqAAR-8IcByhmBbV-qlDS0Znyd1TnYyIc76GKBOOZT83njkRZotNFOESHsvsXeRW7OHqt18kX4kF1fKtA1DHIv_z9EDOte4_quwmwvi9QqF0"
                    alt="Conecta Comunidade Logo"
                    fill
                    sizes="96px"
                    priority
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                  Olá, bem-vindo(a)!
                </h2>
                <p className="text-slate-500 text-xs md:text-sm mt-1 max-w-xs md:max-w-md leading-relaxed">
                  Encontre serviços, vagas de trabalho, eventos e interaja com vizinhos da sua região.
                </p>

                {/* Animated Primary Illustration */}
                <div className="relative w-full max-w-sm h-64 mt-4 rounded-xl overflow-hidden shadow-sm border border-slate-100">
                  <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRoIU-ko_f101CX7op7PbtENNUr8boWQs-QdH12MJiOloH_KO-AfihBw7paegkg3E7KpDw5mayr0sAbW0Z-Eug_K21peDU3TjQ0aHdxszwKib1w9LOwyrp1sBNBfbZVOGnz92pQw6yGfIPsmLTmVsUtVuDulT-FlEJb3ya_Ys-GJaa71O3BjCS12LRwHg5Q_gowOWdFWs3Iruafpo8Id8IyZKZAmlTlcoj01hRu16YD3E4Nq4jNlVVc2-EWuIw6P4P4BIwUWTn2ds"
                    alt="Community members greeting each other in a neighborhood"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 384px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </section>

              {/* Navigation Grid (Brazilian design system exact cards) */}
              <section className="grid grid-cols-2 gap-4">
                {/* Serviços Locais */}
                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setCurrentModalAction('servicos')}
                  className="bg-white hover:bg-blue-50/50 p-4 rounded-xl text-left flex flex-col justify-between h-32 shadow-xs border border-slate-200 cursor-pointer transition-colors relative overflow-hidden group"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 transition-colors group-hover:bg-blue-100">
                    <Wrench className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm leading-tight transition-colors group-hover:text-blue-700">Serviços Locais</h3>
                    <p className="text-[10px] text-slate-450 mt-1 leading-tight line-clamp-2">Encanadores, eletricistas e reparos.</p>
                  </div>
                </motion.button>

                {/* Vagas de Trabalho */}
                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setActiveTab('oportunidades')}
                  className="bg-white hover:bg-orange-50/50 p-4 rounded-xl text-left flex flex-col justify-between h-32 shadow-xs border border-slate-200 cursor-pointer transition-colors relative overflow-hidden group"
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 transition-colors group-hover:bg-orange-100">
                    <Briefcase className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm leading-tight transition-colors group-hover:text-orange-700">Vagas de Emprego</h3>
                    <p className="text-[10px] text-slate-450 mt-1 leading-tight line-clamp-2">Vagas de emprego e estágios na região.</p>
                  </div>
                </motion.button>

                {/* Ações Comunitárias */}
                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setCurrentModalAction('acoes')}
                  className="bg-white hover:bg-emerald-50/50 p-4 rounded-xl text-left flex flex-col justify-between h-32 shadow-xs border border-slate-200 cursor-pointer transition-colors relative overflow-hidden group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 transition-colors group-hover:bg-emerald-100">
                    <Store className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm leading-tight transition-colors group-hover:text-emerald-700">Projetos Sociais</h3>
                    <p className="text-[10px] text-slate-450 mt-1 leading-tight line-clamp-2">Feiras, mutirões e apoio social.</p>
                  </div>
                </motion.button>

                {/* Fale com a Comunidade (Chat/Feed) */}
                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setCurrentModalAction('fale')}
                  className="bg-white hover:bg-indigo-50/50 p-4 rounded-xl text-left flex flex-col justify-between h-32 shadow-xs border border-slate-200 cursor-pointer transition-colors relative overflow-hidden group"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 transition-colors group-hover:bg-indigo-100">
                    <Compass className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm leading-tight transition-colors group-hover:text-indigo-700">Fale no Canal</h3>
                    <p className="text-[10px] text-slate-450 mt-1 leading-tight line-clamp-2">Chat de moradores e avisos.</p>
                  </div>
                </motion.button>
              </section>
            </motion.div>
          )}

          {/* TAB 2: OPORTUNIDADES */}
          {activeTab === 'oportunidades' && (
            <motion.div
              key="oportunidades-pane"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="py-4 space-y-6"
            >
              {/* Search & Top Action */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                  <input 
                    type="text" 
                    placeholder="Buscar vagas de trabalho..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-100/70 border border-slate-200 text-slate-800 rounded-lg pl-11 pr-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-xs transition-colors"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 rounded-lg text-slate-450 hover:text-slate-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Horizontal filter chips */}
                <div className="flex overflow-x-auto gap-2 py-1.5 scrollbar-none">
                  {['Todas', 'Favoritas', 'Tempo Integral', 'Meio Período', 'Remoto', 'Estágio'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveChip(cat)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border cursor-pointer transition-all",
                        activeChip === cat 
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200"
                      )}
                    >
                      {cat === 'Favoritas' ? '❤️ Favoritas' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured Job Card (Material design 3 / Corporate modern style) */}
              {searchQuery === '' && (activeChip === 'Todas' || activeChip === 'Tempo Integral') && (
                <section>
                  <div className="relative rounded-xl overflow-hidden shadow-xs h-48 group border border-slate-200">
                    <Image 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe7YkOx79MKS6xv4oX3F0RpAA0H34ToN98_yJMTEc7c5xD98p3tvQicN7HxIktVRaIb05TB6a55nYYwx6arqabtEqeBTdLqCD3uMnorSutehyyU_2aDioYLr9bmdjWz4HJn4gVD4okZeO_2t4eOgihvf2Ce9SmNSsga9xoc9vwSBRwKtw7ijjPYxVwYIINQByLzPgbhUDXo0vFIXy-jtqn3mxYe3x3O0OXVrjawdj_JGiERct-3jR8oJyDHm6RQnIaOaNodq1R8iU"
                      alt="Modern coworking space bathe in sunlight"
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      priority
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent flex flex-col justify-end p-5">
                      <span className="bg-orange-600 text-white px-2 py-0.5 rounded text-[9px] font-bold w-fit mb-1.5 uppercase tracking-wide">
                        Destaque da Semana
                      </span>
                      <h3 className="text-white text-base md:text-lg font-bold leading-tight">Auxiliar Administrativo</h3>
                      <p className="text-slate-200 text-xs mt-0.5">Empresa Local Ltda • Presencial - Centro</p>
                      
                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/10">
                        <span className="text-white text-sm font-bold">R$ 2.100,00</span>
                        <button 
                          onClick={() => setSelectedJobDetail(jobs[0])}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-sm"
                        >
                          Ver detalhes
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Filtered Jobs List */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800">Oportunidades recentes</h3>
                
                <div className="space-y-3.5">
                  {jobs
                    .filter(job => {
                      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                            job.company.toLowerCase().includes(searchQuery.toLowerCase());
                      const matchesChip = activeChip === 'Todas' 
                        || (activeChip === 'Favoritas' && job.saved) 
                        || job.type === activeChip;
                      return matchesSearch && matchesChip;
                    })
                    .map(job => (
                      <div 
                        key={job.id}
                        className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col gap-3 relative"
                      >
                        <div className="flex gap-3.5 items-start">
                          <div className={cn("w-11 h-11 rounded-lg flex items-center justify-center shrink-0 border border-slate-100", 
                            job.iconName === 'restaurant' ? "bg-orange-50 text-orange-600" :
                            job.iconName === 'store' ? "bg-blue-50 text-blue-600" : 
                            job.iconName === 'headset_mic' ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-600"
                          )}>
                            {job.iconName === 'restaurant' && <Wrench className="w-5 h-5" />}
                            {job.iconName === 'store' && <Store className="w-5 h-5" />}
                            {job.iconName === 'headset_mic' && <Compass className="w-5 h-5" />}
                            {job.iconName === 'building' && <Briefcase className="w-5 h-5" />}
                          </div>

                          <div className="flex-grow min-w-0">
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="font-bold text-sm text-slate-800 hover:text-blue-650 cursor-pointer leading-tight truncate" onClick={() => setSelectedJobDetail(job)}>{job.title}</h4>
                              {job.isNew && (
                                <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wide shrink-0">
                                  Novo
                                </span>
                              )}
                            </div>
                            <p className="text-slate-500 text-xs mt-0.5">{job.company}</p>
                            <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-400 mb-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{job.location}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-1.5">
                          <div className="text-slate-900 font-bold text-sm">{job.salary}</div>
                          <div className="flex gap-2">
                            <button 
                              onClick={(e) => toggleSaveJob(job.id, e)}
                              className={cn("p-2 rounded-lg border transition-all cursor-pointer", 
                                job.saved 
                                  ? "bg-orange-50 border-orange-200 text-orange-500 shadow-xs" 
                                  : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-400 hover:text-orange-500"
                              )}
                            >
                              <Heart className={cn("w-4 h-4", job.saved ? "fill-current" : "")} />
                            </button>
                            <button 
                              onClick={() => setSelectedJobDetail(job)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                            >
                              Ver detalhes
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  }

                  {jobs.filter(job => {
                    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesChip = activeChip === 'Todas' 
                      || (activeChip === 'Favoritas' && job.saved) 
                      || job.type === activeChip;
                    return matchesSearch && matchesChip;
                  }).length === 0 && (
                    <div className="p-8 text-center bg-white rounded-xl border border-slate-200 shadow-xs w-full">
                      {activeChip === 'Favoritas' ? (
                        <div className="flex flex-col items-center py-4">
                          <Heart className="w-10 h-10 text-rose-450 text-rose-500 mb-2 animate-pulse" />
                          <p className="text-sm font-semibold text-slate-700">Nenhuma vaga favorita adicionada</p>
                          <p className="text-xs text-slate-500 mt-1 max-w-[280px] mx-auto leading-relaxed">
                            Toque no ícone de coração das vagas na aba de Oportunidades para salvá-las aqui!
                          </p>
                        </div>
                      ) : (
                        <>
                          <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                          <p className="text-sm font-semibold text-slate-700">Nenhuma vaga encontrada</p>
                          <p className="text-xs text-slate-500 mt-1">Experimente mudar o termo de busca ou filtro.</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </section>
            </motion.div>
          )}

          {/* TAB 3: SERVIÇOS LOCAIS */}
          {activeTab === 'servicos' && (
            <motion.div
              key="servicos-pane"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="py-4 space-y-5"
            >
              {/* Header with Title and Search Input */}
              <div className="space-y-4">
                <div>
                  <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-blue-600" /> Serviços de Ponta Grossa
                  </h1>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Ache profissionais prestadores de serviços de confiança recomendados por vizinhos do bairro.
                  </p>
                </div>

                <div className="bg-white rounded-2xl px-4 h-12 flex items-center gap-3 border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                  <Search className="text-slate-400 w-4.5 h-4.5 shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Buscar por encanador, eletricista, pintor..."
                    value={serviceSearchQuery}
                    onChange={(e) => setServiceSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none text-xs text-slate-705 font-medium placeholder-slate-400 focus:outline-none focus:ring-0 w-full"
                  />
                  {serviceSearchQuery && (
                    <button 
                      onClick={() => setServiceSearchQuery('')}
                      className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Services List Grid / Stack */}
              <div className="space-y-4">
                {filteredServices.length === 0 ? (
                  <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-xs flex flex-col items-center">
                    <AlertCircle className="w-8 h-8 text-slate-300 mb-2" />
                    <p className="text-sm font-semibold text-slate-700">Nenhum serviço encontrado</p>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                      Experimente mudar o termo da sua pesquisa.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredServices.map(ser => (
                      <div key={ser.id} className="bg-white p-5 rounded-3xl border border-slate-200 flex flex-col justify-between gap-3 shadow-md hover:shadow-lg transition-all relative overflow-hidden group">
                        
                        {/* Service Top Information */}
                        <div className="flex justify-between items-start">
                          <div className="flex gap-3.5">
                            <div className="w-11 h-11 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 shadow-inner">
                              <Wrench className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded font-bold uppercase tracking-wider select-none">
                                Verificado
                              </span>
                              <h3 className="font-bold text-sm text-slate-800 leading-tight mt-1.5">{ser.title}</h3>
                              <p className="text-xs text-orange-700 font-extrabold mt-0.5">{ser.provider}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 self-start">
                            <button 
                              onClick={(e) => toggleSaveService(ser.id, e)}
                              className="p-2 text-slate-350 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                              aria-label="bookmark"
                            >
                              <Heart className={cn("w-4.5 h-4.5 transition-transform", ser.saved ? "fill-[#d22d2d] text-[#d22d2d] scale-110" : "text-slate-400 hover:scale-105")} />
                            </button>
                            <span className="text-amber-600 font-bold text-xs bg-amber-50 px-2 py-1 rounded-lg flex items-center gap-0.5">
                              ★ {ser.rating}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                          {ser.description}
                        </p>

                        {/* Location Badge */}
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs pb-1">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate font-medium">{ser.location}</span>
                        </div>

                        {/* Contact details */}
                        <div className="flex justify-between items-center mt-2.5 pt-3 border-t border-slate-100">
                          <span className="text-xs text-slate-400 font-bold">Contato Direto</span>
                          <a 
                            href={`tel:${ser.contact.replace(/\D/g, '')}`}
                            className="text-xs font-bold text-blue-700 hover:underline bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-xl transition-all"
                          >
                            📞 {ser.contact}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 4: PROJETOS SOCIAIS */}
          {activeTab === 'projetos' && (
            <motion.div
              key="projetos-pane"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="py-4 space-y-5"
            >
              {/* Header with Title and Search Input */}
              <div className="space-y-4">
                <div>
                  <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Store className="w-5 h-5 text-emerald-600" /> Projetos Sociais & Ações
                  </h1>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Participe ativamente dos mutirões ecológicos e projetos que transformam a comunidade de Ponta Grossa.
                  </p>
                </div>

                <div className="bg-white rounded-2xl px-4 h-12 flex items-center gap-3 border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                  <Search className="text-slate-400 w-4.5 h-4.5 shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Buscar por mutirão, associação, feira..."
                    value={actionSearchQuery}
                    onChange={(e) => setActionSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none text-xs text-slate-705 font-medium placeholder-slate-400 focus:outline-none focus:ring-0 w-full"
                  />
                  {actionSearchQuery && (
                    <button 
                      onClick={() => setActionSearchQuery('')}
                      className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Actions list */}
              <div className="space-y-4">
                {filteredActions.length === 0 ? (
                  <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-xs flex flex-col items-center">
                    <AlertCircle className="w-8 h-8 text-slate-300 mb-2" />
                    <p className="text-sm font-semibold text-slate-700">Nenhum projeto encontrado</p>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                      Experimente alterar a palavra de busca.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 font-sans">
                    {filteredActions.map(act => (
                      <div key={act.id} className="bg-white p-5 rounded-3xl border border-slate-200 flex flex-col md:flex-row gap-4 shadow-md overflow-hidden relative group hover:shadow-lg transition-all">
                        {act.image && (
                          <div className="relative w-full md:w-40 h-32 rounded-2xl overflow-hidden shrink-0 border border-slate-100 shadow-inner">
                            <Image 
                              src={act.image} 
                              alt={act.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 160px"
                              className="object-cover group-hover:scale-102 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            {act.highlight && (
                              <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-xs text-[9px] text-white py-1 px-2 rounded-lg font-bold truncate">
                                {act.highlight}
                              </div>
                            )}
                          </div>
                        )}
                        <div className="flex-grow flex flex-col justify-between gap-3">
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-start gap-2 flex-wrap">
                              <h3 className="font-extrabold text-sm text-primary leading-snug">{act.title}</h3>
                              <div className="text-[10px] font-bold shrink-0 text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
                                {act.participants} participantes
                              </div>
                            </div>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">{act.description}</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                            <div className="flex items-center gap-1.5 truncate">
                              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <div className="truncate">
                                <span className="block text-[8px] text-slate-400 uppercase font-black tracking-wider">Data & Horário</span>
                                <span className="font-semibold text-slate-700 text-[10px]">{act.date} • {act.time}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 truncate">
                              <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <div className="truncate">
                                <span className="block text-[8px] text-slate-400 uppercase font-black tracking-wider">Organização</span>
                                <span className="font-semibold text-slate-705 text-[10px] truncate block max-w-[150px]">{act.organization}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center gap-3 pt-1 border-t border-slate-100">
                            <span className="text-[10px] text-slate-400 font-bold">Inscrições Gratuitas</span>
                            <button
                              onClick={() => handleJoinAction(act.id)}
                              className={cn(
                                "text-xs font-semibold px-4 py-2 rounded-xl border transition-all cursor-pointer shadow-xs",
                                act.joined
                                  ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                                  : "bg-[#074275] border-[#074275] text-white hover:bg-blue-805"
                              )}
                            >
                              {act.joined ? '✓ Confirmado' : 'Quero Participar'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 3_OLD: INTERNAL REGION */}
          {false && (
            <motion.div
              key="mapa-pane"
              className="py-4 space-y-4"
            >
              <div id="temp-to-delete">
              </div>
              <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm h-96 bg-[#eff4ff]">
                
                {/* Background Aerial Map image */}
                <div className="absolute inset-0 z-0">
                  <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXuqn5pAjwY7WpqoVsVP5rIiuH5dlCz4rZdxX2ROjVIwW1j2khwuku3b7F0VKUOFf4PDf6LQGpML278cFglQWjEK7Tq9oyJieQT5GmpSsS7Y6EAaHY2iPPwsINoPyIzJpLahCRZSVrffJaLoxA6xuMqJDqGy2kFGNNPpprdpE0wBafjuze4m858p-uvSk1xX6aV4gLJHcCIr_kb0n6Lt1O5-eeSUkMBDpW3v65GcgiRLNEgtYe_s3Tb0SDsRP-s3Pgws6WW2SoHU8"
                    alt="Mapa de Ponta Grossa - PR"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    priority
                    className="object-cover opacity-80 mix-blend-multiply filter saturate-50 contrast-125"
                    referrerPolicy="no-referrer"
                    style={{ transform: `scale(${zoomLevel / 14}) translate(${mapCenter.x - 50}px, ${mapCenter.y - 50}px)`, transition: 'transform 0.4s ease-out' }}
                  />
                </div>

                {/* Animated Simulated Router Path Tracing */}
                {showAnimatedRoute && (
                  <svg className="absolute inset-0 z-10 pointer-events-none w-full h-full">
                    <motion.path 
                      d="M 50 280 Q 90 200, 150 230 T 250 180" 
                      fill="none" 
                      stroke="#2563eb" 
                      strokeWidth="5" 
                      strokeLinecap="round"
                      strokeDasharray="10 5"
                      initial={{ strokeDashoffset: 50 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ ease: "linear", duration: 3, repeat: Infinity }}
                    />
                    <motion.path 
                      d="M 50 280 Q 90 200, 150 230 T 250 180" 
                      fill="none" 
                      stroke="#1d4ed8" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                    />
                  </svg>
                )}

                {/* PULSING CURRENT USER LOCATION MARKER */}
                <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2 z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-600/20 rounded-full scale-250 animate-ping"></div>
                    <div className="w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow-md"></div>
                  </div>
                </div>

                {/* MARKER 1: CATERING (Vagas) */}
                {(mapCategory === 'Tudo' || mapCategory === 'Vagas') && (
                  <button 
                    onClick={() => { setSelectedMarkerId('marker-catering'); setIsBottomSheetOpen(true); }}
                    className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2 z-25 transition-transform hover:scale-110 active:scale-95 group cursor-pointer"
                  >
                    <div className="flex flex-col items-center">
                      <div className="bg-orange-500 text-white p-2 rounded-full shadow-md border-2 border-white animate-bounce-slow">
                        <Briefcase className="w-4.5 h-4.5 text-white" />
                      </div>
                      <div className="w-1 h-1.5 bg-orange-500 -mt-0.5"></div>
                      <div className="bg-white/95 backdrop-blur-xs text-[10px] font-bold text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 mt-1 shadow-xs">
                        Vaga: Cozinheiro
                      </div>
                    </div>
                  </button>
                )}

                {/* MARKER 2: FEIRA COMUNITÁRIA (Ações) */}
                {(mapCategory === 'Tudo' || mapCategory === 'Ações') && (
                  <button 
                    onClick={() => { setSelectedMarkerId('marker-fair'); setIsBottomSheetOpen(true); }}
                    className="absolute top-[45%] left-2/3 transform -translate-x-1/2 -translate-y-1/2 z-25 transition-transform hover:scale-110 active:scale-95 group cursor-pointer"
                  >
                    <div className="flex flex-col items-center">
                      <div className="bg-emerald-600 text-white p-2.5 rounded-full shadow-lg border-2 border-white scale-110">
                        <Store className="w-4.5 h-4.5 text-white" />
                      </div>
                      <div className="w-1 h-2 bg-emerald-600 -mt-0.5"></div>
                      <div className="bg-white/95 backdrop-blur-xs text-[10px] font-bold text-emerald-700 px-3 py-1 rounded-lg border border-emerald-200 mt-1 shadow-sm font-medium">
                        Feira Comunitária ✓
                      </div>
                    </div>
                  </button>
                )}

                {/* MARKER 3: PLUMBER (Serviços) */}
                {(mapCategory === 'Tudo' || mapCategory === 'Serviços') && (
                  <button 
                    onClick={() => { setSelectedMarkerId('marker-plumber'); setIsBottomSheetOpen(true); }}
                    className="absolute bottom-1/3 left-[70%] transform -translate-x-1/2 -translate-y-1/2 z-25 transition-transform hover:scale-110 active:scale-95 group cursor-pointer"
                  >
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-600 text-white p-2 rounded-full shadow-md border-2 border-white">
                        <Wrench className="w-4.5 h-4.5 text-white" />
                      </div>
                      <div className="w-1 h-1.5 bg-blue-600 -mt-0.5"></div>
                      <div className="bg-white/95 backdrop-blur-xs text-[10px] font-bold text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 mt-1 shadow-xs">
                        Carlos Eduardo
                      </div>
                    </div>
                  </button>
                )}

                {/* Zoom UI Control Map overlays */}
                <div className="absolute right-4 bottom-4 z-30 flex flex-col gap-2">
                  <button 
                    onClick={() => {
                      setShowAnimatedRoute(false);
                      setMapCenter({ x: 50, y: 50 });
                      triggerToast('Pulsando sua localização...');
                    }}
                    className="bg-white w-10 h-10 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-blue-600 cursor-pointer transition-colors"
                    aria-label="Minha localização"
                  >
                    <Compass className="w-5 h-5" />
                  </button>
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                    <button 
                      onClick={() => setZoomLevel(prev => Math.min(prev + 1, 18))}
                      className="w-10 h-10 flex items-center justify-center text-blue-600 hover:bg-slate-50 border-b border-slate-100 cursor-pointer transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setZoomLevel(prev => Math.max(prev - 1, 12))}
                      className="w-10 h-10 flex items-center justify-center text-blue-600 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Informative Tip indicator */}
              <div className="bg-white border border-slate-100 p-3 rounded-xl flex items-center gap-3 shadow-xs">
                <AlertCircle className="w-5 h-5 text-blue-500 shrink-0" />
                <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                  Toque nos pinos do mapa acima para ver os detalhes, calcular rota de caminhada ou favoritar!
                </p>
              </div>

              {/* SLIDING MAP BOTTOM SHEET (Sliding drawer element) */}
              <AnimatePresence>
                {isBottomSheetOpen && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40"
                      onClick={() => setIsBottomSheetOpen(false)}
                    />
                    
                    <motion.div
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '100%' }}
                      transition={{ type: 'spring', damping: 20, stiffness: 180 }}
                      className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-xl max-h-[85%] overflow-hidden flex flex-col border-t border-slate-200"
                    >
                      {/* Drag handles bar */}
                      <div className="w-full flex justify-center py-3.5 cursor-pointer select-none" onClick={() => setIsBottomSheetOpen(false)}>
                        <div className="w-12 h-1 bg-slate-200 rounded-full" />
                      </div>

                      <div className="overflow-y-auto px-5 pb-8">
                        {selectedMarkerId === 'marker-fair' && (
                          <div className="space-y-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex gap-2 items-center flex-wrap">
                                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                                    Ação Comunitária
                                  </span>
                                  <span className="text-amber-600 font-bold text-xs flex items-center gap-0.5">
                                    ★ 4.9 <span className="text-slate-400 font-normal text-[10px]">(124 avaliações)</span>
                                  </span>
                                </div>
                                <h2 className="text-lg font-bold text-slate-900 mt-1.5">Feira Comunitária da Esperança</h2>
                                <p className="text-xs text-slate-500 font-medium">Av. Vicente Machado, 123 • Sábado, 08h às 18h</p>
                              </div>
                              <button 
                                onClick={() => setIsBottomSheetOpen(false)}
                                className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>

                            {/* CTAs Row */}
                            <div className="flex gap-2.5">
                              <button 
                                onClick={() => {
                                  setShowAnimatedRoute(true);
                                  setIsBottomSheetOpen(false);
                                  triggerToast('Rota traçada! Veja a linha pontilhada no mapa.');
                                }}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                              >
                                <Compass className="w-4 h-4" /> Como chegar
                              </button>
                            </div>

                            {/* Content Description */}
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">
                              Iniciativa organizada de vizinhos para apoiar agricultores familiares, pequenos eletricistas e artistas locais. Participe e consuma do bairro!
                            </p>

                            {/* Highlight Feature Image inside bottom sheet */}
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-1.5 flex gap-3.5 items-center">
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                                <Image
                                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHA2ey8f2lt1bePpDY2nOYKzBC2iHXvGCzLwZoAO-EubWihBKHQ_ZaUdYYowZ-RV6zP8A390eL2JAaO7C0l6VNyymMG0j7J2SYXsTeCh3wS-11KJRRkFw1p7P12pq_2fMheBMsUeDDcGkLGJrs4XYknf4YDzuAVCP6MoUfA14FfRR3oACG98VqkXM0ASYjDcptpNGgZ9iAIDBBHVU7LxqUoKkJVhfke6KTLlRW1wMdGBNE3ZEWQ5e8zwH3msZXWlyLHKCl4gqx8_o"
                                  alt="Organic market stall close up"
                                  fill
                                  sizes="64px"
                                  className="object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600 block">Destaque do Dia</span>
                                <h4 className="font-bold text-sm text-slate-800 leading-tight mt-0.5">Cestas de Frutas Orgânicas</h4>
                                <p className="text-xs text-slate-550 mt-0.5">Apenas R$ 35,00 reservando com antecedência.</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedMarkerId === 'marker-catering' && (
                          <div className="space-y-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex gap-2">
                                  <span className="bg-orange-50 text-orange-700 border border-orange-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                                    Vaga de Trabalho
                                  </span>
                                  <span className="text-slate-450 font-bold text-xs font-medium">Uvaranas</span>
                                </div>
                                <h2 className="text-lg font-bold text-slate-900 mt-1.5">Auxiliar de Cozinha</h2>
                                <p className="text-xs text-slate-500">Restaurante Sabor do Bairro • Meio Período</p>
                              </div>
                              <button 
                                onClick={() => setIsBottomSheetOpen(false)}
                                className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-705 transition-colors cursor-pointer"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>

                            <div className="bg-blue-50 p-3.5 rounded-lg border border-blue-100 text-xs shadow-xs">
                              <div className="font-bold text-blue-700">Salário Oferecido</div>
                              <div className="text-base font-extrabold text-slate-800 mt-0.5">R$ 1.650,00</div>
                            </div>

                            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                              Preparo de panificação artesanal local, organização de louças e apoio geral na dinâmica interna de atendimento.
                            </p>

                            <div className="flex gap-2.5">
                              <button 
                                onClick={() => {
                                  toggleSaveJob('job-3');
                                }}
                                className={cn(
                                  "w-full py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-xs flex items-center justify-center gap-2 border",
                                  jobs.find(j => j.id === 'job-3')?.saved
                                    ? "bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
                                    : "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
                                )}
                              >
                                <Heart className={cn("w-4 h-4", jobs.find(j => j.id === 'job-3')?.saved ? "fill-orange-600 text-orange-600" : "text-white")} />
                                {jobs.find(j => j.id === 'job-3')?.saved ? 'Remover dos Favoritos' : 'Salvar nos Favoritos'}
                              </button>
                            </div>
                          </div>
                        )}

                        {selectedMarkerId === 'marker-plumber' && (
                          <div className="space-y-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                                  Serviço Verificado
                                </span>
                                <h2 className="text-lg font-bold text-slate-900 mt-1.5">Carlos Eduardo - Encanador Residencial</h2>
                                <p className="text-xs text-slate-500">Oficinas • WhatsApp no bairro</p>
                              </div>
                              <button 
                                onClick={() => setIsBottomSheetOpen(false)}
                                className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-1.5 text-xs">
                              <div className="font-medium text-slate-400">Contato Direto</div>
                              <div className="text-sm font-extrabold text-blue-700 mt-0.5">{services[0].contact}</div>
                            </div>

                            <p className="text-xs text-slate-500 leading-relaxed font-medium">
                              Atendimento rápido em residências de Oficinas, Centro, Estrela e Uvaranas. Vazamentos de pias, canos e desentupimentos urgentes de calhas e esgoto.
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* TAB 4: PERFIL (Material Bento Design) */}
          {activeTab === 'perfil' && (
            <motion.div
              key="perfil-pane"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="py-4 space-y-6"
            >
              {!isLoggedIn ? (
                <div className="bg-white rounded-3xl p-8 border border-slate-200 mt-8 text-center shadow-xs max-w-sm mx-auto flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-800 font-sans">Conecte sua Conta</h2>
                    <p className="text-[11px] text-slate-450 mt-2 leading-relaxed font-sans">
                      Faça o login ou crie seu cadastro com nome de usuário e senha para monitorar suas inscrições locais, gerenciar serviços e vagas favoritas de Ponta Grossa.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setAuthTab('login');
                      setIsAuthModalOpen(true);
                    }}
                    className="w-full bg-[#074275] hover:bg-[#1a5183] text-white py-2.5 rounded-xl font-bold text-xs cursor-pointer transition-colors shadow-sm mt-1 font-sans"
                  >
                    Fazer Login / Criar Conta
                  </button>
                </div>
              ) : (
                <>
                  {/* Profile Header Block */}
              <section className="flex flex-col items-center text-center">
                <div className="relative mb-3 group">
                  <div className="w-24 h-24 rounded-full border-2 border-slate-200 p-1 shadow-sm bg-white relative overflow-hidden">
                    <Image 
                      src={profile.avatar}
                      alt="User Portrait Avatar"
                      fill
                      sizes="96px"
                      className="object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <button 
                    onClick={() => {
                      setEditNameField(profile.name);
                      setEditAvatarField(profile.avatar);
                      setIsEditProfileOpen(true);
                    }}
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full shadow-sm hover:bg-blue-750 transition-colors cursor-pointer"
                    aria-label="Editar perfil"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                </div>

                <h2 className="text-lg font-bold text-slate-900">{profile.name}</h2>
                <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  <span>{profile.location}</span>
                </div>
              </section>

              {/* Bento statistical list widgets */}
              <section className="grid grid-cols-2 gap-3.5">
                <div 
                  onClick={() => triggerToast('Mais informações nas listagens detalhadas abaixo!')}
                  className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 text-center flex flex-col justify-center cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="text-xl font-bold text-slate-900">{profile.servicesCount}</span>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 mt-1">
                    Atividades Locais
                  </span>
                </div>
                <div 
                  onClick={() => triggerToast('Veja o botão "Inscrições" e "Salvos" no menu de ações.')}
                  className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 text-center flex flex-col justify-center cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="text-xl font-bold text-blue-600">{savedJobsCount}</span>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 mt-1">
                    Vagas Salvas
                  </span>
                </div>
              </section>

              {/* Preferred Actions Lists */}
              <section className="space-y-3">
                <h3 className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-1">Atividades e Preferências</h3>
                
                <div className="space-y-3">
                  {/* Saved items list */}
                  <div className="bg-white rounded-xl border border-slate-205 overflow-hidden shadow-xs">
                    <button 
                      onClick={() => {
                        setActiveTab('oportunidades');
                        setActiveChip('Favoritas');
                        triggerToast('Mostrando suas vagas favoritas!');
                      }}
                      className="w-full flex justify-between items-center p-3.5 hover:bg-slate-50 text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8.5 h-8.5 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                          <Heart className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-semibold text-xs text-slate-800">Vagas Favoritadas</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {jobs.filter(j => j.saved).length} salvas na carteira
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Settings Help & Logout list layout */}
                  <div className="bg-white rounded-xl border border-slate-205 overflow-hidden divide-y divide-slate-100 shadow-xs">
                    <button 
                      onClick={() => {
                        triggerToast('As preferências estão configuradas automaticamente para Ponta Grossa.', 'info');
                      }}
                      className="w-full flex justify-between items-center p-3.5 hover:bg-slate-50 text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8.5 h-8.5 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                          <Settings className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-semibold text-xs text-slate-800">Configurações de Privacidade</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5 animate-pulse-slow">Filtro de visibilidade e notificações</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button 
                      onClick={() => {
                        setIsHelpModalOpen(true);
                        triggerToast('Abrindo a Central de Ajuda...', 'success');
                      }}
                      className="w-full flex justify-between items-center p-3.5 hover:bg-slate-50 text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8.5 h-8.5 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                          <HelpCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-semibold text-xs text-slate-800">Central de Ajuda</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">Dúvidas frequentes, suporte e contato por email ou WhatsApp</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button 
                      onClick={() => {
                        setIsLoggedIn(false);
                        setCurrentUser({ username: '', name: '', avatar: '' });
                        setProfile(prev => ({ ...prev, name: 'Visitante', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100' }));
                        triggerToast('Você saiu da sua conta.');
                      }}
                      className="w-full flex justify-between items-center p-3.5 bg-orange-50/20 hover:bg-orange-50/40 text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8.5 h-8.5 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                          <LogOut className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-semibold text-xs text-orange-600">Sair da Conta</span>
                          <span className="text-[10px] text-orange-400 block mt-0.5">Limpar dados locais do navegador</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </section>
                </>
              )}

              {/* Version Credit label */}
              <div className="text-center text-[10px] text-slate-400 pt-3 font-medium tracking-wide">
                Conecta Comunidade PR • Versão Estável 1.4.2
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 3. ABSOLUTE PERSISTENT BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-1.5 flex justify-around items-center h-16 shadow-lg">
        {/* Início Tab Indicator */}
        <button
          onClick={() => setActiveTab('inicio')}
          className={cn(
            "flex flex-col items-center justify-center px-2 py-1 rounded-lg transition-all duration-300 gap-1 cursor-pointer",
            activeTab === 'inicio' 
              ? "text-blue-600 font-bold" 
              : "text-slate-400 hover:text-slate-600"
          )}
        >
          <Home className={cn("w-5 h-5", activeTab === 'inicio' ? "text-blue-600" : "text-slate-400")} />
          <span className="text-[10px] font-semibold leading-none">Início</span>
        </button>

        {/* Oportunidades Tab Indicator */}
        <button
          onClick={() => setActiveTab('oportunidades')}
          className={cn(
            "flex flex-col items-center justify-center px-2 py-1 rounded-lg transition-all duration-300 gap-1 cursor-pointer",
            activeTab === 'oportunidades' 
              ? "text-blue-600 font-bold" 
              : "text-slate-400 hover:text-slate-600"
          )}
        >
          <Briefcase className={cn("w-5 h-5", activeTab === 'oportunidades' ? "text-blue-600" : "text-slate-400")} />
          <span className="text-[10px] font-semibold leading-none">Vagas</span>
        </button>

        {/* Serviços Locais Tab Indicator */}
        <button
          onClick={() => setActiveTab('servicos')}
          className={cn(
            "flex flex-col items-center justify-center px-2 py-1 rounded-lg transition-all duration-300 gap-1 cursor-pointer",
            activeTab === 'servicos' 
              ? "text-blue-600 font-bold" 
              : "text-slate-400 hover:text-slate-600"
          )}
        >
          <Wrench className={cn("w-5 h-5", activeTab === 'servicos' ? "text-blue-600" : "text-slate-400")} />
          <span className="text-[10px] font-semibold leading-none">Serviços</span>
        </button>

        {/* Projetos Sociais Tab Indicator */}
        <button
          onClick={() => setActiveTab('projetos')}
          className={cn(
            "flex flex-col items-center justify-center px-2 py-1 rounded-lg transition-all duration-300 gap-1 cursor-pointer",
            activeTab === 'projetos' 
              ? "text-blue-600 font-bold" 
              : "text-slate-400 hover:text-slate-600"
          )}
        >
          <Store className={cn("w-5 h-5", activeTab === 'projetos' ? "text-blue-600" : "text-slate-400")} />
          <span className="text-[10px] font-semibold leading-none">Projetos</span>
        </button>

        {/* Perfil Tab Indicator */}
        <button
          onClick={() => setActiveTab('perfil')}
          className={cn(
            "flex flex-col items-center justify-center px-2 py-1 rounded-lg transition-all duration-300 gap-1 cursor-pointer",
            activeTab === 'perfil' 
              ? "text-blue-600 font-bold" 
              : "text-slate-400 hover:text-slate-600"
          )}
        >
          <User className={cn("w-5 h-5", activeTab === 'perfil' ? "text-blue-600" : "text-slate-400")} />
          <span className="text-[10px] font-semibold leading-none">Perfil</span>
        </button>
      </nav>

      {/* 4. DETAILS DRAWER MODALS */}

      {/* JOB DETAILS DRAWER (Full Info overlay sliding over right/bottom) */}
      <AnimatePresence>
        {selectedJobDetail && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
              onClick={() => setSelectedJobDetail(null)}
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 22, stiffness: 180 }}
              className="fixed bottom-0 left-0 right-0 max-h-[90%] bg-white rounded-t-3xl z-50 p-6 overflow-y-auto shadow-2xl flex flex-col gap-5 border-t border-outline-variant/30"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex gap-2 items-center">
                    <span className="bg-primary-container text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {selectedJobDetail.type}
                    </span>
                    <span className="font-bold text-xs text-[#8b5000] bg-orange-50 px-2 rounded">
                      Presencial
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-primary mt-2">{selectedJobDetail.title}</h2>
                  <p className="text-xs text-on-surface-variant font-semibold mt-0.5">{selectedJobDetail.company}</p>
                  
                  {selectedJobDetail.applied && (
                    <div className="mt-3 bg-emerald-50 border border-emerald-100 text-emerald-800 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Candidatura Enviada! Seu interesse foi registrado.</span>
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => setSelectedJobDetail(null)}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main specifications Bento */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Salário Fixo</span>
                  <span className="text-base font-extrabold text-primary block mt-0.5">{selectedJobDetail.salary}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Localização</span>
                  <span className="text-xs font-semibold text-on-surface block mt-0.5 truncate">{selectedJobDetail.location}</span>
                </div>
              </div>

              {/* Job descriptions */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-primary mb-1.5">Descrição da Vaga</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {selectedJobDetail.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-primary mb-2">Requisitos Mínimos</h4>
                  <ul className="space-y-2">
                    {selectedJobDetail.requirements.map((req, i) => (
                      <li key={i} className="flex gap-2 text-xs text-on-surface-variant items-start">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Favoritar / Salvar Vaga button */}
              <div className="flex gap-3 pt-4 border-t border-outline-variant/15 mt-auto">
                <button 
                  onClick={(e) => {
                    toggleSaveJob(selectedJobDetail.id, e);
                    setSelectedJobDetail(prev => prev ? { ...prev, saved: !prev.saved } : null);
                  }}
                  className={cn(
                    "w-full py-3 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 border",
                    selectedJobDetail.saved 
                      ? "bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100" 
                      : "bg-[#074275] text-white hover:bg-[#2b5a8e] border-[#074275]"
                  )}
                >
                  <Heart className={cn("w-4 h-4", selectedJobDetail.saved ? "fill-orange-600 text-orange-600" : "text-white")} />
                  {selectedJobDetail.saved ? 'Remover dos Favoritos' : 'Salvar nos Favoritos'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* DETAILED DIALOG CATEGORY MODALS TRIGGERED FROM GRID INÍCIO GRID */}
      <AnimatePresence>
        {currentModalAction !== null && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setCurrentModalAction(null)}
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 max-h-[85%] bg-white rounded-t-3xl z-50 p-6 overflow-y-auto shadow-xl flex flex-col gap-4 border-t"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-3 border-b flex-wrap">
                <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                  {currentModalAction === 'servicos' && <><Wrench className="w-5 h-5 text-primary" /> Serviços de Ponta Grossa</>}
                  {currentModalAction === 'acoes' && <><Store className="w-5 h-5 text-emerald-600" /> Ações Comunitárias</>}
                  {currentModalAction === 'fale' && <><Compass className="w-5 h-5 text-secondary" /> Fale no Canal de Ponta Grossa</>}
                  {currentModalAction === 'curso' && <><BookOpen className="w-5 h-5 text-blue-600" /> Curso de Informática</>}
                </h2>
                <button 
                  onClick={() => setCurrentModalAction(null)}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* SERVIÇOS MODAL COMPONENT */}
              {currentModalAction === 'servicos' && (
                <div className="space-y-4">
                  <p className="text-xs text-on-surface-variant">
                    Profissionais prestadores de serviços de confiança revisados e recomendados pelos vizinhos de Ponta Grossa.
                  </p>
                  
                  <div className="space-y-3">
                    {services.map(ser => (
                      <div key={ser.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2 shadow-sm">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                              <Wrench className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-bold text-sm text-slate-800 leading-tight">{ser.title}</h3>
                              <p className="text-xs text-orange-700 font-bold mt-0.5">{ser.provider}</p>
                            </div>
                          </div>
                          <span className="text-amber-600 font-bold text-xs flex items-center gap-0.5">
                            ★ {ser.rating}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{ser.description}</p>
                        <div className="flex justify-between items-center mt-2.5 pt-2 border-t border-slate-100">
                          <span className="text-xs text-slate-400 font-semibold">Contato Direto</span>
                          <span className="text-sm font-extrabold text-blue-700">{ser.contact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AÇÕES COMUNITÁRIAS / PROJETOS MODAL */}
              {currentModalAction === 'acoes' && (
                <div className="space-y-4">
                  <p className="text-xs text-on-surface-variant">
                    Participe ativamente dos mutirões ecológicos e projetos sociais que transformam nosso bairro.
                  </p>
                  
                  <div className="space-y-3">
                    {actions.map(act => (
                      <div key={act.id} className="p-4 bg-slate-50 rounded-2xl border flex flex-col gap-2.5">
                        <div className="flex justify-between items-start gap-1">
                          <h3 className="font-bold text-sm text-primary leading-snug">{act.title}</h3>
                          <div className="text-[10px] font-bold shrink-0 text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                            {act.participants} inscritos
                          </div>
                        </div>
                        <p className="text-xs text-on-surface-variant">{act.description}</p>
                        <div className="text-xs bg-white p-2.5 rounded-xl border border-dashed flex justify-between">
                          <div>
                            <span className="block text-[10px] text-slate-400 uppercase font-bold">Data & Hora</span>
                            <span className="font-semibold text-slate-700">{act.date} às {act.time}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-slate-400 uppercase font-bold">Organizador</span>
                            <span className="font-semibold text-slate-700 truncate block max-w-[120px]">{act.organization}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FALE COM A COMUNIDADE CHAT FEED MODAL */}
              {currentModalAction === 'fale' && (
                <div className="flex flex-col h-[500px]">
                  <p className="text-xs text-slate-400 pb-3 mb-2 border-b">
                    Bate-papo comunitário seguro. Faça perguntas, venda itens usados ou divulgue informes.
                  </p>

                  {/* Message feed display */}
                  <div className="flex-grow overflow-y-auto space-y-3 pr-1 py-1">
                    {chatMessages.map(msg => (
                      <div key={msg.id} className={cn("flex gap-2.5 max-w-[85%] items-end", msg.isMe ? "ml-auto flex-row-reverse" : "mr-auto")}>
                        <div className={cn("w-8.5 h-8.5 rounded-full flex items-center justify-center font-bold text-xs border shrink-0 shadow-inner-soft", 
                          msg.isMe ? "bg-primary text-white" : "bg-amber-100 text-[#8b5000]"
                        )}>
                          {msg.avatarLetter}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className={cn("text-[10px] text-slate-450 block font-bold", msg.isMe ? "text-right" : "")}>
                            {msg.user} • <span className="font-normal">{msg.timestamp}</span>
                          </span>
                          <p className={cn("p-3 rounded-2xl text-xs leading-relaxed shadow-sm", 
                            msg.isMe ? "bg-primary text-white rounded-tr-none" : "bg-slate-100 text-on-surface rounded-tl-none"
                          )}>
                            {msg.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Submission typing bar */}
                  <div className="pt-3 border-t flex gap-2 mt-4">
                    <input 
                      type="text"
                      placeholder="Envie uma mensagem ou informe para o bairro..."
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && submitChatMessage()}
                      className="flex-grow bg-[#eff4ff] border-none text-xs rounded-full px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary shadow-inner-soft"
                    />
                    <button 
                      onClick={submitChatMessage}
                      className="bg-[#074275] hover:bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-md cursor-pointer"
                      aria-label="Send"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* CURSO DE INFORMÁTICA DETAILED MODAL */}
              {currentModalAction === 'curso' && (
                <div className="space-y-4">
                  <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base leading-tight font-sans tracking-tight">Curso de Informática Básico</h3>
                      <p className="text-xs text-blue-700 font-bold mt-1 font-sans">Iniciativa Social • Capacitação Geral</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs leading-relaxed text-slate-650">
                    <p>
                      O <strong>Curso de Informática Básico Gratuito</strong> é voltado a pessoas de todas as idades que desejam aprender a operar computadores, navegar com segurança na internet, utilizar ferramentas do cotidiano (como planilhas e editores de texto) e se destacar no mercado de trabalho.
                    </p>
                    
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 gap-3.5">
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-400 leading-none">Início das Aulas</span>
                        <strong className="text-slate-800 text-xs block mt-1.5 font-extrabold">08 de Junho, 19:00</strong>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-400 leading-none">Localização Presencial</span>
                        <strong className="text-slate-800 text-xs block mt-1.5 font-extrabold">Associação de Moradores</strong>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-400 leading-none">Duração Estimada</span>
                        <strong className="text-slate-800 text-xs block mt-1.5 font-extrabold">4 semanas (Seg / Qua)</strong>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-400 leading-none">Custo Total</span>
                        <strong className="text-emerald-700 text-xs font-bold block mt-1.5 font-extrabold">100% Gratuito</strong>
                      </div>
                    </div>

                    {courseJoined ? (
                      <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-xs font-medium leading-relaxed">
                        <strong>✨ Status da Sua Vaga:</strong> Atualmente você está <strong>Inscrito!</strong> Sua vaga está totalmente garantida para o primeiro dia de aula. Caso desista, libere a vaga abaixo para que outros vizinhos possam participar.
                      </div>
                    ) : (
                      <div className="p-3 bg-blue-50/50 border border-blue-100 text-blue-800 rounded-xl text-xs font-medium leading-relaxed font-sans">
                        <strong>✨ Vagas Disponíveis:</strong> Não perca tempo, restam apenas algumas vagas gratuitas de capacitação no bairro. Fortaleça seu currículo hoje mesmo!
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    {courseJoined ? (
                      <button 
                        onClick={() => {
                          setCourseJoined(false);
                          setCurrentModalAction(null);
                          triggerToast('Sua inscrição no Curso de Informática foi cancelada e a vaga foi liberada.', 'info');
                        }}
                        className="w-full bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 py-3 rounded-xl font-bold text-xs cursor-pointer transition-colors text-center font-sans"
                      >
                        Cancelar Minha Inscrição no Curso
                      </button>
                    ) : (
                      <button 
                        onClick={() => {
                          setCourseJoined(true);
                          setCurrentModalAction(null);
                          triggerToast('Inscrição confirmada no Curso de Informática! Aguardamos você dia 08/06 às 19:00 na Associação.', 'success');
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-xs cursor-pointer transition-colors text-center shadow-xs font-sans"
                      >
                        Garantir Minha Vaga Grátis!
                      </button>
                    )}
                    <button 
                      onClick={() => setCurrentModalAction(null)}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-semibold text-xs cursor-pointer transition-colors text-center font-sans"
                    >
                      Voltar para o Painel
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* USER PROFILE RE-NAMING MODAL DIALOG */}
      <AnimatePresence>
        {isEditProfileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 cursor-pointer"
              onClick={() => setIsEditProfileOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-white rounded-3xl z-50 p-6 shadow-2xl space-y-4"
            >
              <h3 className="text-base font-bold text-primary">Editar Perfil Comunitário</h3>
              
              <div className="space-y-3.5">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                    Foto de Perfil
                  </label>
                  <div className="flex items-center gap-3 mt-1">
                    <img 
                      src={editAvatarField} 
                      alt="Avatar" 
                      className="w-12 h-12 rounded-full border border-slate-200 object-cover shrink-0" 
                    />
                    <div className="flex-grow flex flex-col gap-1.5">
                      <div className="flex gap-1">
                        {[
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
                          'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100',
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
                          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
                        ].map((url, idx) => (
                          <button
                            key={url}
                            type="button"
                            onClick={() => setEditAvatarField(url)}
                            className={cn(
                              "w-6 h-6 rounded-full overflow-hidden border-2 cursor-pointer transition-all",
                              editAvatarField === url ? "border-blue-600 scale-110 shadow-sm" : "border-transparent opacity-70 hover:opacity-100"
                            )}
                          >
                            <img src={url} alt={`avatar-${idx}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                      <label className="inline-flex self-start text-[9px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-0.5 rounded border border-slate-250 font-bold cursor-pointer transition-colors">
                        Enviar foto...
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                if (typeof reader.result === 'string') {
                                  setEditAvatarField(reader.result);
                                  triggerToast('Foto selecionada com sucesso!', 'success');
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                    Nome Completo
                  </label>
                  <input 
                    type="text" 
                    value={editNameField}
                    onChange={(e) => setEditNameField(e.target.value)}
                    className="w-full bg-[#eff4ff] text-xs font-semibold px-3 py-2.5 rounded-xl border-none focus:ring-2 focus:ring-primary text-on-surface"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                    Localização (Cidade)
                  </label>
                  <input 
                    type="text" 
                    value="Ponta Grossa - PR" 
                    disabled
                    readOnly
                    className="w-full bg-slate-100 text-xs font-semibold px-3 py-2.5 rounded-xl border-none text-slate-400 cursor-not-allowed select-none"
                  />
                </div>
              </div>

              <div className="flex gap-2.5 pt-3 justify-end">
                <button 
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-4 py-2 hover:bg-slate-100 rounded-xl text-slate-500 font-semibold text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  onClick={saveProfileSettings}
                  className="px-4 py-2 bg-primary hover:bg-primary-container text-white font-bold rounded-xl text-xs cursor-pointer shadow-sm"
                >
                  Salvar Perfil
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* AUTHENTICATION DIALOG (LOGIN & REGISTRATION) */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs"
              onClick={() => setIsAuthModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm max-h-[92vh] overflow-y-auto bg-white rounded-3xl z-55 p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 font-sans text-slate-800 scrollbar-thin"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-2 border-b">
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  {authTab === 'login' ? 'Acessar Conta' : 'Criar Conta Local'}
                </h2>
                <button 
                  onClick={() => setIsAuthModalOpen(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Toggle Tab */}
              <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setAuthTab('login')}
                  className={cn(
                    "py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                    authTab === 'login' ? "bg-white text-slate-800 shadow-xs" : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  Entrar
                </button>
                <button
                  type="button"
                  onClick={() => setAuthTab('register')}
                  className={cn(
                    "py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                    authTab === 'register' ? "bg-white text-slate-800 shadow-xs" : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  Criar Conta
                </button>
              </div>

              {/* Form Content */}
              <div className="space-y-3 mt-1">
                {authTab === 'register' && (
                  <div>
                    <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">
                      Nome Completo
                    </label>
                    <input 
                      type="text" 
                      placeholder="Ex: Pedro Silva"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      className="w-full bg-[#eff4ff] text-xs font-semibold px-3 py-2.5 rounded-xl border-none focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder-slate-400"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">
                    Nome de Usuário
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ex: pedrosilva"
                    value={authUsername}
                    onChange={(e) => setAuthUsername(e.target.value)}
                    className="w-full bg-[#eff4ff] text-xs font-semibold px-3 py-2.5 rounded-xl border-none focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder-slate-400"
                  />
                  {authTab === 'register' && (
                    <div className="mt-1.5 p-2.5 bg-amber-50 border border-amber-250 rounded-lg text-[10px] text-amber-800 font-medium leading-normal flex gap-1.5 shadow-2xs">
                      <span className="flex-shrink-0 text-amber-600">⚠️</span>
                      <span><strong>Importante:</strong> Não use espaços, acentos ou caracteres especiais (como @, #, $, etc.). Use apenas letras e números.</span>
                    </div>
                  )}
                  {authTab === 'register' && authUsername && !/^[a-zA-Z0-9]+$/.test(authUsername) && (
                    <div className="mt-1.5 p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-[10px] text-rose-800 font-bold leading-normal flex gap-1.5 shadow-2xs">
                      <span className="flex-shrink-0 text-rose-600">❌</span>
                      <span>Erro: O nome de usuário contém caracteres especiais, acentos ou espaços não permitidos!</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">
                    Senha
                  </label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full bg-[#eff4ff] text-xs font-semibold px-3 py-2.5 rounded-xl border-none focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder-slate-400"
                  />
                </div>

                {authTab === 'register' && (
                  <div>
                    <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-2">
                      Escolha um Avatar
                    </label>
                    <div className="flex gap-2">
                      {[
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
                        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100',
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
                      ].map((url) => (
                        <button
                          key={url}
                          type="button"
                          onClick={() => setAuthSelectedAvatar(url)}
                          className={cn(
                            "w-8 h-8 rounded-full overflow-hidden border-2 cursor-pointer transition-all",
                            authSelectedAvatar === url ? "border-blue-600 scale-105 shadow-xs" : "border-transparent opacity-70"
                          )}
                        >
                          <img src={url} alt="Avatar option" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Call to Action */}
              <button 
                onClick={() => {
                  if (authTab === 'login') {
                    // LOGIN LOGIC
                    if (!authUsername || !authPassword) {
                      triggerToast('Por favor, preencha usuário e senha.', 'error');
                      return;
                    }
                    const user = registeredUsers.find(u => u.username === authUsername && u.password === authPassword);
                    if (user) {
                      setIsLoggedIn(true);
                      setCurrentUser({ username: user.username, name: user.name, avatar: user.avatar });
                      setProfile(prev => ({
                        ...prev,
                        name: user.name,
                        avatar: user.avatar
                      }));
                      setIsAuthModalOpen(false);
                      setAuthUsername('');
                      setAuthPassword('');
                      triggerToast(`Bem-vindo de volta, ${user.name}!`, 'success');
                    } else {
                      triggerToast('Usuário ou senha inválidos!', 'error');
                    }
                  } else {
                    // REGISTER LOGIC
                    if (!authName || !authUsername || !authPassword) {
                      triggerToast('Por favor, preencha todos os campos.', 'error');
                      return;
                    }
                    // Validate username (letters and numbers only, no spaces or special characters)
                    const usernameRegex = /^[a-zA-Z0-9]+$/;
                    if (!usernameRegex.test(authUsername)) {
                      triggerToast('Erro: O nome de usuário deve conter apenas letras e números, sem espaços ou caracteres especiais.', 'error');
                      return;
                    }
                    if (registeredUsers.some(u => u.username === authUsername)) {
                      triggerToast('Este nome de usuário já está em uso!', 'error');
                      return;
                    }
                    const newUser = {
                      username: authUsername,
                      password: authPassword,
                      name: authName,
                      avatar: authSelectedAvatar
                    };
                    setRegisteredUsers(prev => [...prev, newUser]);
                    setIsLoggedIn(true);
                    setCurrentUser({ username: newUser.username, name: newUser.name, avatar: newUser.avatar });
                    setProfile(prev => ({
                      ...prev,
                      name: newUser.name,
                      avatar: newUser.avatar
                    }));
                    setIsAuthModalOpen(false);
                    setAuthName('');
                    setAuthUsername('');
                    setAuthPassword('');
                    triggerToast(`Conta de ${newUser.name} criada e conectada com sucesso!`, 'success');
                  }
                }}
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-extrabold text-xs cursor-pointer transition-all text-center shadow-md font-sans"
              >
                {authTab === 'login' ? 'Confirmar Logon' : 'Registrar e Entrar'}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CENTRAL DE AJUDA MODAL */}
      <AnimatePresence>
        {isHelpModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs"
              onClick={() => setIsHelpModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-lg max-h-[88vh] overflow-y-auto bg-white rounded-3xl z-55 p-6 shadow-2xl border border-slate-100 flex flex-col gap-5 font-sans text-slate-800 scrollbar-thin"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  Central de Ajuda Local
                </h2>
                <button 
                  onClick={() => setIsHelpModalOpen(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Info Alerts */}
              <div className="bg-blue-50 border border-blue-100 p-3.5 rounded-2xl flex gap-2.5 items-start">
                <span className="text-base text-blue-600">💡</span>
                <p className="text-[11px] text-blue-800 font-medium leading-relaxed">
                  Bem-vindo à Central de Ajuda do <strong>Conecta Comunidade PG</strong>. Encontre respostas rápidas abaixo ou mande uma mensagem direta para a nossa equipe de voluntários.
                </p>
              </div>

              {/* Search FAQ */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                <input 
                  type="text" 
                  placeholder="Pesquisar dúvidas frequentes (FAQ)..."
                  value={helpSearchQuery}
                  onChange={(e) => setHelpSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder-slate-400 text-slate-800"
                />
              </div>

              {/* FAQ Section */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Dúvidas Frequentes (FAQ)</h3>
                <div className="max-h-56 overflow-y-auto pr-1 space-y-2.5 scrollbar-thin">
                  {[
                    {
                      q: "O que é o Conecta Comunidade Ponta Grossa?",
                      a: "É uma plataforma social sem fins lucrativos desenvolvida para conectar os moradores de Ponta Grossa com oportunidades de emprego local, prestadores de serviços confiáveis e mutirões de ajuda na vizinhança."
                    },
                    {
                      q: "Como salvar uma vaga de emprego ou serviço nos favoritos?",
                      a: "Basta navegar até a aba 'Oportunidades' ou 'Serviços' e tocar no ícone de coração. Suas vagas salvas ficarão disponíveis na aba 'Perfil' para sua consulta posterior."
                    },
                    {
                      q: "É preciso pagar para cadastrar serviços ou participar dos projetos?",
                      a: "Não! Absolutamente tudo na plataforma é gratuito. O Conecta Comunidade PG é uma iniciativa solidária apoiada por associações de bairro."
                    },
                    {
                      q: "Como faço para criar uma conta ou fazer login?",
                      a: "Clique na aba 'Perfil' ou toque em cadastrar-se. Insira um nome de usuário (letras e números apenas, sem espaços) e uma senha simples para que a plataforma lembre de seus dados e preferências."
                    },
                    {
                      q: "Como entrar em contato direto com o provedor de serviço?",
                      a: "Cada serviço na aba de 'Serviços' e 'Oportunidades' possui um botão com o número de contato. Você pode ligar diretamente do seu dispositivo ou usar o WhatsApp para falar com o profissional."
                    },
                    {
                      q: "Posso propor um mutirão ecológico ou projeto social?",
                      a: "Sim! Participe de conversas na aba de 'Projetos' ou envie suas idéias para nossa equipe de moderação através do canal de suporte para que possamos divulgar."
                    }
                  ].filter(item => 
                    item.q.toLowerCase().includes(helpSearchQuery.toLowerCase()) || 
                    item.a.toLowerCase().includes(helpSearchQuery.toLowerCase())
                  ).length === 0 ? (
                    <p className="text-[11px] text-slate-400 text-center py-4 font-semibold">
                      Nenhuma dúvida encontrada para &quot;{helpSearchQuery}&quot;.
                    </p>
                  ) : (
                    [
                      {
                        q: "O que é o Conecta Comunidade Ponta Grossa?",
                        a: "É uma plataforma social sem fins lucrativos desenvolvida para conectar os moradores de Ponta Grossa com oportunidades de emprego local, prestadores de serviços confiáveis e mutirões de ajuda na vizinhança."
                      },
                      {
                        q: "Como salvar uma vaga de emprego ou serviço nos favoritos?",
                        a: "Basta navegar até a aba 'Oportunidades' ou 'Serviços' e tocar no ícone de coração. Suas vagas salvas ficarão disponíveis na aba 'Perfil' para sua consulta posterior."
                      },
                      {
                        q: "É preciso pagar para cadastrar serviços ou participar dos projetos?",
                        a: "Não! Absolutamente tudo na plataforma é gratuito. O Conecta Comunidade PG é uma iniciativa solidária apoiada por associações de bairro."
                      },
                      {
                        q: "Como faço para criar uma conta ou fazer login?",
                        a: "Clique na aba 'Perfil' ou toque em cadastrar-se. Insira um nome de usuário (letras e números apenas, sem espaços) e uma senha simples para que a plataforma lembre de seus dados e preferências."
                      },
                      {
                        q: "Como entrar em contato direto com o provedor de serviço?",
                        a: "Cada serviço na aba de 'Serviços' e 'Oportunidades' possui um botão com o número de contato. Você pode ligar diretamente do seu dispositivo ou usar o WhatsApp para falar com o profissional."
                      },
                      {
                        q: "Posso propor um mutirão ecológico ou projeto social?",
                        a: "Sim! Participe de conversas na aba de 'Projetos' ou envie suas idéias para nossa equipe de moderação através do canal de suporte para que possamos divulgar."
                      }
                    ].filter(item => 
                      item.q.toLowerCase().includes(helpSearchQuery.toLowerCase()) || 
                      item.a.toLowerCase().includes(helpSearchQuery.toLowerCase())
                    ).map((item, index) => (
                      <div key={index} className="bg-slate-50 border border-slate-100 p-3 rounded-2xl">
                        <span className="text-[11px] font-extrabold text-blue-905 block leading-tight">
                          Dúvida: {item.q}
                        </span>
                        <span className="text-[11px] text-slate-600 block mt-1.5 leading-relaxed font-semibold">
                          {item.a}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Direct Support Options */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Suporte Direto</h3>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText('conectacomunidadepg@gmail.com');
                        triggerToast('E-mail copiado! (conectacomunidadepg@gmail.com)', 'success');
                      } catch (err) {
                        triggerToast('Email: conectacomunidadepg@gmail.com', 'info');
                      }
                    }}
                    className="flex items-center justify-center gap-1.5 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 rounded-xl font-bold text-[11px] transition-all cursor-pointer shadow-3xs"
                  >
                    ✉️ Copiar E-mail
                  </button>
                  <button
                    onClick={() => {
                      triggerToast('Iniciando atendimento de suporte simulado via WhatsApp...', 'success');
                    }}
                    className="flex items-center justify-center gap-1.5 py-2.5 bg-emerald-50 border border-emerald-200 text-[#128c7e] hover:bg-emerald-100/50 rounded-xl font-bold text-[11px] transition-all cursor-pointer shadow-3xs"
                  >
                    💬 WhatsApp Suporte
                  </button>
                </div>

                {/* Quick Message Form Mock */}
                <div className="bg-slate-50 p-4 border border-slate-150 rounded-2xl flex flex-col gap-2.5 mt-1">
                  <span className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider">Fale Conosco Online</span>
                  <input 
                    type="email" 
                    placeholder="Seu melhor e-mail para contato"
                    value={helpEmail}
                    onChange={(e) => setHelpEmail(e.target.value)}
                    className="bg-white px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-slate-800 placeholder-slate-400"
                  />
                  <textarea 
                    rows={2}
                    placeholder="Descreva sua dúvida, problema ou sugestão..."
                    value={helpMessage}
                    onChange={(e) => setHelpMessage(e.target.value)}
                    className="bg-white p-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-slate-800 placeholder-slate-400 font-sans leading-relaxed resize-none"
                  />
                  <button
                    onClick={() => {
                      if (!helpEmail || !helpMessage) {
                        triggerToast('Por favor, preencha todos os campos do formulário para enviar.', 'error');
                        return;
                      }
                      triggerToast('Mensagem enviada com sucesso! Responderemos em até 24 horas no e-mail fornecido.', 'success');
                      setHelpEmail('');
                      setHelpMessage('');
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs py-2 px-4 rounded-xl transition-all font-sans text-center cursor-pointer shadow-xs"
                  >
                    Enviar Mensagem de Suporte
                  </button>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* PERSISTENT GRAPHICAL TOAST ALERT FLOATER */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 left-4 right-4 z-[100]"
          >
            <div className={cn(
              "px-4 py-3 rounded-xl shadow-xl flex items-center justify-between gap-3 text-white max-w-sm mx-auto",
              toast.type === 'error' ? "bg-error" : 
              toast.type === 'info' ? "bg-[#326095]" : "bg-tertiary-container text-white"
            )}>
              <span className="text-xs font-semibold leading-relaxed">{toast.message}</span>
              <button onClick={() => setToast(null)} className="shrink-0 p-1 rounded-full hover:bg-white/20">
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

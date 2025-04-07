'use client'

import { type ReactNode, createContext, useContext, useState } from 'react'

type LanguageContextType = {
  language: string
  setLanguage: (lang: LanguageKeys) => void
  handleChangeLanguage: (language: LanguageKeys) => void
  englishTexts: TextsType
  portugueseTexts: TextsType
}

type LanguageKeys = 'EN' | 'PT'

type TextsType = {
  service: string
  technologies: string
  portfolio: string
  contact: string
  description: string
  myServices: string
  myWorkButton: string
  webDevelopment: string
  webDevelopmentDescription: string
  backDevelopment: string
  backDevelopmentDescription: string
  devOps: string
  devOpsDescription: string
  skillTitile: string
  skillSubtitle: string
  portfolioTitile: string
  portfolioFooter: string
  projectDiscuss: string
  getInTouch: string
  socialMedia: string
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageKeys>('EN')
  const englishTexts: TextsType = {
    service: 'Service',
    technologies: 'Technologies',
    portfolio: 'Portfolio',
    contact: 'Contact',
    description:
      'Hello! I am Matheus, a Full Stack developer passionate about technology and innovation. Always looking for continuous learning, I love transforming ideas into efficient and scalable solutions. My goal is to constantly evolve, creating modern and impactful applications.',
    myWorkButton: 'My Github',
    myServices: 'My services',
    webDevelopment: 'Web Development',
    webDevelopmentDescription: `I build modern and responsive websites based on your ready-made
      design, using technologies like React, Next.js, HTML, CSS,
      Tailwind CSS, Material-UI, and Styled Components. Whether it's a
      landing page or a business website, I ensure it looks stunning and
      functions smoothly on any device.`,
    backDevelopment: 'Back end development',
    backDevelopmentDescription: `I develop robust and scalable back-end systems using technologies
      like Node.js, Express.js, Fastify, Flask, and FastAPI. Whether
      it’s building APIs, database architecture, or server-side logic, I
      ensure your application runs efficiently, securely, and seamlessly
      across all devices.`,
    devOps: 'Database and DevOps',
    devOpsDescription: `I set up efficient and scalable infrastructure for web applications 
      using CI/CD pipelines, containers, and database management. I work with tools like 
      Docker, Docker Compose, and Kubernetes to simplify deployments, ensuring continuous 
      integration and automated delivery. Additionally, I manage relational and NoSQL 
      databases such as PostgreSQL, MySQL, and MongoDB, optimizing performance and scalability 
      for projects.`,
    skillTitile: 'Skills',
    skillSubtitle: 'The skills, tools and technologies I use:',
    portfolioTitile: 'Portfolio',
    portfolioFooter:
      'To see more of my projects, visit my GitHub. The link is available in the button above.',
    projectDiscuss: 'Do you have a project to discuss?',
    getInTouch: 'Get in touch',
    socialMedia: 'Social media',
  }

  const portugueseTexts: TextsType = {
    service: 'Serviço',
    technologies: 'Tecnologias',
    portfolio: 'Portfólio',
    contact: 'Contato',
    description:
      'Olá! Sou Matheus, um desenvolvedor Full Stack apaixonado por tecnologia e inovação. Sempre em busca de aprendizado contínuo, adoro transformar ideias em soluções eficientes e escaláveis. Meu objetivo é evoluir constantemente, criando aplicações modernas e impactantes.',
    myServices: 'Meus serviços',
    myWorkButton: 'Meu Github',
    webDevelopment: 'Desenvolvimento Web',
    webDevelopmentDescription: `Eu desenvolvo sites modernos e responsivos com base no seu design pronto,
      utilizando tecnologias como React, Next.js, HTML, CSS, Tailwind CSS, Material-UI e Styled
      Components. Seja uma landing page ou um site empresarial, garanto que ele tenha um visual 
      incrível e funcione perfeitamente em qualquer dispositivo.`,
    backDevelopment: 'Desenvolvimento back end',
    backDevelopmentDescription: `Desenvolvo sistemas back-end robustos e escaláveis ​​utilizando 
      tecnologias como Node.js, Express.js, Fastify, Flask e FastAPI. Se
      é construir APIs, arquitetura de banco de dados ou lógica do lado do servidor, eu
      garanto que seu aplicativo seja executado de forma eficiente, segura e contínua
      em todos os dispositivos.`,
    devOps: 'Banco de dados e DevOps',
    devOpsDescription: `Eu configuro infraestruturas eficientes e escaláveis para aplicações web, 
      utilizando pipelines de CI/CD, contêineres e gerenciamento de bancos de dados. 
      Trabalho com ferramentas como Docker, Docker Compose e Kubernetes para facilitar 
      deploys, garantindo integração contínua e entrega automatizada. Além disso, gerencio 
      bancos de dados relacionais e NoSQL, como PostgreSQL, MySQL e MongoDB, otimizando 
      desempenho e escalabilidade dos projetos.`,
    skillTitile: 'Habilidades',
    skillSubtitle: 'As habilidades, ferramentas e tecnologias que uso:',
    portfolioTitile: 'Portfólio',
    portfolioFooter:
      'Para ver mais dos meus projetos acesse o meu github. O Link está disponível no botão acima.',
    projectDiscuss: 'Você tem um projeto para discutir?',
    getInTouch: 'Entre em contato',
    socialMedia: 'Redes sociais',
  }

  const handleChangeLanguage = (language: 'EN' | 'PT'): void => {
    setLanguage(language)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        handleChangeLanguage,
        englishTexts,
        portugueseTexts,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguageContext() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageProvider')
  }
  return context
}

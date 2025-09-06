import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { User, Award, Clock, Target, Heart, Shield } from 'lucide-react';
import { stats } from '../data/mock';

export const AboutSection = () => {
  const expertise = [
    {
      icon: User,
      title: "Especialista Comportamental",
      description: "Formação específica em comportamento animal com foco em técnicas de condicionamento balanceadas"
    },
    {
      icon: Award,
      title: "Certificações Profissionais",
      description: "Múltiplas certificações em obediência, guarda, proteção e agilidade canina"
    },
    {
      icon: Clock,
      title: "5+ Anos de Experiência",
      description: "Experiência sólida trabalhando com diversos perfis e temperamentos caninos"
    },
    {
      icon: Target,
      title: "Metodologia Personalizada",
      description: "Cada programa é desenvolvido especificamente para as necessidades do seu animal"
    },
    {
      icon: Heart,
      title: "Cuidado e Respeito",
      description: "Priorizamos sempre o bem-estar animal usando técnicas humanizadas e eficazes"
    },
    {
      icon: Shield,
      title: "Resultados Garantidos",
      description: "Compromisso com resultados duradouros e transformação comportamental real"
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-amber-100 text-amber-800">
            Sobre o CãoFidèle
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Expertise em Comportamento Canino
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dedicação, conhecimento científico e paixão por transformar a relação entre você e seu melhor amigo
          </p>
        </div>

        {/* Main Story */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-blue-50 to-amber-50 border-none shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Uma Abordagem Científica para Transformar Comportamentos
                </h3>
                <div className="text-lg text-gray-700 space-y-4 leading-relaxed">
                  <p>
                    O <strong>CãoFidèle</strong> nasceu da paixão por transformar a relação entre tutores e seus cães 
                    através de metodologia cientificamente comprovada. Baseados nos estudos comportamentais de 
                    <strong> B. Skinner</strong> e <strong>Ivan Pavlov</strong>, desenvolvemos uma abordagem única que 
                    combina diversas técnicas para obter o melhor resultado específico para cada animal.
                  </p>
                  <p>
                    Nossa metodologia vai além dos métodos convencionais encontrados na internet e YouTube. 
                    Priorizamos técnicas certificadas e comprovadas, sempre respeitando o bem-estar animal e 
                    focando em resultados duradouros que transformam verdadeiramente o comportamento do seu cão.
                  </p>
                  <p>
                    Com mais de <strong>5 anos de experiência</strong> e <strong>200+ cães treinados</strong>, 
                    mantemos uma taxa de <strong>96% de satisfação</strong> dos nossos clientes, proporcionando 
                    não apenas obediência, mas uma convivência harmoniosa e feliz.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Highlight */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <Card className="bg-white shadow-lg border-none hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium text-lg">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Expertise Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertise.map((item, index) => (
            <Card 
              key={index}
              className="bg-white shadow-lg border-none hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <item.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="mt-16 text-center">
          <Card className="bg-gray-900 text-white border-none shadow-xl">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Nossa Missão
              </h3>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Transformar a convivência entre tutores e seus cães através de metodologia científica, 
                técnicas humanizadas e resultados duradouros. Cada animal merece viver em harmonia 
                com sua família, e cada família merece desfrutar plenamente da companhia do seu melhor amigo.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Brain, Target, Users, Award, BookOpen, CheckCircle } from 'lucide-react';
import { methodology, certifications } from '../data/mock';

export const Methodology = () => {
  const methodologyFeatures = [
    {
      icon: Brain,
      title: "Abordagem Científica",
      description: "Baseada nos estudos comportamentais de B. Skinner e Ivan Pavlov, utilizando princípios comprovados da psicologia animal."
    },
    {
      icon: Target,
      title: "Personalização Total",
      description: "Cada programa é desenvolvido especificamente para o perfil, temperamento e necessidades do seu cão."
    },
    {
      icon: Users,
      title: "Envolvimento Familiar",
      description: "Treinamos não apenas o cão, mas toda a família para manter a consistência dos comandos e comportamentos."
    },
    {
      icon: Award,
      title: "Resultados Garantidos",
      description: "Nossa metodologia possui 96% de taxa de sucesso, com resultados visíveis já na primeira semana."
    }
  ];

  return (
    <section id="metodologia" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            Nossa Metodologia
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Metodologia Exclusiva CãoFidèle
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Abordagens certificadas e cientificamente comprovadas para transformar o comportamento do seu cão
          </p>
        </div>

        {/* Main Methodology Card */}
        <div className="mb-16">
          <Card className="bg-white shadow-xl border-none">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Técnicas de Condicionamento Balanceadas
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                {methodology[0].description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Methodology Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {methodologyFeatures.map((feature, index) => (
            <Card 
              key={index}
              className="bg-white shadow-lg border-none hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-amber-100 text-amber-800">
              Certificações
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Credenciais Profissionais
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Formação especializada e certificações que garantem a qualidade e eficácia do nosso trabalho
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="font-medium text-gray-800">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Como Funciona Nosso Processo
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Um processo estruturado e comprovado para garantir os melhores resultados
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Avaliação Inicial",
                description: "Análise completa do comportamento atual do seu cão em seu ambiente natural"
              },
              {
                step: "02", 
                title: "Plano Personalizado",
                description: "Desenvolvimento de programa específico baseado nas necessidades identificadas"
              },
              {
                step: "03",
                title: "Treinamento Prático",
                description: "Implementação das técnicas com acompanhamento profissional especializado"
              },
              {
                step: "04",
                title: "Manutenção",
                description: "Acompanhamento contínuo para garantir a permanência dos resultados obtidos"
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                    {process.step}
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-blue-200 -z-10"></div>
                  )}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{process.title}</h4>
                <p className="text-gray-600 text-sm">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Check, Star, Phone } from 'lucide-react';
import { trainingPlans, services } from '../data/mock';

export const TrainingPlans = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="planos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-amber-100 text-amber-800">
            Planos de Treinamento
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Escolha o Plano Ideal para seu Cão
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Programas personalizados baseados no perfil específico e necessidades do seu animal
          </p>
        </div>

        {/* Training Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {trainingPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 ${
                plan.recommended 
                  ? 'border-2 border-blue-500 shadow-lg' 
                  : 'border border-gray-200 hover:border-blue-300'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    <Star className="h-4 w-4 mr-1" />
                    Mais Procurado
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-blue-600">{plan.price}</span>
                  <p className="text-gray-600 mt-1">{plan.frequency}</p>
                  <p className="text-sm text-gray-500">Duração: {plan.duration}</p>
                </div>
                <CardDescription className="mt-4 text-gray-600">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  onClick={scrollToContact}
                  className={`w-full transition-all duration-200 ${
                    plan.recommended
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contratar Plano
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Additional Services */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Serviços Adicionais
            </h3>
            <p className="text-gray-600">
              Comece conhecendo seu cão através de nossa avaliação especializada
            </p>
          </div>

          {services.map((service, index) => (
            <Card key={index} className="max-w-md mx-auto border-none shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-gray-900">
                  {service.name}
                </CardTitle>
                <div className="text-2xl font-bold text-amber-600">
                  {service.price}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">{service.description}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={scrollToContact}
                  variant="outline"
                  className="w-full border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
                >
                  Agendar Avaliação
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Não sabe qual plano escolher? Nossa avaliação gratuita te ajudará a decidir.
          </p>
          <Button 
            onClick={scrollToContact}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            <Phone className="h-5 w-5 mr-2" />
            Falar com Especialista
          </Button>
        </div>
      </div>
    </section>
  );
};
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/mock';

export const TestimonialsSection = () => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section id="depoimentos" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800">
            Depoimentos
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            O que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Histórias reais de transformação e sucesso na vida de centenas de tutores e seus cães
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id}
              className="bg-white shadow-lg border-none hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="flex justify-center mb-6">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Quote className="h-6 w-6 text-blue-600" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center gap-1 mb-6">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 text-center italic">
                  "{testimonial.text}"
                </blockquote>

                {/* Client Info */}
                <div className="text-center">
                  <div className="font-bold text-gray-900 text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 mb-2">
                    {testimonial.location}
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    Tutor do {testimonial.dogName} ({testimonial.breed})
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Proof */}
        <div className="text-center">
          <Card className="bg-white shadow-xl border-none max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                {/* Left Side - Stats */}
                <div className="text-center md:text-left">
                  <div className="text-4xl font-bold text-blue-600 mb-2">96%</div>
                  <div className="text-gray-600 font-medium">Taxa de Satisfação</div>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px h-16 bg-gray-300"></div>

                {/* Center - Message */}
                <div className="text-center max-w-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Junte-se a Centenas de Famílias Satisfeitas
                  </h3>
                  <p className="text-gray-600">
                    Transforme a vida do seu cão e fortaleça ainda mais os laços da sua família
                  </p>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px h-16 bg-gray-300"></div>

                {/* Right Side - Instagram */}
                <div className="text-center md:text-right">
                  <div className="text-2xl font-bold text-amber-600 mb-2">@caofidele</div>
                  <div className="text-gray-600 font-medium">Acompanhe no Instagram</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Pronto para transformar a vida do seu cão? Comece com uma avaliação gratuita.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => {
                const element = document.getElementById('contato');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Agendar Avaliação Gratuita
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
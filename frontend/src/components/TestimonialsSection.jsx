import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Star, Quote, AlertCircle } from 'lucide-react';
import { testimonialService, handleApiError } from '../services/api';
import { testimonials as fallbackTestimonials } from '../data/mock';

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await testimonialService.getAll();
      setTestimonials(data);
      
    } catch (err) {
      console.error('Failed to load testimonials:', err);
      setError(handleApiError(err));
      
      // Use fallback data if API fails
      setTestimonials(fallbackTestimonials);
      
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <section id="depoimentos" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Loading skeleton */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="bg-white shadow-lg border-none">
                <CardContent className="p-8">
                  <div className="animate-pulse">
                    <div className="flex justify-center mb-6">
                      <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="flex justify-center gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((j) => (
                        <div key={j} className="h-5 w-5 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="text-center">
                      <div className="h-4 bg-gray-200 rounded w-32 mx-auto mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-24 mx-auto"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

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

        {/* Error Alert */}
        {error && (
          <div className="mb-8 max-w-2xl mx-auto">
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-amber-800 font-medium">Aviso</p>
                    <p className="text-amber-700 text-sm">
                      Exibindo depoimentos locais. {error}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

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
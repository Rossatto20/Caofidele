import React, { useState } from 'react';
import { Button } from './ui/button';
import { Phone, Menu, X } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              CãoFidèle
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('inicio')}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('planos')}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Planos
            </button>
            <button 
              onClick={() => scrollToSection('metodologia')}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Metodologia
            </button>
            <button 
              onClick={() => scrollToSection('sobre')}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Sobre
            </button>
            <button 
              onClick={() => scrollToSection('depoimentos')}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Depoimentos
            </button>
            <button 
              onClick={() => scrollToSection('contato')}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Contato
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Button 
              onClick={() => scrollToSection('contato')}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
            >
              <Phone className="h-4 w-4" />
              Agendar Avaliação
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('inicio')}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-left"
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection('planos')}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-left"
              >
                Planos
              </button>
              <button 
                onClick={() => scrollToSection('metodologia')}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-left"
              >
                Metodologia
              </button>
              <button 
                onClick={() => scrollToSection('sobre')}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-left"
              >
                Sobre
              </button>
              <button 
                onClick={() => scrollToSection('depoimentos')}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-left"
              >
                Depoimentos
              </button>
              <button 
                onClick={() => scrollToSection('contato')}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-left"
              >
                Contato
              </button>
              <Button 
                onClick={() => scrollToSection('contato')}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 mt-4"
              >
                <Phone className="h-4 w-4" />
                Agendar Avaliação
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
import React from 'react';
import { Phone, Mail, Instagram, MapPin, Heart } from 'lucide-react';
import { contactInfo } from '../data/mock';

export const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent mb-4">
              CãoFidèle
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transformamos a relação entre você e seu cão através de metodologia cientificamente comprovada. 
              Especialistas em comportamento canino com resultados garantidos.
            </p>
            <div className="flex space-x-4">
              <a 
                href={`tel:${contactInfo.phone}`}
                className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                aria-label="Telefone"
              >
                <Phone className="h-6 w-6" />
              </a>
              <a 
                href={`mailto:${contactInfo.email}`}
                className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
              <a 
                href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('inicio')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Início
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('planos')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Planos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('metodologia')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Metodologia
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('sobre')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Sobre
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('depoimentos')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Depoimentos
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-400">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="h-5 w-5 text-blue-400" />
                <a 
                  href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {contactInfo.instagram}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">{contactInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 CãoFidèle. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-2 mt-4 md:mt-0">
              Feito com <Heart className="h-4 w-4 text-red-500" /> para você e seu melhor amigo
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
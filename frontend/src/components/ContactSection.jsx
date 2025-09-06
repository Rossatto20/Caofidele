import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Phone, Mail, MapPin, Instagram, Clock, Send, CheckCircle } from 'lucide-react';
import { contactInfo, trainingPlans } from '../data/mock';
import { useToast } from '../hooks/use-toast';

export const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dogName: '',
    dogBreed: '',
    dogAge: '',
    selectedPlan: '',
    behaviorIssues: '',
    message: '',
    preferredContact: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio do formulário (aqui será integrado com backend)
    setTimeout(() => {
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em até 24 horas para agendar sua avaliação gratuita.",
      });
      
      // Resetar formulário
      setFormData({
        name: '',
        email: '',
        phone: '',
        dogName: '',
        dogBreed: '',
        dogAge: '',
        selectedPlan: '',
        behaviorIssues: '',
        message: '',
        preferredContact: ''
      });
      
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <section id="contato" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            Entre em Contato
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pronto para Transformar seu Cão?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Agende sua avaliação gratuita e descubra como podemos ajudar seu melhor amigo
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-xl border-none">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Agendar Avaliação Gratuita
              </CardTitle>
              <p className="text-gray-600">
                Preencha os dados abaixo e entraremos em contato em até 24 horas
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Seu Nome *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="mt-1"
                      placeholder="Digite seu nome completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="mt-1"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className="mt-1"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <Label htmlFor="preferredContact">Prefere Contato Por</Label>
                    <Select value={formData.preferredContact} onValueChange={(value) => handleInputChange('preferredContact', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Escolha uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="phone">Telefone</SelectItem>
                        <SelectItem value="email">E-mail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Dog Info */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações do seu Cão</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="dogName">Nome do Cão *</Label>
                      <Input
                        id="dogName"
                        type="text"
                        value={formData.dogName}
                        onChange={(e) => handleInputChange('dogName', e.target.value)}
                        required
                        className="mt-1"
                        placeholder="Nome do seu cão"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dogBreed">Raça</Label>
                      <Input
                        id="dogBreed"
                        type="text"
                        value={formData.dogBreed}
                        onChange={(e) => handleInputChange('dogBreed', e.target.value)}
                        className="mt-1"
                        placeholder="Ex: Golden Retriever"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dogAge">Idade</Label>
                      <Input
                        id="dogAge"
                        type="text"
                        value={formData.dogAge}
                        onChange={(e) => handleInputChange('dogAge', e.target.value)}
                        className="mt-1"
                        placeholder="Ex: 2 anos"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <Label htmlFor="selectedPlan">Plano de Interesse</Label>
                  <Select value={formData.selectedPlan} onValueChange={(value) => handleInputChange('selectedPlan', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione um plano (opcional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="avaliacao">Apenas Avaliação</SelectItem>
                      {trainingPlans.map((plan) => (
                        <SelectItem key={plan.id} value={plan.name.toLowerCase()}>
                          {plan.name} - {plan.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="behaviorIssues">Principais Comportamentos a Corrigir</Label>
                  <Input
                    id="behaviorIssues"
                    type="text"
                    value={formData.behaviorIssues}
                    onChange={(e) => handleInputChange('behaviorIssues', e.target.value)}
                    className="mt-1"
                    placeholder="Ex: Ansiedade, agressividade, não obedece comandos..."
                  />
                </div>

                <div>
                  <Label htmlFor="message">Mensagem Adicional</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="mt-1 min-h-[120px]"
                    placeholder="Conte-nos mais sobre seu cão e suas necessidades..."
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold transition-all duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Agendar Avaliação Gratuita
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Contact Info Card */}
            <Card className="shadow-xl border-none">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Outras Formas de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Telefone/WhatsApp</div>
                    <a 
                      href={`tel:${contactInfo.phone}`}
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">E-mail</div>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Instagram className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Instagram</div>
                    <a 
                      href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      {contactInfo.instagram}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Localização</div>
                    <div className="text-gray-600">{contactInfo.address}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Horário de Atendimento</div>
                    <div className="text-gray-600">Segunda a Sábado: 8h às 18h</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Benefits */}
            <Card className="bg-gradient-to-r from-blue-50 to-amber-50 border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Por que Escolher o CãoFidèle?
                </h3>
                <div className="space-y-3">
                  {[
                    "Avaliação inicial gratuita",
                    "Metodologia cientificamente comprovada",
                    "96% de taxa de satisfação",
                    "Resultados visíveis em 1 semana",
                    "Acompanhamento personalizado"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
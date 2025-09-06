# CãoFidèle - Backend Implementation Contracts

## Overview
Este documento define os contratos de API e plano de integração entre frontend e backend para o site CãoFidèle.

## Mock Data Analysis
**Arquivo:** `/app/frontend/src/data/mock.js`

### Dados Estáticos (não precisam de backend):
- `trainingPlans` - Planos de treinamento (Básico, Intermediário, Personalizado)
- `services` - Serviços adicionais (Avaliação Comportamental)
- `methodology` - Informações sobre metodologia
- `certifications` - Lista de certificações
- `stats` - Estatísticas da empresa
- `contactInfo` - Informações de contato
- `faqData` - Perguntas frequentes

### Dados que Precisam de Backend:
- `testimonials` - Depoimentos de clientes (CRUD necessário)
- Formulário de contato/agendamento (envio de email)

## API Endpoints Necessários

### 1. Testimonials/Depoimentos
```
GET /api/testimonials
- Retorna lista de depoimentos aprovados
- Response: Array de objetos testimonial

POST /api/testimonials (futuro - para novos depoimentos)
- Adiciona novo depoimento para moderação
- Body: { name, location, rating, text, dogName, breed }
```

### 2. Contact/Agendamento
```
POST /api/contact/schedule
- Processa formulário de agendamento
- Envia email para caofidele@gmail.com
- Body: {
    name, email, phone, dogName, dogBreed, dogAge,
    selectedPlan, behaviorIssues, message, preferredContact
  }
- Response: { success: boolean, message: string }
```

### 3. Newsletter/Feedback (opcional futuro)
```
POST /api/newsletter/subscribe
- Inscrição para receber novidades
```

## MongoDB Models

### Testimonial Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  location: String (required),
  rating: Number (1-5, required),
  text: String (required),
  dogName: String (required),
  breed: String (required),
  approved: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Request Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  phone: String (required),
  dogName: String (required),
  dogBreed: String,
  dogAge: String,
  selectedPlan: String,
  behaviorIssues: String,
  message: String,
  preferredContact: String,
  status: String (enum: ['pending', 'contacted', 'scheduled', 'completed']),
  createdAt: Date,
  updatedAt: Date
}
```

## Frontend Integration Plan

### 1. Testimonials Section
**Arquivo:** `/app/frontend/src/components/TestimonialsSection.jsx`
- Remover import de `testimonials` do mock.js
- Adicionar useEffect para fetch dos depoimentos
- Implementar loading state
- Manter fallback para dados estáticos se API falhar

### 2. Contact Section  
**Arquivo:** `/app/frontend/src/components/ContactSection.jsx`
- Modificar handleSubmit para enviar dados via API
- Integrar com endpoint `/api/contact/schedule`
- Manter loading states e toast notifications
- Adicionar tratamento de erro

### 3. API Service
**Criar:** `/app/frontend/src/services/api.js`
```javascript
const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

export const testimonialService = {
  getAll: () => fetch(`${API_BASE}/testimonials`).then(res => res.json())
};

export const contactService = {
  schedule: (data) => fetch(`${API_BASE}/contact/schedule`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json())
};
```

## Email Configuration
- Usar nodemailer ou similar para envio de emails
- Configurar SMTP (Gmail ou outro provider)
- Template de email para notificações de agendamento
- Email de confirmação para o cliente

## Environment Variables Needed
```
# Backend .env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=caofidele@gmail.com
SMTP_PASS=<app_password>
CONTACT_EMAIL=caofidele@gmail.com
```

## Implementation Priority
1. ✅ **High Priority:** Contact form backend (envio de email)
2. 🔄 **Medium Priority:** Testimonials CRUD
3. 📋 **Low Priority:** Admin panel para gerenciar depoimentos

## Testing Strategy
1. Testar envio de formulário de contato
2. Verificar recebimento de emails
3. Testar carregamento de depoimentos
4. Validar tratamento de erros
5. Testar integração frontend-backend completa

## Success Criteria
- ✅ Formulário de contato envia emails successfully
- ✅ Depoimentos carregam do banco de dados
- ✅ Frontend funciona mesmo se backend estiver offline (graceful degradation)
- ✅ Loading states funcionam corretamente
- ✅ Error handling implementado
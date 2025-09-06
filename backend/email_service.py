import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_host = os.getenv('SMTP_HOST', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', '587'))
        self.smtp_user = os.getenv('SMTP_USER', 'caofidele@gmail.com')
        self.smtp_pass = os.getenv('SMTP_PASS', '')
        self.contact_email = os.getenv('CONTACT_EMAIL', 'caofidele@gmail.com')
        
    def send_contact_notification(self, contact_data: Dict[str, Any]) -> bool:
        """Send email notification when someone fills the contact form"""
        try:
            # Create message
            msg = MIMEMultipart()
            msg['From'] = self.smtp_user
            msg['To'] = self.contact_email
            msg['Subject'] = f"Nova Solicitação de Agendamento - {contact_data['name']}"
            
            # Email body
            body = self._create_contact_email_body(contact_data)
            msg.attach(MIMEText(body, 'html'))
            
            # Send email
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                if self.smtp_pass:  # Only authenticate if password is provided
                    server.login(self.smtp_user, self.smtp_pass)
                
                text = msg.as_string()
                server.sendmail(self.smtp_user, self.contact_email, text)
                
            logger.info(f"Contact notification sent for {contact_data['email']}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email notification: {str(e)}")
            return False
    
    def send_confirmation_email(self, contact_data: Dict[str, Any]) -> bool:
        """Send confirmation email to the client"""
        try:
            # Create message
            msg = MIMEMultipart()
            msg['From'] = self.smtp_user
            msg['To'] = contact_data['email']
            msg['Subject'] = "CãoFidèle - Solicitação de Agendamento Recebida"
            
            # Email body
            body = self._create_confirmation_email_body(contact_data)
            msg.attach(MIMEText(body, 'html'))
            
            # Send email
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                if self.smtp_pass:  # Only authenticate if password is provided
                    server.login(self.smtp_user, self.smtp_pass)
                
                text = msg.as_string()
                server.sendmail(self.smtp_user, contact_data['email'], text)
                
            logger.info(f"Confirmation email sent to {contact_data['email']}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send confirmation email: {str(e)}")
            return False
    
    def _create_contact_email_body(self, data: Dict[str, Any]) -> str:
        """Create HTML email body for contact notification"""
        return f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #2563eb; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
                    Nova Solicitação de Agendamento - CãoFidèle
                </h2>
                
                <h3 style="color: #374151;">Dados do Cliente:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px; font-weight: bold;">Nome:</td><td style="padding: 8px;">{data['name']}</td></tr>
                    <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">{data['email']}</td></tr>
                    <tr><td style="padding: 8px; font-weight: bold;">Telefone:</td><td style="padding: 8px;">{data['phone']}</td></tr>
                    <tr><td style="padding: 8px; font-weight: bold;">Contato Preferido:</td><td style="padding: 8px;">{data.get('preferredContact', 'Não informado')}</td></tr>
                </table>
                
                <h3 style="color: #374151;">Dados do Cão:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px; font-weight: bold;">Nome do Cão:</td><td style="padding: 8px;">{data['dogName']}</td></tr>
                    <tr><td style="padding: 8px; font-weight: bold;">Raça:</td><td style="padding: 8px;">{data.get('dogBreed', 'Não informado')}</td></tr>
                    <tr><td style="padding: 8px; font-weight: bold;">Idade:</td><td style="padding: 8px;">{data.get('dogAge', 'Não informado')}</td></tr>
                </table>
                
                <h3 style="color: #374151;">Serviço Solicitado:</h3>
                <p><strong>Plano de Interesse:</strong> {data.get('selectedPlan', 'Não informado')}</p>
                <p><strong>Comportamentos a Corrigir:</strong> {data.get('behaviorIssues', 'Não informado')}</p>
                
                {f'<h3 style="color: #374151;">Mensagem Adicional:</h3><p style="background: #f9fafb; padding: 15px; border-left: 4px solid #2563eb;">{data.get("message", "Nenhuma mensagem adicional.")}</p>' if data.get('message') else ''}
                
                <div style="margin-top: 30px; padding: 20px; background: #eff6ff; border-radius: 8px;">
                    <p style="margin: 0; font-weight: bold; color: #1d4ed8;">
                        Entre em contato com o cliente em até 24 horas conforme prometido no site.
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
    
    def _create_confirmation_email_body(self, data: Dict[str, Any]) -> str:
        """Create HTML email body for client confirmation"""
        return f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #2563eb; margin-bottom: 5px;">CãoFidèle</h1>
                    <p style="color: #f59e0b; font-weight: bold; margin: 0;">Especialistas em Comportamento Canino</p>
                </div>
                
                <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                    <h2 style="color: #1d4ed8; margin-top: 0;">Solicitação Recebida com Sucesso!</h2>
                    <p>Olá <strong>{data['name']}</strong>,</p>
                    <p>Recebemos sua solicitação de agendamento para o <strong>{data['dogName']}</strong> e entraremos em contato em até <strong>24 horas</strong> para agendar sua avaliação gratuita.</p>
                </div>
                
                <h3 style="color: #374151;">Resumo da sua solicitação:</h3>
                <table style="width: 100%; border-collapse: collapse; background: #f9fafb; border-radius: 8px; overflow: hidden;">
                    <tr style="background: #e5e7eb;"><td style="padding: 12px; font-weight: bold;">Cão:</td><td style="padding: 12px;">{data['dogName']} ({data.get('dogBreed', 'Raça não informada')})</td></tr>
                    <tr><td style="padding: 12px; font-weight: bold;">Plano de Interesse:</td><td style="padding: 12px;">{data.get('selectedPlan', 'A definir na avaliação')}</td></tr>
                    <tr style="background: #e5e7eb;"><td style="padding: 12px; font-weight: bold;">Contato Preferido:</td><td style="padding: 12px;">{data.get('preferredContact', 'Telefone')}</td></tr>
                </table>
                
                <div style="margin: 30px 0; padding: 20px; background: linear-gradient(135deg, #eff6ff 0%, #fef3c7 100%); border-radius: 8px;">
                    <h3 style="color: #1d4ed8; margin-top: 0;">Próximos Passos:</h3>
                    <ol style="color: #374151;">
                        <li>Entraremos em contato em até 24 horas</li>
                        <li>Agendaremos sua avaliação <strong>gratuita</strong></li>
                        <li>Conheceremos você e o {data['dogName']} pessoalmente</li>
                        <li>Definiremos o melhor plano para vocês</li>
                    </ol>
                </div>
                
                <div style="margin-top: 30px; padding: 20px; border: 2px solid #e5e7eb; border-radius: 8px;">
                    <h3 style="color: #374151; margin-top: 0;">Contatos CãoFidèle:</h3>
                    <p style="margin: 5px 0;"><strong>Telefone/WhatsApp:</strong> (11) 91561-5377</p>
                    <p style="margin: 5px 0;"><strong>Email:</strong> caofidele@gmail.com</p>
                    <p style="margin: 5px 0;"><strong>Instagram:</strong> @caofidele</p>
                </div>
                
                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                    <p style="color: #6b7280; font-size: 14px;">
                        Obrigado por confiar no CãoFidèle para transformar a vida do seu melhor amigo! 🐕
                    </p>
                </div>
            </div>
        </body>
        </html>
        """

# Create global instance
email_service = EmailService()
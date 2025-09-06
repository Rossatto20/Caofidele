from fastapi import APIRouter, HTTPException, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..models import ContactRequestCreate, ContactRequest, ContactResponse
from ..database import get_database
from ..email_service import email_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/contact", tags=["contact"])

@router.post("/schedule", response_model=ContactResponse)
async def schedule_appointment(
    contact: ContactRequestCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Process contact form and schedule appointment"""
    try:
        # Create contact request object
        contact_obj = ContactRequest(**contact.dict())
        
        # Save to database
        await db.contact_requests.insert_one(contact_obj.dict())
        logger.info(f"Contact request saved for {contact.email}")
        
        # Send email notifications
        contact_data = contact.dict()
        
        # Send notification to business
        notification_sent = email_service.send_contact_notification(contact_data)
        
        # Send confirmation to client
        confirmation_sent = email_service.send_confirmation_email(contact_data)
        
        if notification_sent and confirmation_sent:
            success_message = "Solicitação enviada com sucesso! Entraremos em contato em até 24 horas."
        elif notification_sent:
            success_message = "Solicitação enviada com sucesso! Entraremos em contato em até 24 horas."
        else:
            # Even if email fails, we still saved the contact request
            success_message = "Solicitação recebida! Entraremos em contato em até 24 horas."
            logger.warning(f"Email sending failed for contact request {contact.email}")
        
        return ContactResponse(
            success=True,
            message=success_message
        )
        
    except Exception as e:
        logger.error(f"Error processing contact request: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail="Erro interno. Tente novamente ou entre em contato diretamente."
        )

@router.get("/admin/requests")
async def get_contact_requests(db: AsyncIOMotorDatabase = Depends(get_database)):
    """Get all contact requests for admin (future use)"""
    try:
        requests = await db.contact_requests.find().sort("createdAt", -1).to_list(100)
        return requests
        
    except Exception as e:
        logger.error(f"Error retrieving contact requests: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/admin/stats")
async def get_contact_stats(db: AsyncIOMotorDatabase = Depends(get_database)):
    """Get contact statistics for admin dashboard (future use)"""
    try:
        total_requests = await db.contact_requests.count_documents({})
        pending_requests = await db.contact_requests.count_documents({"status": "pending"})
        completed_requests = await db.contact_requests.count_documents({"status": "completed"})
        
        return {
            "total_requests": total_requests,
            "pending_requests": pending_requests,
            "completed_requests": completed_requests
        }
        
    except Exception as e:
        logger.error(f"Error retrieving contact stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
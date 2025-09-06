from fastapi import APIRouter, HTTPException, Depends
from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase
from models import Testimonial, TestimonialCreate, TestimonialResponse
from database import get_database
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/testimonials", tags=["testimonials"])

@router.get("/", response_model=List[TestimonialResponse])
async def get_testimonials(db: AsyncIOMotorDatabase = Depends(get_database)):
    """Get all approved testimonials"""
    try:
        testimonials = await db.testimonials.find({"approved": True}).to_list(100)
        
        # Convert MongoDB documents to response format
        result = []
        for testimonial in testimonials:
            result.append(TestimonialResponse(
                id=testimonial["id"],
                name=testimonial["name"],
                location=testimonial["location"],
                rating=testimonial["rating"],
                text=testimonial["text"],
                dogName=testimonial["dogName"],
                breed=testimonial["breed"]
            ))
        
        logger.info(f"Retrieved {len(result)} testimonials")
        return result
        
    except Exception as e:
        logger.error(f"Error retrieving testimonials: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/", response_model=dict)
async def create_testimonial(
    testimonial: TestimonialCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Create a new testimonial (for future use - requires approval)"""
    try:
        testimonial_obj = Testimonial(**testimonial.dict())
        testimonial_obj.approved = False  # Require manual approval
        
        await db.testimonials.insert_one(testimonial_obj.dict())
        
        logger.info(f"New testimonial created for {testimonial.name}")
        return {"success": True, "message": "Depoimento enviado para aprovação"}
        
    except Exception as e:
        logger.error(f"Error creating testimonial: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/admin/pending", response_model=List[dict])
async def get_pending_testimonials(db: AsyncIOMotorDatabase = Depends(get_database)):
    """Get all pending testimonials for admin approval (future use)"""
    try:
        testimonials = await db.testimonials.find({"approved": False}).to_list(100)
        return testimonials
        
    except Exception as e:
        logger.error(f"Error retrieving pending testimonials: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
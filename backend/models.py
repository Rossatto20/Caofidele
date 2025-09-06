from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
import uuid

# Testimonial Models
class TestimonialBase(BaseModel):
    name: str
    location: str
    rating: int = Field(ge=1, le=5)
    text: str
    dogName: str
    breed: str

class TestimonialCreate(TestimonialBase):
    pass

class Testimonial(TestimonialBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    approved: bool = Field(default=True)  # Auto-approve for now
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class TestimonialResponse(BaseModel):
    id: str
    name: str
    location: str
    rating: int
    text: str
    dogName: str
    breed: str

# Contact Request Models
class ContactRequestBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    dogName: str
    dogBreed: Optional[str] = None
    dogAge: Optional[str] = None
    selectedPlan: Optional[str] = None
    behaviorIssues: Optional[str] = None
    message: Optional[str] = None
    preferredContact: Optional[str] = None

class ContactRequestCreate(ContactRequestBase):
    pass

class ContactRequest(ContactRequestBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = Field(default="pending")  # pending, contacted, scheduled, completed
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class ContactResponse(BaseModel):
    success: bool
    message: str

# Admin Models (for future use)
class AdminTestimonialUpdate(BaseModel):
    approved: Optional[bool] = None
    
class AdminContactUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None
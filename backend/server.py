from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from contextlib import asynccontextmanager

# Import database connection
from database import connect_to_mongo, close_mongo_connection, init_database

# Import route modules
from routes import testimonials, contact

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("🚀 Starting CãoFidèle API server...")
    await connect_to_mongo()
    await init_database()
    logger.info("✅ Server startup completed")
    
    yield
    
    # Shutdown
    logger.info("🔄 Shutting down server...")
    await close_mongo_connection()
    logger.info("✅ Server shutdown completed")

# Create the main app
app = FastAPI(
    title="CãoFidèle API",
    description="API para o sistema de treinamento canino CãoFidèle",
    version="1.0.0",
    lifespan=lifespan
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Add routes
api_router.include_router(testimonials.router)
api_router.include_router(contact.router)

# Health check endpoint
@api_router.get("/")
async def health_check():
    return {"message": "CãoFidèle API is running!", "status": "healthy"}

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logger.info("🐕 CãoFidèle API configured successfully")

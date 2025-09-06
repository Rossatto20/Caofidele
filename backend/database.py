from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
import os
from typing import Optional

# Global variables for database connection
client: Optional[AsyncIOMotorClient] = None
database: Optional[AsyncIOMotorDatabase] = None

async def connect_to_mongo():
    """Create database connection"""
    global client, database
    
    mongo_url = os.environ.get('MONGO_URL')
    if not mongo_url:
        raise ValueError("MONGO_URL environment variable is not set")
    
    client = AsyncIOMotorClient(mongo_url)
    database = client[os.environ.get('DB_NAME', 'caofidele')]
    
    # Test the connection
    try:
        await database.command("ismaster")
        print("✅ Connected to MongoDB successfully")
    except Exception as e:
        print(f"❌ Failed to connect to MongoDB: {e}")
        raise

async def close_mongo_connection():
    """Close database connection"""
    global client
    if client:
        client.close()
        print("✅ MongoDB connection closed")

def get_database() -> AsyncIOMotorDatabase:
    """Dependency to get database instance"""
    if database is None:
        raise RuntimeError("Database is not initialized")
    return database

async def init_database():
    """Initialize database with sample data"""
    global database
    
    if database is None:
        raise RuntimeError("Database is not initialized")
    
    # Create indexes
    await database.testimonials.create_index("approved")
    await database.testimonials.create_index("createdAt")
    await database.contact_requests.create_index("status")
    await database.contact_requests.create_index("createdAt")
    
    # Check if testimonials already exist
    existing_count = await database.testimonials.count_documents({})
    
    if existing_count == 0:
        # Insert sample testimonials
        sample_testimonials = [
            {
                "id": "testimonial_1",
                "name": "Maria Silva",
                "location": "São Paulo, SP",
                "rating": 5,
                "text": "Meu Golden Retriever estava muito ansioso e destruindo a casa. Após 6 semanas com a metodologia do CãoFidèle, ele se tornou um cão completamente diferente. Profissionalismo excepcional!",
                "dogName": "Thor",
                "breed": "Golden Retriever",
                "approved": True,
                "createdAt": "2024-12-01T10:00:00Z",
                "updatedAt": "2024-12-01T10:00:00Z"
            },
            {
                "id": "testimonial_2",
                "name": "João Santos",
                "location": "Guarulhos, SP",
                "rating": 5,
                "text": "Impressionante como em 2 meses minha Pitbull aprendeu comandos que eu tentava ensinar há anos. A abordagem científica realmente funciona. Recomendo 100%!",
                "dogName": "Luna",
                "breed": "Pitbull",
                "approved": True,
                "createdAt": "2024-12-02T10:00:00Z",
                "updatedAt": "2024-12-02T10:00:00Z"
            },
            {
                "id": "testimonial_3",
                "name": "Ana Costa",
                "location": "Osasco, SP",
                "rating": 5,
                "text": "Estava quase desistindo do meu Border Collie por causa da hiperatividade. O treinamento personalizado foi perfeito. Agora ele é obediente e equilibrado.",
                "dogName": "Rex",
                "breed": "Border Collie",
                "approved": True,
                "createdAt": "2024-12-03T10:00:00Z",
                "updatedAt": "2024-12-03T10:00:00Z"
            },
            {
                "id": "testimonial_4",
                "name": "Carlos Oliveira",
                "location": "São Bernardo, SP",
                "rating": 5,
                "text": "Excelente trabalho com meu Pastor Alemão. O programa de guarda e proteção superou minhas expectativas. Profissional sério e competente.",
                "dogName": "Kaiser",
                "breed": "Pastor Alemão",
                "approved": True,
                "createdAt": "2024-12-04T10:00:00Z",
                "updatedAt": "2024-12-04T10:00:00Z"
            }
        ]
        
        await database.testimonials.insert_many(sample_testimonials)
        print(f"✅ Inserted {len(sample_testimonials)} sample testimonials")
    else:
        print(f"✅ Database already has {existing_count} testimonials")
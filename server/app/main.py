from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, funds
import logging
app = FastAPI()

logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,  # Allow cookies and authentication headers
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Custom exception handler for 500 Internal Server Errors
@app.middleware("http")
async def handle_500_exceptions(request: Request, call_next):
    try:
        response = await call_next(request)
        return response
    except Exception as e:
        logger.error(f"Unhandled exception: {e}", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={"message": "Internal Server Error. Please try again later."},
        )
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(funds.router, prefix="/funds", tags=["mutual-funds"])

@app.get("/")
async def root():
    return {"message": "Welcome to the BROKER APP"}

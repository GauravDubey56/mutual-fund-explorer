from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from app.utils.token import verify_token
from app.services.fund_service import fetch_open_ended_schemes, fetch_funds_family, fetch_fund_by_id
from app.services.purchase_service import purchase_units, fetch_purchases
from pydantic import BaseModel
router = APIRouter()

class PurchasePayload(BaseModel):
    fund_id: int
    units: int
    purchase_type: str
    total_amount: int
    monthly_payment_date: int
    monthly_payment_amount: int

def get_current_user(token: str = Depends(verify_token)):
    if token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return token


@router.get("/funds_list")
async def get_fund_data(fund_family: str, user: dict = Depends(get_current_user)):
    data = fetch_open_ended_schemes(fund_family)
    return data


@router.get("/fund_groups")
async def get_funds_family(user: dict = Depends(get_current_user)):
    data = fetch_funds_family()
    return data


@router.get("/fund_info")
async def get_fund_info(id: int, user: dict = Depends(get_current_user)):
    data = fetch_fund_by_id(id)
    return data


@router.post("/purchase")
async def purchase_handler(payload: PurchasePayload, user: dict = Depends(get_current_user)):
    fund_id = payload.fund_id
    units = payload.units
    purchase_type = payload.purchase_type
    total_amount = payload.total_amount
    monthly_payment_date = payload.monthly_payment_date
    monthly_payment_amount = payload.monthly_payment_amount

    current_date = datetime.now().isoformat()
    if (purchase_type == "SIP" and monthly_payment_date is None):
        return {"status": "error", "message": "Please provide monthly payment date"}

    if purchase_type == "SIP":
        total_amount = monthly_payment_amount
    else :
        monthly_payment_date = None
    
    response = purchase_units(unique_no=fund_id, units=units, buy_amount=total_amount, total_amount=total_amount, date=current_date, purchase_type=purchase_type, monthly_payment_date=monthly_payment_date, user=user)
    return response

@router.get("/purchase_list")
async def get_purchases(user: dict = Depends(get_current_user)):
    data = fetch_purchases(user)
    return data
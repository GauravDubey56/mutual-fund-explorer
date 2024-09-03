from app.models import FundPurchase
from app.database import get_conn
from app.services.fund_service import fetch_fund_by_id



def purchase_units(user: dict, unique_no: str, units: int, buy_amount: int, total_amount: int, date: str, purchase_type: str, monthly_payment_date: int | None):
    db = get_conn()
    cursor = db.cursor()
    fund = fetch_fund_by_id(unique_no)

    if fund is None:
        cursor.close()
        return {"status": "error", "message": "Fund does not exist"}
    folio_number = create_folio_number(user['user_id'], unique_no)
    purchase = FundPurchase(fund_unique_no=unique_no, units=units, buy_price=buy_amount, total_amount=total_amount,
                            user_id=user['user_id'], date=date, purchase_type=purchase_type, monthly_payment_date=monthly_payment_date, schema_name=fund.scheme_name, folio_number=folio_number)

    if (purchase.check_if_fund_exists(cursor)):
        cursor.close()
        return {"status": "error", "message": "Fund already exists for this user"}
    response = purchase.add_purchase(cursor)
    cursor.close()
    return response


def fetch_purchases(user: dict):
    db = get_conn()
    cursor = db.cursor()
    data = FundPurchase.fetch_purchases(user['user_id'], cursor)
    cursor.close()
    return data

def create_folio_number(user_id, fund_unique_no):
    folio_number = f"{user_id}-{fund_unique_no}"
    return folio_number
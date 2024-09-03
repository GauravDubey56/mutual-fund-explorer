from pydantic import BaseModel
from typing import List

class FundFamily(BaseModel):
    amc_code: str
    fund_family_name: str


class FundSchemeInfo(BaseModel):
    unique_no: int
    scheme_name: str | None
    scheme_code: str | None
    lock_in_period: float | None
    scheme_plan: str | None
    scheme_type: str | None
    minimum_purchase_amount: float | None

class FundScheme(BaseModel):
    unique_no: int
    scheme_name: str | None
    scheme_plan: str | None
    scheme_type: str | None


class FundPurchase(BaseModel):
    fund_unique_no: int
    units: int
    buy_price: int
    total_amount: int
    user_id: int
    date: str
    purchase_type: str
    monthly_payment_date: int | None
    schema_name: str | None
    folio_number: str | None

    __pydantic_fields_set__ = {'fund_unique_no', 'units', 'buy_price', 'total_amount', 'user_id', 'date', 'purchase_type', 'monthly_payment_date'}

    def __init__(self, fund_unique_no: int, units: int, buy_price: int, total_amount: int, user_id: int, date: str, purchase_type: str, monthly_payment_date: int | None, schema_name: str, folio_number: str):
        self.fund_unique_no = fund_unique_no
        self.units = units
        self.buy_price = buy_price
        self.total_amount = total_amount
        self.user_id = user_id
        self.date = date
        self.purchase_type = purchase_type
        self.monthly_payment_date = monthly_payment_date
        self.schema_name = schema_name
        self.folio_number = folio_number
    
    def add_purchase(self, cursor):
        query =  '''
        insert into fund_purchases (fund_unique_no, units, buy_price, total_amount, user_id, date, purchase_type, monthly_payment_date, folio_number)
        values (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        '''
        print(self.folio_number)
        cursor.execute(query, (self.fund_unique_no, self.units, self.buy_price, self.total_amount, self.user_id, self.date, self.purchase_type, self.monthly_payment_date, self.folio_number))
        cursor.connection.commit()
        return {"status": "success", "folio_number": self.folio_number, "units_purchased": self.units, "amount": self.total_amount}
    
    def check_if_fund_exists(self, cursor):
        query = '''
        select
            fund_unique_no
        from
            fund_purchases
        where
            fund_unique_no = %s and user_id = %s
        '''
        cursor.execute(query, (self.fund_unique_no, self.user_id))
        result = cursor.fetchall()
        return len(result) > 0
    
    def fetch_purchases(user_id, cursor):
        query = '''
        select
            fund_unique_no,
            units,
            buy_price,
            total_amount,
            date,
            purchase_type,
            monthly_payment_date,
            mfs.scheme_name as scheme_name,
            folio_number
        from
            fund_purchases
        inner join 
            mutual_fund_schemes as mfs  on fund_purchases.fund_unique_no = mfs.unique_no
        where
            user_id = %s
        '''
        cursor.execute(query, (user_id,))
        result = cursor.fetchall()
        purchases = [FundPurchase(fund_unique_no=row[0], units=row[1], buy_price=row[2], total_amount=row[3], user_id=user_id,
                                  date=row[4], purchase_type=row[5], monthly_payment_date=row[6], schema_name=row[7], folio_number=row[8]) for row in result]
        return purchases
    
    def fetch_funds_info(self, cursor):
        query = '''
        select
            unique_no,
            scheme_name,
            scheme_plan,
            scheme_type
        from
            mutual_fund_schemes
        where
            unique_no = %s
        '''
        cursor.execute(query, (self.fund_unique_no,))
        result = cursor.fetchall()
        if len(result) == 0:
            return None
        funds = [FundScheme(unique_no=row[0], scheme_name=row[1], scheme_plan=row[2], scheme_type=row[3]) for row in result]
        return funds




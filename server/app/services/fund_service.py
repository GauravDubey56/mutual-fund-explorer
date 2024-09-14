import requests
from app.config import settings
from app.database import get_conn
from app.models import FundFamily, FundScheme, FundSchemeInfo
def fetch_open_ended_schemes(fund_family: str, offset: int, limit: int = 20):
    query = '''
    select
        unique_no,
        scheme_name,
        scheme_plan,
        scheme_type
    from
        mutual_fund_schemes
    where
        amc_code = %s
    limit %s offset %s
    '''
    db = get_conn()
    cursor = db.cursor()
    cursor.execute(query, (fund_family, limit, offset))
    result = cursor.fetchall()
    cursor.close()
    funds = [FundScheme(unique_no=row[0],  scheme_name=row[1], scheme_plan=row[2], scheme_type=row[3]) for row in result]
    return funds

def fetch_funds_family():
    db = get_conn()
    cursor = db.cursor()
    query = '''
    select
        amc_code,
        fund_family_name
    from
	    fund_family_codes'''
    cursor.execute(query)
    result = cursor.fetchall()
    cursor.close()
    funds = [FundFamily(amc_code=row[0], fund_family_name=row[1]) for row in result]
    return funds

def fetch_fund_by_id(id):
    query = '''
    select
        unique_no,
        scheme_name,
        scheme_code,
        lock_in_period,
        scheme_plan,
        scheme_type,
        minimum_purchase_amount
    from
        mutual_fund_schemes
    where
        unique_no = %s
    '''
    db = get_conn()
    if db is None:
        return None

    try:
        cursor = db.cursor()
        cursor.execute(query, (id,))
        result = cursor.fetchall()
        cursor.close()
        if not result:
            return None

        funds = [FundSchemeInfo(unique_no=row[0],  scheme_name=row[1], scheme_code=row[2], lock_in_period=row[3], scheme_plan=row[4], scheme_type=row[5], minimum_purchase_amount=row[6]) for row in result]
        return funds[0] if funds else None
    except Exception as error:
        print(f"Error: {error}")
        return None


def fetch_open_ended_schemes_count(fund_family: str):
    query = '''
    select
        count(unique_no) as funds_count
    from
        mutual_fund_schemes
    where
        amc_code = %s
    '''
    db = get_conn()
    cursor = db.cursor()
    cursor.execute(query, (fund_family,))
    result = cursor.fetchall()
    cursor.close()
    count_data = result[0][0]
    return count_data

def search_open_ended_schemes(search_string: str, fund_family: str = None):
    query = '''
    SELECT 
        unique_no,
        scheme_name,
        scheme_plan,
        scheme_type
    FROM mutual_fund_schemes
    WHERE ts @@ to_tsquery('english', %s)
    LIMIT 50
    '''
    search_terms = search_string.split()    
    search_query = ' & '.join(search_terms)
    if fund_family:
        query += 'AND amc_code = %s'

        params = (search_query, fund_family)
    else:
        params = (search_query,)
    db = get_conn()
    cursor = db.cursor()
    
    cursor.execute(query, params)
    result = cursor.fetchall()
    cursor.close()
    
    funds = [FundScheme(unique_no=row[0],  scheme_name=row[1], scheme_plan=row[2], scheme_type=row[3]) for row in result]
    return funds


def search_open_ended_schemes_count(search_string: str, fund_family: str = None):
    query = '''
    SELECT 
        count(unique_no) as funds_count
    FROM mutual_fund_schemes
    WHERE ts @@ to_tsquery('english', %s)
    '''
    search_terms = search_string.split()    
    search_query = ' & '.join(search_terms)
    if fund_family:
        query += 'AND amc_code = %s'

        params = (search_query, fund_family)
    else:
        params = (search_query,)
    db = get_conn()
    cursor = db.cursor()
    
    cursor.execute(query, params)
    result = cursor.fetchall()
    cursor.close()
    
    count_data = result[0][0]
    return count_data
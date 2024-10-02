import psycopg2
import app.config as config
constants = config.settings


## singleton pattern
conn = None
def get_conn():
    global conn
    if conn is None:
        conn = psycopg2.connect(host=constants.db_host, user=constants.db_user,
                        password=constants.db_password, database=constants.db_name, port=constants.db_port, 
                        sslmode='require')
    if conn.closed or conn.status == psycopg2.extensions.STATUS_IN_TRANSACTION:
        conn = psycopg2.connect(host=constants.db_host, user=constants.db_user,
                        password=constants.db_password, database=constants.db_name, port=constants.db_port, 
                        sslmode='require')
    return conn
import sqlite3
db = sqlite3.connect('transactions.sqlite')

db.execute('DROP TABLE IF EXISTS transactions')

db.execute('''CREATE TABLE transactions(
           id integer  PRIMARY KEY,
           transactionName text NOT NULL,
           transactionAmount real NOT NULL,
           desc text,
           iconDir text NOT NULL
           )''')

cursor = db.cursor()

db.commit()
db.close()
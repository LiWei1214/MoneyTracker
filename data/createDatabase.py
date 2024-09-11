import sqlite3
db = sqlite3.connect('transactions.sqlite')

db.execute('DROP TABLE IF EXISTS transactions')

db.execute('''CREATE TABLE transactions(
           id INTEGER PRIMARY KEY,
           transactionMonth INTEGER NOT NULL,
           transactionAmount text NOT NULL,
           desc text,
           iconDir text NOT NULL
           )''')

cursor = db.cursor()

cursor.execute('''
               INSERT INTO transactions(transactionMonth, transactionAmount, desc, iconDir)
               VALUES(9,9,'w','w')
               ''')

db.commit()
db.close()
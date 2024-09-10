import sqlite3
db = sqlite3.connect('./data/transactions.sqlite')

cursor = db.cursor()

cursor.execute('''
               INSERT INTO transactions(transactionMonth, transactionAmount, desc, iconDir)
               VALUES(9,9,'w','w')
               ''')

db.commit()
db.close()
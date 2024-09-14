import sqlite3
db = sqlite3.connect('userData.sqlite')

db.execute('DROP TABLE IF EXISTS users')

# db.execute('''CREATE TABLE users(
#            id INTEGER PRIMARY KEY,
#            accountname text NOT NULL,
#            accountpass text NOT NULL,
#            )''')

db.execute('''CREATE TABLE userDetails(
           id INTEGER PRIMARY KEY,
           accountname text NOT NULL,
           accountpass text NOT NULL,
           email text NOT NULL)
           ''')

db.commit()
db.close()
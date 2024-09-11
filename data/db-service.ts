import { SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';

const databaseName = "transactions.sqlite";

enablePromise(true);

export const getDBConnection = async() => {
    return openDatabase(
        {name: `${databaseName}`, createFromLocation: `~${databaseName}`},
        openCallback,
        errorCallback,
    )
}

export const getTransaction = async( db: SQLiteDatabase, transactionMonth: number ) : Promise<any> => {
    try{
        const placeData : any = [];
        const query = `SELECT * FROM transactions WHERE transactionMonth=?`;
        const result = await db.executeSql(query,[transactionMonth]);
        result.forEach(result => {
            (result.rows.raw()).forEach((item:any) => {
                placeData.push(item);
            })
        });
        return placeData;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get transaction records!')
    }
}

export const createTransaction = async(
    db : SQLiteDatabase,
    month: number,
    amount: number,
    desc: string,
    icon: string,
) => {
    try{
        const query = 'INSERT INTO transactions(transactionMonth,transactionAmount,desc,iconDir) VALUES(?,?,?,?)';
        const parameters = [month,amount,desc,icon]
        await db.executeSql(query,parameters);
    } catch (error) {
        console.error(error);
        throw Error('Failed to create transaction');
    }
}

export const updateTransaction = async(
    db : SQLiteDatabase,
    amount: number,
    desc: string,
    icon: string,
    transactionID: number,
) => {
    try{
        const query = 'UPDATE transactions SET transactionAmount=?, desc=?, iconDir=? WHERE id=?';
        const parameters = [amount, desc, icon, transactionID]
        await db.executeSql(query,parameters);
    } catch (error) {
        console.error(error);
        throw Error('Failed to update transaction');
    }
}

export const deleteTransaction = async(
    db : SQLiteDatabase,
    transactionID: number,
) => {
    try{
        const query = 'DELETE FROM transactions WHERE id=?';
        await db.executeSql(query,[transactionID]);
    } catch (error) {
        console.error(error);
        throw Error('Failed to delete transaction');
    }
}

const openCallback = () => {
    console.log('database open success');
}

const errorCallback = (err: any) => {
    console.log('Error open database: ' + err)
}
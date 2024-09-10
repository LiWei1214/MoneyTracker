import { SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';

const databaseName = 'transactions.sqlite';

enablePromise(true);

export const getDBConnection = async() => {
    return openDatabase(
        {name: `${databaseName}`, createFromLocation:`~${databaseName}`},
        openCallback,
        errorCallback,
    )
}

export const getTransaction = async( db: SQLiteDatabase ) : Promise<any> => {
    try{
        const placeData : any = [];
        const query = `SELECT * FROM transactions ORDER BY transactionMonth`;
        const result = await db.executeSql(query);
        result.forEach(result => {
            (result.rows.raw()).forEach((item:any) => {
                placeData.push(item);
            })
        });
    } catch (error) {
        console.error(error);
        throw Error('Failed to get transaction records!')
    }
}

export const createTransaction = async(
    db : SQLiteDatabase,
    month: string,
    amount: number,
    desc: string,
    icon: string,
) => {
    try{
        const query = 'INSERT INTO transactions(month,amount,desc,icon VALUES(?,?,?,?)';
        const parameters = [month,amount,desc,icon]
        await db.executeSql(query,parameters);
    } catch (error) {
        console.error(error);
        throw Error('Failed to create transaction');
    }
}

const openCallback = () => {
    console.log('database open success');
}

const errorCallback = (err: any) => {
    console.log('Error open database: ' + err)
}
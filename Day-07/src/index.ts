import { Client } from "pg";

const client = new Client({
    connectionString: `postgresql://firstDB_owner:2GaR1fgZlnAu@ep-shrill-thunder-a5r71dcq.us-east-2.aws.neon.tech/RelationShip?sslmode=require`
})


const createUsersTable = async () => {
    try {
        await client.connect();
        console.log(`Database connected successfully`);
        
        const createQuery = `
            CREATE TABLE users(
            id          SERIAL PRIMARY KEY,
            username    VARCHAR(50) UNIQUE NOT NULL,
            email       VARCHAR(50) UNIQUE NOT NULL,
            password    VARCHAR(255) NOT NULL,
            created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `
        const res = await client.query(createQuery);
        console.log(`User created: `, res);
        
    } catch (error) {
        console.log(`Error: `, error)
    } finally {
        client.end()
    }
}

const createAddressTable = async () => {
    try {
        await client.connect()
        const createQuery = `
        CREATE TABLE addresses(
        id          SERIAL PRIMARY KEY,
        user_id     INTEGER NOT NULL,
        city        VARCHAR(100) NOT NULL,
        country     VARCHAR(100) NOT NULL,
        street      VARCHAR(255) NOT NULL,
        pincode     VARCHAR(20),
        created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        `
        const res = await client.query(createQuery);
        console.log(`Addresses created Successfully: `, res);
    } catch (error) {
        console.log(`Error: `, error)
    } finally {
        client.end()
    }
}

// createUsersTable()
// createAddressTable()

const insertDataIntoUsersTable = async (
    username: string,
    email: string,
    password: string
) => {
    try {
        await client.connect();
        console.log(`Database connected successfully !!`)

        const insertQuery = `
        INSERT INTO users(username, email, password)
        VALUES
            ($1, $2, $3)
        `
        const values = [username, email, password];
        const res = await client.query(insertQuery, values);
        console.log(`Insertion success: `, res);
        
    } catch (error) {
        console.log(`Error while inserting data: `, error)
    } finally {
        client.end();
    }
}


const insertDataIntoAddressesTable = async (
    user_id: number,
    city: string,
    country: string,
    street: string,
    pincode: string
) => {
    try {
        await client.connect();
        console.log(`DaTABASE connected successfully`);
        
        const insertQuery = `
        INSERT INTO addresses(user_id, city, country, street, pincode)
        VALUES
            ($1,$2,$3,$4,$5)
        `
        const values = [user_id, city, country, street, pincode]
        const res = await client.query(insertQuery, values)
        console.log(`Insertion success: `, res);
    } catch (error) {
        console.log(`Error while inserting data: `, error)
    } finally {
        client.end();
    }
}


// insertDataIntoUsersTable(
//     'userOne',
//     'userone@gmail.com',
//     'userOne_password'
// ).catch((err) => {
//     console.log(`ERROR: `, err)
// })

insertDataIntoAddressesTable(
    1,
    'Jaipur',
    'India',
    '123 broadway st',
    '10001'
).catch((error) => {
    console.log(`ERROR: `, error)
})
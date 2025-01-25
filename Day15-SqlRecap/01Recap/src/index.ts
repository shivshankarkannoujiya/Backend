import { Client } from 'pg';

const client = new Client({
    connectionString: `postgresql://firstDB_owner:2GaR1fgZlnAu@ep-shrill-thunder-a5r71dcq-pooler.us-east-2.aws.neon.tech/RecapSQLandRelationship?sslmode=require`
})


// TODO: Create User table
async function createUserTable() {
    await client.connect();
    const result = await client.query(`
            CREATE TABLE Users (
                id          SERIAL PRIMARY KEY,
                username    VARCHAR(50) UNIQUE NOT NULL,
                email       VARCHAR(255) UNIQUE NOT NULL,
                password    VARCHAR(255) NOT NULL,
                created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `)
    console.log(result)
}

// TODO: Relationship
// Create table addresses for the Users
async function createAddressesTable() {
    try {
        await client.connect();
        const result = await client.query(`
            CREATE TABLE Addresses(
                id          SERIAL PRIMARY KEY,
                user_id     INTEGER NOT NULL,
                city        VARCHAR(100) NOT NULL,
                country     VARCHAR(100) NOT NULL,
                street      VARCHAR(255) NOT NULL,
                pincode     VARCHAR(20),
                created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
        );`
    )
        
        console.log('Table created successfully: ', result)
    } catch (err) {
        console.error('Error creating Table: ', err)
    } finally {
        await client.end();
    }
}
// createAddressesTable()






// TODO: Insert data into User table: <Insecure Way>: `SQL Injection`
async function insertUserData(
    username: string,
    email: string,
    password: string
) {
    await client.connect();
    const result = await client.query(`
        INSERT INTO Users(username, email, password)
        VALUES('${username}', '${email}', '${password}')
        `)
    
    console.log(result)
}
// SomeOne can send as: ; DELETE * FROM USERS <Treated as sql command>
// insertUserData(
//     '; DELETE * FROM Users',
//     'userone@gmail.com',
//     '123abc'
// )


// TODO: Insert data into User table: <Secure Way>
async function insertUserDataSecureWay(
    username: string,
    email: string,
    password: string
) {
    await client.connect();
    const result = await client.query(`
            INSERT INTO Users(username, email, password)
            VALUES($1, $2, $3)
        `, [username, email, password]);
    console.log(result);
}

// VALUES($1, $2, $3): Now the value will Treated as string whatever user will send
// insertUserDataSecureWay(
//     'userTwo',
//     'user2@gmail.com',
//     '123abcd'
// )


async function insertAddressData(
    user_id: number,
    city: string,
    country: string,
    street: string,
    pincode: string
) {
    try {
        await client.connect();
        const result = await client.query(`
                INSERT INTO Addresses(user_id, city, country, street, pincode)
                VALUES($1, $2, $3, $4, $5)
            `, [user_id, city, country, street, pincode]);
        
        console.log('Addresses data Inserted successfully: ', result);
    } catch (error) {
        console.log('Error while inserting Data: ', error)
    } finally {
        client.end();
    }
}

// insertAddressData(
//     1,
//     'New York',
//     'USA',
//     '123 Broadway st',
//     '10001'
// )


// TODO: Transaction
/*
    BEGIN;
    INSERT;
    COMMIT;
    ANY ERROR:
        ROLLBACK;
 */

async function insertUserandAddressData(
    username: string,
    email: string,
    password: string,
    city: string,
    country: string,
    street: string,
    pincode: string
) {
    
    try {
        await client.connect();
        await client.query('BEGIN')
    
        // Insert into Users Table
        const insertUserText = `
            INSERT INTO Users(username, email, password)
            VALUES($1, $2, $3)
            RETURNING id;
        `
    
        const userResponse = await client.query(insertUserText, [username, email, password]);
        const userId = userResponse.rows[0].id;
    
        // Insert address using the returned user ID
        const insertAddressText = `
            INSERT INTO Addresses(user_id, city, country, street, pincode)
            VALUES($1, $2, $3, $4, $5)
        `
    
        await client.query(insertAddressText, [userId, city, country, street, pincode]);
        await client.query('COMMIT')
    
        console.log('User and Addresses data inserted successfully');
    } catch (error) {
        await client.query('ROLLBACK');
        console.log('Error while inserting User and Address Data');
    } finally {
        client.end();
    }

}
// insertUserandAddressData(
//     'johndoe',
//     'john.doe@example.com',
//     'securepassword123',
//     'New York',
//     'USA',
//     '123 Broadway St',
//     '10001'
// )



// TODO: JOINS:
// JOIN => INNER JOIN(Default)
// Returns rows when there is at least one match in both tables 
// Use Case: Find All Users With Their Addresses. If a user hasn’t filled their address, that user shouldn’t be returned
const getUserDetailsWithAddresses = async (userId: string) => {

    try {
        await client.connect();
        const query = `
            SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
            FROM Users u
            JOIN Addresses a ON u.id = a.user_id
            WHERE u.id = $1
        `
    
        const result = await client.query(query, [userId]);
    
        if (result.rows.length > 0) {
            console.log('User and Address Found !', result.rows[0]);
            return result.rows[0];
        } else {
            console.log('No User and Address found with the given userId');
            return null;
        }
    } catch (error) {
        console.error('Error while fetching User and Addresses: ', error);
        throw error;
    } finally {
        await client.end();
    }

}
// getUserDetailsWithAddresses('1')


// TODO: LEFT JOIN
//`Returns all rows from the left table, and the matched rows from the right table`
/*
    Use case - To list all users from your database along with their address information (if they've provided it), you'd use a LEFT JOIN. Users without an address will still appear in your query result, but the address fields will be NULL for them.
*/

const getUserDetailsWithAddressesViaLEFT_JOIN = async (userId: number) => {
    try {
        await client.connect();
        const userQuery = `
            SELECT Users.username,Addresses.city, Addresses.country, Addresses.street, Addresses.pincode
            FROM Users
            LEFT JOIN Addresses ON Users.id = Addresses.user_id
            WHERE Users.id = $1  
        `
        const result = await client.query(userQuery, [userId]);
        if (result.rows.length > 0) {
            console.log('User Details found: ', result.rows[0]);
            return result.rows[0];
        } else {
            console.log('No User or Addresses were found with the given userId');
            return null;
        }
    } catch (error) {
        console.error('Error while fetching the User and Addresses');
        throw error;
    } finally {
        await client.end()
    }
}

// REMOVE: WHERE Users.id = $1 to get all data from the left Table
// getUserDetailsWithAddressesViaLEFT_JOIN(1);


// TODO: RIGHT JOIN
// Returns all rows from the right table, and the matched rows from the left table.
/*
    Use case - Given the structure of the database, a RIGHT JOIN would be less common since the addresses table is unlikely to have entries not linked to a user due to the foreign key constraint. However, if you had a situation where you start with the addresses table and optionally include user information, this would be the theoretical use case.

*/

const getUserDetailsWithAddressesViaRIGHT_JOIN = async (userId: string) => {
    try {
        await client.connect();
        const userQuery = `
            SELECT Users.username, Addresses.city, Addresses.country, Addresses.street, Addresses.pincode
            FROM Users
            RIGHT JOIN Addresses ON Users.id = Addresses.user_id
            WHERE Users.id = $1
        `
        const result = await client.query(userQuery, [userId]);
        if (result.rows.length > 0) {
            console.log('Users details fetched successfully: ', result.rows[0]);
            return result.rows[0];
        } else {
            console.log('No Data found from the given userId');
            return null;
        }
    } catch (error) {
        console.error('Error while fetching the User details');
        throw error;
    } finally {
        client.end();
    }
}

// getUserDetailsWithAddressesViaRIGHT_JOIN('2');


// TODO: FULL JOIN
const getUserDetailsWithAddressesViaFULL_JOIN = async () => {
    try {
        await client.connect();
        const userQuery = `
            SELECT Users.username, Addresses.city, Addresses.country, Addresses.street, Addresses.pincode
            FROM Users
            FULL JOIN Addresses ON Users.id = Addresses.user_id
        `
        const result = await client.query(userQuery);
        if (result.rows.length > 0) {
            console.log('User details found: ', result);
            return result;
        } else {
            console.log('No Data Found with the given userId');
            return null;
        }
    } catch (error) {
        console.error('Error while fetching Users details');
        throw error;
    } finally {
        await client.end();
    }
}

// getUserDetailsWithAddressesViaFULL_JOIN();
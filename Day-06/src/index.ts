import { Client } from "pg";

const client = new Client({
    connectionString: `postgresql://firstDB_owner:2GaR1fgZlnAu@ep-shrill-thunder-a5r71dcq.us-east-2.aws.neon.tech/firstDB?sslmode=require`
})



// TODO: Write a function to create User table in your Database
async function createUsersTable() {
    try {
        await client.connect();
        console.log(`Connected to the Database !!`)
    
        // TODO: Create table query
        const result = await client.query(
    
            `
            CREATE TABLE Users(
            id          SERIAL PRIMARY KEY,
            username    VARCHAR(50) UNIQUE NOT NULL,
            email       VARCHAR(255) UNIQUE NOT NULL,
            password    VARCHAR(255) UNIQUE NOT NULL,
            created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            `
        )
        console.log(result);
    } catch (err) {
        console.log(`Error while creating Table: ${err}`)
    }
}

// createUsersTable()




const insertData = async () => {
    try {
        await client.connect()
        console.log(`Database connected successfully !!`)

        const insertQuery = `
        INSERT INTO Users(username, email, password)
        VALUES
            ('userTwo', 'usertwoe@gmail.com', 'userTwo_pass')
        `
        const res = await client.query(insertQuery)
        console.log(`Insertion Successfull:`, res)
    } catch (error) {
        console.log(`Error while inserting Data: ${error}`)
    } finally {
        await client.end(); // close the client connection
    }
}

// insertData();

/*
    💡
    This is an insecure way to store data in your tables. 
    When you expose this functionality eventually via HTTP, someone can do an `SQL INJECTION` to get access to your data/delete your data.
*/

/*
    More secure way to store data.
    Update the code so you don’t put `user provided fields` in the `SQL string`
*/

/*
    In your final app, this insert statement will be done when a user signs up on your app. 
    Email, username, password are all user provided strings
 */

/*
    const insertQuery = "INSERT INTO users (username, email, password) VALUES ('username2', 'user3@example.com', 'user_password');";
 */

/*
    HINT: 
    const insertQuery = 'INSERT INTO example_table(column1, column2) VALUES($1, $2)';
    const res = await client.query(insertQuery, [column1Value, column2Value]);
*/



// TODO: Secure way : Prevent `SQL Injection`
//💡 Use `parameterized query` to prevent `SQL injection`

const insertDatas = async (username: string, email: string, password: string) => {
    try {
        await client.connect();
        console.log(`Database connected successfully`)
        const insertQuery = `
            INSERT INTO Users(username, email, password)
            VALUES
                ($1, $2, $3)
        `
        const values = [username, email, password]
        const res = await client.query(insertQuery, values);
        console.log(`Insertion success: `, res);

    } catch (error) {
        console.log(`Error while inserting data: `, error)
    } finally {
        await client.end();
    }
} 

// insertDatas('user3', 'user3@gmail.com', 'user3_password').catch((error) => {
//     console.log(`Error: `, error)
// })


// TODO: Query data
const getUser = async (email: string) => {
    try {
        await client.connect();
        console.log(`Database connected successfully`);
        
        const query = `SELECT * FROM Users WHERE email = $1`;
        const value = [email]
        const result = await client.query(query, value)
        
        if (result.rows.length === 0) {
            console.log(`No User found with the given email`);
            return null;
        }

        // found
        return result.rows[0];


    } catch (error) {
        console.log(`Error while fetching User: `, error)
    } finally {
        await client.end();
    }
}


// Return Promise
// TODO: handle promise 
const handleUser = async (email: string) => {
    try {
        const user = await getUser(email)
        if (user) {
            console.log(`User retrive successfully: `, user);
        } else {
            console.log(`No User found with the given gmail`)
        }
    } catch (error) {
        console.log(`Error: `, error)
    }
}

// handleUser('user3@gmail.com')



//TODO: RELATIONSHIP

/*
CREATE TABLE users (
🆔  id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
🆔  user_id INTEGER NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    pincode VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
🪪  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
*/


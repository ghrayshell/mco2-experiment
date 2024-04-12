const mysql = require('mysql2/promise');
const dotenv = require(`dotenv`).config();

const node1 = mysql.createPool({
    host: '10.2.0.87',
    user: "server0",
    //port: 20087,
    password: "password",
    database: 'allPH',
});

const node2 = mysql.createPool({
    host: '10.2.0.88',
    //port: 20088,
    user: "server1",
    password: "password",
    database: 'luzon_appts',
});

const node3 = mysql.createPool({
    host: '10.2.0.89',
    //port: 20089,
    user: "server2",
    password: "password",
    database: 'vismin_appts',
});

const node_utils = {
    pingNode: async function (node) {
        switch (node) {
            case 1: 
                try { 
                    let val = await node1.query('SELECT 1 AS solution'); 
                    console.log(`Successfully pinged Node ${node}: ${val[0][0].solution}`);
                    return true;
                }
                catch (error) { 
                    console.log(`ERROR: Server is unreachable. Failed to connect to Node ${node}`); 
                    console.log(error);
                }
                break;

            case 2: 
                try {
                    let val = await node2.query('SELECT 2 AS solution');
                    console.log(`Successfully pinged Node ${node}: ${val[0][0].solution}`);
                    return true;
                }
                catch (error) { 
                    console.log(`ERROR: Server is unreachable. Failed to connect to Node ${node}`); 
                    console.log(error);
                }
                break;

            case 3: 
                try {
                    let val = await node3.query('SELECT 3 AS solution');
                    console.log(`Successfully pinged Node ${node}: ${val[0][0].solution}`);
                    return true;
                }
                catch (error) { 
                    console.log(`ERROR: Server is unreachable. Failed to connect to Node ${node}`); 
                    console.log(error);
                }
                break;
        }
    },

    getConnection: async function(n) {
        switch (n) {
            case 1: return await node1.getConnection();
            case 2: return await node2.getConnection();
            case 3: return await node3.getConnection();
        }
    }
}

module.exports = {
    node1: node1,
    node2: node2,
    node3: node3,
    node_utils
}
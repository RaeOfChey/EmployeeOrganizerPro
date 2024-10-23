import pg from 'pg';
const { Client } = pg;
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'employee_tracker',
    password: 'Uraqt1006!',
    port: 5432,
});
client.connect()
    .then(() => {
    console.log('Connected to the database');
})
    .catch((err) => {
    console.error('Connection error', err.stack);
});
export default client;

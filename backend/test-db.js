const { Client } = require('pg');

const client = new Client({
    host: '127.0.0.1',
    port: 5434,
    user: 'admin',
    password: 'admin123',
    database: 'kenocalefont',
});

async function testConnection() {
    try {
        console.log('Intentando conectar a localhost:5433 como ADMIN...');
        await client.connect();
        console.log('¡Conexión EXITOSA! La base de datos responde y la contraseña es correcta.');
        const res = await client.query('SELECT NOW()');
        console.log('Hora del servidor:', res.rows[0].now);
        await client.end();
    } catch (err) {
        console.error('ERROR de conexión:');
        console.error(err.message);
        if (err.message.includes('authentication failed')) {
            console.log('Diagnóstico: Autenticación fallida.');
        } else if (err.message.includes('role "admin" does not exist')) {
            console.log('Diagnóstico CRÍTICO: Te estás conectando a OTRA base de datos que no tiene el usuario admin.');
        }
    }
}

testConnection();

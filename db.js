import postgres from 'postgres'

const sql = postgres({
    host: 'aws-0-eu-central-1.pooler.supabase.com', // or the IP address of your database server
    port: 5432, // default PostgreSQL port
    database: 'postgres',
    username: 'postgres.krgdanoctggnvlkyseyc',
    password: 'Consumerlessm1!'
})

export default sql
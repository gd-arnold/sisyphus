import "dotenv/config"

export const App = {
    port: Number(process.env.PORT),
    env: process.env.NODE_ENV,
    database_url: process.env.DATABASE_URL,
    jwt_secret: process.env.JWT_SECRET
}

import "dotenv/config"

export const App = {
    port: Number(process.env.PORT),
    env: process.env.NODE_ENV
}

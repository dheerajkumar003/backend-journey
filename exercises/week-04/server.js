import express from "express"

const app = express()

const PORT = Number(process.env.PORT) || 3000

app.get("/health", (req, res)=> {
    res.json({status: "ok", uptime: process.uptime()})
})

app.get("/time", (req, res)=> {
    res.json({now : new Date().toISOString()})
})

app.get("/greet", (req, res)=> {
    const {name} = req.query
    console.log("🚀 ~ name:", name)
    if (!name) { 
        return res.status(400).json({ error: "name is required" })
    }
    res.json({ message: `Hello, ${name}!` })  
})

app.get("/users/me", (req, res) => {
    res.json({ user: "the logged-in user" })
})

app.get("/users/:id", (req, res) => {
    res.json({ user: `user with id ${req.params.id}` })
})

app.get("/broken", async (req, res) => {
    const data = JSON.parse("{ this is not valid json")
    res.json(data)
})

app.use((req, res) => {
    res.status(404).json({ error: "Not found" })
})

app.listen(PORT, ()=> {
    console.log(`Server running at http://localhost:${PORT}`)
})
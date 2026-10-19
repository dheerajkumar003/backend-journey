import express from "express"
import { error } from "node:console"
const app = express()
const PORT = Number(process.env.PORT) || 3000

// In-memory "database" (resets every restart — a real DB comes in Week 7)
const products = [
    { id: 1, name: "Espresso", category: "drinks", price: 120, tags: ["hot", "coffee"] },
    { id: 2, name: "Iced Latte", category: "drinks", price: 180, tags: ["cold", "coffee"] },
    { id: 3, name: "Croissant", category: "food", price: 90, tags: ["bakery"] },
    { id: 4, name: "Green Tea", category: "drinks", price: 100, tags: ["hot", "tea"] },
    { id: 5, name: "Brownie", category: "food", price: 110, tags: ["bakery", "sweet"] },
]

let nextId = 6

app.get("/products", (req, res)=> {
    let result = [...products] 
    
    //Category wise filter
    if(req?.query?.category) {
        if (Array.isArray(req.query.category)) {
         return res.status(400).json({ error: "category must be a single value" })
        }
        result = result.filter((el)=> el.category === req.query.category)
    } 
    
    //Max Price filter
    if(req?.query?.maxPrice !== undefined) {
        const maxPrice = Number(req?.query?.maxPrice)
        if(Number.isNaN(maxPrice) || !Number.isFinite(maxPrice) || maxPrice <= 0) {
            return res.status(400).json({error: "maxPrice must be a valid number"})
        }
        result = result?.filter((el)=> el.price <= maxPrice) 
    }
    //Low to High price filter
    if(req?.query?.sort === "price") {
        result = result?.sort((a, b) => a.price - b.price)
    } 
    //High to Low price filter 
    else if(req?.query?.sort === "-price") {
        result = result?.sort((a, b) => b.price - a.price)
    } else if (req.query.sort !== undefined) {
    return res.status(400).json({ error: "sort must be price or -price" })
    }
    res.json({data: result, count: result?.length})
})


app.get("/products/:id",(req, res)=> {
    const pId = Number(req.params.id)
    if(!Number.isInteger(pId)) return res.status(400).json({error : "id must be a number"})
    const product = products.find((p)=> p.id === pId)
    if(!product) return res.status(404).json({error : "Product not found"})
    res.json(product)
})


/* Just to observe data types of req.params */
// app.get("/users/:userId/orders/:orderId",(req, res)=> {
//     res.json({ params: req.params, types: [typeof req.params.userId, typeof req.params.orderId] })
// })
app.use(express.json())
app.post("/products", (req, res) => {
    const CATEGORIES = ["drinks", "food"]
    console.log("body:", req.body)
    const { name, category, price } = req.body ?? {}

    const trimmedName = typeof name === "string" ? name.trim() : ""

    if(trimmedName.length === 0) {
        return res.status(400).json({error: "name is required"})
    } 

    if(!CATEGORIES?.includes?.(category)) {
        return res.status(400).json({error: "category must be drinks or food"})
    }

   if(typeof price !== "number" || !Number.isFinite(price) || price <= 0) {
        return res.status(400).json({error: "price must be a positive number"})
    }
    const product = {
        id: nextId++,
        name: name.trim(),
        category,
        price,
        tags: [],
    }
    products.push(product)


    res.status(201).json({ name, category, price })
})

app.use((req, res)=> {
    res.status(404).json({ error: "Not found" })
})

app.use((err, req, res, next) => {
    console.error(err)
    const status = err.status || 500
    res.status(status).json({ error: status < 500 ? err.message : "Something went wrong" })
})

app.listen(PORT, () => console.log(`Products API on http://localhost:${PORT}`))
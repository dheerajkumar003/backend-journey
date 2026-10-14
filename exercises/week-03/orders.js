import { EventEmitter } from "node:events"

const orderEvents = new EventEmitter()
let ordersToday = 0
    
orderEvents.on("orderPlaced", (order) => {
    console.log(`📧 Email: Order #${order.id} confirmed for ${order.customer}`)
})

orderEvents.on("orderPlaced", (order)=> {
    console.log(`🔔 Push: Your order #${order.id} is on its way`)
})

orderEvents.on("orderPlaced", ()=> {
    ordersToday += 1
   console.log(`📊 Orders today: ${ordersToday}`)
})

orderEvents.on("orderPlaced", (order)=> {
   console.log(`🧾 Invoice created for #${order.id}`)
})


const placeOrder = (customer, items) => {
    const order = { id: Math.floor(Math.random() * 1000), customer, items }
    console.log(`✅ Order #${order.id} placed`)
    orderEvents.emit("orderPlaced", order)
    return order
}

placeOrder("Dheeraj", ["Coffee"])
placeOrder("Ashok", ["Tea", "Cake"])
placeOrder("Tirth", ["Black Coffee",])
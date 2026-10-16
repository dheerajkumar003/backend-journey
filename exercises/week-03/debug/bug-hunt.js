/*
  WEEK 3 · DAY 6 · BUG HUNT

  This checkout calculator has 3 bugs. Don't fix them by reading the code —
  find each one with the VS Code debugger (breakpoints, stepping, hovering).

  The cart:      Coffee 2 × 120 = 240
                 Cake   1 × 80  = 80
                 Tea    3 × 60  = 180
  Subtotal:      500
  Discount:      SAVE10 = 10% off → 450
  Delivery fee:  30
  Correct total: 480

  Run:  node bug-hunt.js

  ─────────────────────────────────────────────────────────────────────
  WHAT I FOUND (all three fixed)
  ─────────────────────────────────────────────────────────────────────

  Bug 1 — getSubtotal skipped the first item  (the `for` loop)
    Saw in debugger: stepping into getSubtotal, `i` started at 1, so only
                     Cake and Tea were added → subtotal: 260 (should be 500).
    Why:             arrays start at index 0. Starting the loop at 1 skips
                     items[0] (Coffee). Classic off-by-one bug.
    Fix:             for (let i = 0; i < items.length; i++)

  Bug 2 — discount was a Promise, not a number  (in checkout)
    Saw in debugger: after stepping over the line, "Return value" and then
                     `discount` showed Promise {<pending>} (should be 0.1),
                     which made afterDiscount: NaN.
    Why:             getDiscount is async, so it always returns a Promise
                     (a "receipt"). Without await, I kept the receipt instead
                     of the value. 500 * (1 - Promise) can't be calculated → NaN.
                     afterDiscount wasn't the bug — it was a victim of it.
    Fix:             const discount = await getDiscount(code)

  Bug 3 — total was glued together as text  (deliveryFee)
    Saw in debugger: deliveryFee: '30' — with quotes, so a string —
                     and total: '45030' instead of 480.
    Why:             process.env values are ALWAYS strings (and the fallback
                     "30" was a string too). number + string joins them as
                     text instead of adding.
    Fix:             convert once, where the value comes in:
                     const deliveryFee = Number(process.env.DELIVERY_FEE) || 30

  Lessons
    - Compare each value with what you expect; the FIRST wrong one is the bug.
    - One wrong value causes more wrong values after it — fix the first one.
    - A `const` only shows in the Variables panel after its line has run.
    - Convert outside data (env vars, query strings, bodies) to the right type
      at the boundary, as soon as it enters your code.
    - Check your expectations too: the original "540" in this comment was wrong.
*/

const cart = [
    { name: "Coffee", price: 120, qty: 2 },
    { name: "Cake", price: 80, qty: 1 },
    { name: "Tea", price: 60, qty: 3 },
]

// Pretends to look the code up in a database
const getDiscount = async (code) => {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return code === "SAVE10" ? 0.1 : 0
}

const getSubtotal = (items) => {
    let subtotal = 0
    for (let i = 0; i < items.length; i++) {
        subtotal += items[i].price * items[i].qty
    }
    return subtotal
}

const checkout = async (items, code) => {
    const subtotal = getSubtotal(items)
    const discount = await getDiscount(code)
    const afterDiscount = subtotal * (1 - discount)
    const deliveryFee = Number(process.env.DELIVERY_FEE) || 30 
    const total = afterDiscount + deliveryFee
    return { subtotal, discount, afterDiscount, deliveryFee, total }
}

const result = await checkout(cart, "SAVE10")
console.log(result)
console.log(`Total to pay: ${result.total} (expected 480)`)

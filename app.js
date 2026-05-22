import express from "express"

const app = express()
app.use(express.json())

// storage
const whitelist = new Set()
const blacklist = new Set()

// helper to normalize input
const parseList = (input) => {
  if (!input) return []
  if (Array.isArray(input)) return input
  return input.split(",").map(x => x.trim()).filter(Boolean)
}

// whitelist add get
app.post("/whitelist", (req, res) => {
  const items = parseList(req.body.items) // expects "product,user"
  items.forEach(i => whitelist.add(i))
  res.json({ ok: true, whitelist: [...whitelist] })
})

app.get("/whitelist", (req, res) => {
  res.json({ whitelist: [...whitelist] })
})

// blacklist add get
app.post("/blacklist", (req, res) => {
  const items = parseList(req.body.items) // expects "user"
  items.forEach(i => blacklist.add(i))
  res.json({ ok: true, blacklist: [...blacklist] })
})

app.get("/blacklist", (req, res) => {
  res.json({ blacklist: [...blacklist] })
})

// optional check endpoint
app.get("/check/:item", (req, res) => {
  const item = req.params.item

  res.json({
    item,
    whitelisted: whitelist.has(item),
    blacklisted: blacklist.has(item)
  })
})

app.listen(3000, () => {
  console.log("api running on port 3000")
})

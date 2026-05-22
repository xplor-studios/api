import { whitelist, parseList } from "../lib/store.js"

export default function handler(req, res) {
  if (req.method === "POST") {
    const items = parseList(req.body.items)
    items.forEach(i => whitelist.add(i))

    return res.json({
      ok: true,
      whitelist: [...whitelist]
    })
  }

  if (req.method === "GET") {
    return res.json({
      whitelist: [...whitelist]
    })
  }

  res.status(405).json({ error: "method not allowed" })
}

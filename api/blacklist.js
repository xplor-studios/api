import { blacklist, parseList } from "../lib/store.js"

export default function handler(req, res) {
  if (req.method === "POST") {
    const items = parseList(req.body.items)
    items.forEach(i => blacklist.add(i))

    return res.json({
      ok: true,
      blacklist: [...blacklist]
    })
  }

  if (req.method === "GET") {
    return res.json({
      blacklist: [...blacklist]
    })
  }

  res.status(405).json({ error: "method not allowed" })
}

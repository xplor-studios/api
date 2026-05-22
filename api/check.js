import { whitelist, blacklist } from "../lib/store.js"

export default function handler(req, res) {
  const { item } = req.query

  res.json({
    item,
    whitelisted: whitelist.has(item),
    blacklisted: blacklist.has(item)
  })
}

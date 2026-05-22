export const whitelist = new Set()
export const blacklist = new Set()

export const parseList = (input) => {
  if (!input) return []
  if (Array.isArray(input)) return input
  return input.split(",").map(x => x.trim()).filter(Boolean)
}

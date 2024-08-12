const uppercaseText = (text: string | undefined) => {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : undefined
}

const makeReadable = (text: string | undefined) => {
  return (text || '')
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/[*\/]+/g, '') // removes * and /
    .replace(/\b\w/g, (s) => s.toUpperCase()) // capitlize first letter of each word
    .replace(/(\b\w+)'(\w)/g, (_match, p1, p2) => `${p1}'${p2.toLowerCase()}`) // correct letters after apostrophe
    .replace(/\b(And | OR)\b/, (s) => s.toLowerCase())
}

export { uppercaseText, makeReadable }

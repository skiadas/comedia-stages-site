export function randomId() {
  const array = new Uint8Array(20)
  crypto.getRandomValues(array)
  return String.fromCharCode(...array.map(v => (v % 26) + 97))
}

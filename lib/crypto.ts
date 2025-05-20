export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hash))
  const hashString = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashString
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const hash = await hashPassword(password)
  return hash === hashedPassword
}

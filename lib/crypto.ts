import bcrypt from 'bcryptjs'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(plain: string, hashed: string): Promise<boolean> {
  try {
    // Handle non-bcrypt hashes
    if (typeof hashed !== 'string' || !hashed.startsWith('$2')) {
      console.error('Invalid hash format:', { hashStart: hashed?.substring(0, 10) })
      return false
    }

    console.log('Verifying password:', {
      plainLength: plain.length,
      hashType: 'bcrypt',
      hashStart: hashed.substring(0, 10)
    })

    return await bcrypt.compare(plain, hashed)
  } catch (error) {
    console.error('Verification error:', error)
    return false
  }
}

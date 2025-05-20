import bcrypt from 'bcryptjs'

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  try {
    console.log('Verifying password:', {
      plainLength: plainPassword.length,
      hashedLength: hashedPassword.length
    })
    return await bcrypt.compare(plainPassword, hashedPassword)
  } catch (error) {
    console.error('Password verification error:', error)
    return false
  }
}

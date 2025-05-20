import bcrypt from 'bcryptjs'

export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log('Password hashing:', {
      originalLength: password.length,
      hashedLength: hashedPassword.length,
      type: 'bcrypt'
    })
    return hashedPassword
  } catch (error) {
    console.error('Hash error:', error)
    throw error
  }
}

export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  try {
    if (!hashedPassword.startsWith('$2')) {
      console.error('Invalid hash format, expecting bcrypt')
      return false
    }
    const isValid = await bcrypt.compare(plainPassword, hashedPassword)
    console.log('Verification details:', {
      isValid,
      hashType: 'bcrypt',
      hashStart: hashedPassword.substring(0, 7)
    })
    return isValid
  } catch (error) {
    console.error('Verification error:', error)
    return false
  }
}

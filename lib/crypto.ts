/**
 * Edge-compatible crypto functions
 * Actual password verification moved to API route to avoid Edge Runtime issues
 */

// Note: bcryptjs import removed to be Edge compatible

/**
 * Edge-compatible password hashing placeholder
 * Note: This will just indicate that hashing should be done in API route
 */
export async function hashPassword(password: string): Promise<string> {
  // In Edge Runtime we can't hash with bcrypt
  // This is just a placeholder - actual hashing should be done in API routes
  throw new Error('Password hashing should be done in API routes, not in Edge Runtime')
}

/**
 * Edge-compatible password verification placeholder
 * Note: This redirects to the API verification route
 */
export async function verifyPassword(plain: string, hashed: string): Promise<boolean> {
  // In Edge Runtime, we don't verify directly - this is done via API route
  // This is mainly kept for backward compatibility
  console.error('Password verification in Edge Runtime is not supported')
  return false
}

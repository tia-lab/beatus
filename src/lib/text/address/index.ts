export function formatAddress(formattedAddress: string): {
  line1: string
  line2: string
} {
  // Count the number of commas in the address
  const commaCount = (formattedAddress.match(/,/g) || []).length

  if (commaCount >= 2) {
    // Split into components based on commas
    const parts = formattedAddress.split(',')
    const line1 = parts[0].trim() // Take the first part (street address)
    const line2 = parts.slice(1).join(',').trim() // Combine the rest (locality and country)
    return { line1, line2 }
  }

  // If less than 2 commas, return the whole address in line1
  return { line1: formattedAddress, line2: '' }
}

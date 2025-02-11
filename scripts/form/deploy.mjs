import { execSync } from 'child_process'
import * as dotenv from 'dotenv'

// Load environment variables from the .env file
dotenv.config()

// Get the API key from the environment
const key = process.env.NEXT_PUBLIC_FORMSPREE_DEPLOY_KEY

if (!key) {
  console.error(
    'Error: FORMSPREE_API_KEY is not defined in the environment variables.'
  )
  process.exit(1)
}

try {
  // Run the formspree deploy command with the key
  execSync(`formspree deploy -k ${key}`, { stdio: 'inherit' })
} catch (error) {
  console.error('Error deploying the form:', error.message)
  process.exit(1)
}

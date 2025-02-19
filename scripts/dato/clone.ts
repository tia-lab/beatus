import { execSync } from 'child_process'
import readlineSync from 'readline-sync'

async function main() {
  console.log('📦 Welcome to DatoCMS Cloning Tool!')
  console.log('1️⃣ Clone an entire schema')
  console.log('2️⃣ Clone a specific fields')

  const choice = readlineSync.question('Select an option (1 or 2): ')

  if (choice === '1') {
    console.log('🔍 Running Schema Cloning Script...')
    execSync(
      'NODE_OPTIONS="--loader ts-node/esm" ts-node scripts/dato/clone-schema.ts',
      { stdio: 'inherit' }
    )
  } else if (choice === '2') {
    console.log('🔍 Running Field Cloning Script...')
    execSync(
      'NODE_OPTIONS="--loader ts-node/esm" ts-node scripts/dato/clone-fields.ts',
      { stdio: 'inherit' }
    )
  } else {
    console.log('❌ Invalid option. Please choose 1 or 2.')
  }
}

main()

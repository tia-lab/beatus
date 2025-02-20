import boxen from 'boxen'
import chalk from 'chalk'
import { execSync } from 'child_process'
import readlineSync from 'readline-sync'

// Styled title
const header = boxen(chalk.bold.cyan('📦 Welcome to DatoCMS Cloning Tool!'), {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  borderColor: 'cyan'
})

async function main() {
  console.log(header)

  console.log(
    '\n' + chalk.yellow(`1️⃣ Clone an entire ${chalk.bold('schema')}`) + '\n'
  )
  console.log(chalk.yellow(`2️⃣ Clone specific ${chalk.bold('fields')}`) + '\n')

  const choice = readlineSync.question(
    chalk.green('👉 Select an option (1 or 2): ')
  )

  if (choice === '1') {
    console.log(chalk.blueBright('\n🔍 Running Schema Cloning Script...\n'))
    execSync(
      'NODE_OPTIONS="--loader ts-node/esm" ts-node scripts/dato/clone-schema.ts',
      { stdio: 'inherit' }
    )
  } else if (choice === '2') {
    console.log(
      '\n' + chalk.yellow(`1️⃣ Clone fields ${chalk.bold('manually')}`) + '\n'
    )
    console.log(
      chalk.yellow(`2️⃣ Clone fields with ${chalk.bold('sync')}`) + '\n'
    )

    const fieldChoice = readlineSync.question(
      chalk.green('👉 Select an option (1 or 2): ')
    )

    if (fieldChoice === '1') {
      console.log(chalk.blueBright('\n🔍 Running Field Cloning Script...\n'))
      execSync(
        'NODE_OPTIONS="--loader ts-node/esm" ts-node scripts/dato/clone-fields.ts',
        { stdio: 'inherit' }
      )
    } else if (fieldChoice === '2') {
      console.log(chalk.blueBright('\n🔍 Running Field Syncing Script...\n'))
      execSync(
        'NODE_OPTIONS="--loader ts-node/esm" ts-node scripts/dato/clone-fields-sync.ts',
        { stdio: 'inherit' }
      )
    } else {
      console.log(
        chalk.redBright('\n❌ Invalid option. Please choose 1 or 2.\n')
      )
    }
  } else {
    console.log(chalk.redBright('\n❌ Invalid option. Please choose 1 or 2.\n'))
  }
}

main()

import boxen from 'boxen'
import chalk from 'chalk'
import { promises as fs } from 'fs'
import path from 'path'
// Get the project root directory
const projectRoot = process.cwd()

// Get the project name from the command line arguments
const project = process.argv[2]

let accumulatedMessages = ''

// Helper function to log messages inside a single box
function logBox(message) {
  accumulatedMessages += message + '\n'
}

// Helper function to display the accumulated log messages in a box
function displayFinalLog(isError = false) {
  const borderColor = isError ? 'red' : 'green'

  console.log(
    boxen(accumulatedMessages, {
      padding: 1,
      borderColor: borderColor,
      borderStyle: 'round'
    })
  )

  // Clear accumulated messages after displaying them
  accumulatedMessages = ''
}

if (!project) {
  logBox(chalk.red('🙈 Project name is required (e.g., myProject)'))
  displayFinalLog(true)
  process.exit(1)
}

// Define paths for the source (project env file) and destination (.env.local)
const envFilePath = path.join(projectRoot, `env/.env.${project}`)
const destEnvFile = path.join(projectRoot, '.env')

try {
  // Check if the project-specific env file exists
  await fs.access(envFilePath)

  // Read the content of the project-specific env file
  const envFileContent = await fs.readFile(envFilePath, 'utf-8')

  // Write the content to the .env.local file, replacing its current content
  await fs.writeFile(destEnvFile, envFileContent, 'utf-8')

  logBox(chalk.bold(`🤟 Successfully loaded ${project}`))
  logBox(chalk.bold(chalk.green(`/env.${project} -> .env`)))
  displayFinalLog(false)
} catch (err) {
  logBox(chalk.red(`Error: ${err.message}`))
  displayFinalLog(true)
  process.exit(1)
}

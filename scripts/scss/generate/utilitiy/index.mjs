import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Simulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define the project root based on the current working directory
const projectRoot = process.cwd()

// Define absolute paths for settings and output directories
const settingsFolder = path.resolve(projectRoot, 'src/styles/config') // Points to your config directory
const outputFolder = path.resolve(projectRoot, 'src/styles/vars') // Points to the output directory

const utilityFileName = '_utilities.scss' // File for utility classes
const globalUtilityFileName = '_utilities.scss' // File for global utility classes

// Helper function to convert camelCase or PascalCase to kebab-case
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Convert camelCase
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2') // Handle PascalCase
    .replace(/(\d+)/g, '-$1') // Add hyphen before numbers
    .replace(/[\s_()]+/g, '-') // Remove spaces, underscores, parentheses
    .replace(/-+/, '-') // Ensure no double hyphens
    .toLowerCase()
}

// Function to process double hyphens and ensure hyphen after `var(`
function processHyphens(content) {
  let processedContent = content.replace(/--+/g, '-')
  processedContent = processedContent.replace(/var\(/g, 'var(-')
  return processedContent
}

// Function to generate SCSS utility classes
async function generateUtilityClasses(variables, mappings, parentKey = '') {
  let utilityClasses = ''

  for (const [key, value] of Object.entries(variables)) {
    const kebabKey = toKebabCase(key) // Convert key to kebab-case
    const variableKey = parentKey ? `${parentKey}-${kebabKey}` : kebabKey

    if (typeof value === 'object' && value !== null) {
      if ('default' in value) {
        // Only generate for the "default" key
        utilityClasses += generateUtilityForValue(
          variableKey,
          value.default,
          mappings
        )
      } else {
        // Nested object, recurse
        const nestedResult = await generateUtilityClasses(
          value,
          mappings,
          variableKey
        )
        utilityClasses += nestedResult
      }
    } else {
      // Direct value case
      utilityClasses += generateUtilityForValue(variableKey, value, mappings)
    }
  }

  return processHyphens(utilityClasses)
}

// Helper function to create SCSS classes for a value
function generateUtilityForValue(variableKey, value, mappings) {
  let utility = ''
  mappings.forEach((mapping) => {
    for (const [classPrefix, cssProperty] of Object.entries(mapping)) {
      // Check if `!!` is in the property name
      const isImportant = cssProperty.endsWith('!!')
      const cleanProperty = isImportant
        ? cssProperty.replace('!!', '')
        : cssProperty

      utility += `
      .${classPrefix}-${variableKey} {
        ${cleanProperty}: var(--${variableKey})${isImportant ? ' !important' : ''};
      }
      `
    }
  })
  return utility
}

// Function to write utility SCSS files for each export in settings and create a global file
export async function writeUtilitiesForAllSettings(logBox) {
  const settingsFolderPath = settingsFolder
  const outputFolderPath = outputFolder

  let globalUtilityContent = '' // Global utility content

  // Process starting from config/index.ts
  const configFilePath = path.resolve(settingsFolderPath, 'index.ts')

  // Dynamically import config/index.ts
  let importedModule
  try {
    importedModule = await import(configFilePath)
    logBox(
      chalk.green(
        'Imported modules: ',
        chalk.cyan(JSON.stringify(Object.keys(importedModule)))
      )
    )
  } catch (error) {
    logBox(chalk.red('Error importing config/index.ts:', error))
    return
  }

  for (const [exportName, exportValue] of Object.entries(importedModule)) {
    if (Array.isArray(exportValue) && typeof exportValue[0] === 'object') {
      const [variables, mappings] = exportValue // Destructure variables and mappings
      const exportFolderPath = path.join(outputFolderPath, exportName)

      // If the array (mappings) is empty, skip utility generation
      if (!mappings || mappings.length === 0) {
        logBox(
          chalk.yellow(
            `Skipping utility generation for ${exportName} because mappings array is empty.`
          )
        )
        continue // Skip this export
      }

      if (!fs.existsSync(exportFolderPath)) {
        fs.mkdirSync(exportFolderPath, { recursive: true })
      }

      // Generate utility classes based on the variables and mappings
      const scssUtilities = await generateUtilityClasses(variables, mappings)

      // Write the utility SCSS file for the current export
      const exportUtilityFilePath = path.join(exportFolderPath, utilityFileName)
      fs.writeFileSync(exportUtilityFilePath, scssUtilities, 'utf8')
      logBox(chalk.gray(`Created ${utilityFileName} in ${exportFolderPath}`))

      // Append to the global utility content
      globalUtilityContent += `\n/* Utility classes for ${exportName} */\n${scssUtilities}`
    }
  }

  // Write the global utility SCSS file
  const globalUtilityFilePath = path.join(
    outputFolderPath,
    globalUtilityFileName
  )
  fs.writeFileSync(globalUtilityFilePath, globalUtilityContent, 'utf8')
  logBox(
    chalk.gray(
      `Created global utility file: ${globalUtilityFileName} in ${outputFolderPath}`
    )
  )
}

// If this script is called directly, run the SCSS utility generation
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Running SCSS utility generation script directly...')
  writeUtilitiesForAllSettings().catch((error) => {
    console.error('Error running SCSS utility generation:', error)
  })
}

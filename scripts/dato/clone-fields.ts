import { buildClient } from '@datocms/cma-client'
import boxen from 'boxen'
import chalk from 'chalk'
import dotenv from 'dotenv'
import readlineSync from 'readline-sync'

dotenv.config()

// Styled Header
const header = boxen(chalk.bold.cyan('📦 Welcome to DatoCMS Field Cloner!'), {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  borderColor: 'cyan'
})

// Ensure API token is set
const apiToken = process.env.DATOCMS_CMA_TOKEN
if (!apiToken) {
  console.error(
    chalk.redBright.bold(
      '\n❌ Error: DATOCMS_CMA_TOKEN is missing. Add it to your .env file.\n'
    )
  )
  process.exit(1)
}

const client = buildClient({ apiToken })

async function getModelIdByName(modelName: string) {
  const models = await client.itemTypes.list()
  const model = models.find((m) => m.api_key === modelName)
  return model ? model.id : null
}

async function copyFields(
  sourceModelId: string,
  targetModelId: string,
  fieldApiKeys: string[]
) {
  try {
    console.log(
      chalk.blueBright.bold(
        `\n🔍 Fetching fields from source model (ID: ${sourceModelId})...`
      )
    )
    const sourceFields = await client.fields.list(sourceModelId)

    const fieldsToCopy = sourceFields.filter((field) =>
      fieldApiKeys.includes(field.api_key)
    )

    if (fieldsToCopy.length === 0) {
      console.log(
        chalk.redBright.bold(
          '\n❌ No matching fields found in the source model.\n'
        )
      )
      return
    }

    console.log(
      chalk.green.bold(
        `✅ Found ${fieldsToCopy.length} fields. Copying to target model (ID: ${targetModelId})...\n`
      )
    )

    for (const field of fieldsToCopy) {
      console.log(chalk.blueBright(`🔄 Copying field '${field.api_key}'...`))
      await client.fields.create(targetModelId, {
        label: field.label,
        api_key: field.api_key,
        field_type: field.field_type,
        localized: field.localized,
        validators: field.validators,
        appearance: field.appearance,
        default_value: field.default_value
      })
      console.log(chalk.green(`✅ Successfully copied '${field.api_key}'`))
    }

    console.log(
      chalk.green.bold(
        `\n🎉 Success: ${fieldsToCopy.length} fields copied from model '${sourceModelId}' to '${targetModelId}'.\n`
      )
    )
  } catch (error) {
    console.error(chalk.redBright.bold('\n❌ Error copying fields:'), error)
  }
}

async function main() {
  console.log(header)

  const sourceModelName = readlineSync.question(
    chalk.green.bold("Enter the API key of the source model (e.g., 'room'): ")
  )
  const targetModelName = readlineSync.question(
    chalk.green.bold(
      "Enter the API key of the target model (e.g., 'package'): "
    )
  )
  const fieldApiKeysInput = readlineSync.question(
    chalk.green.bold(
      "Enter the field API keys to copy, separated by commas (e.g., 'test,description,image'): "
    )
  )

  // Convert comma-separated string into an array
  const fieldApiKeys = fieldApiKeysInput.split(',').map((key) => key.trim())

  console.log(chalk.blueBright.bold('\n🔍 Fetching model IDs...\n'))
  const sourceModelId = await getModelIdByName(sourceModelName)
  const targetModelId = await getModelIdByName(targetModelName)

  if (!sourceModelId || !targetModelId) {
    console.error(
      chalk.redBright.bold(
        '\n❌ Error: One or both model API keys are invalid.\n'
      )
    )
    return
  }

  console.log(
    chalk.green.bold(
      `✅ Found models: ${sourceModelName} (ID: ${sourceModelId}), ${targetModelName} (ID: ${targetModelId})\n`
    )
  )
  console.log(chalk.yellow.bold('🚀 Starting field cloning process...\n'))

  await copyFields(sourceModelId, targetModelId, fieldApiKeys)
}

main()

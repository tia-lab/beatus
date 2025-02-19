import { buildClient } from '@datocms/cma-client'
import dotenv from 'dotenv'
import readlineSync from 'readline-sync'

dotenv.config()

// Ensure API token is set
const apiToken = process.env.DATOCMS_CMA_TOKEN
if (!apiToken) {
  console.error(
    '❌ Error: DATOCMS_CMA_TOKEN is missing. Add it to your .env file.'
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
    console.log(`🔍 Fetching fields from source model (${sourceModelId})...`)
    const sourceFields = await client.fields.list(sourceModelId)

    const fieldsToCopy = sourceFields.filter((field) =>
      fieldApiKeys.includes(field.api_key)
    )

    if (fieldsToCopy.length === 0) {
      console.error('❌ No matching fields found in the source model.')
      return
    }

    console.log(
      `✅ Found ${fieldsToCopy.length} fields. Copying to target model (${targetModelId})...\n`
    )

    for (const field of fieldsToCopy) {
      console.log(`🔄 Copying field '${field.api_key}'...`)
      await client.fields.create(targetModelId, {
        label: field.label,
        api_key: field.api_key,
        field_type: field.field_type,
        localized: field.localized,
        validators: field.validators,
        appearance: field.appearance,
        default_value: field.default_value
      })
      console.log(`✅ Successfully copied '${field.api_key}'`)
    }

    console.log(
      `🎉 Success: ${fieldsToCopy.length} fields copied from model '${sourceModelId}' to '${targetModelId}'.`
    )
  } catch (error) {
    console.error('❌ Error copying fields:', error)
  }
}

async function main() {
  console.log('📦 Welcome to DatoCMS Field Cloner!')

  const sourceModelName = readlineSync.question(
    "Enter the API key of the source model (e.g., 'room'): "
  )
  const targetModelName = readlineSync.question(
    "Enter the API key of the target model (e.g., 'package'): "
  )
  const fieldApiKeysInput = readlineSync.question(
    "Enter the field API keys to copy, separated by commas (e.g., 'test,description,image'): "
  )

  // Convert comma-separated string into an array
  const fieldApiKeys = fieldApiKeysInput.split(',').map((key) => key.trim())

  console.log('🔍 Fetching model IDs...')
  const sourceModelId = await getModelIdByName(sourceModelName)
  const targetModelId = await getModelIdByName(targetModelName)

  if (!sourceModelId || !targetModelId) {
    console.error('❌ Error: One or both model API keys are invalid.')
    return
  }

  console.log(
    `✅ Found models: ${sourceModelName} (ID: ${sourceModelId}), ${targetModelName} (ID: ${targetModelId})`
  )
  console.log('🚀 Starting field cloning process...\n')

  await copyFields(sourceModelId, targetModelId, fieldApiKeys)
}

main()

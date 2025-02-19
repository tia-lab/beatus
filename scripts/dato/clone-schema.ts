import { buildClient } from '@datocms/cma-client'
import dotenv from 'dotenv'
import readlineSync from 'readline-sync'

dotenv.config()

const apiToken = process.env.DATOCMS_CMA_TOKEN
if (!apiToken) {
  console.error(
    '❌ Error: DATOCMS_CMA_TOKEN is missing. Add it to your .env file.'
  )
  process.exit(1)
}

const client = buildClient({ apiToken })

async function getModelByApiKey(apiKey: string) {
  const models = await client.itemTypes.list()
  return models.find((m) => m.api_key === apiKey) || null
}

async function cloneSchema(
  sourceModelApiKey: string,
  targetModelApiKey: string,
  targetModelTitle: string
) {
  try {
    console.log(`🔍 Checking if source model '${sourceModelApiKey}' exists...`)
    const sourceModel = await getModelByApiKey(sourceModelApiKey)
    if (!sourceModel) {
      console.error(
        `❌ Error: Source model '${sourceModelApiKey}' does not exist.`
      )
      return
    }

    console.log(
      `✅ Source model found: '${sourceModelApiKey}' (ID: ${sourceModel.id})`
    )

    let targetModel = await getModelByApiKey(targetModelApiKey)

    if (!targetModel) {
      console.log(
        `🚀 Target model '${targetModelApiKey}' does not exist. Creating...`
      )
      targetModel = await client.itemTypes.create({
        name: targetModelTitle,
        api_key: targetModelApiKey,
        singleton: sourceModel.singleton,
        sortable: sourceModel.sortable,
        tree: sourceModel.tree,
        draft_mode_active: sourceModel.draft_mode_active
      })
      console.log(
        `✅ Target model '${targetModelApiKey}' created successfully.`
      )
    } else {
      console.log(
        `⚠️ Target model '${targetModelApiKey}' already exists. Cloning fields and fieldsets only.`
      )
    }

    // 🔄 Step 1: Clone Each Fieldset and Fields Inside It
    console.log(
      `🔍 Fetching fieldsets from source model '${sourceModelApiKey}'...`
    )
    const sourceFieldsets = await client.fieldsets.list(sourceModel.id)
    const fieldsetMap: Record<string, string> = {}

    for (const fieldset of sourceFieldsets.sort(
      (a, b) => a.position - b.position
    )) {
      console.log(`🔄 Cloning fieldset '${fieldset.title || 'Untitled'}'...`)
      const newFieldset = await client.fieldsets.create(targetModel.id, {
        title: fieldset.title || 'Untitled Fieldset',
        hint: fieldset.hint,
        position: fieldset.position
      })

      fieldsetMap[fieldset.id] = newFieldset.id
      console.log(`✅ Fieldset '${fieldset.title || 'Untitled'}' cloned.`)

      // 🔄 Now Clone the Fields Inside This Fieldset
      console.log(`🔍 Fetching fields inside fieldset '${fieldset.title}'...`)
      const sourceFields = await client.fields.list(sourceModel.id)
      const fieldsInFieldset = sourceFields
        .filter((field) => field.fieldset?.id === fieldset.id)
        .sort((a, b) => a.position - b.position)

      for (const field of fieldsInFieldset) {
        // 🚨 Skip Slug Fields
        if (field.validators?.slug_title_field) {
          console.log(
            `⚠️ Skipped slug field '${field.api_key}' inside '${fieldset.title}'.`
          )
          continue
        }

        console.log(
          `🔄 Creating field '${field.api_key}' inside '${fieldset.title}'...`
        )
        await client.fields.create(targetModel.id, {
          label: field.label,
          api_key: field.api_key,
          field_type: field.field_type,
          localized: field.localized,
          validators: field.validators,
          appearance: field.appearance,
          default_value: field.default_value,
          fieldset: newFieldset, // Assign the newly created fieldset
          position: field.position // Maintain original order
        })
        console.log(
          `✅ Field '${field.api_key}' cloned inside '${fieldset.title}'.`
        )
      }
    }

    // 🔄 Step 2: Clone Fields Without a Fieldset
    console.log('🔍 Cloning fields that are NOT inside a fieldset...')
    const sourceFields = await client.fields.list(sourceModel.id)
    const ungroupedFields = sourceFields
      .filter((field) => !field.fieldset)
      .sort((a, b) => a.position - b.position)

    for (const field of ungroupedFields) {
      // 🚨 Skip Slug Fields
      if (field.validators?.slug_title_field) {
        console.log(
          `⚠️ Skipped slug field '${field.api_key}' (not in a fieldset).`
        )
        continue
      }

      console.log(
        `🔄 Creating field '${field.api_key}' (Position: ${field.position})...`
      )
      await client.fields.create(targetModel.id, {
        label: field.label,
        api_key: field.api_key,
        field_type: field.field_type,
        localized: field.localized,
        validators: field.validators,
        appearance: field.appearance,
        default_value: field.default_value,
        fieldset: undefined, // No fieldset assigned
        position: field.position // Maintain original position
      })
      console.log(`✅ Field '${field.api_key}' cloned.`)
    }

    console.log(
      `🎉 Success: Model '${sourceModelApiKey}' cloned to '${targetModelApiKey}' with fieldsets and correct field placement!`
    )
  } catch (error) {
    console.error('❌ Error cloning schema:', error)
  }
}

async function main() {
  console.log('📦 Welcome to DatoCMS Schema Cloner!')

  const sourceModelApiKey = readlineSync.question(
    "Enter the API key of the source model (e.g., 'room'): "
  )
  const targetModelApiKey = readlineSync.question(
    "Enter the API key for the new cloned model (e.g., 'rooms_cloned'): "
  )
  const targetModelTitle = readlineSync.question(
    'Enter the title for the new model: '
  )

  console.log(
    `🚀 Cloning schema from '${sourceModelApiKey}' to '${targetModelApiKey}'...\n`
  )
  await cloneSchema(sourceModelApiKey, targetModelApiKey, targetModelTitle)
}

main()

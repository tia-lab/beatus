import { buildClient } from '@datocms/cma-client'
import boxen from 'boxen'
import chalk from 'chalk'
import dotenv from 'dotenv'
import readlineSync from 'readline-sync'

dotenv.config()

// Styled Header
const header = boxen(chalk.bold.cyan('📦 Welcome to DatoCMS Schema Cloner!'), {
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
    console.log(
      chalk.blueBright.bold(
        `\n🔍 Checking if source model '${sourceModelApiKey}' exists...`
      )
    )
    const sourceModel = await getModelByApiKey(sourceModelApiKey)
    if (!sourceModel) {
      console.error(
        chalk.redBright.bold(
          `\n❌ Error: Source model '${sourceModelApiKey}' does not exist.\n`
        )
      )
      return
    }

    console.log(
      chalk.green.bold(
        `✅ Source model found: '${sourceModelApiKey}' (ID: ${sourceModel.id})\n`
      )
    )

    let targetModel = await getModelByApiKey(targetModelApiKey)

    if (!targetModel) {
      console.log(
        chalk.yellow.bold(
          `🚀 Target model '${targetModelApiKey}' does not exist. Creating...\n`
        )
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
        chalk.green.bold(
          `✅ Target model '${targetModelApiKey}' created successfully.\n`
        )
      )
    } else {
      console.log(
        chalk.yellow.bold(
          `⚠️ Target model '${targetModelApiKey}' already exists. Cloning fields and fieldsets only.\n`
        )
      )
    }

    // 🔄 Step 1: Clone Each Fieldset and Fields Inside It
    console.log(
      chalk.blueBright.bold(
        `🔍 Fetching fieldsets from source model '${sourceModelApiKey}'...\n`
      )
    )
    const sourceFieldsets = await client.fieldsets.list(sourceModel.id)
    const fieldsetMap: Record<string, string> = {}

    for (const fieldset of sourceFieldsets.sort(
      (a, b) => a.position - b.position
    )) {
      console.log(
        chalk.blueBright(
          `🔄 Cloning fieldset '${fieldset.title || 'Untitled'}'...`
        )
      )
      const newFieldset = await client.fieldsets.create(targetModel.id, {
        title: fieldset.title || 'Untitled Fieldset',
        hint: fieldset.hint,
        position: fieldset.position
      })

      fieldsetMap[fieldset.id] = newFieldset.id
      console.log(
        chalk.green(`✅ Fieldset '${fieldset.title || 'Untitled'}' cloned.`)
      )

      // 🔄 Now Clone the Fields Inside This Fieldset
      console.log(
        chalk.blueBright(
          `🔍 Fetching fields inside fieldset '${fieldset.title}'...\n`
        )
      )
      const sourceFields = await client.fields.list(sourceModel.id)
      const fieldsInFieldset = sourceFields
        .filter((field) => field.fieldset?.id === fieldset.id)
        .sort((a, b) => a.position - b.position)

      for (const field of fieldsInFieldset) {
        // 🚨 Skip Slug Fields
        if (field.validators?.slug_title_field) {
          console.log(
            chalk.yellow(
              `⚠️ Skipped slug field '${field.api_key}' inside '${fieldset.title}'.`
            )
          )
          continue
        }

        console.log(
          chalk.blueBright(
            `🔄 Creating field '${field.api_key}' inside '${fieldset.title}'...`
          )
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
          chalk.green(
            `✅ Field '${field.api_key}' cloned inside '${fieldset.title}'.`
          )
        )
      }
    }

    // 🔄 Step 2: Clone Fields Without a Fieldset
    console.log(
      chalk.blueBright.bold(
        '\n🔍 Cloning fields that are NOT inside a fieldset...\n'
      )
    )
    const sourceFields = await client.fields.list(sourceModel.id)
    const ungroupedFields = sourceFields
      .filter((field) => !field.fieldset)
      .sort((a, b) => a.position - b.position)

    for (const field of ungroupedFields) {
      // 🚨 Skip Slug Fields
      if (field.validators?.slug_title_field) {
        console.log(
          chalk.yellow(
            `⚠️ Skipped slug field '${field.api_key}' (not in a fieldset).`
          )
        )
        continue
      }

      console.log(
        chalk.blueBright(
          `🔄 Creating field '${field.api_key}' (Position: ${field.position})...`
        )
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
      console.log(chalk.green(`✅ Field '${field.api_key}' cloned.`))
    }

    console.log(
      chalk.green.bold(
        `\n🎉 Success: Model '${sourceModelApiKey}' cloned to '${targetModelApiKey}' with fieldsets and correct field placement!\n`
      )
    )
  } catch (error) {
    console.error(chalk.redBright.bold('\n❌ Error cloning schema:'), error)
  }
}

async function main() {
  console.log(header)

  const sourceModelApiKey = readlineSync.question(
    chalk.green.bold("Enter the API key of the source model (e.g., 'room'): ")
  )
  const targetModelApiKey = readlineSync.question(
    chalk.green.bold(
      "Enter the API key for the new cloned model (e.g., 'rooms_cloned'): "
    )
  )
  const targetModelTitle = readlineSync.question(
    chalk.green.bold('Enter the title for the new model: ')
  )

  console.log(
    chalk.yellow.bold(
      `\n🚀 Cloning schema from '${sourceModelApiKey}' to '${targetModelApiKey}'...\n`
    )
  )
  await cloneSchema(sourceModelApiKey, targetModelApiKey, targetModelTitle)
}

main()

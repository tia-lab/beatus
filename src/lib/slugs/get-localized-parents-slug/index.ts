// Define a type for any object structure, as long as it includes `parent` with the specified structure
type HasFlexibleParentStructure = {
  parent?: HasLocalizedSlugAndParent | null
  [key: string]: any // Allows additional properties of any type
}

// Define the recursive type for parent structures with localized slugs
type HasLocalizedSlugAndParent = {
  slug?: string
  _allSlugLocales?: { locale: string | null; value: string }[] | null
  parent?: HasLocalizedSlugAndParent | null
}

// Function to build localized URL paths using the `parent` hierarchy
function getLocalizedParentSlugs(page: HasFlexibleParentStructure | null): {
  [locale: string]: string
} {
  // Return an empty object if there are no parents
  if (!page?.parent) {
    return {}
  }

  // Initialize an object to hold prefixes for each locale
  const prefixes: { [locale: string]: string } = {}

  // Traverse the hierarchy to collect slugs for each locale
  let current: HasLocalizedSlugAndParent | null = page.parent
  const localeSlugsMap: { [locale: string]: string[] } = {}

  while (current) {
    // For each locale in the current node, if _allSlugLocales exists and is not null, collect the slug
    current._allSlugLocales?.forEach(({ locale, value }) => {
      if (!localeSlugsMap[locale || '']) {
        localeSlugsMap[locale || ''] = []
      }
      localeSlugsMap[locale || ''].push(value)
    })

    current = current.parent ?? null // Move up to the next parent
  }

  // For each locale, reverse the slugs and join them to form the URL path
  Object.keys(localeSlugsMap).forEach((locale) => {
    prefixes[locale] = localeSlugsMap[locale].reverse().join('/')
  })

  return prefixes
}

export default getLocalizedParentSlugs

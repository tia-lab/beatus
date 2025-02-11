type LocalizedPrefixes = { [key: string]: string }

// This function constructs the expected path from parent hierarchy and checks if it matches the provided params
function checkPathMatch(
  localizedPrefixes: LocalizedPrefixes,
  locale: string,
  paramsSlug: string[]
): boolean {
  // Get the parent path segments for the specified locale
  const expectedPath = localizedPrefixes[locale]?.split('/') ?? []

  // Construct the full path by adding the last segment of paramsSlug (current page's slug)
  const fullPath = [...expectedPath, paramsSlug[paramsSlug.length - 1]]

  // Strictly check if `fullPath` matches the `paramsSlug` exactly in both length and content
  return (
    fullPath.length === paramsSlug.length &&
    fullPath.every((slug, index) => slug === paramsSlug[index])
  )
}

export default checkPathMatch

type PageNode = {
  slug?: string
  parent?: PageNode | null
}

function getParentSlug(node: PageNode | null): string {
  const slugs: string[] = []
  let current = node

  while (current) {
    if (current.slug) slugs.unshift(current.slug) // Collect slugs from parent to child
    current = current.parent ?? null // Move to the next parent in the hierarchy
  }

  return slugs.length ? `/${slugs.join('/')}` : '' // Join slugs with '/'
}

export default getParentSlug

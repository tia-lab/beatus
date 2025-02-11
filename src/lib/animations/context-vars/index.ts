/**
 * Replaces variables in a string based on the provided context.
 * @param c The context object containing the variables.
 * @param value The string value to replace variables in.
 * @returns The string with variables replaced.
 */

/* eslint-disable */

function replaceVars(value: string, c?: gsap.Context): string {
  return typeof value === 'string' && value.includes('||')
    ? c?.conditions?.desktop
      ? value.split('||')[0].trim()
      : value.split('||')[1].trim()
    : value
}

/**
 * Recursively creates context variables by replacing variables in the provided animation variables object.
 * @param c The context object containing the variables.
 * @param animVars The animation variables object to replace variables in.
 * @returns The animation variables object with variables replaced.
 */
function contextVars(
  c?: gsap.Context,
  animVars?: GSAPTweenVars
): GSAPTweenVars {
  if (!animVars) return {}
  const replacedVars: GSAPTweenVars = { ...animVars }

  for (const key in replacedVars) {
    replacedVars[key] = replaceVars(replacedVars[key], c)

    if (typeof replacedVars[key] === 'object') {
      replacedVars[key] = contextVars(c, replacedVars[key] as GSAPTweenVars)
    }
  }

  return replacedVars
}

function contextScrollVars(
  c?: gsap.Context,
  animVars?: ScrollTrigger.Vars
): ScrollTrigger.Vars {
  if (!animVars) return {}
  const replacedVars: ScrollTrigger.Vars = { ...animVars }

  for (const key in replacedVars) {
    //@ts-ignore
    replacedVars[key] = replaceVars(replacedVars[key], c)
    //@ts-ignore
    if (typeof replacedVars[key] === 'object') {
      //@ts-ignore
      replacedVars[key] = contextVars(
        c,
        //@ts-ignore
        replacedVars[key] as ScrollTrigger.Vars
      )
    }
  }

  return replacedVars
}

export { contextScrollVars, contextVars }

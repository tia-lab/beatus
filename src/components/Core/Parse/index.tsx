import parser, { DOMNode, Element, domToReact } from 'html-react-parser'
import React from 'react'

interface ParseProps {
  html?: string | null
  excludeTags?: string[] // Tags to remove while keeping their content
}

const Parse: React.FC<ParseProps> = ({ html, excludeTags = [] }) => {
  if (!html) return null
  return (
    <>
      {parser(html, {
        replace: (domNode: DOMNode) => {
          if (
            domNode instanceof Element &&
            excludeTags.includes(domNode.tagName)
          ) {
            //@ts-expect-error
            return <>{domToReact(domNode.children)}</> // ✅ Remove tag but keep content
          }
        }
      })}
    </>
  )
}

export default Parse

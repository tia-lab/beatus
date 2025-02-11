// app/api/formspree-submissions/route.ts

export const revalidate = 10

import { NextResponse } from 'next/server'

const FORMSPREE_API_URL =
  'https://formspree.io/api/0/forms/xeoqnrqe/submissions' // Replace with your Form ID
const FORMSPREE_API_TOKEN = '701d4c7b4cd635246903a5589e4d314767582b82' // Add this to your .env file

export async function GET() {
  try {
    const response = await fetch(FORMSPREE_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${FORMSPREE_API_TOKEN}` // Bearer token for authentication
      }
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json(
        { error: error.message },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch submissions.' },
      { status: 500 }
    )
  }
}

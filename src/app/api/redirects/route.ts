import redirects from '@/lib/redirects'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const data = await redirects()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching redirects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch redirects' },
      { status: 500 }
    )
  }
}

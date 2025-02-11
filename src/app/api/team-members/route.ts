import { TeamMemberFragment } from '@/lib/fragments'
import { executeQuery } from '@/lib/query'
import { Lib } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import { handleUnexpectedError, successfulResponse } from '../utils'
import query from './query'

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const locale = req.nextUrl.searchParams.get('locale') || 'de'
    const nationality = req.nextUrl.searchParams.get('nationality')
    const discipline = req.nextUrl.searchParams.get('discipline')
    const departement = req.nextUrl.searchParams.get('departement')
    const language = req.nextUrl.searchParams.get('language')
    const isDraftModeEnabled = req.nextUrl.searchParams.get('draft') === 'true'

    const variables: any = { locale, first: 100, skip: 0 } // Start with first batch of 100
    if (nationality) variables.nationality = nationality
    if (discipline) variables.disciplineId = discipline.split(',')
    if (departement) variables.departementId = departement.split(',')
    if (language) variables.languageId = language.split(',')

    let allTeamMembers: Lib.FragmentOf<typeof TeamMemberFragment>[] = []
    let hasMore = true

    while (hasMore) {
      const { allTeamMembers: batch } = await executeQuery(query, {
        includeDrafts: isDraftModeEnabled,
        variables
      })

      allTeamMembers = [...allTeamMembers, ...batch]
      hasMore = batch.length === variables.first // Check if there might be more items
      variables.skip += variables.first // Increment skip for next batch
    }

    return successfulResponse(allTeamMembers)
  } catch (error) {
    return handleUnexpectedError(error)
  }
}

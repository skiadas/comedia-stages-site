import { productions, profiles, venues, works } from "./example"
import { Profile, Venue, Work } from "../types"
import { DbWork } from "./dbtypes"

export async function getProfiles(inputString: string): Promise<Profile[]> {
  return profiles.filter((pr) =>
    (pr.lastName + pr.firstName)
      .toLowerCase()
      .includes(inputString.toLowerCase())
  )
}

export async function savePerson(person: Profile): Promise<void> {
  for (const pr of profiles) {
    if (pr.id == person.id) {
      pr.firstName = person.firstName
      pr.lastName = person.lastName
      return
    }
  }
  profiles.push(person)
  return
}

export async function getProfile(
  id: string | undefined
): Promise<Profile | null> {
  if (typeof id == "undefined") return null
  for (const pr of profiles) {
    if (pr.id == id) return pr
  }
  return null
}

export async function getWork(id: string | undefined): Promise<Work | null> {
  if (typeof id == "undefined") return null
  for (const work of works) {
    if (work.id == id) {
      return hydratedWork(work)
    }
  }
  return null
}

export function getVenues(inputString: string): Promise<Venue[]> {
  return Promise.resolve(
    venues.filter((v) =>
      v.name.toLowerCase().includes(inputString.toLowerCase())
    )
  )
}

export function saveVenue(venue: Venue) {
  for (const v of venues) {
    if (v.id == venue.id) {
      v.name = venue.name
      v.url = venue.url
      v.location = venue.location && { ...venue.location }
      return
    }
  }
  venues.push(venue)
}

export async function getWorks(inputString: string): Promise<Work[]> {
  return Promise.all(
    works
      .filter((wk) =>
        wk.title.toLowerCase().includes(inputString.toLowerCase())
      )
      .map((wk) => hydratedWork(wk))
  )
}

export function saveWork(work: Work) {
  for (const w of works) {
    if (w.id == work.id) {
      w.author = work.author?.id
      w.characters = [...work.characters]
      w.createdAt = work.createdAt
      w.description = work.description
      w.title = work.title
      return
    }
  }
  works.push({ ...work, author: work.author?.id })
}

async function hydratedWork(dbWork: DbWork): Promise<Work> {
  const { author: authorId } = dbWork
  const author = await getProfile(authorId)
  return {
    ...dbWork,
    author: author || undefined,
  }
}

export interface TimePeriod {
  year: number
  month?: number
  day?: number
}

export type TimeInterval = [TimePeriod, TimePeriod]

export interface Work {
  id: string
  title: string
  author?: Profile
  createdAt?: TimePeriod
  description: string
  characters: string[]
}

export interface Production {
  id: string
  label: string
  work: Work
  director?: Profile
  actors: PerformingProfile[]
  time?: TimePeriod | TimeInterval
  description: string
  venue: Venue["id"]
}

export interface Venue {
  id: string
  name: string
  url?: string
  location?: PhysicalLocation
}

export type PhysicalLocation = {
  city: string
  state?: string
  country: string
  coords?: { lon: number; lat: number }
}

export type Role = string
export type PerformingProfile = [Profile, Role[]]
export type HydratedPerformingProfile = [Profile, Role[]]

export interface Profile {
  id: string
  firstName: string
  lastName: string
  img?: ImageRef
}

export type ImageRef = WeblinkImage | StoredImage | Base64Image

export interface WeblinkImage {
  type: "weblink"
  href: string
}

export interface StoredImage {
  type: "stored"
  itemId: string
}

export interface Base64Image {
  type: "base64"
  base64: string
}

import { Work, Production, Profile, Role, Venue } from "../types"

export type DbWork = Omit<Work, "author"> & { author: Profile["id"] | undefined }
export type DbPerformingProfile = [Profile["id"], Role[]]
export type DbProduction = Omit<Production, "work" | "director" | "venue" | "actors"> & {
  work: DbWork["id"]
  director?: Profile["id"]
  venue: Venue["id"]
  actors: DbPerformingProfile[]
}

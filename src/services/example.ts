import { Profile, Venue } from "../types"
import { DbProduction, DbWork } from "./dbtypes"

export const profiles: Profile[] = [
  { id: "askew", firstName: "Peter", lastName: "Askew" },
  { id: "cervantes", firstName: "Miguel", lastName: "de Cervantes" },
]

export const works: DbWork[] = [
  {
    id: "donquixote",
    title: "Don Quixote",
    author: "cervantes",
    createdAt: { year: 1615 },
    description: "Grand adventures",
    characters: ["Don Quixote de la Mancha", "Sancho Pancha", "Dulcinea"],
  },
]

export const productions: DbProduction[] = [
  {
    id: "donquixoteGrandTheater",
    label: "Don Quixote at the Grand Theater",
    work: "donquixote",
    actors: [["askew", ["Sancho Pancha"]]],
    description: "Live at the Grand Theater",
    time: [
      { month: 6, year: 2025 },
      { month: 8, year: 2025 },
    ],
    venue: "grand-theater",
  },
]

export const venues: Venue[] = [
  {
    id: "grand-theater",
    name: "Grand theater",
    url: "www.google.com",
    location: { city: "New York", state: "Massachusetts", country: "USA" },
  },
]

// Uses nominatim.openstreetmaps.com to get info on
// an address search
// https://nominatim.org/release-docs/develop/api/Search/
//
// format	one of: xml, json, jsonv2, geojson, geocodejson	jsonv2
const baseUrl = "https://nominatim.openstreetmap.org/search?<params>"

import { useState } from "react"

interface SearchResult {
  place_id: number
  licence: string
  osm_type: string
  osm_id: number
  lat: string
  lon: string
}

interface ItemInfo {
  place_id: number
  licence: string
  osm_type: string
  osm_id: number
  coords: { lat: number; lon: number }
}

interface LocationSearchParams {
  amenity: string
  city?: string
  country?: string
  street?: string
  state?: string
  postalcode?: string
}
const paramKeys = [
  "amenity",
  "city",
  "country",
  "street",
  "state",
  "postalcode",
] as const

const storedSearches: Map<string, ItemInfo> = new Map()

export function useAddressSearch(params: LocationSearchParams): [ItemInfo | null, () => Promise<ItemInfo>] {
  const [info, setInfo] = useState<ItemInfo | null>(null)
  const paramsString = formParams(params)
  const doSearch = async () => {
    if (storedSearches.has(paramsString)) {
      console.log("cached", storedSearches.get(paramsString))
      setInfo(storedSearches.get(paramsString)!)
      return storedSearches.get(paramsString)!
    } else {
      const data = await makeRequest(paramsString)
      console.log("fresh", data)
      storedSearches.set(paramsString, data)
      setInfo(data)
      return data
    }
  }
  return [info, doSearch]
}

async function makeRequest(paramsString: string): Promise<ItemInfo> {
  const fullString = `${baseUrl}${paramsString}&format=jsonv2`
  const result = await fetch(fullString)
  const matches = (await result.json()) as SearchResult[]
  if (matches.length == 0) throw new Error("No matches found")
  const { place_id, licence, osm_type, osm_id, lat, lon } = matches[0]
  return {
    place_id,
    licence,
    osm_type,
    osm_id,
    coords: { lat: Number(lat), lon: Number(lon) },
  }
}

function formParams(params: LocationSearchParams): string {
  const parts = []
  for (const key of paramKeys) {
    const value = params[key]
    if (value) {
      parts.push(`${key}=${encodeURIComponent(value)}`)
    }
  }
  return parts.join("&")
}

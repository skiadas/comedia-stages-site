import { PhysicalLocation, DbProduction, Venue } from "./types"
import { EditGeneral, EditOneProps } from "./components/EditGeneral"
import { getProfile, getWork, saveProduction } from "./services/db"
import { ProductionSelect } from "./components/ProductionSelect"
import { randomId } from "./services/utils"
import { LabeledInput, LabeledNumberInput } from "./components/labeledInput"
import { CoordLocator } from "./components/CoordLocator"
import { useAddressSearch } from "./components/useAddressSearch"
import { Button } from "./components/button"
import { useState } from "react"
import { WorkSelect } from "./components/WorkSelect"
import { ProfileSelect } from "./components/ProfileSelect"
import { VenueSelect } from "./components/VenueSelect"

export function EditProductions() {
  return (
    <EditGeneral
      categoryName="Production"
      inputName="choose-production"
      selectOne={ProductionSelect}
      editOne={EditOneProduction}
      saveValue={saveProduction}
      createNew={makeNewProduction}
    />
  )
}

export function EditOneProduction({
  value: production,
  update,
  children,
}: EditOneProps<DbProduction>) {
  const { work: workId, director: directorId, venue: venueId } = production
  const director = getProfile(directorId)
  const work = getWork(workId)
  const venue = getVenue(venueId)
  return (
    <form className="edit-production">
      <WorkSelect
        inputName="production-work"
        value={work}
        onChange={(work) => update({ work: work?.id })}
      />
      <ProfileSelect
        inputName="production-director"
        value={director}
        onChange={(director) => update({ director: director?.id })}
      />
      <VenueSelect inputName="production-venue" value={venue} />
      <LabeledInput
        name="production-name"
        label="Name"
        value={venue.name}
        onChange={(name) => update({ name })}
      />
      <LabeledInput
        name="venue-url"
        label="Url"
        value={venue?.url}
        onChange={(url) => update({ url })}
      />
      <EditPhysicalLocation
        value={venue?.location}
        name={venue.name}
        onChange={(location) => update({ location: { ...location } })}
      />
      {children}
    </form>
  )
}

function EditPhysicalLocation({
  value: loc,
  name: venueName,
  onChange,
}: {
  value: PhysicalLocation | undefined
  name: string
  onChange: (loc: PhysicalLocation) => void
}) {
  const [, doSearch] = useAddressSearch({
    amenity: venueName,
    city: loc?.city,
    country: loc?.country,
  })
  const [searching, setSearching] = useState(false)
  const canSearch = !searching && (loc?.city || loc?.state || loc?.country)
  const startSearch = () => {
    setSearching(true)
    doSearch().then((data) => {
      setSearching(false)
      onChange({ city: "", country: "", ...loc, coords: { ...data.coords } })
    })
  }
  return (
    <>
      <LabeledInput
        label="City"
        name="location-city"
        value={loc?.city}
        onChange={(city: string) => onChange({ country: "", ...loc, city })}
      />
      <LabeledInput
        label="State"
        name="location-state"
        value={loc?.state}
        onChange={(state: string) =>
          onChange({ city: "", country: "", ...loc, state })
        }
      />
      <LabeledInput
        label="Country"
        name="location-country"
        value={loc?.country}
        onChange={(country: string) => onChange({ city: "", ...loc, country })}
      />
      <Button disabled={!canSearch} onClick={startSearch}>
        Search
      </Button>
      <LabeledNumberInput
        label="Lat"
        name="location-latitude"
        value={loc?.coords?.lat || 0}
        disabled={true}
      />
      <LabeledNumberInput
        label="Lon"
        name="location-longtitude"
        value={loc?.coords?.lon || 0}
        disabled={true}
      />

      <CoordLocator
        coords={loc?.coords}
        onChange={(coords) =>
          onChange({ city: "", country: "", ...loc, coords: { ...coords } })
        }
      />
    </>
  )
}

function makeNewProduction(): DbProduction {
  return {
    id: randomId(),
    label: "",
    work: "",
    director: "",
    description: "",
    venue: "",
    actors: [],
  }
}

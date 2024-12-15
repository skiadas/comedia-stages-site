import { PhysicalLocation, Venue } from "./types"
import { EditGeneral, EditOneProps } from "./components/EditGeneral"
import { saveVenue } from "./services/db"
import { VenueSelect } from "./components/VenueSelect"
import { randomId } from "./services/utils"
import { LabeledInput, LabeledNumberInput } from "./components/labeledInput"
import { CoordLocator } from "./components/CoordLocator"
import { useAddressSearch } from "./components/useAddressSearch"
import { Button } from "./components/button"
import { useState } from "react"

export function EditVenues() {
  return (
    <EditGeneral
      categoryName="Venue"
      inputName="choose-venue"
      selectOne={VenueSelect}
      editOne={EditOneVenue}
      saveValue={saveVenue}
      createNew={makeNewVenue}
    />
  )
}

export function EditOneVenue({
  value: venue,
  update,
  children,
}: EditOneProps<Venue>) {
  return (
    <form className="edit-venue">
      <LabeledInput
        name="venue-name"
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

function makeNewVenue(): Venue {
  return { id: randomId(), name: "" }
}

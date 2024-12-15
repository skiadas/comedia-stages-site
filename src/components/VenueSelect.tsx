import { Select } from "./select"
import { Venue } from "../types"
import { getVenues } from "../services/db"

export function VenueSelect({
  value,
  onChange,
  inputName,
}: {
  value?: Venue | null
  onChange: (venue: Venue | null) => void
  inputName: string
}) {
  return (
    <Select
      inputName={inputName}
      value={value || undefined}
      loadOptions={getVenues}
      getOptionLabel={(v: Venue) => v.name}
      getOptionValue={(v) => v.id}
      onChange={onChange}
    />
  )
}

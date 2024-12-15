import { Select } from "./select"
import { Profile } from "../types"
import { getProfiles } from "../services/db"

export function ProfileSelect({
  value,
  onChange,
  inputName,
}: {
  value?: Profile | null
  onChange: (profile: Profile | null) => void
  inputName: string
}) {
  return (
    <Select
      inputName={inputName}
      value={value || undefined}
      loadOptions={getProfiles}
      getOptionLabel={(pr: Profile) => `${pr.lastName}, ${pr.firstName}`}
      getOptionValue={(pr) => pr.id}
      onChange={onChange}
    />
  )
}

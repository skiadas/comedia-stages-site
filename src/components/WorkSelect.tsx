import { Select } from "./select"
import { Work } from "../types"
import { getWorks } from "../services/db"

export function WorkSelect({
  value,
  onChange,
  inputName,
}: {
  value?: Work | null
  onChange: (profile: Work | null) => void
  inputName: string
}) {
  return (
    <Select
      inputName={inputName}
      value={value || undefined}
      loadOptions={getWorks}
      getOptionLabel={(w: Work) => w.title}
      getOptionValue={(w) => w.id}
      onChange={onChange}
    />
  )
}

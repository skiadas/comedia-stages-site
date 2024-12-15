import { Select } from "./select"
import { DbProduction } from "../types"
import { getProductions } from "../services/db"

export function ProductionSelect({
  value,
  onChange,
  inputName,
}: {
  value?: DbProduction | null
  onChange: (venue: DbProduction | null) => void
  inputName: string
}) {
  return (
    <Select
      inputName={inputName}
      value={value || undefined}
      loadOptions={getProductions}
      getOptionLabel={(v: DbProduction) => v.label}
      getOptionValue={(v) => v.id}
      onChange={onChange}
    />
  )
}

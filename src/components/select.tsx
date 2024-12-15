import { ActionMeta, SingleValue } from "react-select"
import AsyncSelect from "react-select/async"
import { ImageRef } from "../types"

interface SelectProps<Option = unknown> {
  filterOption?: (option: Option, inputValue: string) => boolean
  getOptionLabel: (option: Option) => string
  getOptionValue: (option: Option) => string
  inputName?: string
  value?: Option
  loadOptions: (input: string) => Promise<Option[]>
  onChange: (newValue: SingleValue<Option>, action: ActionMeta<Option>) => void
  img?: ImageRef
}
export function Select<Option = unknown>({
  inputName,
  value,
  loadOptions,
  getOptionLabel,
  getOptionValue,
  onChange,
}: SelectProps<Option>) {
  return (
    <AsyncSelect
      cacheOptions={true}
      name={inputName}
      loadOptions={loadOptions}
      value={value}
      onChange={onChange}
      isClearable={true}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
    />
  )
}

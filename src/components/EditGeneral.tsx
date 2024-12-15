import { useState } from "react"
import { Button } from "./button"

export interface EditOneProps<T> {
  value: T
  update(newValues: Partial<T>): void
  children: React.ReactNode
}

export interface SelectOneProps<T> {
  inputName: string
  value: T | undefined
  onChange(newValue: T | null): void
}

export interface EditGeneralProps<T extends { id: string }> {
  categoryName: string
  inputName: string
  selectOne: React.FC<SelectOneProps<T>>
  editOne: React.FC<EditOneProps<T>>
  saveValue(value: T): void
  createNew(): T
}

export function EditGeneral<T extends { id: string }>(
  props: EditGeneralProps<T>
) {
  const [value, setValue] = useState<T | null>(null)
  const [searching, setSearching] = useState<boolean>(false)
  const { inputName, categoryName, createNew, saveValue } = props
  const newValue = () => setValue(createNew())
  const editValue = (newValue: T | null) => {
    setValue(newValue)
    setSearching(false)
  }
  const cancel = () => {
    setValue(null)
    setSearching(false)
  }

  if (searching) {
    return (
      <>
        <props.selectOne
          inputName={inputName}
          value={value || undefined}
          onChange={editValue}
        />
        <Button onClick={cancel}>Cancel</Button>
      </>
    )
  }
  if (value == null) {
    return (
      <>
        <Button onClick={newValue}>Create {categoryName}</Button>
        <Button onClick={() => setSearching(true)}>Edit {categoryName}</Button>
      </>
    )
  }

  return (
    <props.editOne
      value={value}
      update={(newProps: Partial<T>) => setValue({ ...value!, ...newProps })}
    >
      <Button
        onClick={() => {
          saveValue(value)
          setValue(null)
        }}
      >
        Save
      </Button>
      <Button onClick={cancel}>Cancel</Button>
    </props.editOne>
  )
}

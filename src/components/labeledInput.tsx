export function LabeledInput({
  name,
  value,
  onChange,
  label,
  ...rest
}: {
  label: string
  name: string
  value: string | undefined
  onChange?: (v: string) => void
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type="text"
        value={value}
        onChange={(ev) => onChange && onChange(ev.target.value)}
        {...rest}
      />
    </>
  )
}

export function LabeledNumberInput({
  name,
  value,
  onChange,
  label,
  ...rest
}: {
  label: string
  name: string
  value: number | undefined
  onChange?: (v: number) => void
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type="number"
        value={value}
        onChange={(ev) => onChange && onChange(Number(ev.target.value))}
        {...rest}
      />
    </>
  )
}

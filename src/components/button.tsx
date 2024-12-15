export function Button({
  children,
  ...rest
}: Omit<React.ComponentPropsWithoutRef<"button">, "type">) {
  return (
    <button type="button" {...rest}>
      {children}
    </button>
  )
}

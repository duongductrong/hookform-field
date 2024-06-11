import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"

export interface AsteriskIconProps extends ComponentPropsWithoutRef<"svg"> {}

const AsteriskIcon = forwardRef<ElementRef<"svg">, AsteriskIconProps>(
  ({ className, ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      ref={ref}
      className={["asterisk", className].join(" ")}
    >
      <path d="M12 6v12" />
      <path d="M17.196 9 6.804 15" />
      <path d="m6.804 9 10.392 6" />
    </svg>
  )
)

export default AsteriskIcon

import { useContext } from "react"
import { Context } from "../context/form-context"

export const useCurrentFormContext = () => useContext(Context)

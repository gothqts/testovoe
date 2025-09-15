import { JSX } from 'react'

export type Primitive = string | number | boolean | null | undefined


export interface IOption<T extends string | number> {
  title: string | JSX.Element
  value: T
}
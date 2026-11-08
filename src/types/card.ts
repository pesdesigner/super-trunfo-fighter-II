export interface CardAttributes {
  attack: number
  defense: number
  magic: number
}

export type CardAttribute = keyof CardAttributes

export type CardKind = 'fighter' | 'wild' | 'special'

export interface Card {
  id: string
  name: string
  imageUrl: string
  attributes: CardAttributes
  kind?: CardKind
}
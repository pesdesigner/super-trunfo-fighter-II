import { describe, expect, it } from 'vitest'
import type { Card } from '../types/card'
import { dealRound, shuffleCards } from './deck'

const testCards: Card[] = [
  {
    id: 'ryu',
    name: 'Ryu',
    imageUrl: '',
    attributes: { attack: 80, defense: 60, magic: 90 },
  },
  {
    id: 'ken',
    name: 'Ken',
    imageUrl: '',
    attributes: { attack: 70, defense: 52, magic: 90 },
  },
  {
    id: 'chun-li',
    name: 'Chun-Li',
    imageUrl: '',
    attributes: { attack: 70, defense: 65, magic: 85 },
  },
]

describe('shuffleCards', () => {
  it('embaralha sem alterar o monte original', () => {
    const randomValues = [0, 0.5]
    let randomIndex = 0

    const shuffled = shuffleCards(testCards, () => randomValues[randomIndex++])

    expect(shuffled.map((card) => card.id)).toEqual([
      'chun-li',
      'ken',
      'ryu',
    ])
    expect(testCards.map((card) => card.id)).toEqual([
      'ryu',
      'ken',
      'chun-li',
    ])
  })
})

describe('dealRound', () => {
  it('entrega duas cartas e devolve o monte restante', () => {
    const result = dealRound(testCards)

    expect(result).toEqual({
      playerCard: testCards[0],
      machineCard: testCards[1],
      remainingDeck: [testCards[2]],
    })
    expect(testCards).toHaveLength(3)
  })

  it('retorna null quando não há duas cartas disponíveis', () => {
    expect(dealRound([])).toBeNull()
    expect(dealRound([testCards[0]])).toBeNull()
  })
})
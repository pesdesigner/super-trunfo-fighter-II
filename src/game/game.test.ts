import { describe, expect, it } from 'vitest'
import type { Card } from '../types/card'
import { createGame, playRound, startNextRound } from './game'

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
    attributes: { attack: 65, defense: 65, magic: 85 },
  },
  {
    id: 'sagat',
    name: 'Sagat',
    imageUrl: '',
    attributes: { attack: 90, defense: 40, magic: 90 },
  },
]

function createTestGame() {
  const game = createGame(testCards, () => 0.999999)

  if (!game) {
    throw new Error('Não foi possível criar a partida de teste.')
  }

  return game
}

describe('createGame', () => {
  it('embaralha e distribui as cartas iniciais', () => {
    const game = createTestGame()

    expect(game.playerCard.id).toBe('ryu')
    expect(game.machineCard.id).toBe('ken')
    expect(game.remainingDeck).toHaveLength(2)
    expect(game.roundNumber).toBe(1)
    expect(game.phase).toBe('choosing')
  })

  it('não cria uma partida com menos de duas cartas', () => {
    expect(createGame([testCards[0]])).toBeNull()
  })
})

describe('playRound e startNextRound', () => {
  it('atualiza o placar e avança até o fim da partida', () => {
    const firstGame = createTestGame()
    const firstResult = playRound(firstGame, 'attack')

    expect(firstResult.playerScore).toBe(3)
    expect(firstResult.machineScore).toBe(0)
    expect(firstResult.phase).toBe('round-complete')

    const secondGame = startNextRound(firstResult)

    expect(secondGame.roundNumber).toBe(2)
    expect(secondGame.playerCard.id).toBe('chun-li')
    expect(secondGame.machineCard.id).toBe('sagat')
    expect(secondGame.phase).toBe('choosing')

    const finalGame = playRound(secondGame, 'attack')

    expect(finalGame.playerScore).toBe(3)
    expect(finalGame.machineScore).toBe(3)
    expect(finalGame.phase).toBe('finished')
  })

  it('não pontua novamente após a rodada ser resolvida', () => {
    const game = createTestGame()
    const resolvedGame = playRound(game, 'attack')

    expect(playRound(resolvedGame, 'defense')).toBe(resolvedGame)
  })
})
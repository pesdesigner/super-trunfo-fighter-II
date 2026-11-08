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

const longTestDeck: Card[] = [
  ...Array.from({ length: 19 }, (_, index): Card => ({
    id: `fighter-${index}`,
    name: `Fighter ${index}`,
    imageUrl: '',
    attributes: { attack: 80, defense: 60, magic: 90 },
    ...(index === 0 ? { kind: 'wild' as const } : {}),
  })),
  {
    id: 'kage',
    name: 'Kage',
    imageUrl: '',
    attributes: { attack: 90, defense: 90, magic: 90 },
    kind: 'special',
  },
]

function createKageTestDeck(
  playerAttacks: number[],
  machineAttacks: number[],
): Card[] {
  const fighters = playerAttacks.flatMap((playerAttack, index): Card[] => [
    {
      id: `player-${index + 1}`,
      name: `Player ${index + 1}`,
      imageUrl: '',
      attributes: { attack: playerAttack, defense: 50, magic: 50 },
    },
    {
      id: `machine-${index + 1}`,
      name: `Machine ${index + 1}`,
      imageUrl: '',
      attributes: {
        attack: machineAttacks[index],
        defense: 50,
        magic: 50,
      },
    },
  ])

  return [
    ...fighters,
    {
      id: 'kage',
      name: 'Kage',
      imageUrl: '',
      attributes: { attack: 100, defense: 100, magic: 100 },
      kind: 'special',
    },
  ]
}

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

  it('reserva cartas especiais e limita a partida a sete rodadas', () => {
    let game = createGame(longTestDeck, () => 0.999999)

    if (!game) {
      throw new Error('Não foi possível criar a partida de teste.')
    }

    expect(game.totalRounds).toBe(7)
    expect(game.playerCard.id).toBe('fighter-0')
    expect(game.playerCard.kind).toBe('wild')
    expect(game.remainingDeck.some((card) => card.kind === 'special')).toBe(false)

    const dealtCards = new Set<string>()
    for (let round = 1; round <= 7; round++) {
      dealtCards.add(game.playerCard.id)
      dealtCards.add(game.machineCard.id)
      game = playRound(game, 'attack')

      if (round < 7) {
        expect(game.phase).toBe('round-complete')
        game = startNextRound(game)
      }
    }

    expect(game.roundNumber).toBe(7)
    expect(game.phase).toBe('finished')
    expect(game.remainingDeck).toHaveLength(5)
    expect(dealtCards.size).toBe(14)
    expect([...dealtCards].filter((id) => id === 'fighter-0')).toHaveLength(1)
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

  it('concede Kage ao jogador após três vitórias seguidas e usa a carta na rodada seguinte', () => {
    const cards = createKageTestDeck(
      [90, 90, 90, 90, 90, 90, 90],
      [10, 10, 10, 10, 10, 10, 10],
    )
    let game = createGame(cards, () => 0.999999)

    if (!game) {
      throw new Error('Não foi possível criar a partida de teste.')
    }

    for (let round = 1; round <= 7; round++) {
      game = playRound(game, 'attack')

      if (round === 3) {
        expect(game.playerWinStreak).toBe(3)
        expect(game.playerKagePending).toBe(true)
        expect(game.machineWinStreak).toBe(0)
      }

      if (round < 7) {
        game = startNextRound(game)

        if (round === 3) {
          expect(game.playerCard.id).toBe('kage')
          expect(game.playerCard.kind).toBe('special')
          expect(game.playerKagePending).toBe(false)
          expect(game.playerKageUsed).toBe(true)
        }
      }
    }

    expect(game.playerKageUsed).toBe(true)
    expect(game.playerKagePending).toBe(false)
  })

  it('concede Kage à máquina após três vitórias seguidas', () => {
    const cards = createKageTestDeck(
      [10, 10, 10, 10],
      [90, 90, 90, 90],
    )
    let game = createGame(cards, () => 0.999999)

    if (!game) {
      throw new Error('Não foi possível criar a partida de teste.')
    }

    for (let round = 1; round <= 3; round++) {
      game = playRound(game, 'attack')
      if (round < 3) {
        game = startNextRound(game)
      }
    }

    expect(game.machineWinStreak).toBe(3)
    expect(game.playerWinStreak).toBe(0)
    expect(game.machineKagePending).toBe(true)

    const nextRound = startNextRound(game)

    expect(nextRound.machineCard.id).toBe('kage')
    expect(nextRound.machineCard.kind).toBe('special')
    expect(nextRound.machineKageUsed).toBe(true)
    expect(nextRound.machineKagePending).toBe(false)

    const afterKageRound = playRound(nextRound, 'attack')
    expect(afterKageRound.machineWinStreak).toBe(4)
    expect(afterKageRound.machineKagePending).toBe(false)
  })

  it('permite que jogador e máquina conquistem e usem Kage na mesma partida', () => {
    const cards = createKageTestDeck(
      [90, 90, 90, 90, 10, 10, 10],
      [10, 10, 10, 110, 110, 110, 10],
    )
    let game = createGame(cards, () => 0.999999)

    if (!game) {
      throw new Error('Não foi possível criar a partida de teste.')
    }

    for (let round = 1; round <= 7; round++) {
      game = playRound(game, 'attack')

      if (round < 7) {
        game = startNextRound(game)

        if (round === 3) {
          expect(game.playerCard.id).toBe('kage')
          expect(game.playerKageUsed).toBe(true)
        }

        if (round === 6) {
          expect(game.machineCard.id).toBe('kage')
          expect(game.machineKageUsed).toBe(true)
        }
      }
    }

    expect(game.playerKageUsed).toBe(true)
    expect(game.machineKageUsed).toBe(true)
  })

  it('não concede Kage na última rodada, pois não há uma rodada seguinte', () => {
    const cards = createKageTestDeck([90, 90, 90], [10, 10, 10])
    let game = createGame(cards, () => 0.999999)

    if (!game) {
      throw new Error('Não foi possível criar a partida de teste.')
    }

    for (let round = 1; round <= 3; round++) {
      game = playRound(game, 'attack')
      if (round < 3) {
        game = startNextRound(game)
      }
    }

    expect(game.phase).toBe('finished')
    expect(game.playerWinStreak).toBe(3)
    expect(game.playerKagePending).toBe(false)
  })

  it('reinicia as sequências de ambos os lados em caso de empate', () => {
    const cards = createKageTestDeck(
      [90, 50, 90, 90],
      [10, 50, 10, 10],
    )
    let game = createGame(cards, () => 0.999999)

    if (!game) {
      throw new Error('Não foi possível criar a partida de teste.')
    }

    game = playRound(game, 'attack')
    expect(game.playerWinStreak).toBe(1)
    game = startNextRound(game)

    game = playRound(game, 'attack')
    expect(game.lastResult?.outcome).toBe('tie')
    expect(game.playerWinStreak).toBe(0)
    expect(game.machineWinStreak).toBe(0)
  })

  it('zera a sequência do lado que perde e reinicia a do vencedor', () => {
    const cards = createKageTestDeck(
      [90, 10, 90],
      [10, 90, 10],
    )
    let game = createGame(cards, () => 0.999999)

    if (!game) {
      throw new Error('Não foi possível criar a partida de teste.')
    }

    game = playRound(game, 'attack')
    expect(game.playerWinStreak).toBe(1)
    expect(game.machineWinStreak).toBe(0)
    game = startNextRound(game)

    game = playRound(game, 'attack')
    expect(game.lastResult?.outcome).toBe('machine')
    expect(game.playerWinStreak).toBe(0)
    expect(game.machineWinStreak).toBe(1)
    game = startNextRound(game)

    game = playRound(game, 'attack')
    expect(game.lastResult?.outcome).toBe('player')
    expect(game.playerWinStreak).toBe(1)
    expect(game.machineWinStreak).toBe(0)
  })
})
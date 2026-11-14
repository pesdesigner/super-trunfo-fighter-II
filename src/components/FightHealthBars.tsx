import { useEffect, useState } from 'react'
import { MAX_ENERGY } from '../game/game'
import './FightHealthBars.css'

interface FightHealthBarsProps {
  playerEnergy: number
  machineEnergy: number
  playerLostRound: boolean
  machineLostRound: boolean
  perfectPlayer: boolean
  perfectMachine: boolean
  timerActive: boolean
}

interface HealthBarProps {
  fighter: 'jogador' | 'máquina'
  fighterImage: string
  fighterName: string
  energy: number
  isLosingRound: boolean
  isPerfect: boolean
}

function HealthBar({
  fighter,
  fighterImage,
  fighterName,
  energy,
  isLosingRound,
  isPerfect,
}: HealthBarProps) {
  const thumb = (
    <img
      className="fight-health-bars__thumb"
      src={fighterImage}
      alt={fighterName}
    />
  )

  return (
    <div className="fight-health-bars__side">
      {fighter === 'jogador' && thumb}
      <div
        className={[
          'fight-health-bars__track',
          isLosingRound && 'is-losing-round',
          isPerfect && 'is-perfect',
        ]
          .filter(Boolean)
          .join(' ')}
        role="progressbar"
        aria-label={`Energia do ${fighter}`}
        aria-valuemin={0}
        aria-valuemax={MAX_ENERGY}
        aria-valuenow={Math.round(energy)}
      >
        <span
          className="fight-health-bars__fill"
          style={{ width: `${(energy / MAX_ENERGY) * 100}%` }}
        />
      </div>
      {fighter === 'máquina' && thumb}
    </div>
  )
}

function FightHealthBars({
  playerEnergy,
  machineEnergy,
  playerLostRound,
  machineLostRound,
  perfectPlayer,
  perfectMachine,
  timerActive,
}: FightHealthBarsProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(99)

  useEffect(() => {
    if (!timerActive || secondsRemaining === 0) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setSecondsRemaining((seconds) => Math.max(0, seconds - 1))
    }, 1000)

    return () => window.clearTimeout(timeoutId)
  }, [secondsRemaining, timerActive])

  return (
    <section className="fight-health-bars" aria-label="Energia dos lutadores">
      <HealthBar
        fighter="jogador"
        fighterImage="/images/cards/ryu-thumb.png"
        fighterName="Ryu"
        energy={playerEnergy}
        isLosingRound={playerLostRound}
        isPerfect={perfectPlayer}
      />
      <span
        className="fight-health-bars__timer"
        role="timer"
        aria-label={`Tempo: ${secondsRemaining} segundos`}
      >
        {String(secondsRemaining).padStart(2, '0')}
      </span>
      <HealthBar
        fighter="máquina"
        fighterImage="/images/cards/m-bison-thumb.png"
        fighterName="M. Bison"
        energy={machineEnergy}
        isLosingRound={machineLostRound}
        isPerfect={perfectMachine}
      />
    </section>
  )
}

export default FightHealthBars

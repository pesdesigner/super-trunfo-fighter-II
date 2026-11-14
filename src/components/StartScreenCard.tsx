import type { Card } from '../types/card'
import './StartScreenCard.css'

interface StartScreenCardProps {
  card: Card
}

function StartScreenCard({ card }: StartScreenCardProps) {
  return (
    <div
      className="start-screen-card"
      role="img"
      aria-label={`Carta de ${card.name}: ataque ${card.attributes.attack}, defesa ${card.attributes.defense}, magia ${card.attributes.magic}`}
      style={{ backgroundImage: `url("${card.imageUrl}")` }}
    >
      <div className="start-screen-card__attributes" aria-hidden="true">
        <span>
          <span>Ataque</span>
          <strong>{card.attributes.attack}</strong>
        </span>
        <span>
          <span>Defesa</span>
          <strong>{card.attributes.defense}</strong>
        </span>
        <span>
          <span>Magia</span>
          <strong>{card.attributes.magic}</strong>
        </span>
      </div>
    </div>
  )
}

export default StartScreenCard

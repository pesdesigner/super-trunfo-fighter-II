import { cards } from '../data/cards'
import GameButton from './GameButton'
import GameInfoPanel from './GameInfoPanel'
import StartScreenCard from './StartScreenCard'
import './StartScreen.css'

interface StartScreenProps {
  onStart: () => void
}

const featuredCards = ['ryu', 'chun-li', 'ken'].flatMap((id) =>
  cards.filter((card) => card.id === id),
)

function StartScreen({ onStart }: StartScreenProps) {
  return (
    <section className="start-panel">
      <div
        className="start-panel__cards"
        role="group"
        aria-label="Cartas em destaque"
      >
        {featuredCards.map((card) => (
          <StartScreenCard key={card.id} card={card} />
        ))}
      </div>
      <p>Escolha um atributo da sua carta e vença a máquina em combate.</p>
      <GameButton className="start-panel__start" onClick={onStart}>
        APERTE START
      </GameButton>
      <GameInfoPanel />
    </section>
  )
}

export default StartScreen
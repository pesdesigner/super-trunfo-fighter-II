import GameButton from './GameButton'
import './StartScreen.css'

interface StartScreenProps {
  onStart: () => void
}

function StartScreen({ onStart }: StartScreenProps) {
  return (
    <section className="start-panel">
      <p>Escolha um atributo da sua carta e vença a máquina em combate.</p>
      <GameButton onClick={onStart}>Começar partida</GameButton>
    </section>
  )
}

export default StartScreen
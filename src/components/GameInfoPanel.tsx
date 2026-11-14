import { useState } from 'react'
import GameButton from './GameButton'
import GamePopup from './GamePopup'
import './GameInfoPanel.css'

interface GameInfoPanelProps {
  className?: string
}

function GameInfoPanel({ className }: GameInfoPanelProps) {
  const [activePopup, setActivePopup] = useState<'instructions' | 'about' | null>(
    null,
  )

  return (
    <section
      className={`game-info-panel${className ? ` ${className}` : ''}`}
      aria-label="Informações do jogo"
    >
      <GameButton
        className="game-info-panel__button"
        onClick={() => setActivePopup('instructions')}
      >
        COMO JOGAR
      </GameButton>
      <GameButton
        className="game-info-panel__button game-info-panel__about-button"
        onClick={() => setActivePopup('about')}
      >
        SOBRE O PROJETO
      </GameButton>
      <p className="game-info-panel__disclaimer">
        Projeto de fã, não oficial e sem vínculo com a Capcom.
      </p>
      {activePopup === 'instructions' && (
        <GamePopup
          title="Como jogar"
          className="game-popup--instructions"
          message={
            <div className="game-popup__instructions">
              <section>
                <h3>1. Partida</h3>
                <p>
                  Você enfrenta a máquina em até <strong>7 rodadas</strong>.
                  Cada participante recebe uma carta por rodada, e cartas usadas
                  não voltam ao baralho.
                </p>
              </section>
              <section>
                <h3>2. Atributos</h3>
                <p>
                  Escolha um atributo da sua carta: <strong>ataque</strong>,{' '}
                  <strong>defesa</strong> ou <strong>magia</strong>. O valor é
                  comparado com o mesmo atributo da carta da máquina; o maior
                  vence a rodada.
                </p>
              </section>
              <section>
                <h3>3. Pontuação</h3>
                <p>
                  Uma vitória com carta normal vale <strong>3 pontos</strong>.
                  Em caso de empate, cada participante recebe{' '}
                  <strong>1 ponto</strong>.
                </p>
              </section>
              <section>
                <h3>4. Carta coringa</h3>
                <p>
                  Akuma é a carta coringa e aparece no máximo uma vez por
                  partida. Quem vencer usando Akuma ganha{' '}
                  <strong>4 pontos</strong>.
                </p>
              </section>
              <section>
                <h3>5. Carta especial</h3>
                <p>
                  Ao vencer <strong>3 rodadas seguidas</strong>, você recebe
                  Kage para usar na rodada seguinte, no lugar da carta normal.
                  Cada participante pode usar Kage uma vez por partida.
                </p>
              </section>
              <p>Ao fim da partida, vence quem tiver mais pontos.</p>
            </div>
          }
          actionLabel="ENTENDI"
          onAction={() => setActivePopup(null)}
          onClose={() => setActivePopup(null)}
        />
      )}
      {activePopup === 'about' && (
        <GamePopup
          title="Sobre o projeto"
          message={
            <div className="game-popup__about">
              <p>
                Este jogo é um projeto independente feito por fãs e não é
                oficial, nem afiliado, patrocinado ou endossado pela Capcom.
              </p>
              <p>
                <strong>Street Fighter</strong>, seus personagens e marcas
                relacionadas são propriedade da Capcom Co., Ltd. Todos os
                direitos pertencem aos respectivos titulares.
              </p>
              <p>
                Este projeto é uma homenagem de fã. As marcas e personagens
                citados são usados apenas para identificar a inspiração do jogo.
              </p>
            </div>
          }
          actionLabel="FECHAR"
          onAction={() => setActivePopup(null)}
          onClose={() => setActivePopup(null)}
        />
      )}
    </section>
  )
}

export default GameInfoPanel

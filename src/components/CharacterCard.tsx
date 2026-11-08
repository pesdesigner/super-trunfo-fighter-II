import type { Card, CardAttribute } from '../types/card'
import './CharacterCard.css'

const attributes: CardAttribute[] = ['attack', 'defense', 'magic']

const attributeLabels: Record<CardAttribute, string> = {
  attack: 'Ataque',
  defense: 'Defesa',
  magic: 'Magia',
}

interface CharacterCardProps {
  card: Card
  owner: string
  backLabel: 'PLAYER' | 'CPU'
  flipped: boolean
  selectedAttribute: CardAttribute | null
  resultAttribute?: CardAttribute | null
  attributeResult?: 'winner' | 'loser' | 'tie' | null
  onSelectAttribute?: (attribute: CardAttribute) => void
  onReveal?: () => void
}

function CharacterCard({
  card,
  owner,
  backLabel,
  flipped,
  selectedAttribute,
  resultAttribute = null,
  attributeResult = null,
  onSelectAttribute,
  onReveal,
}: CharacterCardProps) {
  return (
    <article className="fighter-card">
      <div
        className={`fighter-card__flip${flipped ? ' is-flipped' : ''}`}
        role="group"
        aria-label={`${owner}${flipped ? ` — ${card.name}` : ' — carta virada para baixo'}`}
        tabIndex={onReveal ? 0 : undefined}
        onMouseEnter={onReveal}
        onFocus={onReveal}
        onClick={onReveal}
      >
        <div className="fighter-card__inner">
          <div className="fighter-card__face fighter-card__front" aria-hidden={!flipped}>
            <p className="fighter-card__owner">{owner}</p>

            <img
              className="fighter-card__image"
              src={card.imageUrl}
              alt={`Retrato de ${card.name}`}
            />

            <h2 className="fighter-card__name">{card.name}</h2>

            <div className="fighter-card__attributes">
              {attributes.map((attribute) => {
                const isSelected = selectedAttribute === attribute
                const resultClass =
                  resultAttribute === attribute && attributeResult
                    ? ` is-${attributeResult}`
                    : ''
                const value = card.attributes[attribute]
                const className = `attribute-row${isSelected ? ' is-selected' : ''}${resultClass}`

                if (onSelectAttribute) {
                  return (
                    <label className={className} key={attribute}>
                      <input
                        type="radio"
                        name="player-attribute"
                        value={attribute}
                        checked={isSelected}
                        disabled={!flipped}
                        onChange={() => onSelectAttribute(attribute)}
                      />
                      <span>{attributeLabels[attribute]}</span>
                      <strong>{value}</strong>
                    </label>
                  )
                }

                return (
                  <div className={className} key={attribute}>
                    <span>{attributeLabels[attribute]}</span>
                    <strong>{value}</strong>
                  </div>
                )
              })}
            </div>
          </div>

          <div
            className="fighter-card__face fighter-card__back"
            aria-hidden={flipped}
          >
            <img className="fighter-card__back-image" src="/images/cards/verso.png" alt="" />
            <span className="fighter-card__back-frame" aria-hidden="true" />
            <strong className="fighter-card__back-label">{backLabel}</strong>
          </div>
        </div>
      </div>
    </article>
  )
}

export default CharacterCard
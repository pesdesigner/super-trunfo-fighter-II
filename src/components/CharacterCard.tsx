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
  hidden?: boolean
  selectedAttribute: CardAttribute | null
  onSelectAttribute?: (attribute: CardAttribute) => void
}

function CharacterCard({
  card,
  owner,
  hidden = false,
  selectedAttribute,
  onSelectAttribute,
}: CharacterCardProps) {
  return (
    <article className="fighter-card">
      <p className="fighter-card__owner">{owner}</p>

      {hidden ? (
        <div
          className="fighter-card__hidden"
          role="img"
          aria-label="Carta da máquina ainda não revelada"
        >
          <span>?</span>
          <small>Carta oculta</small>
        </div>
      ) : (
        <>
          <img
            className="fighter-card__image"
            src={card.imageUrl}
            alt={`Retrato de ${card.name}`}
          />

          <h2 className="fighter-card__name">{card.name}</h2>

          <div className="fighter-card__attributes">
            {attributes.map((attribute) => {
              const isSelected = selectedAttribute === attribute
              const value = card.attributes[attribute]
              const className = `attribute-row${isSelected ? ' is-selected' : ''}`

              if (onSelectAttribute) {
                return (
                  <label className={className} key={attribute}>
                    <input
                      type="radio"
                      name="player-attribute"
                      value={attribute}
                      checked={isSelected}
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
        </>
      )}
    </article>
  )
}

export default CharacterCard
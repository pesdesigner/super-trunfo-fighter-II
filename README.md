# Super Trunfo Fighter II

**Versão:** 0.1.1

Renovação em React do jogo Super Trunfo com personagens de Street Fighter.

## Regras

- Cada partida tem 14 cartas e 7 rodadas.
- Em cada rodada, o jogador escolhe entre ataque, defesa e magia.
- Uma vitória vale 3 pontos; uma derrota, 0.
- Em caso de empate no atributo, cada participante recebe 1 ponto.
- Vence a partida quem acumular mais pontos.

## Tecnologias

- React
- TypeScript
- Vite
- Vitest
- ESLint

## Organização do código

- `src/components/`: componentes de interface, como cabeçalho, cartas e telas.
- `src/hooks/useGame.ts`: estado da partida e ações da interface.
- `src/game/`: regras, distribuição de cartas e resolução das rodadas.
- `src/data/`: cartas disponíveis no jogo.

## Como executar

Requisitos: Node.js e npm.

```bash
npm install
npm run dev
```

## Validação

```bash
npm run build
npm test
```
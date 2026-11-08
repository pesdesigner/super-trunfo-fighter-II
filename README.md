# Super Trunfo Fighter II

**Versão:** 0.2.0

Renovação em React do jogo Super Trunfo com personagens de Street Fighter.

## Regras e novidades

- Cada partida tem até 7 rodadas, usando 14 cartas sorteadas sem reposição.
- Em cada rodada, o jogador escolhe entre ataque, defesa e magia.
- Uma vitória normal vale 3 pontos; uma derrota, 0. Empates dão 1 ponto para cada lado.
- Akuma é a carta coringa: se vencer a rodada, seu portador recebe 4 pontos.
- Três vitórias seguidas concedem Kage para a rodada seguinte, substituindo a carta normal do vencedor.
- Jogador e máquina podem conquistar e usar Kage uma vez cada. Empate ou derrota interrompe a sequência.
- Vence a partida quem acumular mais pontos.

Os popups apresentam o início e o resultado das rodadas, as cartas especiais e o placar final. Após o fim da partida, é possível iniciar outra partida pelo botão **Continuar**; se a contagem regressiva terminar, o jogo exibe **GAME OVER** e retorna à tela inicial.

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

Consulte [docs/regras-do-jogo.md](./docs/regras-do-jogo.md) para as regras completas.

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
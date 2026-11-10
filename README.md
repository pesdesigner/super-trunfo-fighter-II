# Super Trunfo Fighter II

**Versão:** 0.3.0

Renovação em React do jogo Super Trunfo com personagens de Street Fighter.

## Atualizações visuais — 0.3.0

- Identidade visual renovada com logo do jogo, fundos para as telas inicial e de partida e tipografia arcade.
- Cartas com animação de virada: a carta do jogador revela os atributos ao passar o mouse ou receber foco; a carta da máquina é revelada durante o fluxo da jogada.
- O atributo comparado recebe destaque visual de vitória, derrota ou empate.
- Imagens de personagens servidas localmente a partir de `public/images/cards/`.
- Fundos para desktop e dispositivos móveis ficam em `public/images/backgrounds/`.

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

- React e TypeScript
- Vite
- Vitest
- ESLint
- Google Fonts: Teko e Rajdhani (requer conexão para carregar as fontes)

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
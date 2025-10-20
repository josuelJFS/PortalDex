# App React Native (Expo + TypeScript + Expo Router)

Aplicativo que consome a API pública Rick and Morty com:

- Lista com imagem, título e descrição (scroll infinito/paginação)
- Tela de detalhes ao tocar em um item
- Busca com filtro na API (debounce)
- Tratamento de erros e estados de carregamento

Extras:

- Testes unitários de API com Jest (ts-jest)
- Workflow simples de CI (instala dependências e roda testes)

## Requisitos

- Node 18+
- Conta/CLI do Expo opcional (para rodar no dispositivo/emulador)

## Como rodar

1. Instale as dependências

```
npm install
```

2. Inicie o servidor do Expo

```
npm start
```

3. Abrir em cada plataforma

```
npm run android
npm run ios
npm run web
```

## Arquitetura de navegação (Expo Router)

O projeto usa o Expo Router (file-based routing). Pontos-chave:

- `package.json` define `main: "expo-router/entry"`.
- `app.json` inclui o plugin `expo-router` e um `scheme` para deep linking.
- O root layout (`app/_layout.tsx`) configura o `Stack` e o `SafeAreaProvider`.
- Rotas são arquivos dentro da pasta `app/`:

Estrutura principal de rotas:

```
app/
	_layout.tsx       # Stack e SafeAreaProvider
	index.tsx         # Listagem com busca + scroll infinito
	detail/[id].tsx   # Detalhe do personagem
```

## Bibliotecas utilizadas e justificativas

- Expo: inicialização ágil e DX consistente
- Expo Router: navegação baseada em arquivos simples de manter
- expo-linking: suporte a deep linking exigido pelo Router
- react-native-safe-area-context: áreas seguras e provider
- react-native-screens: otimizações de navegação
- react-native-gesture-handler: gestos nativos
- expo-status-bar: controle da status bar

Observação: React Navigation clássico não é usado após a migração para o Expo Router.

## Estrutura de pastas (essencial)

- `app/`: rotas (Expo Router)
- `src/api/`: cliente da API Rick and Morty (`fetchCharacters`, `fetchCharacter`)
- `src/components/`: componentes reutilizáveis (ex.: item da lista)
- `assets/`: ícones e imagens

Pastas legadas (não utilizadas pela navegação atual): `src/navigation/`, `src/screens/`.

## Testes

- Stack: Jest + ts-jest (ambiente node) focado em testes unitários de API.
- Arquivos em `__tests__/` (ex.: `api.test.ts`).

Executar:

```
npm test
```

## CI

GitHub Actions em `.github/workflows/ci.yml` roda em pushes/PRs para `main`/`master`:

- Faz checkout, configura Node 18, instala dependências e executa `npm test`.

## Boas práticas e notas de implementação

- Busca com debounce para reduzir chamadas à API
- Guardas para evitar loops no `onEndReached` da FlatList
- Tratamento de erros e estados de carregamento (lista e detalhes)
- Acessibilidade básica (rotulagem de elementos interativos)
- Código sem comentários desnecessários, priorizando legibilidade

## Possíveis melhorias

- Cache/persistência (React Query + MMKV)
- Skeleton loaders e placeholders de imagem
- Theming/dark mode e design system
- Internacionalização (i18n)
- Testes de UI (Testing Library) e E2E (Detox)
- CI com build por plataforma

## Observações

- Firebase foi propositalmente desconsiderado neste escopo.
- Caso veja avisos de linking, confirme o `scheme` em `app.json` e reinicie o bundler com cache limpo.

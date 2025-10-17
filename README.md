# Teste Técnico – App React Native (Expo + TypeScript)

Aplicativo que consome a API pública Rick and Morty com:

- Lista com imagem, título e descrição (scroll infinito)
- Detalhe do item
- Busca com filtro na API
- Tratamento de erros e estados de carregamento

Extras:

- Testes automatizados com Jest + Testing Library
- Workflow simples de CI (instalação + testes)

## Requisitos

- Node 18+
- Expo CLI

## Como rodar

1. Instale as dependências

```
npm install
```

2. Inicie o app

```
npm start
```

3. Plataformas

```
npm run android
npm run ios
npm run web
```

## Testes

```
npm test
```

## Bibliotecas utilizadas e justificativas

- Expo: inicialização ágil e compatibilidade ampla
- React Navigation (native-stack): navegação performática e simples
- react-native-screens, react-native-safe-area-context, react-native-gesture-handler: requisitos do React Navigation
- Testing Library + Jest: testes de UI mais próximos do uso real

## Estrutura

- src/api: cliente da API Rick and Morty
- src/screens: telas de Lista e Detalhe
- src/components: componentes reutilizáveis (Item da lista)
- src/navigation: stack navigator
- **tests**: testes unitários de tela

## Possíveis melhorias

- Cache e persistência offline (React Query + MMKV)
- Skeleton loaders e placeholders de imagem
- Acessibilidade ampliada (rotulagem e navegação por teclado/controle)
- Paginação com React Query + prefetch
- Theming/dark mode e design system (tokens)
- Internacionalização (i18n)
- E2E tests (Detox)
- CI com build por plataforma

## Observações

- Não há integração com Firebase por opção do escopo.
- Projeto focado em código claro e tipado, sem comentários desnecessários no código-fonte.

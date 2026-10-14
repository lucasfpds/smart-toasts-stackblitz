# Notificações Toast Inteligentes

> Pop-ups de notificação que se empilham, reposicionam e animam conforme surgem ou expiram.

## Tecnologias

- **Vue 3** com `<script setup>` (JavaScript)
- **Vite** como bundler
- **TransitionGroup** do Vue para enter/leave/move (reposicionamento automático)
- **CSS puro** com barra de progresso decrescente
- Composable `useToasts` com API `push/remove/pause/resume`

## Requisitos

- Node.js 18+

## Como executar

```bash
npm install
npm run dev
```

Abra http://localhost:5173 no navegador.

## Scripts

| Script | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento (Vite) |
| `npm run build` | Build de produção |
| `npm run preview` | Serve o build de produção |

## Estrutura

```
src/
  main.js              entry: cria o app e importa o CSS
  App.vue              painel de demo, container de toasts
  composables/
    useToasts.js       array de toasts, push/remove, pause/resume no hover
  components/
    ToastItem.vue      toast individual com barra de progresso
  styles.css           container, toasts, tipos, transições, mobile
```

### Funcionalidades

- 4 tipos (success, error, info, warning): barra lateral colorida + ícone
- Container `position: fixed` bottom-right (mobile: topo, largura total)
- `<TransitionGroup>`: enter (slide da direita + fade), leave (slide para fora + colapso), move (reposicionamento automático)
- Máximo de 4 simultâneos: o mais antigo é removido imediatamente
- Barra de progresso decrescendo até expirar (rAF)
- Hover pausa a expiração: timer e barra congelam; ao sair do hover, retoma o tempo restante
- Botão fechar por toast
- Painel de demo: dispara cada tipo + toast com ação "Desfazer"


## Rodando no StackBlitz

Basta importar o repositório e rodar normalmente:

```
https://stackblitz.com/github/lucasfpds/smart-toasts-stackblitz
```

O projeto não depende de binários nativos — Vite é JavaScript puro, então
sobe sem bindings nativos no WebContainer do StackBlitz.

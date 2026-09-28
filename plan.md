# Notificações Toast Inteligentes

> Pop-ups de notificação que se empilham, reposicionam e animam conforme surgem ou expiram.

## Stack

- Vite + Vue 3 (`<script setup>`, JavaScript) — sem TypeScript, sem lint/test, zero libs extras
- CSS puro em `src/styles.css`
- Arquivos: `index.html`, `package.json` (deps: `vue`), `vite.config.js`, `.stackblitzrc`, `src/main.js`, `src/App.vue`, `src/composables/useToasts.js`, `src/components/ToastItem.vue`, `src/styles.css`

## Implementação

### 1. Sistema de toasts

- `composables/useToasts.js`: array de `{ id, tipo, titulo, mensagem, duracao }` + API `push/remove`
- Container `position: fixed` bottom-right (mobile: topo, largura total)
- 4 tipos (success, error, info, warning): barra lateral colorida + ícone SVG inline
- `components/ToastItem.vue`: cada toast com **barra de progresso decrescendo até expirar**

### 2. Empilhar e reposicionar

- `<TransitionGroup>` para a lista:
  - **enter**: slide da direita + fade
  - **leave**: slide para fora + colapso de altura
  - **move**: o Vue anima automaticamente o reposicionamento — quando um toast do meio expira, os acima **deslizam** para o lugar dele
- Máximo de 4 simultâneos: o mais antigo é removido imediatamente (com animação)

### 3. Comportamento inteligente

- **Hover pausa a expiração**: timer e barra congelam; ao sair do hover, retoma o tempo restante
- Botão fechar por toast
- Painel de demo: dispara cada tipo + um toast com ação "Desfazer" (padrão de toast de ação)

## Checklist — 100% da descrição

- [ ] Toasts surgem animados
- [ ] Empilham e se reposicionam quando um expira
- [ ] Animação de saída ao expirar/fechar
- [ ] Extras inteligentes: pausa no hover, limite de pilha, ação "Desfazer"

<script setup>
import { useToasts } from "./composables/useToasts.js";
import ToastItem from "./components/ToastItem.vue";

const { toasts, push, remove, pause, resume } = useToasts();

function fireSuccess() {
  push({ tipo: "success", titulo: "Sucesso", mensagem: "Operação concluída com sucesso!", duracao: 4000 });
}
function fireError() {
  push({ tipo: "error", titulo: "Erro", mensagem: "Algo deu errado. Tente novamente.", duracao: 5000 });
}
function fireInfo() {
  push({ tipo: "info", mensagem: "Nova atualização disponível.", duracao: 3000 });
}
function fireWarning() {
  push({ tipo: "warning", titulo: "Atenção", mensagem: "Sua sessão expira em 5 minutos.", duracao: 4000 });
}
function fireUndo() {
  push({
    tipo: "info",
    mensagem: "Item excluído.",
    duracao: 6000,
    acao: { label: "Desfazer" },
  });
}

function onAction(id) {
  push({ tipo: "success", mensagem: "Ação desfeita!", duracao: 2000 });
  remove(id);
}
</script>

<template>
  <main class="app">
    <h1>Notificações Toast Inteligentes</h1>
    <p class="hint">Passe o mouse sobre um toast para pausar a expiração.</p>
    <div class="demo">
      <button class="d-btn success" @click="fireSuccess">Success</button>
      <button class="d-btn error" @click="fireError">Error</button>
      <button class="d-btn info" @click="fireInfo">Info</button>
      <button class="d-btn warning" @click="fireWarning">Warning</button>
      <button class="d-btn undo" @click="fireUndo">Com Desfazer</button>
    </div>

    <div class="toast-container">
      <TransitionGroup name="toast">
        <ToastItem
          v-for="t in toasts"
          :key="t.id"
          :toast="t"
          @close="remove"
          @pause="pause"
          @resume="resume"
          @action="onAction"
        />
      </TransitionGroup>
    </div>
  </main>
</template>

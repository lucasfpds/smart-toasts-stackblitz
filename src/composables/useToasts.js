import { ref } from "vue";

const MAX_TOASTS = 4;
let nextId = 1;

const toasts = ref([]);

export function useToasts() {
  function remove(id) {
    const t = toasts.value.find((x) => x.id === id);
    if (t && t.timer) clearTimeout(t.timer);
    toasts.value = toasts.value.filter((x) => x.id !== id);
  }

  function push({ tipo = "info", titulo = "", mensagem = "", duracao = 4000, acao = null }) {
    const id = nextId++;
    const toast = { id, tipo, titulo, mensagem, duracao, acao, remaining: duracao, paused: false, start: Date.now() };
    toasts.value.push(toast);
    if (toasts.value.length > MAX_TOASTS) {
      const oldest = toasts.value[0];
      remove(oldest.id);
    }
    toast.timer = setTimeout(() => remove(id), duracao);
  }

  function pause(id) {
    const t = toasts.value.find((x) => x.id === id);
    if (!t || t.paused) return;
    t.paused = true;
    t.remaining = t.remaining - (Date.now() - t.start);
    if (t.timer) clearTimeout(t.timer);
  }

  function resume(id) {
    const t = toasts.value.find((x) => x.id === id);
    if (!t || !t.paused) return;
    t.paused = false;
    t.start = Date.now();
    t.timer = setTimeout(() => remove(id), t.remaining);
  }

  return { toasts, push, remove, pause, resume };
}

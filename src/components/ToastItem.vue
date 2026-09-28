<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

const props = defineProps({
  toast: Object,
});

const emit = defineEmits(["close", "pause", "resume", "action"]);

const progress = ref(100);
let rafId = null;
let startTime = Date.now();
let startRemaining = props.toast.remaining;

const icons = {
  success: "✓",
  error: "✕",
  info: "i",
  warning: "!",
};

const colors = {
  success: "#34d399",
  error: "#f87171",
  info: "#3b82f6",
  warning: "#fbbf24",
};

const icon = computed(() => icons[props.toast.tipo] || "i");
const color = computed(() => colors[props.toast.tipo] || "#3b82f6");

function tick() {
  if (props.toast.paused) {
    rafId = requestAnimationFrame(tick);
    return;
  }
  const elapsed = Date.now() - startTime;
  const remaining = Math.max(0, startRemaining - elapsed);
  progress.value = (remaining / props.toast.duracao) * 100;
  if (remaining > 0) rafId = requestAnimationFrame(tick);
}

onMounted(() => {
  startTime = Date.now();
  startRemaining = props.toast.remaining;
  rafId = requestAnimationFrame(tick);
});

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<template>
  <div
    class="toast"
    @pointerenter="$emit('pause', toast.id)"
    @pointerleave="$emit('resume', toast.id)"
  >
    <div class="bar" :style="{ background: color }"></div>
    <div class="icon" :style="{ background: color }">{{ icon }}</div>
    <div class="content">
      <strong v-if="toast.titulo">{{ toast.titulo }}</strong>
      <p>{{ toast.mensagem }}</p>
      <button v-if="toast.acao" class="action" @click="$emit('action', toast.id)">{{ toast.acao.label }}</button>
    </div>
    <button class="close" @click="$emit('close', toast.id)">✕</button>
    <div class="progress" :style="{ width: progress + '%', background: color }"></div>
  </div>
</template>

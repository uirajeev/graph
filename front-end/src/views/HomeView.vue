<template>
  <section>
    <Toast v-if="selectedNode" :data="selectedNode" :callback="deselectAllNodes" />
    <div class="graph" ref="chart"></div>
    <div v-if="error" class="error">{{ error }}</div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import Toast from '../components/Toast/Toast.vue';
import { useGraph } from '../composables/useGraph.js';

const emit = defineEmits(['node-selected']);
const apiUrl = 'api/data';

const { chart, selectedNodes, deselectAllNodes, error } = useGraph(apiUrl, emit);

const selectedNode = computed(() => {
  return selectedNodes.value[0]?.data;
});
</script>

<style lang="scss" scoped>
@import '@/assets/_variable.scss';
.graph {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  overflow: auto;
}
.error{
    color: $error-color;
    font-size: 2rem;
    padding: 16px 0;
    text-align: center;
  }
</style>

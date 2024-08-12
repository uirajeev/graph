<template>
  <div class="toast-container">
    <div class="toast">
      <div class="toast-header">
        <img :src="icon" class="rounded" alt="info" />
        <strong>Node name: {{ data.name }}</strong>
        <button type="button" class="close" @click="callback">
          <span>&times;</span>
        </button>
      </div>
      <div class="toast-body">{{ data.description }}</div>
    </div>
  </div>
</template>

<script setup>
import icon from '@/assets/info_icon.svg';
const props = defineProps({
  data: Object,
  callback: Function
});
</script>

<style lang="scss">
@import '@/assets/_variable.scss';

.toast-container {
  position: fixed;
  right: 0;
  top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.toast {
  position: relative;
  display: block;
  max-width: 360px;
  margin-right: 1rem;
  padding: 1rem;
  background: $toast-bg;
  border: 1px solid $toast-border-color;
  border-radius: $toast-border-radius;
  color: $toast-body-color;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.5);
}

.toast-header {
  display: flex;
  align-items: center;
  padding: $toast-header-padding;
  color: $toast-header-color;
  border-radius: $toast-border-radius;

  img {
    width: 18px;
    border-radius: $toast-border-radius;
    margin-right: 0.5rem;
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5rem 0.75rem;
    font-size: 2rem;
    line-height: 2rem;
    color: $error-color;
    background: transparent;
    border: 0;
    cursor: pointer;

    &:focus {
      outline: 0;
    }
  }
}

.toast-body {
  padding: $toast-body-padding;
}
</style>

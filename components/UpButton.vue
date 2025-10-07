<template>
  <button
    v-if="isVisible"
    class="scroll-to-top"
    @click="scrollToTop"
    aria-label="Наверх"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 20L12 4M12 4L5 11M12 4L19 11" stroke="currentColor" stroke-width="2"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
const isVisible = ref(false)

const checkScroll = () => {
  isVisible.value = window.scrollY > 50
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<style scoped lang="scss">
.scroll-to-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 56px;
  height: 56px;
  background: $color-primary;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: $color-primary;
    opacity: 0.7;
    transform: translateY(-2px);
  }
}
</style>
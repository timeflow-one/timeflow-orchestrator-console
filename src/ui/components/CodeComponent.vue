<template>
  <code class="color-primary">
    <slot />
  </code>
</template>

<style lang="scss" scoped>
.color-primary {
  color: var(--v-primary-darken1);
  background-color: var(--v-primary-lighten5);
}
</style>

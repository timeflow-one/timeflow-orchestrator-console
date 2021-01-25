<template>
  <code :style="{ 'color': `var(--v-${color}-darken1)`, 'background-color': `var(--v-${color}-${background})` }">
    <slot />
  </code>
</template>

<style lang="scss" scoped>
.color-primary {
  color: var(--v-primary-darken1);
  background-color: var(--v-primary-lighten5);
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class CodeComponent extends Vue {
  @Prop({ default: 'primary' })
  color: string

  @Prop({ default: 'lighten5' })
  background: string
}
</script>

<template>
  <v-text-field
    v-model="search"
    class="ma-0 pa-0 search-view"
    :style="{ 'max-width': maxWidth }"
    background-color="grey lighten-4"
    prepend-inner-icon="mdi-magnify"
    :placeholder="placeholder"
    :disabled="disabled"
    solo
    flat
    hide-details
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SearchField extends Vue {
  @Prop({ required: false })
  value!: string

  @Prop({ required: false })
  placeholder!: string

  @Prop({ default: false })
  disabled!: boolean

  @Prop({ default: '350px' })
  maxWidth!: string

  get search () {
    return this.value
  }

  set search (value: string) {
    this.$emit('input', value)
  }
}
</script>

<style lang="scss">
.search-view {
  width: 100%;

  // & .v-input__control {
  //   min-height: auto !important;
  // }
}
</style>

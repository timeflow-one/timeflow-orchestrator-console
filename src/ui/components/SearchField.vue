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

<script src="./SearchField" lang="ts" />

<style lang="scss">
.search-view {
  width: 100%;

  & .v-input__control {
  min-height: auto !important;
}
}
</style>

<template>
  <v-text-field
    v-model="search"
    class="ma-0 pa-0 search-view"
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
  min-width: 150px;
  max-width: 350px;

  & .v-input__control {
  min-height: auto !important;
}
}
</style>

<template>
  <v-text-field
    v-model="search"
    class="ma-0 pa-0 search-view"
    prepend-inner-icon="mdi-magnify"
    :placeholder="placeholder"
    solo
    flat
    background-color="deep-purple lighten-5"
    hide-details
  />
</template>

<script src="./SearchField" lang="ts" />

<style lang="scss">
.search-view {
  min-width: 150px;
  max-width: 250px;

  & .v-input__control {
  min-height: auto !important;
}
}
</style>

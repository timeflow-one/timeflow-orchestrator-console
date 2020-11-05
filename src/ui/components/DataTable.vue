<template>
  <v-data-table v-bind="$props">
    <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
  </v-data-table>
</template>

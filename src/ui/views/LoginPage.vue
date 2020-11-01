<template>
  <v-layout
    fill-height
    align-center
    justify-space-around
    column
  >
    <img src="@/assets/timeflow.png" class="logo">
    <LoginForm />
    <div />
  </v-layout>
</template>

<script src="./LoginPage" lang="ts" />

<style lang="scss" scoped>
.logo {
  width: 250px;
}
</style>

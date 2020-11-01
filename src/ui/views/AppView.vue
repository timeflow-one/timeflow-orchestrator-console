<template>
  <v-app>
    <NavigationDrawer isApp />
    <Appbar isApp />

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <Footer isApp />
  </v-app>
</template>

<script src="@/ui/views/AppView" lang="ts" />

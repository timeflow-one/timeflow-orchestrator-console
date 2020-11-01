<template>
  <v-app>
    <NavigationDrawer isApp v-if="hasShowUi" />
    <Appbar isApp v-if="hasShowUi" />

    <v-main>
      <v-container class="fill-height">
        <router-view />
      </v-container>
    </v-main>

    <Footer isApp v-if="hasShowUi" />
  </v-app>
</template>

<script src="@/ui/views/AppView" lang="ts" />

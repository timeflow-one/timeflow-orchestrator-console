<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Example Login</v-list-item-title>
        <v-list-item-subtitle class="mt-1">{{ $vuetify.lang.t('$vuetify.owner') }}</v-list-item-subtitle>
        <v-btn
          class="mt-4"
          text
          color="deep-purple lighten-2"
          rounded
        >{{ $vuetify.lang.t('$vuetify.navigation.actions.logout') }}</v-btn>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script src="./NavigationDrawerUserCard" lang="ts" />

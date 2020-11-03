<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>{{ profile ? profile.full_name : '—' }}</v-list-item-title>
        <v-list-item-subtitle class="mt-1">{{ profile ? $vuetify.lang.t(`$vuetify.common.roles.${profile.role}`) : '—' }}</v-list-item-subtitle>
        <v-btn
          class="mt-4"
          color="accent"
          text
          rounded
          @click="logout"
        >{{ $vuetify.lang.t('$vuetify.navigation.actions.logout') }}</v-btn>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script src="./NavigationDrawerUserCard" lang="ts" />

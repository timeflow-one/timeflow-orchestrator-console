<template>
  <div>
    <v-list-item class="user-select-none">
      <v-list-item-avatar>
        <span
          class="accent lighten-3 d-inline-flex justify-center align-center font-weight-medium"
          style="width: 100%; height: 100%"
        >
          {{ initials }}
        </span>
      </v-list-item-avatar>
      <v-list-item-content>

        <v-list-item-title>{{ profile ? profile.full_name : '—' }}</v-list-item-title>
        <v-list-item-subtitle class="mt-1">{{ profile ? $vuetify.lang.t(`$vuetify.timeflow.roles.${profile.role}`) : '—' }}</v-list-item-subtitle>

      </v-list-item-content>
      <v-list-item-action>
        <v-btn
          icon
          color="accent"
          :title="$vuetify.lang.t('$vuetify.common.action.logout')"
          @click="logout"
        >
          <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <!-- <v-list-item>
      <v-list-item-content>
        <v-btn
          color="accent"
          @click="logout"
        >{{ $vuetify.lang.t('$vuetify.common.action.logout') }}</v-btn>
      </v-list-item-content>
    </v-list-item> -->
  </div>
</template>

<script src="./NavigationDrawerUserCard" lang="ts" />

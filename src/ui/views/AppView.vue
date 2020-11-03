<template>
  <v-app class="fill-height">
    <!-- :temporary="$vuetify.breakpoint.mobile && isNavigationDrawerShow"
      :permanent="!$vuetify.breakpoint.mobile && isNavigationDrawerShow" -->
      <!-- expand-on-hover
      permanent -->
    <v-navigation-drawer
      v-if="hasShowUi"
      v-model="isNavigationDrawerShow"
      app
      :temporary="$vuetify.breakpoint.mobile && isNavigationDrawerShow"
      :permanent="!$vuetify.breakpoint.mobile && isNavigationDrawerShow"
    >
      <NavigationDrawerUserCard />

      <v-divider />

      <v-list>
        <v-list-item
          color="primary lighten-1"
          v-for="(item, index) in menu"
          :key="index"
          :to="item.name"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ $vuetify.lang.t(`$vuetify.navigation.menu.${item.name}`) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- <template v-slot:append>
        <span class="text-body-2 pa-2">ORBL {{ new Date().getFullYear() }}</span>
      </template> -->
    </v-navigation-drawer>

    <v-app-bar
      v-if="hasShowUi"
      app
      color="white"
      flat
    >
      <v-app-bar-nav-icon @click.stop="isNavigationDrawerShow = !isNavigationDrawerShow" />
      <v-toolbar-title>{{ $vuetify.lang.t(`$vuetify.navigation.menu.${$route.name}`) }}</v-toolbar-title>

      <v-spacer />

      <!-- TODO добавить управляемую кнопку -->
      <!-- <v-btn text>{{ $vuetify.lang.t(`$vuetify.common.actions.add`) }}</v-btn> -->
    </v-app-bar>

    <v-main class="fill-height">
      <router-view class="fill-height" />
    </v-main>

    <v-footer
      v-if="hasShowUi"
      v-show="false"
      app
    >

    </v-footer>
  </v-app>
</template>

<script src="@/ui/views/AppView" lang="ts" />

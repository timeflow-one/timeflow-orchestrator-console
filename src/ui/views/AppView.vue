<template>
  <v-app class="fill-height">
    <!-- :temporary="$vuetify.breakpoint.mobile && isNavigationDrawerShow"
      :permanent="!$vuetify.breakpoint.mobile && isNavigationDrawerShow" -->
    <!-- expand-on-hover
      permanent -->
    <!-- temporary -->
    <!-- :expand-on-hover="!$vuetify.breakpoint.mobile && !$vuetify.breakpoint.lgAndUp" -->
    <v-navigation-drawer
      v-if="hasShowUi"
      v-model="isNavigationDrawerShow"
      app
      :permanent="!$vuetify.breakpoint.mobile"
      :temporary="$vuetify.breakpoint.mobile"
    >
      <img
        class="ma-4"
        src="@/assets/timeflow.svg"
      />

      <v-list
        v-for="(menu, index) in menus"
        :key="index"
      >
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

          <v-list-item-action-text v-if="Number(item.badge) >= 0">
            {{ item.badge }}
          </v-list-item-action-text>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-divider />

        <NavigationDrawerUserCard />
      </template>
    </v-navigation-drawer>

    <v-app-bar
      v-if="hasShowUi"
      class="toolbar-border-bottom user-select-none"
      app
      color="grey lighten-5"
      flat
    >
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.mobile"
        @click.stop="isNavigationDrawerShow = !isNavigationDrawerShow"
      />
      <v-toolbar-title>{{ $vuetify.lang.t(`$vuetify.navigation.menu.${$route.name}`) }}</v-toolbar-title>

      <v-spacer />

      <!-- TOOLBAR MENU -->
      <template v-if="isAppbarMenuShow">
        <template v-if="appbarMenu.length == 1">
          <v-btn
            v-for="(item, index) in appbarMenu"
            :key="index"
            :text="$vuetify.breakpoint.mdAndUp"
            :icon="!$vuetify.breakpoint.mdAndUp"
            :disabled="!item.action"
            :title="item.title"
            @click="item.action"
          >
            <span v-if="$vuetify.breakpoint.mdAndUp">{{ item.title }}</span>
            <v-icon v-else>{{ item.icon }}</v-icon>
          </v-btn>
        </template>
        <template v-else-if="appbarMenu.length > 1">
          ...
          <!-- todo expanded menu -->
        </template>
      </template>
      <!-- END TOOLBAR MENU -->
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

<style lang="scss">
.toolbar-border-bottom > .v-toolbar__content {
  border-bottom: 1px solid var(--v-toolbar_border-base);
}
</style>

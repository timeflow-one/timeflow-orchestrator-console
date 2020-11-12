<template>
  <div class="d-flex flex-column align-center justify-space-around">
    <div class="flex-grow-0">
      <img
        src="@/assets/timeflow.svg"
        width="250px"
      >
    </div>
    <div class="flex-grow-0 d-flex flex-column text-center">
      <span class="text-h3 text-sm-h1 font-weight-light">404</span>
      <span class="text-body-1 mt-2">{{ $vuetify.lang.t('$vuetify.common.label.page_not_found') }}</span>
    </div>
    <div class="flex-grow-0">
      <v-btn
        color="primary"
        to="/"
      >
        <v-icon class="mr-2">mdi-arrow-left</v-icon>
        <span>{{ $vuetify.lang.t('$vuetify.common.action.return') }}</span>
      </v-btn>
    </div>
  </div>
  <!-- <div>
    <v-row no-gutters>
      <v-col align-self="center">
        <img
          src="@/assets/timeflow.svg"
          width="250px"
        >
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <span class="text-h1 ">404</span>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
      </v-col>
    </v-row>
  </div> -->
</template>

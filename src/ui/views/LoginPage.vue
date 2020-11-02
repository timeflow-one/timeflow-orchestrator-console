<template>
  <v-container class="fill-height user-select-none">
    <v-row
      justify="center"
      align="start"
      no-gutters
    >
      <v-col
        cols="9"
        sm="4"
        md="3"
        lg="2"
      >
        <img
          src="@/assets/timeflow.png"
          width="100%"
        >
      </v-col>
    </v-row>
    <v-row
      justify="center"
      no-gutters
    >
      <v-col
        cols="12"
        sm="8"
        md="7"
        lg="6"
      >
        <LoginForm />
      </v-col>
    </v-row>
    <v-row
      justify="center"
      no-gutters
      hidden
    >
      <v-col />
    </v-row>
  </v-container>
</template>

<script src="./LoginPage" lang="ts" />

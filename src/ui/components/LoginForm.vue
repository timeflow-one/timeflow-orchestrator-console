<template>
  <v-form class="full-width" v-model="isValid" >
    <v-card width="100%">
      <v-card-title>
        {{ $vuetify.lang.t('$vuetify.login.title') }}
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="login"
          :label="$vuetify.lang.t('$vuetify.login.login')"
          :rules="loginRules"
        />
        <v-text-field
          class="mt-4"
          v-model="password"
          :label="$vuetify.lang.t('$vuetify.login.password')"
          :type="isShowPass ? 'text' : 'password'"
          :append-icon="password.length > 0 ? isShowPass ? 'mdi-eye-off' : 'mdi-eye' : ''"
          @click:append="() => isShowPass = !isShowPass"
          hide-details
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />

        <v-btn
          text
          color="primary"
          :disabled="!submitButtonHasAvailable"
          @click="submit"
        >
          {{ $vuetify.lang.t("$vuetify.login.actions.auth") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>

</template>

<script src="./LoginForm" lang="ts" />

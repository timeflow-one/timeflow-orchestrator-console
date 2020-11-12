<template>
  <v-form
    class="full-width"
    v-model="isFormValid"
    ref="form"
    @keyup.native.enter="isFormValid && submit()"
  >
    <v-card
      width="100%"
      color="grey lighten-5"
      class="rounded-lg"
    >
      <v-card-title>
        {{ $vuetify.lang.t('$vuetify.login.title') }}
      </v-card-title>
      <v-card-text>
        <v-text-field
          color="primary lighten-1"
          v-model="login"
          :label="$vuetify.lang.t('$vuetify.login.label.login')"
          :rules="loginRules"
        />
        <v-text-field
          class="mt-4"
          color="primary lighten-1"
          v-model="password"
          :rules="passwordRules"
          :label="$vuetify.lang.t('$vuetify.login.label.password')"
          :type="isShowPass ? 'text' : 'password'"
          :append-icon="password.length > 0 ? isShowPass ? 'mdi-eye-off' : 'mdi-eye' : ''"
          @click:append="() => isShowPass = !isShowPass"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />

        <v-btn
          text
          color="primary lighten-1"
          :disabled="!isFormValid"
          :loading="loadingState"
          @click="submit"
        >
          {{ $vuetify.lang.t("$vuetify.common.action.login") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>

</template>

<script src="./LoginForm" lang="ts" />

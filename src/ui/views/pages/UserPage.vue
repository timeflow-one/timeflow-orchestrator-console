<template>
  <v-card>
    <v-card-title v-if="!loading.card">
      {{ $vuetify.lang.t('$vuetify.pages.user.title', title) }}
    </v-card-title>
    <v-card-title
      v-if="loading.card"
      class="justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
      />
    </v-card-title>
    <v-card-text v-if="!loading.card">
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="form.name.value"
            :rules="form.name.rules"
            :label="$vuetify.lang.t('$vuetify.pages.user.form.labels.0')"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="form.email.value"
            :rules="form.email.rules"
            :label="$vuetify.lang.t('$vuetify.pages.user.form.labels.1')"
          />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="form.instance_name.value"
            disabled
            :rules="form.instance_name.rules"
            :label="$vuetify.lang.t('$vuetify.pages.user.form.labels.2')"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-select
            v-model="form.roles.value"
            :items="roles"
            :disabled="isRolesEnabled"
            multiple
            chips
            :label="$vuetify.lang.t('$vuetify.pages.user.form.labels.3')"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions v-if="!loading.card">
      <v-btn
        text
        @click="cancel"
      >{{ $vuetify.lang.t('$vuetify.common.actions.cancel') }}</v-btn>
      <v-spacer />
      <v-btn
        color="primary"
        text
        :loading="loading.submit"
        :disabled="!isSubmitButtonEnabled"
        @click="submit"
      >{{ $vuetify.lang.t('$vuetify.common.actions.edit') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script src="./UserPage" lang="ts" />

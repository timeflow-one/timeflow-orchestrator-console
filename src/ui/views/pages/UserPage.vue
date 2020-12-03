<template>
  <v-card>
    <v-card-title>
      <span v-if="!loading.card">{{ $vuetify.lang.t('$vuetify.pages.user.title', title) }}</span>
    </v-card-title>
    <v-card-text v-if="loading.card">
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-skeleton-loader type="text" />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-skeleton-loader type="text" />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          cols="12"
          sm="6"
        >
          <v-skeleton-loader type="text" />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-skeleton-loader type="text" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text v-if="!loading.card">
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="form.name.value"
            :disabled="form.name.readonly"
            :rules="form.name.rules"
            :label="$vuetify.lang.t('$vuetify.pages.user.form.label.0')"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="form.email.value"
            :disabled="form.email.readonly"
            :rules="form.email.rules"
            :label="$vuetify.lang.t('$vuetify.pages.user.form.label.1')"
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
            :disabled="form.instance_name.readonly"
            :rules="form.instance_name.rules"
            :label="$vuetify.lang.t('$vuetify.pages.user.form.label.2')"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-select
            v-model="form.roles.value"
            :items="roles"
            :disabled="form.roles.readonly || isRolesEnabled"
            multiple
            chips
            :label="$vuetify.lang.t('$vuetify.pages.user.form.label.3')"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions v-if="!loading.card">
      <v-btn
        text
        @click="cancel"
      >{{ $vuetify.lang.t('$vuetify.common.action.cancel') }}</v-btn>
      <v-spacer />
      <v-btn
        color="primary"
        text
        :loading="loading.submit"
        :disabled="!isSubmitButtonEnabled"
        @click="submit"
      >{{ $vuetify.lang.t('$vuetify.common.action.edit') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script src="./UserPage" lang="ts" />

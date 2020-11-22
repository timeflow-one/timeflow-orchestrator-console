<template>
  <v-card>
    <v-card-title>{{ $vuetify.lang.t('$vuetify.pages.license.label.edit') }}</v-card-title>
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
          <v-autocomplete
            ref="focusedField"
            tabindex="1"
            v-model="form.instance.value"
            :items="instances"
            :disabled="instances.length <= 0"
            :loading="instances.length <= 0"
            :rules="form.instance.rules"
            :label="$vuetify.lang.t('$vuetify.pages.create_license.form.label.0')"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-select
            tabindex="2"
            v-model="form.plan.value"
            :items="plans"
            :disabled="plans.length <= 0"
            :loading="plans.length <= 0"
            :rules="form.plan.rules"
            :label="$vuetify.lang.t('$vuetify.pages.create_license.form.label.1')"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <DatePicker
            tabindex="3"
            v-model="startAtLocaleDate"
            :init="form.start_at.value"
            :rules="form.start_at.rules"
            :parser="(value) => new Date(value).toLocaleDateString()"
            :label="$vuetify.lang.t('$vuetify.pages.create_license.form.label.2')"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-select
            tabindex="4"
            v-model="form.duration.value"
            :items="durations"
            :disabled="durations.length <= 0"
            :loading="durations.length <= 0"
            :rules="form.duration.rules"
            :label="$vuetify.lang.t('$vuetify.pages.create_license.form.label.3')"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="expiredAtLocaleDate"
            prepend-icon="mdi-calendar"
            :rules="form.expired_at.rules"
            :label="$vuetify.lang.t('$vuetify.pages.create_license.form.label.4')"
            :placeholder="$vuetify.lang.t('$vuetify.pages.create_license.form.placeholder.4')"
            readonly
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions v-if="!loading.card">
      <v-btn
        tabindex="6"
        text
        @click="cancel"
      >{{ $vuetify.lang.t('$vuetify.common.action.cancel') }}</v-btn>
      <v-spacer />
      <v-btn
        tabindex="5"
        color="primary"
        text
        :loading="loading.submit"
        :disabled="!isSubmitButtonEnabled"
        @click="submit"
      >{{ $vuetify.lang.t('$vuetify.common.action.edit') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script src="./LicensePage" lang="ts" />

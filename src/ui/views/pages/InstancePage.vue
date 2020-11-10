<template>
  <v-card>
    <v-card-title v-if="!loading.card">
      {{ $vuetify.lang.t('$vuetify.pages.instance.title', title) }}
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
            v-model="form.instance_name.value"
            :rules="form.instance_name.rules"
            :label="$vuetify.lang.t('$vuetify.pages.instance.form.labels.0')"
          />
        </v-col>
      </v-row>
      <v-form readonly>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="form.db_host.value"
              :rules="form.db_host.rules"
              :label="$vuetify.lang.t('$vuetify.pages.instance.form.labels.1')"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="form.db_name.value"
              :rules="form.db_name.rules"
              :label="$vuetify.lang.t('$vuetify.pages.instance.form.labels.2')"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="form.db_user.value"
              :rules="form.db_user.rules"
              :label="$vuetify.lang.t('$vuetify.pages.instance.form.labels.3')"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <PasswordComponent
              v-model="form.db_pass.value"
              :rules="form.db_pass.rules"
              :label="$vuetify.lang.t('$vuetify.pages.instance.form.labels.4')"
            />
          </v-col>
        </v-row>
      </v-form>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="form.vi_key.value"
            :rules="form.vi_key.rules"
            :label="$vuetify.lang.t('$vuetify.pages.instance.form.labels.5')"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="form.geo_key.value"
            :rules="form.geo_key.rules"
            :label="$vuetify.lang.t('$vuetify.pages.instance.form.labels.6')"
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
        color="error"
        text
        :loading="loading.remove"
        @click="remove"
      >{{ $vuetify.lang.t('$vuetify.common.actions.remove') }}</v-btn>
      <v-btn
        color="primary"
        text
        :loading="loading.confirm"
        :disabled="!isConfirmButtonEnabled"
        @click="confirm"
      >{{ $vuetify.lang.t('$vuetify.common.actions.edit') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script src="./InstancePage" lang="ts" />

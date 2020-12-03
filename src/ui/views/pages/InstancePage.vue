<template>
  <v-card>
    <v-card-title>
      <span v-if="!loading.card">{{ $vuetify.lang.t('$vuetify.pages.instance.title', title) }}</span>
    </v-card-title>
    <v-card-text v-if="loading.card">
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-skeleton-loader type="text" />
        </v-col>
      </v-row>
      <v-form readonly>
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
        </v-row>
      </v-form>
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
    </v-card-text>
    <v-card-text v-if="!loading.card">
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="form.instance_name.value"
            :disabled="form.instance_name.readonly"
            :rules="form.instance_name.rules"
            :label="$vuetify.lang.t('$vuetify.pages.instance.form.label.0')"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="form.db_host.value"
            :disabled="form.db_host.readonly"
            :rules="form.db_host.rules"
            :label="$vuetify.lang.t('$vuetify.pages.instance.form.label.1')"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="form.db_name.value"
            :disabled="form.db_name.readonly"
            :rules="form.db_name.rules"
            :label="$vuetify.lang.t('$vuetify.pages.instance.form.label.2')"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="form.db_user.value"
            :disabled="form.db_user.readonly"
            :rules="form.db_user.rules"
            :label="$vuetify.lang.t('$vuetify.pages.instance.form.label.3')"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <PasswordComponent
            v-model="form.db_pass.value"
            :disabled="form.db_pass.readonly"
            :rules="form.db_pass.rules"
            :label="$vuetify.lang.t('$vuetify.pages.instance.form.label.4')"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="form.vi_key.value"
            :disabled="form.vi_key.readonly"
            :rules="form.vi_key.rules"
            :label="$vuetify.lang.t('$vuetify.pages.instance.form.label.5')"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="form.geo_key.value"
            :disabled="form.geo_key.readonly"
            :rules="form.geo_key.rules"
            :label="$vuetify.lang.t('$vuetify.pages.instance.form.label.6')"
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
        color="error"
        text
        :loading="loading.remove"
        @click="remove"
      >{{ $vuetify.lang.t('$vuetify.common.action.remove') }}</v-btn>
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

<script src="./InstancePage" lang="ts" />

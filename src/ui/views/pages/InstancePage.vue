<template>
  <v-card>
    <v-card-title>
      {{ form.instance_name.value }}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field v-model="form.instance_name.value" />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          lg="3"
        >
          <v-text-field
            v-model="form.db_host.value"
            readonly
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          lg="3"
        >
          <v-text-field
            v-model="form.db_name.value"
            readonly
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          lg="3"
        >
          <v-text-field
            v-model="form.db_user.value"
            readonly
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          lg="3"
        >
          <PasswordComponent
            v-model="form.db_pass.value"
            readonly
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field v-model="form.vi_key.value" />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field v-model="form.geo_key.value" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        @click="cancel"
      >{{ $vuetify.lang.t('$vuetify.common.actions.cancel') }}</v-btn>
      <v-spacer />
      <v-btn
        color="error"
        text
      >{{ $vuetify.lang.t('$vuetify.common.actions.remove') }}</v-btn>
      <v-btn
        color="primary"
        text
        readonly
      >{{ $vuetify.lang.t('$vuetify.common.actions.edit') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script src="./InstancePage" lang="ts" />

<template>
  <v-card>
    <v-card-title>{{ $vuetify.lang.t('$vuetify.pages.add_instance.titles.creating') }}</v-card-title>
    <v-card-text>
      <v-stepper
        v-model="stepper.step"
        vertical
      >
        <v-stepper-step
          step="1"
          :complete="stepper.step > 1"
          :rules="stepRules(0)"
        >
          {{ $vuetify.lang.t('$vuetify.pages.add_instance.steps.0') }}
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-row>
            <v-col>
              <v-text-field
                v-model="form.instance_name"
                :rules="rulesMessages[0][0]"
                :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.labels.0')"
              />
            </v-col>
          </v-row>
          <div>
            <v-btn
              color="primary"
              :disabled="isStepButtonDisabled(0)"
              @click="stepper.step = 2"
            >{{ $vuetify.lang.t('$vuetify.common.actions.next') }}</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step
          step="2"
          :complete="stepper.step > 2"
          :rules="stepRules(1)"
        >
          {{ $vuetify.lang.t('$vuetify.pages.add_instance.steps.1') }}
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-row>
            <v-col
              cols="12"
              sm="6"
              xl="3"
            >
              <v-text-field
                v-model="form.db_host"
                :rules="rulesMessages[1][0]"
                :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.labels.1')"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              xl="3"
            >
              <v-text-field
                v-model="form.db_name"
                :rules="rulesMessages[1][1]"
                :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.labels.2')"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              xl="3"
            >
              <v-text-field
                v-model="form.db_user"
                :rules="rulesMessages[1][2]"
                :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.labels.3')"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              xl="3"
            >
              <v-text-field
                v-model="form.db_pass"
                :rules="rulesMessages[1][3]"
                :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.labels.4')"
              />
            </v-col>
          </v-row>
          <div>
            <v-btn
              color="primary"
              class="mr-2"
              :disabled="isStepButtonDisabled(1)"
              @click="stepper.step = 3"
            >{{ $vuetify.lang.t('$vuetify.common.actions.next') }}</v-btn>
            <v-btn
              color="primary"
              text
              @click="stepper.step = 1"
            >{{ $vuetify.lang.t('$vuetify.common.actions.back') }}</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step
          step="3"
          :complete="stepper.step > 3"
          :rules="stepRules(2)"
        >
          {{ $vuetify.lang.t('$vuetify.pages.add_instance.steps.2') }}
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-row>
            <v-col
              cols="12"
              sm="6"
              xl="3"
            >
              <v-select
                v-model="form.plan"
                item-text="title"
                item-value="id"
                :items="plans"
                :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.labels.5')"
              />
              <!-- <v-text-field
                v-model="form.plan"
                :rules="rulesMessages[2][0]"
                :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.labels.5')"
              /> -->
            </v-col>
            <v-col
              cols="12"
              sm="6"
              xl="3"
            >
              <v-dialog
                ref="expiredDateDialog"
                v-model="expiredDatePickerDialog"
                :return-value.sync="form.expired_at"
                persistent
                width="290px"
              >
                <template
                  slot="activator"
                  slot-scope="{ on, attrs }"
                >
                  <v-text-field
                    v-model="form.expired_at"
                    :rules="rulesMessages[2][1]"
                    :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.labels.6')"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>

                <v-date-picker
                  v-model="form.expired_at"
                  scrollable
                >
                  <v-spacer />
                  <v-btn
                    text
                    @click="expiredDatePickerDialog = false"
                  >{{ $vuetify.lang.t('$vuetify.common.actions.cancel') }}</v-btn>
                  <v-btn
                    text
                    @click="commitSelectedExpiredAtDate"
                  >{{ $vuetify.lang.t('$vuetify.common.actions.ok') }}</v-btn>
                </v-date-picker>
              </v-dialog>
              <!-- <v-text-field
                v-model="form.expired_at"
                :rules="rulesMessages[2][1]"
                :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.labels.6')"
              /> -->
            </v-col>
            <v-col
              cols="12"
              sm="6"
              xl="3"
            >
              <v-text-field
                v-model="form.vi_key"
                :rules="rulesMessages[2][2]"
                :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.labels.7')"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              xl="3"
            >
              <v-text-field
                v-model="form.geo_key"
                :rules="rulesMessages[2][3]"
                :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.labels.8')"
              />
            </v-col>
          </v-row>
          <div class="mt-2">
            <v-btn
              color="primary"
              class="mr-2"
              :disabled="isStepButtonDisabled(2)"
              @click="stepper.step = 4"
            >{{ $vuetify.lang.t('$vuetify.common.actions.next') }}</v-btn>
            <v-btn
              color="primary"
              text
              @click="stepper.step = 2"
            >{{ $vuetify.lang.t('$vuetify.common.actions.back') }}</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step
          step="4"
          :complete="stepper.step > 4"
          :rules="stepRules(3)"
        >
          {{ $vuetify.lang.t('$vuetify.pages.add_instance.steps.3') }}
        </v-stepper-step>

        <v-stepper-content step="4">
          <v-row>
            <v-col
              cols="12"
              sm="6"
              xl="4"
            >
              <v-text-field
                v-model="form.username"
                :rules="rulesMessages[3][0]"
                :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.labels.9')"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              xl="4"
            >
              <v-text-field
                v-model="form.user_email"
                :rules="rulesMessages[3][1]"
                :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.labels.10')"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              xl="4"
            >
              <v-text-field
                v-model="form.user_pass"
                :rules="rulesMessages[3][2]"
                :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.labels.11')"
              />
            </v-col>
          </v-row>
          <div class="mt-2">
            <v-btn
              color="primary"
              text
              @click="stepper.step = 3"
            >{{ $vuetify.lang.t('$vuetify.common.actions.back') }}</v-btn>
          </div>
        </v-stepper-content>
      </v-stepper>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        @click="cancel"
      >{{ $vuetify.lang.t('$vuetify.common.actions.cancel') }}</v-btn>
      <v-spacer />
      <v-btn
        color="primary"
        text
        :loading="loading"
        :disabled="!isConfirmButtonEnabled"
        @click="confirm"
      >{{ $vuetify.lang.t('$vuetify.pages.add_instance.actions.create') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script src="./AddInstancePage" lang="ts" />

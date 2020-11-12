<template>
  <v-card>
    <v-card-title>{{ $vuetify.lang.t('$vuetify.pages.add_instance.title.creating') }}</v-card-title>
    <v-card-text>
      <v-stepper
        v-model="stepper.step"
        vertical
      >
        <v-stepper-step
          step="1"
          :complete="stepper.step > 1"
          :rules="stepRules(1)"
        >
          {{ $vuetify.lang.t('$vuetify.pages.add_instance.step.0') }}
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-form
            :disabled="stepper.step != 1"
            @submit.prevent=""
          >
            <v-row>
              <v-col>
                <v-text-field
                  ref="focusedField"
                  tabindex="1"
                  v-model="form.instance_name.value"
                  :rules="form.instance_name.rules"
                  :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.label.0')"
                />
              </v-col>
            </v-row>
          </v-form>
          <div>
            <v-btn
              tabindex="2"
              color="primary"
              :disabled="!isStepButtonEnabled(1)"
              @click="stepper.step = 2"
            >{{ $vuetify.lang.t('$vuetify.common.action.next') }}</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step
          step="2"
          :complete="stepper.step > 2"
          :rules="stepRules(2)"
        >
          {{ $vuetify.lang.t('$vuetify.pages.add_instance.step.1') }}
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-form
            :disabled="stepper.step != 2"
            @submit.prevent=""
          >
            <v-row>
              <v-col
                cols="12"
                sm="6"
                xl="3"
              >
                <v-text-field
                  tabindex="3"
                  v-model="form.db_host.value"
                  :rules="form.db_host.rules"
                  :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.label.1')"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                xl="3"
              >
                <v-text-field
                  tabindex="4"
                  v-model="form.db_name.value"
                  :rules="form.db_name.rules"
                  :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.label.2')"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                xl="3"
              >
                <v-text-field
                  tabindex="5"
                  v-model="form.db_user.value"
                  :rules="form.db_user.rules"
                  :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.label.3')"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                xl="3"
              >
                <PasswordComponent
                  tabindex="6"
                  v-model="form.db_pass.value"
                  :rules="form.db_pass.rules"
                  :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.label.4')"
                />
              </v-col>
            </v-row>
          </v-form>
          <div>
            <v-btn
              tabindex="7"
              color="primary"
              class="mr-2"
              :disabled="!isStepButtonEnabled(2)"
              @click="stepper.step = 3"
            >{{ $vuetify.lang.t('$vuetify.common.action.next') }}</v-btn>
            <v-btn
              tabindex="19"
              color="primary"
              text
              @click="stepper.step = 1"
            >{{ $vuetify.lang.t('$vuetify.common.action.back') }}</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step
          step="3"
          :complete="stepper.step > 3"
          :rules="stepRules(3)"
        >
          {{ $vuetify.lang.t('$vuetify.pages.add_instance.step.2') }}
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-form
            :disabled="stepper.step != 3"
            @submit.prevent=""
          >
            <v-row>
              <v-col
                cols="12"
                sm="6"
                xl="3"
              >
                <v-select
                  tabindex="8"
                  v-model="form.plan.value"
                  item-text="title"
                  item-value="id"
                  :items="plans"
                  :loading="plans.length <= 0"
                  :disabled="plans.length <= 0"
                  :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.label.5')"
                />
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
                  width="290px"
                >
                  <template
                    slot="activator"
                    slot-scope="{ on, attrs }"
                  >
                    <v-text-field
                      tabindex="9"
                      v-model="form.expired_at.value"
                      :rules="form.expired_at.rules"
                      :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.label.6')"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      @keypress.space="on.click"
                    />
                  </template>

                  <v-date-picker
                    v-model="form.expired_at.value"
                    scrollable
                  >
                    <v-spacer />
                    <v-btn
                      text
                      @click="expiredDatePickerDialog = false"
                    >{{ $vuetify.lang.t('$vuetify.common.action.cancel') }}</v-btn>
                    <v-btn
                      text
                      @click="commitSelectedExpiredAtDate"
                    >{{ $vuetify.lang.t('$vuetify.common.action.ok') }}</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                xl="3"
              >
                <v-text-field
                  tabindex="10"
                  v-model="form.vi_key.value"
                  :rules="form.vi_key.rules"
                  :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.label.7')"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                xl="3"
              >
                <v-text-field
                  tabindex="11"
                  v-model="form.geo_key.value"
                  :rules="form.geo_key.rules"
                  :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.label.8')"
                />
              </v-col>
            </v-row>
          </v-form>
          <div>
            <v-btn
              tabindex="12"
              color="primary"
              class="mr-2"
              :disabled="!isStepButtonEnabled(3)"
              @click="stepper.step = 4"
            >{{ $vuetify.lang.t('$vuetify.common.action.next') }}</v-btn>
            <v-btn
              tabindex="18"
              color="primary"
              text
              @click="stepper.step = 2"
            >{{ $vuetify.lang.t('$vuetify.common.action.back') }}</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step
          step="4"
          :complete="stepper.step > 4"
          :rules="stepRules(4)"
        >
          {{ $vuetify.lang.t('$vuetify.pages.add_instance.step.3') }}
        </v-stepper-step>

        <v-stepper-content step="4">
          <v-form
            :disabled="stepper.step != 4"
            @submit.prevent=""
          >
            <v-row>
              <v-col
                cols="12"
                sm="6"
                xl="4"
              >
                <v-text-field
                  tabindex="13"
                  v-model="form.username.value"
                  :rules="form.username.rules"
                  :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.label.9')"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                xl="4"
              >
                <v-text-field
                  tabindex="14"
                  v-model="form.user_email.value"
                  :rules="form.user_email.rules"
                  :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.label.10')"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                xl="4"
              >
                <PasswordComponent
                  tabindex="15"
                  v-model="form.user_pass.value"
                  :rules="form.user_pass.rules"
                  :label="$vuetify.lang.t('$vuetify.pages.add_instance.form.label.11')"
                />
              </v-col>
            </v-row>
          </v-form>
          <div>
            <v-btn
              tabindex="17"
              color="primary"
              text
              @click="stepper.step = 3"
            >{{ $vuetify.lang.t('$vuetify.common.action.back') }}</v-btn>
          </div>
        </v-stepper-content>
      </v-stepper>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        @click="cancel"
      >{{ $vuetify.lang.t('$vuetify.common.action.cancel') }}</v-btn>
      <v-spacer />
      <v-btn
        color="primary"
        tabindex="16"
        text
        :loading="loading"
        :disabled="!isSubmitButtonEnabled"
        @click="submit"
      >{{ $vuetify.lang.t('$vuetify.pages.add_instance.action.create') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script src="./CreateInstancePage" lang="ts" />

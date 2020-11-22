<template>
  <v-dialog
    ref="dialog"
    v-model="dialog"
    :return-value.sync="date"
    width="290px"
  >
    <template
      slot="activator"
      slot-scope="{ on, attrs }"
    >
      <v-text-field
        v-model="parsedDate"
        :tabindex="tabindex"
        :rules="rules"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        @keypress.space="on.click"
      />
    </template>

    <v-date-picker
      v-model="date"
      scrollable
    >
      <v-spacer />
      <v-btn
        text
        @click="dialog = false"
      >{{ $vuetify.lang.t('$vuetify.common.action.cancel') }}</v-btn>
      <v-btn
        text
        @click="commit"
      >{{ $vuetify.lang.t('$vuetify.common.action.ok') }}</v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class DatePicker extends Vue {
  private dialog = false
  private date = ''

  @Prop({ required: false, default: '' })
  init!: string

  @Prop({ required: false, default: () => [] })
  rules!: Array<string | boolean>

  @Prop({ required: false })
  label!: string

  @Prop({ default: -1 })
  tabindex!: number

  @Prop({ default: () => { return (value: string) => value } })
  parser!: (value: string) => string

  get parsedDate () {
    return this.date !== '' ? this.parser(this.date) : this.date
  }

  mounted () {
    this.date = this.init
  }

  commit () {
    // @ts-expect-error
    this.$refs.dialog.save(this.date)
  }

  @Watch('date')
  onDateChanged (value: string) {
    this.$emit('input', value)
  }

  @Watch('init')
  onInitValueChanged (value: string) {
    if (this.date === '') {
      this.date = value
    }
  }
}
</script>

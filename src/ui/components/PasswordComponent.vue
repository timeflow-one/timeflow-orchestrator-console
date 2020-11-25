<template>
  <v-text-field
    color="primary lighten-1"
    v-model="password"
    :disabled="disabled"
    :readonly="readonly"
    :rules="rules"
    :label="label"
    :tabindex="tabindex"
    :type="isShowPass ? 'text' : 'password'"
    :append-icon="password.length > 0 ? isShowPass ? 'mdi-eye-off' : 'mdi-eye' : ''"
    @click:append="() => isShowPass = !isShowPass"
    @focus.once="isShowPass = false"
  >
    <template
      v-for="(_, slot) of $scopedSlots"
      v-slot:[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>
  </v-text-field>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class PasswordComponent extends Vue {
  @Prop({ required: false })
  value!: string

  @Prop({ required: false })
  rules!: Array<() => boolean>

  @Prop({ default: false })
  label!: boolean

  @Prop({ default: false })
  disabled!: boolean

  @Prop({ default: false })
  readonly!: boolean

  @Prop({ default: '350px' })
  maxWidth!: string

  @Prop({ default: -1 })
  tabindex!: number

  @Prop({ default: true })
  isShowPass!: boolean

  get password () {
    return this.value
  }

  set password (value: string) {
    this.$emit('input', value)
  }
}
</script>

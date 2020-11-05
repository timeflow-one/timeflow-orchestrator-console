<template>
  <v-data-table
    v-bind="$props"
    class="flex column fill-height"
    height="100%"
    fixed-header
    :options.sync="options"
    :mobile-breakpoint="0"
    :items-per-page="20"
    :no-data-text="$vuetify.lang.t('$vuetify.common.table.list_empty')"
    :loading-text="$vuetify.lang.t('$vuetify.common.table.loading')"
    :footer-props="{'items-per-page-options': [20, 50, 100, -1]}"
  >
    <slot
      v-for="(_, name) in $slots"
      :name="name"
      :slot="name"
    />
  </v-data-table>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { TableOptions } from '@/models/TableOptions'

@Component
export default class DataTable extends Vue {
  private readonly options: Partial<TableOptions> = {}

  @Prop({ required: true })
  headers: any

  @Prop({ required: true })
  items: any

  @Prop({ required: true })
  loading: any

  @Prop({ required: true })
  serverItemsLength: any

  @Prop({ required: true })
  search: any

  @Watch('options', { deep: true })
  onOptionsChanged (value: TableOptions) {
    this.$emit('options', value)
  }
}
</script>

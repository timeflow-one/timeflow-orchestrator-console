<template>
  <v-data-table
    v-bind="$props"
    class="flex column fill-height"
    height="100%"
    fixed-header
    :page.sync="page"
    :options.sync="options"
    :mobile-breakpoint="0"
    :items-per-page="20"
    :no-data-text="$vuetify.lang.t('$vuetify.common.table.label.list_empty')"
    :loading-text="$vuetify.lang.t('$vuetify.common.table.label.loading')"
    :footer-props="{'items-per-page-options': [20, 50, 100, -1]}"
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
  </v-data-table>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { TableOptions } from '@/models/TableOptions'

@Component
export default class DataTable extends Vue {
  private readonly options: Partial<TableOptions> = {}
  private page = 1

  @Prop({ required: true })
  headers!: Array<any>

  @Prop({ required: true })
  items!: Array<any>

  @Prop({ required: true })
  loading!: boolean

  @Prop({ required: true })
  serverItemsLength!: number

  @Prop({ required: false })
  search!: string

  @Watch('options', { deep: true })
  onOptionsChanged (value: TableOptions) {
    this.$emit('options', value)
  }

  setPage (page: number) {
    this.page = page
    // если page === this.page, обновление this.page не сообщит об
    // изменении опций. Сообщаем об обновлении опций вручную
    this.$emit('options', this.options)
  }
}
</script>

<template>
  <v-container fluid>
    <v-data-table
      ref="table"
      :headers="tableHeaders"
      :items="tableData"
      :options.sync="tableOptions"
      :no-data-text="$vuetify.lang.t('$vuetify.common.table.list_empty')"
      :loading="tableLoading"
      :loading-text="$vuetify.lang.t('$vuetify.common.table.loading')"
      :server-items-length="totalItemsCount"
    >
      <template
        slot="item.state"
        slot-scope="{ item }"
      >
        <v-chip v-if="item.state" color="error lighten-1">{{ $vuetify.lang.t('$vuetify.pages.instances.table.need_update_lic') }}</v-chip>
      </template>

      <template
        slot="item.created_at"
        slot-scope="{ item }"
      >
        <v-chip color="deep-purple lighten-5">{{ item.created_at }}</v-chip>
      </template>

      <template
        slot="item.expires_at"
        slot-scope="{ item }"
      >
        <v-chip color="deep-purple lighten-5">{{ item.expires_at }}</v-chip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script src="./InstancesPage" lang="ts" />

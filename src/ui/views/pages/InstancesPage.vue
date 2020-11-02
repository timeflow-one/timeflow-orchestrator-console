<template>
  <v-container fluid>
    <v-data-table
      ref="table"
      :headers="tableHeaders"
      :items="tableData"
      item-key="id"
      :items-per-page="5"
      :options.sync="tableOptions"
      :no-data-text="$vuetify.lang.t('$vuetify.common.table.list_empty')"
      :loading="tableLoading"
      :loading-text="$vuetify.lang.t('$vuetify.common.table.loading')"
      :server-items-length="totalItemsCount"
      :search="filterQuery"
    >
      <template slot="top">
        <v-subheader class="overflow-x-auto overflow-y-hidden">
          {{ $vuetify.lang.t(`$vuetify.navigation.menu.${$route.name}`) }}

          <v-spacer class="mx-3" />

          <SearchField
            v-model="filterQuery"
            class="me-3"
            :placeholder="$vuetify.lang.t('$vuetify.common.table.search_input')"
          />

          <v-btn
            :text="$vuetify.breakpoint.mdAndUp"
            :icon="!$vuetify.breakpoint.mdAndUp"
            :disabled="!isClearFiltersButtonEnable"
            :title="$vuetify.lang.t(`$vuetify.common.actions.clear_filter`)"
            @click="clearFilters"
          >
            <span v-if="$vuetify.breakpoint.mdAndUp">{{ $vuetify.lang.t(`$vuetify.common.actions.clear_filter`) }}</span>
            <v-icon v-else>mdi-filter-remove-outline</v-icon>
          </v-btn>

          <v-divider
            class="mx-3"
            vertical
          />

          <v-btn
            :text="$vuetify.breakpoint.mdAndUp"
            :icon="!$vuetify.breakpoint.mdAndUp"
            :title="$vuetify.lang.t(`$vuetify.pages.instances.actions.add`)"
            @click="clearFilters"
          >
            <span v-if="$vuetify.breakpoint.mdAndUp">{{ $vuetify.lang.t(`$vuetify.pages.instances.actions.add`) }}</span>
            <v-icon v-else>mdi-database-plus</v-icon>
          </v-btn>
        </v-subheader>
      </template>

      <template
        slot="item"
        slot-scope="{ item }"
      >
        <tr class="user-select-none cursor-pointer">
          <td class="text-left">
            <span>{{ item.id }}</span>
          </td>
          <td class="text-left">
            <span>{{ item.name }}</span>
          </td>
          <td class="text-center">
            <span>{{ item.limit }}</span>
          </td>
          <td class="text-center">
            <span>{{ item.count }}</span>
          </td>
          <td class="text-left">
            <v-chip color="deep-purple lighten-5">{{ item.created_at }}</v-chip>
          </td>
          <td class="text-left">
            <v-chip color="deep-purple lighten-5">{{ item.expires_at }}</v-chip>
          </td>
          <td class="text-center">
            <v-chip
              v-if="item.state"
              color="error lighten-1"
            >{{ $vuetify.lang.t('$vuetify.pages.instances.table.need_update_lic') }}</v-chip>
            <span v-else>—</span>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script src="./InstancesPage" lang="ts" />

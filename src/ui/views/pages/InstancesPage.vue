<template>
  <v-container fluid>
    <v-data-table
      class="flex column fill-height"
      ref="table"
      height="100%"
      fixed-header
      :mobile-breakpoint="0"
      :headers="tableHeaders"
      :items="tableItems"
      :items-per-page="20"
      :options.sync="tableOptions"
      :no-data-text="$vuetify.lang.t('$vuetify.common.table.list_empty')"
      :loading="tableLoading"
      :loading-text="$vuetify.lang.t('$vuetify.common.table.loading')"
      :server-items-length="totalItems"
      :search="filterQuery"
      :footer-props="{'items-per-page-options': [20, 50, 100, -1]}"
    >
      <template slot="top">
        <FiltersContainer class="px-4">
          <SearchField
            v-model="filterQuery"
            max-width="450px"
            :placeholder="$vuetify.lang.t('$vuetify.common.table.search_input')"
          />

          <v-spacer class="mx-2" />

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
        </FiltersContainer>

        <v-divider class="mt-3" />
      </template>

      <template
        slot="item"
        slot-scope="{ item }"
      >
        <tr class="cursor-pointer">
          <td class="text-start user-select-none">
            <span>{{ item.id }}</span>
          </td>
          <td class="text-start user-select-none">
            <span>{{ item.name }}</span>
          </td>
          <td class="text-start user-select-none">
            <span>{{ item.limit }}</span>
          </td>
          <td class="text-start user-select-none">
            <span>{{ item.count }}</span>
          </td>
          <td class="text-start user-select-none">
            <v-chip color="grey lighten-4">{{ item.created_at }}</v-chip>
          </td>
          <td class="text-start user-select-none">
            <v-chip color="grey lighten-4">{{ item.expires_at }}</v-chip>
          </td>
          <td class="text-center user-select-none">
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

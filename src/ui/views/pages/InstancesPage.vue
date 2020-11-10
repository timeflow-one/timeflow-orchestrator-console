<template>
  <v-container fluid>
    <DataTable
      ref="table"
      :headers="tableHeaders"
      :items="tableItems"
      :server-items-length="totalItems"
      :search="filters.query"
      :loading="tableLoading"
      @options="onOptionsChanged"
    >
      <template slot="top">
        <FiltersContainer class="px-4">
          <SearchField
            v-model="filters.query"
            max-width="450px"
            :placeholder="$vuetify.lang.t('$vuetify.common.table.search_input')"
          />

          <v-spacer class="mx-2" />

          <v-btn
            :text="$vuetify.breakpoint.mdAndUp"
            :icon="!$vuetify.breakpoint.mdAndUp"
            :disabled="!isFilteresDefault"
            :title="$vuetify.lang.t(`$vuetify.common.actions.clear_filter`)"
            @click="clearFitlers"
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
        <tr class="cursor-pointer" @click="clickOnRow(item)">
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
    </DataTable>

    <v-dialog
      v-model="isSubpage"
      persistent
      scrollable
      max-width="1100px"
    >
      <router-view :key="$route.path" />
    </v-dialog>
  </v-container>
</template>

<script src="./InstancesPage" lang="ts" />

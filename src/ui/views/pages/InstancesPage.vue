<template>
  <v-container fluid>
    <DataTable
      ref="table"
      :headers="tableHeaders"
      :items="tableItems"
      :server-items-length="totalItems"
      :search="search"
      :loading="loading.table"
      @options="onOptionsChanged"
    >
      <template slot="top">
        <FiltersContainer class="px-4">
          <SearchField
            v-model="search"
            max-width="450px"
            :placeholder="$vuetify.lang.t('$vuetify.common.table.label.search_input')"
          />

          <v-spacer class="mx-2" />

          <v-btn
            :text="$vuetify.breakpoint.mdAndUp"
            :icon="!$vuetify.breakpoint.mdAndUp"
            :disabled="!isFilteresDefault"
            :title="$vuetify.lang.t(`$vuetify.common.action.clear_filter`)"
            @click="clearFitlers"
          >
            <span v-if="$vuetify.breakpoint.mdAndUp">{{ $vuetify.lang.t(`$vuetify.common.action.clear_filter`) }}</span>
            <v-icon v-else>mdi-filter-remove-outline</v-icon>
          </v-btn>
        </FiltersContainer>

        <v-divider class="mt-3" />
      </template>

      <template
        slot="item"
        slot-scope="{ item }"
      >
        <tr
          class="cursor-pointer"
          @click="clickOnRow(item)"
        >
          <td class="text-end user-select-none">
            <span :title="item.id">{{ item.id }}</span>
          </td>
          <td class="text-start user-select-none">
            <span :title="item.name">{{ item.name }}</span>
          </td>
          <td class="text-end user-select-none">
            <span :title="item.limit">{{ item.limit }}</span>
          </td>
          <td class="text-end user-select-none">
            <span :title="item.count">{{ item.count }}</span>
          </td>
          <td class="text-start user-select-none">
            <span :title="item.created_at.toDateString()">{{ item.created_at.toLocaleDateString() }}</span>
          </td>
          <td class="text-start user-select-none">
            <span :title="item.expires_at.toDateString()">{{ item.expires_at.toLocaleDateString() }}</span>
          </td>
          <td class="text-center user-select-none">
            <v-chip
              class="cursor-pointer"
              v-if="item.state"
              color="error lighten-1"
              :title="$vuetify.lang.t('$vuetify.pages.instances.table.need_update_lic')"
            >{{ $vuetify.lang.t('$vuetify.pages.instances.table.need_update_lic') }}</v-chip>
            <span v-else>—</span>
          </td>
        </tr>
      </template>
    </DataTable>

    <v-dialog
      v-model="isSubpage"
      scrollable
      max-width="1100px"
      persistent
      @click:outside="clickOutsideSubpage"
      @keydown.esc="clickOutsideSubpage"
    >
      <router-view
        ref="subpage"
        :key="$route.path"
      />
    </v-dialog>
  </v-container>
</template>

<script src="./InstancesPage" lang="ts" />

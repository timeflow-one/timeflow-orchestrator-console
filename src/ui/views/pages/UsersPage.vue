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
            class="mr-4"
            max-width="450px"
            :placeholder="$vuetify.lang.t('$vuetify.common.table.label.search_input')"
          />

          <v-select
            v-model="filters.isDeleted"
            :items="isDeletedSelect"
            item-text="title"
            item-value="value"
            solo
            hide-details
            flat
            prepend-inner-icon="mdi-selection-multiple"
            background-color="grey lighten-4"
          />

          <v-spacer class="mx-2" />

          <v-btn
            :text="$vuetify.breakpoint.mdAndUp"
            :icon="!$vuetify.breakpoint.mdAndUp"
            :disabled="isFilteresDefault"
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
          <td class="text-start user-select-none">
            <span>{{ item.id }}</span>
          </td>
          <td class="text-start user-select-none">
            <span>{{ item.name }}</span>
          </td>
          <td class="text-start user-select-none">
            <span>{{ item.email }}</span>
          </td>
          <td class="text-start user-select-none">
            <span>{{ item.instance_name ? item.instance_name : '—' }}</span>
          </td>
          <td class="text-start user-select-none">
            <v-chip
              v-for="(role, index) in item.role.split(',')"
              :key="index"
              class="ma-1"
              color="grey lighten-4"
            >
              {{ $vuetify.lang.t(`$vuetify.timeflow.roles.${role}`) }}
            </v-chip>
          </td>
          <td class="text-center user-select-none">
            <v-simple-checkbox
              v-model="item.status"
              disabled
            />
          </td>
          <td class="text-center user-select-none">
            <v-btn
              color="primary"
              text
              disabled
            >{{ $vuetify.lang.t('$vuetify.pages.users.action.enter') }}</v-btn>
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

<script src="./UsersPage" lang="ts" />

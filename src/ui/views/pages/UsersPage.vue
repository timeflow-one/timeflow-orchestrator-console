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
            class="mr-4"
            max-width="450px"
            :placeholder="$vuetify.lang.t('$vuetify.common.table.label.search_input')"
          />

          <v-select
            v-model="isDeleted"
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
          :class="{'cursor-pointer': true}"
          @click="clickOnRow(item)"
        >
          <td class="text-end user-select-none">
            <span :title="item.id">{{ item.id }}</span>
          </td>
          <td class="text-start user-select-none">
            <span :title="item.name">{{ item.name }}</span>
          </td>
          <td class="text-start user-select-none">
            <span :title="item.email">{{ item.email }}</span>
          </td>
          <td class="text-start user-select-none">
            <span :title="item.instance_name">{{ item.instance_name ? item.instance_name : '—' }}</span>
          </td>
          <td class="text-start user-select-none">
            <v-chip
              class="cursor-pointer ma-1"
              v-for="(role, index) in item.role.split(',')"
              :key="index"
              color="grey lighten-4"
              :title="$vuetify.lang.t(`$vuetify.timeflow.roles.${role}`)"
            >
              {{ $vuetify.lang.t(`$vuetify.timeflow.roles.${role}`) }}
            </v-chip>
          </td>
          <td class="text-center user-select-none">
            <CodeComponent
              :color="item.status ? 'enabled' : 'disabled'"
              background="lighten3"
            >
              {{ $vuetify.lang.t(`$vuetify.common.label.status.${item.status ? 'enabled' : 'disabled'}`) }}
            </CodeComponent>
          </td>
          <td class="text-center user-select-none">
            <v-btn
              color="primary"
              text
              @click.stop="loginAs(item)"
            >{{ $vuetify.lang.t('$vuetify.pages.users.action.enter') }}</v-btn>
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
      <router-view ref="subpage" :key="$route.path" />
    </v-dialog>
  </v-container>
</template>

<script src="./UsersPage" lang="ts" />

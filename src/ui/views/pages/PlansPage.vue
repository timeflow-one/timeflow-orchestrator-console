<template>
  <v-container fluid>
    <DataTable
      ref="table"
      :headers="tableHeaders"
      :items="tableItems"
      :server-items-length="totalItems"
      :loading="loading.table"
      @options="onOptionsChanged"
    >
      <template
        slot="item"
        slot-scope="{ item }"
      >
        <tr
          :class="{'cursor-pointer': true}"
          @click="clickOnRow(item)"
        >
          <td class="text-end user-select-none">
            <span>{{ item.id }}</span>
          </td>
          <td class="text-start user-select-none">
            <span>{{ item.title }}</span>
          </td>
          <td class="text-start user-select-none">
            <CodeComponent>{{ item.code }}</CodeComponent>
          </td>
          <td class="text-end user-select-none">
            <span>{{ item.employees_limit }}</span>
          </td>
          <td class="text-end user-select-none">
            <span :title="item.monthly_fee_text">{{ item.monthly_fee_text }}</span>
          </td>
          <td class="text-center user-select-none">
            <CodeComponent
              :color="item.status ? 'enabled' : 'disabled'"
              background="lighten3"
            >
              {{ $vuetify.lang.t(`$vuetify.common.label.status.${item.status ? 'enabled' : 'disabled'}`) }}
            </CodeComponent>
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

<script src="./PlansPage" lang="ts" />

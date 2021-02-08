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
          class="cursor-pointer"
          :style="{'color': !item.is_active ? 'var(--v-disabled-lighten1)' : ''}"
          @click="clickOnRow(item)"
        >
          <td class="text-end user-select-none">
            <span :title="item.id">{{ item.id }}</span>
          </td>
          <td class="text-start user-select-none">
            <span v-if="item.name && item.name.fullname" :title="item.name.fullname">{{ item.name.fullname }}</span>
            <span v-else>—</span>
          </td>
          <td class="text-start text-no-wrap">
            <span
              v-if="item.email"
              :title="item.email"
            >{{ item.email }}</span>
            <span v-else>—</span>
          </td>
          <td class="text-start text-no-wrap">
            <span
              v-if="item.phone"
              :title="item.phone"
            >{{ item.phone }}</span>
            <span v-else>—</span>
          </td>
          <td class="text-start user-select-none">
            <span
              v-if="item.company_name"
              :title="item.company_name"
            >{{ item.company_name }}</span>
            <span v-else>—</span>
          </td>
          <td class="text-center user-select-none">
            <img
              v-if="item.country"
              :src="`https://www.countryflags.io/${item.country}/flat/24.png`"
              :alt="item.country"
              :title="item.country"
            >
            <span v-else>—</span>
          </td>
          <td class="text-start user-select-none">
            <span :title="item.created_at.toDateString()">{{ item.created_at.toLocaleDateString() }}</span>
          </td>
          <td class="text-start user-select-none">
            <span :title="item.expired_at.toDateString()">{{ item.expired_at.toLocaleDateString() }}</span>
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

<script src="./EnrollmentsPage" lang="ts" />

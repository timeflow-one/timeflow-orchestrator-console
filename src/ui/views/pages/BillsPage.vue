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
          @click="clickOnRow(item)"
        >
          <td class="text-end user-select-none">
            <span :title="item.id">{{ item.id }}</span>
          </td>
          <td class="text-start user-select-none">
            <span :title="item.transaction_no">{{ item.transaction_no }}</span>
          </td>
          <td class="text-start user-select-none">
            <span :title="item.to_pay_on.toLocaleDateString()">{{ item.to_pay_on.toLocaleDateString() }}</span>
          </td>
          <td class="text-start user-select-none">
            <span :title="item.created_at.toLocaleDateString()">{{ item.created_at.toLocaleDateString() }}</span>
          </td>
          <td class="text-start user-select-none">
            <span :title="item.customer.legal_title">{{ item.customer.legal_title }}</span>
          </td>
          <td class="text-start user-select-none">
            <span :title="item.customer.inn">{{ item.customer.inn }}</span>
          </td>
          <td class="text-start user-select-none">
            <span :title="item.customer.kpp">{{ item.customer.kpp }}</span>
          </td>
          <td class="text-start user-select-none">
            <span :title="item.plan.title">{{ item.plan.title }}</span>
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

<script src="./BillsPage" lang="ts" />

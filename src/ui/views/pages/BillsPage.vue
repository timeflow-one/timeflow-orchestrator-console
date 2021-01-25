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
            <span
              v-if="item.transaction_no"
              :title="item.transaction_no"
            >{{ item.transaction_no }}</span>
            <span v-else>—</span>
          </td>
          <td class="text-start user-select-none">
            <span :title="item.to_pay_on.toDateString()">{{ item.to_pay_on.toLocaleDateString() }}</span>
          </td>
          <td class="text-start user-select-none">
            <span :title="item.created_at.toDateString()">{{ item.created_at.toLocaleDateString() }}</span>
          </td>
          <td class="text-start user-select-none">
            <span
              v-if="item.customer.legal_title"
              :title="item.customer.legal_title"
            >{{ item.customer.legal_title }}</span>
            <span v-else>—</span>
          </td>
          <td class="text-start user-select-none">
            <span
              v-if="item.customer.inn"
              :title="item.customer.inn"
            >{{ item.customer.inn }}</span>
            <span v-else>—</span>
          </td>
          <td class="text-start user-select-none">
            <span
              v-if="item.customer.kpp"
              :title="item.customer.kpp"
            >{{ item.customer.kpp }}</span>
            <span v-else>—</span>
          </td>
          <td class="text-start user-select-none">
            <CodeComponent :title="item.plan.title">{{ item.plan.code }}</CodeComponent>
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

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
            <CodeComponent :title="item.plan_title">{{ item.plan_title }}</CodeComponent>
          </td>
          <td class="text-center user-select-none">
            <span v-if="item.paycheck">
              <a
                :href="item.paycheck"
                target="_blank"
              >{{ $vuetify.lang.t('$vuetify.pages.bills.action.paycheck') }}</a>
            </span>
            <span v-else>—</span>
          </td>
          <td class="text-center user-select-none">
            <v-simple-checkbox
              v-model="item.payment_status"
              :title="item.payment_status ? $vuetify.lang.t('$vuetify.pages.bills.status.paid') : $vuetify.lang.t('$vuetify.pages.bills.status.wait_payment')"
              disabled
            />
          </td>
          <td class="text-center user-select-none">
            <v-btn
              v-if="!item.paid_at"
              color="primary"
              text
              :loading="item.loading"
              :title="$vuetify.lang.t('$vuetify.pages.bills.action.confirm_payment')"
              @click.stop="markPaid(item)"
            >{{ $vuetify.lang.t('$vuetify.pages.bills.action.confirm_payment') }}</v-btn>
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

<script src="./BillsPage" lang="ts" />

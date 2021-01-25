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
          :class="{'cursor-pointer': true, 'inactive': !item.is_active}"
          @click="clickOnRow(item)"
        >
          <td class="text-end user-select-none">
            <span>{{ item.id }}</span>
          </td>
          <td class="text-start user-select-none">
            <span>{{ item.instance.name }}</span>
          </td>
          <td class="text-start user-select-none">
            <CodeComponent>
              {{ item.plan.code }}
            </CodeComponent>
          </td>
          <td class="text-start user-select-none">
            <span>{{ item.start_at.toLocaleDateString() }}</span>
          </td>
          <td class="text-start user-select-none">
            <span>{{ item.expired_at.toLocaleDateString() }}</span>
          </td>
          <td class="text-center user-select-none">
            <CodeComponent
              :color="item.is_active ? 'enabled' : 'disabled'"
              background="lighten3"
            >
              {{ $vuetify.lang.t(`$vuetify.common.label.status.${item.is_active ? 'enabled' : 'disabled'}`) }}
            </CodeComponent>
          </td>
          <td class="text-center text-no-wrap">
            <v-btn
              class="me-1"
              color="primary"
              text
              disabled
            >{{ $vuetify.lang.t('$vuetify.pages.licenses.action.prolong') }}</v-btn>
            <v-btn
              color="primary"
              text
              :disabled="!item.can_promise_payment"
              @click.stop="promisePayment(item)"
            >{{ $vuetify.lang.t('$vuetify.pages.licenses.action.promised_payment') }}</v-btn>
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

<script src="./LicensesPage" lang="ts" />

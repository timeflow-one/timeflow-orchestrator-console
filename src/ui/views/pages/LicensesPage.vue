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
          <td class="text-start user-select-none">
            <span>{{ item.id }}</span>
          </td>
          <td class="text-start user-select-none">
            <span>{{ item.instance.name }}</span>
          </td>
          <td class="text-start user-select-none">
            <span>{{ item.plan.name }}</span>
          </td>
          <td class="text-start user-select-none">
            <v-chip
              class="cursor-pointer"
              color="grey lighten-4"
            >{{ item.start_at.toLocaleDateString() }}</v-chip>
          </td>
          <td class="text-start user-select-none">
            <v-chip
              class="cursor-pointer"
              color="grey lighten-4"
            >{{ item.expired_at.toLocaleDateString() }}</v-chip>
          </td>
          <td class="text-center user-select-none">
            <v-simple-checkbox
              v-model="item.is_active"
              disabled
            />
          </td>
          <td class="d-flex align-center">
            <v-btn
              color="primary"
              text
              disabled
            >{{ $vuetify.lang.t('$vuetify.pages.licenses.action.prolong') }}</v-btn>
            <v-btn
              color="primary"
              text
              disabled
            >{{ $vuetify.lang.t('$vuetify.pages.licenses.action.promised_payment') }}</v-btn>
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

<script src="./LicensesPage" lang="ts" />

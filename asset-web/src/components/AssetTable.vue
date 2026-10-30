<script setup lang="ts">
import type { Asset } from '@/types/asset'

defineProps<{ assets: Asset[]; loading: boolean }>()
defineEmits<{
  edit: [asset: Asset]
  remove: [asset: Asset]
}>()

const headers = [
  { title: 'ID', key: 'assetId' },
  { title: 'Nama Aset', key: 'assetName' },
  { title: 'Stok', key: 'stockQuantity' },
  { title: 'Kategori', key: 'category' },
  { title: 'Aksi', key: 'actions', sortable: false, align: 'end' as const },
]
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="assets"
    :loading="loading"
    item-value="assetId"
    no-data-text="Belum ada data"
  >
    <template #item.category="{ item }">
      <v-chip :color="item.category === 'Consumable' ? 'primary' : 'secondary'" size="small">
        {{ item.category }}
      </v-chip>
    </template>

    <template #item.actions="{ item }">
      <v-btn icon="mdi-pencil" size="small" variant="text" @click="$emit('edit', item)" />
      <v-btn
        icon="mdi-delete"
        size="small"
        variant="text"
        color="error"
        @click="$emit('remove', item)"
      />
    </template>
  </v-data-table>
</template>

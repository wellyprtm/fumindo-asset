<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AssetTable from '@/components/AssetTable.vue'
import AssetFormDialog from '@/components/AssetFormDialog.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { useAssets } from '@/composables/useAssets'
import { useNotify } from '@/composables/useNotify'
import type { Asset, AssetPayload } from '@/types/asset'

const { assets, loading, fetchAssets, saveAsset, removeAsset } = useAssets()
const { state: notif } = useNotify()

const formOpen = ref(false)
const confirmOpen = ref(false)
const selected = ref<Asset | null>(null)

const confirmMessage = computed(() => `Hapus aset "${selected.value?.assetName}"?`)

function openCreate() {
  selected.value = null
  formOpen.value = true
}

function openEdit(asset: Asset) {
  selected.value = asset
  formOpen.value = true
}

function askRemove(asset: Asset) {
  selected.value = asset
  confirmOpen.value = true
}

async function handleSubmit(payload: AssetPayload) {
  const ok = await saveAsset(payload, selected.value?.assetId)
  if (ok) formOpen.value = false
}

async function handleConfirmRemove() {
  if (!selected.value) return
  const ok = await removeAsset(selected.value.assetId)
  if (ok) confirmOpen.value = false
}

onMounted(fetchAssets)
</script>

<template>
  <v-app theme="light">
    <v-app-bar color="primary" title="Manajemen Aset" />

    <v-main>
      <v-container>
        <v-card>
          <v-card-title class="d-flex align-center">
            Daftar Aset
            <v-spacer />
            <v-btn color="primary" prepend-icon="mdi-plus" @click="openCreate">
              Tambah Aset
            </v-btn>
          </v-card-title>

          <AssetTable
            :assets="assets"
            :loading="loading"
            @edit="openEdit"
            @remove="askRemove"
          />
        </v-card>
      </v-container>
    </v-main>

    <AssetFormDialog
      v-model="formOpen"
      :asset="selected"
      :loading="loading"
      @submit="handleSubmit"
    />
    <ConfirmDialog
      v-model="confirmOpen"
      :message="confirmMessage"
      :loading="loading"
      @confirm="handleConfirmRemove"
    />

    <v-snackbar v-model="notif.show" :color="notif.type" location="top right" :timeout="3000">
      {{ notif.message }}
      <template #actions>
        <v-btn variant="text" @click="notif.show = false">Tutup</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

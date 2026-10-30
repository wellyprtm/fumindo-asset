<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import type { VForm } from 'vuetify/components'
import { ASSET_CATEGORIES, type Asset, type AssetPayload } from '@/types/asset'

const props = defineProps<{ asset: Asset | null; loading: boolean }>()
const emit = defineEmits<{ submit: [payload: AssetPayload] }>()
const open = defineModel<boolean>({ required: true })

const formRef = ref<InstanceType<typeof VForm> | null>(null)
const isEdit = computed(() => props.asset !== null)

const emptyForm = (): AssetPayload => ({
  assetName: '',
  stockQuantity: 0,
  category: 'Consumable',
})
const form = reactive<AssetPayload>(emptyForm())

// Aturan validasi: return true jika valid, atau string berisi pesan error.
const rules = {
  required: (v: unknown) => (v !== null && v !== undefined && v !== '') || 'Wajib diisi',
  maxLength: (max: number) => (v: string) =>
    (v?.length ?? 0) <= max || `Maksimal ${max} karakter`,
  nonNegativeInt: (v: number) =>
    (Number.isInteger(v) && v >= 0) || 'Harus bilangan bulat, minimal 0',
}

// Setiap dialog dibuka: isi form (mode edit) atau kosongkan (mode tambah).
watch(open, (isOpen) => {
  if (!isOpen) return
  Object.assign(
    form,
    props.asset
      ? {
          assetName: props.asset.assetName,
          stockQuantity: props.asset.stockQuantity,
          category: props.asset.category,
        }
      : emptyForm(),
  )
  formRef.value?.resetValidation()
})

async function onSubmit() {
  const { valid } = await formRef.value!.validate()
  if (valid) emit('submit', { ...form })
}
</script>

<template>
  <v-dialog v-model="open" max-width="500" persistent>
    <v-card :title="isEdit ? 'Edit Aset' : 'Tambah Aset'">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="onSubmit">
          <v-text-field
            v-model.trim="form.assetName"
            label="Nama Aset"
            counter="150"
            :rules="[rules.required, rules.maxLength(150)]"
          />
          <v-text-field
            v-model.number="form.stockQuantity"
            label="Stok"
            type="number"
            :rules="[rules.required, rules.nonNegativeInt]"
          />
          <v-select
            v-model="form.category"
            label="Kategori"
            :items="ASSET_CATEGORIES"
            :rules="[rules.required]"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="open = false">Batal</v-btn>
        <v-btn color="primary" variant="flat" :loading="loading" @click="onSubmit">
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

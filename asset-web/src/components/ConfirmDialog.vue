<script setup lang="ts">
const open = defineModel<boolean>({ required: true })
defineProps<{ message: string; loading: boolean }>()
defineEmits<{ confirm: [] }>()
</script>

<template>
  <v-dialog v-model="open" max-width="400">
    <v-card title="Konfirmasi">
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="open = false">Batal</v-btn>
        <v-btn color="error" variant="flat" :loading="loading" @click="$emit('confirm')">
          Hapus
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

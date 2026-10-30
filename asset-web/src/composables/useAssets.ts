import { ref } from 'vue'
import axios from 'axios'
import { assetApi } from '@/api/asset.api'
import { useNotify } from './useNotify'
import type { Asset, AssetPayload } from '@/types/asset'

// NestJS mengembalikan `message` berupa array saat validasi gagal.
function getErrorMessage(e: unknown): string {
  if (axios.isAxiosError(e)) {
    const msg = e.response?.data?.message
    return Array.isArray(msg) ? msg.join(', ') : (msg ?? e.message)
  }
  return 'Terjadi kesalahan'
}

export function useAssets() {
  const { success, error } = useNotify()
  const assets = ref<Asset[]>([])
  const loading = ref(false)

  // Satu tempat untuk loading, error handling, dan pesan sukses.
  async function run(
    action: () => Promise<void>,
    successMessage?: string,
  ): Promise<boolean> {
    loading.value = true
    try {
      await action()
      if (successMessage) success(successMessage)
      return true
    } catch (e) {
      error(getErrorMessage(e))
      return false
    } finally {
      loading.value = false
    }
  }

  const fetchAssets = () =>
    run(async () => {
      assets.value = await assetApi.getAll()
    })

  async function saveAsset(payload: AssetPayload, id?: number): Promise<boolean> {
    const ok = await run(
      async () => {
        if (id) await assetApi.update(id, payload)
        else await assetApi.create(payload)
      },
      id ? 'Aset berhasil diperbarui' : 'Aset berhasil ditambahkan',
    )
    if (ok) await fetchAssets()
    return ok
  }

  async function removeAsset(id: number): Promise<boolean> {
    const ok = await run(async () => {
      await assetApi.remove(id)
    }, 'Aset berhasil dihapus')
    if (ok) await fetchAssets()
    return ok
  }

  return { assets, loading, fetchAssets, saveAsset, removeAsset }
}
import type { Asset, AssetPayload } from "@/types/asset";
import { http } from "./http";

export const assetApi = {
    getAll: () => http.get<Asset[]>('/assets').then((res) => res.data),
    create: (payload: AssetPayload) => http.post<Asset>('/assets', payload).then((res) => res.data),
    update: (id: number, payload: AssetPayload) => http.put<Asset>(`/assets/${id}`, payload).then((res) => res.data),
    remove: (id: number) => http.delete(`/assets/${id}`)
}
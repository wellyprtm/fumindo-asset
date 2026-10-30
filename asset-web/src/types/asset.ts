export type AssetCategory = 'Consumable' | 'Non-Consumable'
export const ASSET_CATEGORIES: AssetCategory[] = ['Consumable', 'Non-Consumable']

export interface Asset {
    assetId: number,
    assetName: string,
    stockQuantity: number,
    category: AssetCategory
}

export type AssetPayload = Omit<Asset, 'assetId'>
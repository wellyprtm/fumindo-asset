export type AssetChanges = Partial<
    Pick<Asset, 'assetName' | 'stockQuantity' | 'category'>
>;

import { AssetCategory } from "./asset-category.enum.js";

export class Asset {
    constructor(
        public readonly assetId: number | null,
        public assetName: string,
        public stockQuantity: number,
        public category: AssetCategory
    ) {}

    update(changes: AssetChanges): void {
        if (changes.assetName !== undefined) this.assetName = changes.assetName;
        if (changes.stockQuantity !== undefined) this.stockQuantity = changes.stockQuantity;
        if (changes.category !== undefined) this.category = changes.category;
    }

}
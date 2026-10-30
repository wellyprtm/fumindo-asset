import { Asset } from "../domain/asset.js";
import { AssetEntity } from "./asset.entity.js";

export class AssetMapper {
    static toDomain(entity: AssetEntity): Asset {
        return new Asset(entity.assetId, entity.assetName, entity.stockQuantity, entity.category);
    }

    static toEntity(asset: Asset): AssetEntity {
        const entity = new AssetEntity();
        if (asset.assetId !== null) entity.assetId = asset.assetId;
        entity.assetName = asset.assetName
        entity.stockQuantity = asset.stockQuantity
        entity.category = asset.category;
        return entity;
    }
}
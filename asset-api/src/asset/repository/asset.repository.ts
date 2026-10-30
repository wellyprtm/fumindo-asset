import { Asset } from "../domain/asset.js";

export abstract class AssetRepository {
    abstract findAll(): Promise<Asset[]>;
    abstract findById(id: number): Promise<Asset | null>;
    abstract save(asset: Asset): Promise<Asset>;
    abstract delete(id: number): Promise<void>;
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AssetCategory } from "../domain/asset-category.enum.js";

@Entity('asset')
export class AssetEntity {
    @PrimaryGeneratedColumn({name: 'asset_id'})
    assetId: number;

    @Column({name: 'asset_name', type: 'varchar', length: 150})
    assetName: string;

    @Column({name: 'stock_quantity', type: 'int'})
    stockQuantity: number;

    @Column({type: 'varchar', length: 20})
    category: AssetCategory;
}
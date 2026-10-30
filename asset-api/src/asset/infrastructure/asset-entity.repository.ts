import { Injectable } from "@nestjs/common";
import { AssetRepository } from "../repository/asset.repository.js";
import { InjectRepository } from "@nestjs/typeorm";
import { AssetEntity } from "./asset.entity.js";
import { Repository } from "typeorm";
import { Asset } from "../domain/asset.js";
import { AssetMapper } from "./asset.mapper.js";

@Injectable()
export class AssetEntityRepository extends AssetRepository {
    constructor(
        @InjectRepository(AssetEntity)
        private readonly repo: Repository<AssetEntity>,
    ) {
        super();
    }

    async findAll(): Promise<Asset[]> {
        const rows = await this.repo.find({order: {assetId: 'ASC'}});
        return rows.map((row) => AssetMapper.toDomain(row));
    }

    async findById(id: number): Promise<Asset | null> {
        const row = await this.repo.findOneBy({assetId: id});
        return row ? AssetMapper.toDomain(row) : null;
    }

    async delete(id: number): Promise<void> {
        await this.repo.delete(id);
    }

    async save(asset: Asset): Promise<Asset> {
        const saved = await this.repo.save(AssetMapper.toEntity(asset));
        return AssetMapper.toDomain(saved);
    }
}

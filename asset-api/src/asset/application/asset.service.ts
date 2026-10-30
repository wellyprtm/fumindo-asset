import { Injectable, NotFoundException } from "@nestjs/common";
import { AssetRepository } from "../repository/asset.repository.js";
import { Asset } from "../domain/asset.js";
import { CreateAssetDto } from "./dto/create-asset.dto.js";
import { UpdateAssetDto } from "./dto/update-asset.dto.js";

@Injectable()
export class AssetService {

    constructor(private readonly assetRepository: AssetRepository) {}

    findAll(): Promise<Asset[]> {
        return this.assetRepository.findAll();
    }

    async findOne(id: number): Promise<Asset> {
        const asset = await this.assetRepository.findById(id);
        if (!asset) throw new NotFoundException(`Asset dengan id ${id} tidak ditemukan`);
        return asset;
    }

    create(dto: CreateAssetDto): Promise<Asset> {
        const asset = new Asset(null, dto.assetName, dto.stockQuantity, dto.category);
        return this.assetRepository.save(asset);
    }

    async update(id: number, dto: UpdateAssetDto): Promise<Asset> {
        const asset = await this.findOne(id);
        asset.update(dto);
        return this.assetRepository.save(asset);
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.assetRepository.delete(id);
    }

}
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AssetEntity } from "./infrastructure/asset.entity.js";
import { AssetController } from "./controller/asset.controller.js";
import { AssetService } from "./application/asset.service.js";
import { AssetRepository } from "./repository/asset.repository.js";
import { AssetEntityRepository } from "./infrastructure/asset-entity.repository.js";

@Module({
    imports: [TypeOrmModule.forFeature([AssetEntity])],
    controllers: [AssetController],
    providers: [
        AssetService, 
        {provide: AssetRepository, useClass: AssetEntityRepository}
    ]
})
export class AssetModule{}
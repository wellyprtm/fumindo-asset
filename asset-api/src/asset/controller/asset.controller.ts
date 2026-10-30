import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { AssetService } from "../application/asset.service.js";
import { CreateAssetDto } from "../application/dto/create-asset.dto.js";
import { UpdateAssetDto } from "../application/dto/update-asset.dto.js";

@Controller('assets')
export class AssetController {

    constructor(
        private readonly assetService: AssetService
    ) {}

    @Get()
    findAll() {
        return this.assetService.findAll();
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.assetService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateAssetDto) {
        return this.assetService.create(dto);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAssetDto) {
        return this.assetService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.assetService.remove(id);
    }
}

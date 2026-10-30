import {
    IsString,
    IsInt,
    IsNotEmpty,
    IsEnum,
    MaxLength,
    Min
} from 'class-validator';
import { AssetCategory } from '../../domain/asset-category.enum.js';

export class CreateAssetDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    assetName: string;

    @IsInt()
    @Min(0)
    stockQuantity: number;

    @IsEnum(AssetCategory)
    category: AssetCategory;
}
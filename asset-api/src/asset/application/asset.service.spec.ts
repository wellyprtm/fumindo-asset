import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NotFoundException } from '@nestjs/common'
import { Asset } from '../domain/asset.js'
import { AssetCategory } from '../domain/asset-category.enum.js'
import { AssetRepository } from '../repository/asset.repository.js'
import { AssetService } from './asset.service.js'

describe('AssetService', () => {
  let service: AssetService
  let repo: {
    findAll: ReturnType<typeof vi.fn>
    findById: ReturnType<typeof vi.fn>
    save: ReturnType<typeof vi.fn>
    delete: ReturnType<typeof vi.fn>
  }

  beforeEach(() => {
    repo = {
      findAll: vi.fn(),
      findById: vi.fn(),
      save: vi.fn(),
      delete: vi.fn(),
    }
    service = new AssetService(repo as unknown as AssetRepository)
  })

  it('melempar NotFoundException jika asset tidak ditemukan', async () => {
    repo.findById.mockResolvedValue(null)
    await expect(service.findOne(99)).rejects.toThrow(NotFoundException)
  })

  it('menyimpan asset baru lewat repository', async () => {
    const saved = new Asset(1, 'Kertas A4', 100, AssetCategory.CONSUMABLE)
    repo.save.mockResolvedValue(saved)

    const result = await service.create({
      assetName: 'Kertas A4',
      stockQuantity: 100,
      category: AssetCategory.CONSUMABLE,
    })

    expect(repo.save).toHaveBeenCalledTimes(1)
    expect(result).toBe(saved)
  })

  it('hanya mengubah field yang dikirim saat update', async () => {
    const existing = new Asset(1, 'Laptop', 5, AssetCategory.NON_CONSUMABLE)
    repo.findById.mockResolvedValue(existing)
    repo.save.mockImplementation((a: Asset) => Promise.resolve(a))

    const result = await service.update(1, { stockQuantity: 10 })

    expect(result.stockQuantity).toBe(10)
    expect(result.assetName).toBe('Laptop')
  })
})

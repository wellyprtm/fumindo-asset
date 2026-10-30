# Manajemen Aset - Fumindo

Aplikasi CRUD **Asset** sederhana dengan arsitektur bersih (*Clean Architecture*), memisahkan layer presentasi, use case, domain, dan infrastruktur.

| Layer | Teknologi | Port |
|---|---|---|
| Database | PostgreSQL (`asset_fumindo`) | 5432 |
| Backend | NestJS + TypeORM + TypeScript | 3000 |
| Frontend | Vue 3 + Vuetify 4 + TypeScript + Vite | 5173 |

---

## 1. Persiapan Database

1. Pastikan PostgreSQL telah berjalan pada `localhost:5432`.
2. Jalankan script inisialisasi yang tersedia di folder `database/init.sql`:

```powershell
# Menggunakan psql lokal:
psql -U postgres -h localhost -f database\init.sql

# Atau jika menggunakan Docker:
Get-Content database\init.sql | docker exec -i pg-asset psql -U postgres
```

Database `asset_fumindo` dan tabel `asset` beserta data awal akan dibuat.

---

## 2. Menjalankan Backend (`asset-api`)

1. Pindah ke direktori `asset-api`:
   ```bash
   cd asset-api
   ```
2. Buat file `.env` berdasarkan `.env.example`:
   ```env
   PORT=3000
   CORS_ORIGIN=http://localhost:5173
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_NAME=asset_fumindo
   ```
3. Install dependencies (jika belum):
   ```bash
   npm install
   ```
4. Jalankan backend dalam mode pengembangan:
   ```bash
   npm run start:dev
   ```
5. Untuk menjalankan unit test:
   ```bash
   npm run test
   ```

---

## 3. Menjalankan Frontend (`asset-web`)

1. Pindah ke direktori `asset-web`:
   ```bash
   cd asset-web
   ```
2. Buat file `.env` dari `.env.example`:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
3. Install dependencies (jika belum):
   ```bash
   npm install
   ```
4. Jalankan aplikasi web:
   ```bash
   npm run dev
   ```
5. Buka browser di [http://localhost:5173](http://localhost:5173).

---

## 4. Daftar Endpoint REST API

Base URL: `http://localhost:3000`

| Method | Endpoint | Deskripsi | Body Request | Status Sukses |
|---|---|---|---|---|
| GET | `/assets` | Mengambil seluruh aset | - | `200 OK` |
| GET | `/assets/:id` | Mengambil detail aset berdasarkan ID | - | `200 OK` |
| POST | `/assets` | Menambahkan aset baru | `{ "assetName": string, "stockQuantity": number, "category": "Consumable" \| "Non-Consumable" }` | `201 Created` |
| PUT | `/assets/:id` | Memperbarui aset | Partial field dari POST | `200 OK` |
| DELETE | `/assets/:id` | Menghapus aset | - | `204 No Content` |

File pengujian request REST Client tersedia di `asset-api/requests.http`.

---

## 5. Struktur Arsitektur & Pattern

### Backend (`asset-api`)
Menerapkan **Clean Architecture** dengan aturan dependensi mengarah ke dalam (*Domain*):
- **Domain**: Entitas bisnis murni (`Asset`), enum (`AssetCategory`), dan kontrak repositori (`AssetRepository`). Tidak memiliki dependensi ke framework maupun database.
- **Application**: Berisi logika aplikasi dan use case (`AssetService`) serta Data Transfer Objects (`CreateAssetDto`, `UpdateAssetDto`).
- **Infrastructure**: Implementasi spesifik detail teknis ORM (`AssetEntity`, `AssetMapper`, dan `AssetEntityRepository`).
- **Presentation**: Layer HTTP Controller (`AssetController`) yang menerima request dan mendelegasikannya ke service.

**Design Patterns yang digunakan:**
- **Repository Pattern & Dependency Inversion**: Logika bisnis bergantung pada abstraksi `AssetRepository`, bukan implementasi TypeORM langsung.
- **DTO (Data Transfer Object)**: Validasi dan parsing input sebelum mencapai domain layer.
- **Mapper Pattern**: Memetakan entitas database ORM ke domain model agar struktur basis data tidak bocor ke domain layer.
- **Rich Domain Model**: Perubahan state dienkapsulasi langsung di dalam model domain `Asset`.

### Frontend (`asset-web`)
- **API Layer (`src/api`)**: Seluruh interaksi HTTP dengan backend dipusatkan di `asset.api.ts` sehingga komponen tidak memanggil axios langsung.
- **Composables (`src/composables`)**: State management dan interaksi asinkron dipisahkan dari template tampilan menggunakan Vue 3 Composables (`useAssets`, `useNotify`).
- **Container / Presentational Components**: `App.vue` bertindak sebagai container yang mengatur data flow, sementara `AssetTable`, `AssetFormDialog`, dan `ConfirmDialog` berfokus pada penyajian tampilan dan emisi event interaksi.

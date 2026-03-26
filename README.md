# Open Music API v3

Backend API berbasis **Node.js + Express + TypeScript** untuk manajemen lagu, album, playlist, kolaborasi playlist, autentikasi JWT, upload cover album, cache Redis, serta export playlist asynchronous melalui RabbitMQ dan worker consumer.

Dokumentasi ini disusun berdasarkan struktur source code proyek yang Anda lampirkan, dan juga repo GitHub `dianerdiana-learning/open-music-api` yang saat ini berisi branch `main` dengan implementasi TypeScript dan 29 commit. citeturn881696view0

## Ringkasan Proyek

Dalam file yang Anda lampirkan terdapat **2 aplikasi**:

1. **`open-music-api-v3`** → aplikasi utama REST API
2. **`open-music-api-consumer`** → worker/consumer untuk memproses export playlist via RabbitMQ dan mengirim hasilnya lewat email

Secara operasional, keduanya biasanya dijalankan bersamaan jika Anda ingin memakai fitur **export playlist**.

## Fitur Utama

### API utama

- CRUD lagu
- CRUD album
- Upload cover album
- Registrasi user
- Login, refresh token, logout
- CRUD playlist milik user
- Tambah/hapus lagu pada playlist
- Aktivitas playlist
- Kolaborasi playlist
- Like/unlike album
- Hitung jumlah like album
- Cache Redis untuk beberapa data user/like
- Export playlist ke email melalui message queue

### Consumer

- Mengonsumsi message dari RabbitMQ
- Mengambil data playlist dan lagu dari database
- Mengirim file `playlist-song.json` ke email tujuan menggunakan SMTP/Nodemailer

## Stack yang Digunakan

### API

- Node.js
- Express 5
- TypeScript
- PostgreSQL
- `node-pg-migrate`
- JWT (`jsonwebtoken`)
- Joi validation
- Multer (upload file)
- Redis
- RabbitMQ

### Consumer

- Node.js
- TypeScript
- PostgreSQL
- RabbitMQ
- Nodemailer

## Struktur Folder Utama

```bash
open-music-api-v3/
├── migrations/
├── src/
│   ├── configs/
│   ├── middlewares/
│   ├── modules/
│   │   ├── album/
│   │   ├── auth/
│   │   ├── collaboration/
│   │   ├── export/
│   │   ├── playlist/
│   │   ├── song/
│   │   └── user/
│   └── server.ts
├── .env.example
├── package.json
└── tsconfig.json

open-music-api-consumer/
├── src/
│   ├── configs/
│   ├── modules/
│   ├── workers/
│   └── consumer.ts
├── .env.example
├── package.json
└── tsconfig.json
```

## Prasyarat

Sebelum menjalankan proyek, pastikan environment Anda memiliki:

- **Node.js** 18+ (disarankan 20+)
- **npm**
- **PostgreSQL**
- **RabbitMQ**
- **Redis**
- akun SMTP/email untuk pengiriman hasil export playlist

## Instalasi

Karena proyek ini terdiri dari 2 aplikasi, install dependency di masing-masing folder.

### 1) API utama

```bash
cd open-music-api-v3
npm install
```

### 2) Consumer

```bash
cd ../open-music-api-consumer
npm install
```

## Konfigurasi Environment

### A. API utama (`open-music-api-v3/.env`)

Buat file `.env` dengan mengacu pada `.env.example`:

```env
HOST=localhost
PORT=5000

PGUSER=postgres
PGPASSWORD=postgres
PGDATABASE=dcd_open_music
PGHOST=localhost
PGPORT=5432

ACCESS_TOKEN_KEY=your_access_token_secret
REFRESH_TOKEN_KEY=your_refresh_token_secret

RABBITMQ_SERVER=amqp://localhost
REDIS_SERVER=localhost

BASE_URL=http://localhost:5000
```

### Keterangan variabel API

- `HOST` : host aplikasi
- `PORT` : port API
- `PGUSER`, `PGPASSWORD`, `PGDATABASE`, `PGHOST`, `PGPORT` : koneksi PostgreSQL
- `ACCESS_TOKEN_KEY` : secret JWT access token
- `REFRESH_TOKEN_KEY` : secret JWT refresh token
- `RABBITMQ_SERVER` : URL koneksi RabbitMQ
- `REDIS_SERVER` : host Redis
- `BASE_URL` : base URL aplikasi, dipakai untuk membentuk URL file cover

### B. Consumer (`open-music-api-consumer/.env`)

```env
HOST=localhost
PORT=5001

PGUSER=postgres
PGPASSWORD=postgres
PGDATABASE=dcd_open_music
PGHOST=localhost
PGPORT=5432

RABBITMQ_SERVER=amqp://localhost

SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-email-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

BASE_URL=http://localhost:5000
```

### Keterangan variabel consumer

- `PG*` : koneksi ke database yang sama dengan API
- `RABBITMQ_SERVER` : URL koneksi RabbitMQ
- `SMTP_USER` : email pengirim
- `SMTP_PASSWORD` : password/app password email
- `SMTP_HOST` : host SMTP
- `SMTP_PORT` : port SMTP

## Database Migration

Jalankan migration dari folder API utama:

```bash
cd open-music-api-v3
npm run migrate
```

Perintah ini akan membuat tabel-tabel yang dibutuhkan, termasuk:

- albums
- songs
- users
- playlists
- playlist_songs
- playlist_song_activities
- collaborations
- authentications
- user_album_likes

Jika ingin membuat migration baru:

```bash
npm run migrate:create nama-migration
```

Jika ingin rollback migration terakhir:

```bash
npm run migrate:down
```

## Cara Menjalankan Proyek

### Mode development

#### Jalankan API

```bash
cd open-music-api-v3
npm run dev
```

#### Jalankan Consumer

```bash
cd open-music-api-consumer
npm run dev
```

### Mode production

#### Build API

```bash
cd open-music-api-v3
npm run build
npm start
```

#### Build Consumer

```bash
cd open-music-api-consumer
npm run build
npm start
```

## Urutan Menjalankan yang Disarankan

Agar semua fitur berjalan normal, urutan yang aman adalah:

1. Jalankan PostgreSQL
2. Jalankan RabbitMQ
3. Jalankan Redis
4. Jalankan migration database
5. Jalankan `open-music-api-v3`
6. Jalankan `open-music-api-consumer`

Jika consumer tidak dijalankan, fitur **export playlist ke email** tidak akan diproses walaupun endpoint API tetap menerima request.

## Script Penting

### API (`open-music-api-v3/package.json`)

```bash
npm run dev         # Menjalankan API dalam mode development
npm run build       # Compile TypeScript + rapikan path alias
npm start           # Menjalankan hasil build dari dist/server.js
npm run lint        # Cek lint
npm run lint:fix    # Perbaiki lint otomatis
npm run migrate     # Jalankan migration up
npm run migrate:down
npm run migrate:create
```

### Consumer (`open-music-api-consumer/package.json`)

```bash
npm run dev         # Menjalankan consumer dalam mode development
npm run build       # Compile TypeScript
npm start           # Menjalankan hasil build dari dist/consumer.js
npm run lint
npm run lint:fix
```

## Endpoint Utama

Berikut ringkasan endpoint yang terlihat dari konfigurasi route.

### Albums

- `POST /albums`
- `GET /albums/:id`
- `PUT /albums/:id`
- `DELETE /albums/:id`
- `POST /albums/:id/covers`
- `POST /albums/:id/likes` _(butuh Bearer token)_
- `DELETE /albums/:id/likes` _(butuh Bearer token)_
- `GET /albums/:id/likes`

### Songs

- `GET /songs`
- `POST /songs`
- `GET /songs/:id`
- `PUT /songs/:id`
- `DELETE /songs/:id`

### Users

- `POST /users`

### Authentications

- `POST /authentications`
- `PUT /authentications`
- `DELETE /authentications`

### Playlists

- `POST /playlists` _(butuh Bearer token)_
- `GET /playlists` _(butuh Bearer token)_
- `DELETE /playlists/:id` _(butuh Bearer token)_
- `POST /playlists/:id/songs` _(butuh Bearer token)_
- `GET /playlists/:id/songs` _(butuh Bearer token)_
- `DELETE /playlists/:id/songs` _(butuh Bearer token)_
- `GET /playlists/:id/activities` _(butuh Bearer token)_

### Collaborations

- `POST /collaborations` _(butuh Bearer token)_
- `DELETE /collaborations` _(butuh Bearer token)_

### Export

- `POST /export/playlists/:playlistId` _(butuh Bearer token)_

## Contoh Alur Menjalankan Fitur Dasar

### 1. Registrasi user

Endpoint:

```http
POST /users
```

Body:

```json
{
  "username": "dian",
  "password": "rahasia123",
  "fullname": "Dian Erdiana"
}
```

### 2. Login

Endpoint:

```http
POST /authentications
```

Body:

```json
{
  "username": "dian",
  "password": "rahasia123"
}
```

Simpan `accessToken` untuk request yang memerlukan autentikasi.

### 3. Buat playlist

Endpoint:

```http
POST /playlists
Authorization: Bearer <accessToken>
```

### 4. Export playlist ke email

Endpoint:

```http
POST /export/playlists/:playlistId
Authorization: Bearer <accessToken>
```

Body:

```json
{
  "targetEmail": "tujuan@email.com"
}
```

Setelah request masuk:

- API akan mengirim message ke RabbitMQ
- Consumer akan membaca message tersebut
- Consumer akan mengambil data playlist dari database
- Consumer akan mengirim file JSON ke email tujuan

## Detail Implementasi Penting

### 1. Static file untuk cover album

Aplikasi men-serve folder upload sebagai static file dari server Express. File cover yang diunggah akan disimpan di folder `uploads` dan dapat diakses lewat URL publik.

### 2. JWT authentication

Middleware `authenticateToken` membaca header:

```http
Authorization: Bearer <token>
```

Lalu memverifikasi access token dan memuat data user.

### 3. Redis caching

Redis dipakai untuk cache data tertentu, misalnya data user yang sudah lolos autentikasi dan jumlah like album.

### 4. RabbitMQ untuk proses asynchronous

Fitur export playlist tidak dikerjakan langsung oleh request API. API hanya mengirim pesan ke queue, lalu consumer memprosesnya di background.

### 5. Email export

Consumer mengirim email dengan attachment `playlist-song.json` menggunakan Nodemailer dan konfigurasi SMTP dari `.env`.

## Troubleshooting

### 1. Gagal konek RabbitMQ

Pastikan `RABBITMQ_SERVER` memakai **AMQP URI**, misalnya:

```env
RABBITMQ_SERVER=amqp://localhost
```

Bukan URL dashboard management seperti `http://localhost:15672`, karena library `amqplib` membutuhkan URI AMQP.

### 2. Gagal konek Redis

Pastikan service Redis aktif dan nilai `REDIS_SERVER` sesuai dengan cara konfigurasi client di proyek ini. Jika terjadi error koneksi, cek kembali host/port Redis yang Anda pakai pada environment lokal.

### 3. Email tidak terkirim

Periksa:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- kebijakan provider email, misalnya kebutuhan app password pada Gmail

### 4. Migration gagal

Periksa credential PostgreSQL:

- database sudah dibuat
- user/password benar
- port benar
- service PostgreSQL aktif

### 5. Endpoint export berhasil dipanggil tapi email tidak masuk

Biasanya penyebabnya salah satu dari berikut:

- consumer belum dijalankan
- RabbitMQ belum aktif
- SMTP salah konfigurasi
- playlist tidak ditemukan atau bukan milik user yang login

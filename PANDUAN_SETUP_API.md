# PANDUAN PENGATURAN API & BACKEND (BAHASA INDONESIA)

Ikuti langkah-langkah ini untuk menghubungkan sistem Anda agar bisa berjalan otomatis.

---

## 1. PENGATURAN API WHATSAPP (Fonnte)
Untuk mengirim kode voucher ke WA pembeli secara otomatis.

1.  Daftar di [Fonnte.com](https://fonnte.com).
2.  Login dan scan QR Code WhatsApp Anda.
3.  Pergi ke menu **API** dan salin **TOKEN** Anda.
4.  Buka file `.env` di folder `vps_backend`.
5.  Isi bagian:
    ```
    FONNTE_TOKEN=isi_token_anda_disini
    ```

---

## 2. PENGATURAN MIKROTIK
Agar backend bisa membuat user/voucher di MikroTik Anda.

1.  Buka **Winbox** -> Menu **IP** -> **Services**.
2.  Pastikan service **api** aktif (biasanya port 8728).
3.  Buat user khusus untuk API (Optional tapi disarankan):
    *   Menu **System** -> **Users**.
    *   Buat user baru, misal: `api_user`.
    *   Group: `full` (atau custom dengan izin read+write hotspot).
4.  Buka file `.env` di folder `vps_backend`.
5.  Isi bagian:
    ```
    MIKROTIK_HOST=ip_public_atau_vpn_mikrotik_anda
    MIKROTIK_PORT=8728
    MIKROTIK_USER=api_user
    MIKROTIK_PASS=password_anda
    ```
    *Catatan: Jika MikroTik Anda ada di jaringan lokal dan VPS ada di cloud, Anda perlu menggunakan VPN/Tunnel agar VPS bisa akses MikroTik.*

---

## 3. UPLOAD BACKEND KE VPS

1.  Download folder `vps_backend`.
2.  Upload ke VPS Anda (bisa pakai FileZilla/WinSCP).
3.  Masuk ke terminal VPS, lalu masuk ke folder tersebut:
    ```bash
    cd vps_backend
    npm install
    ```
4.  Jalankan server:
    ```bash
    npm install -g pm2
    pm2 start server.js --name fiberasinet
    pm2 save
    ```

## 4. INTEGRASI TRIPAY (Pembayaran)

1.  Daftar di [Tripay.co.id](https://tripay.co.id).
2.  Masuk mode **Merchant**.
3.  Ambil **API Key**, **Private Key**, dan **Merchant Code**.
4.  Isi di file `.env` di VPS.

---

## 5. FORMAT PENDAFTARAN WIFI RUMAHAN (Manual WA)

Di tampilan "Pasang WiFi di Rumah", tombol akan otomatis membuka WhatsApp Admin dengan pesan:
> "Halo Admin, saya berminat pasang WiFi rumahan. Mohon info lebih lanjut."

Anda tinggal membalas chat tersebut untuk meminta data:
1.  Nama Lengkap
2.  Alamat Pemasangan
3.  Share Lokasi (Maps)

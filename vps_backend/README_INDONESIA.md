# VPS Backend for Fiberasinet

Ini adalah folder yang harus Anda upload ke VPS Anda.

## Cara Upload dan Install

1.  **Download Folder**: Download folder `vps_backend` ini ke komputer Anda.
2.  **Upload ke VPS**: Gunakan WinSCP atau FileZilla untuk upload folder ini ke VPS (contoh ke folder `/root/fiberasinet-backend` atau `/var/www/fiberasinet-backend`).
3.  **Install Node.js**: Pastikan VPS sudah terinstall Node.js.
    ```bash
    # Contoh install di Ubuntu
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```
4.  **Install Dependencies**:
    ```bash
    cd fiberasinet-backend
    npm install
    ```
5.  **Edit Konfigurasi**:
    Rename `.env.example` menjadi `.env` dan isi datanya.
    ```bash
    cp .env.example .env
    nano .env
    ```
    Isi API Key Tripay, Fonnte, dan akses MikroTik Anda.
6.  **Jalankan Server**:
    ```bash
    npm install -g pm2
    pm2 start server.js --name fiberasinet
    pm2 save
    ```

## Struktur File
- `server.js`: File utama server
- `src/routes/`: Rute API untuk pembayaran
- `src/services/`: Logika koneksi ke Tripay, WhatsApp, dan MikroTik

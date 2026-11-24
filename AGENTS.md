# AGENTS.md - SOP Kantor AI MINI

## Aturan Pelaporan ke Kantor MINI (WAJIB)
Setiap kali kamu mulai bekerja atau selesai bekerja, perbarui file `public/output/status.json` sesuai nama agenmu (`rama`, `amira`, atau `atha`):
- Saat mulai bekerja: ubah `"status": "working"` dan isi `"bubble"` dengan ringkasan singkat aktivitasmu (maksimal 60 karakter).
- Saat selesai bekerja: ubah `"status": "done"` dan isi `"bubble"` dengan laporan selesai (contoh: `"Riset beres! Tersimpan di riset.md"`).

## Alur Kerja Tim
1. **Rama (`rama`)**: Melakukan riset topik, menulis hasil ke `public/output/riset.md`.
2. **Amira (`amira`)**: Membaca `public/output/riset.md`, menulis skrip konten ke `public/output/naskah.md`.
3. **Atha (`atha`)**: Membaca `public/output/naskah.md`, menyusun jadwal tayang ke `public/output/jadwal.md`.
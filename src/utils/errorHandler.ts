import { AxiosError } from 'axios';

/**
 * Mengubah objek error menjadi pesan yang bisa ditampilkan ke pengguna.
 */
export function getErrorMessage(error: unknown): string {
  if (!(error instanceof AxiosError)) {
    return 'Terjadi kesalahan yang tidak diketahui.';
  }

  const status = error.response?.status;
  const serverMessage = error.response?.data?.message;

  // Jika server mengirim pesan khusus, langsung gunakan
  if (serverMessage) {
    return serverMessage;
  }

  // Mapping status code
  switch (status) {
    case 400:
      return 'Permintaan tidak valid. Periksa kembali data yang Anda masukkan.';
    case 401:
      return 'Anda harus login untuk mengakses halaman ini.';
    case 403:
      return 'Anda tidak memiliki izin untuk melakukan aksi ini.';
    case 404:
      return 'Data yang Anda cari tidak ditemukan.';
    case 422:
      return 'Input tidak valid. Pastikan semua kolom diisi dengan benar.';
    case 429:
      return 'Terlalu banyak permintaan. Silakan coba lagi nanti.';
    case 500:
      return 'Terjadi kesalahan server. Silakan coba lagi nanti.';
    default:
      return 'Terjadi kesalahan. Silakan coba lagi.';
  }
}
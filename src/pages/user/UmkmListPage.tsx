import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/client';
import BackButton from '../../components/shared/BackButton';
import UserLoadingSpinner from '../../components/shared/LoadingSpinner';

// ---------- Tipe data produk ----------
interface ProdukItem {
  id_produk: number;
  nama_produk: string;
  gambar: string;
  harga: number | null;
  deskripsi: string;
  umkm: { nama_umkm: string; alamat: string };
  kategori: { nama_kategori: string };
}

const UmkmListPage = () => {
  // ---------- State ----------
  const [tab, setTab] = useState<'makanan' | 'kerajinan'>(() => {
    // Baca tab terakhir dari localStorage, default 'makanan'
    return (localStorage.getItem('umkmTab') as 'makanan' | 'kerajinan') || 'makanan';
  });
  const [items, setItems] = useState<ProdukItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ---------- Ambil data dari backend ----------
  const fetchData = useCallback(() => {
    setLoading(true);
    setError('');
    const kategoriId = tab === 'makanan' ? 1 : 2;   // 1 = Makanan Khas, 2 = Kerajinan
    apiClient
      .get(`/produk?kategori_id=${kategoriId}`)
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      
  }, [tab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ---------- Ganti tab sambil simpan ke localStorage ----------
  const handleTabChange = (newTab: 'makanan' | 'kerajinan') => {
    setTab(newTab);
    localStorage.setItem('umkmTab', newTab);
  };

  // ---------- Tampilan ----------
  if (loading) return <UserLoadingSpinner  />;
  if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <div className="max-w-[375px] w-full bg-white min-h-screen shadow-lg relative">
        {/* Header */}
        <div className="bg-[#08F] text-white p-4 flex items-center gap-4">
          <BackButton to="/user" />
          <h2 className="text-xl font-semibold">UMKM Nusantara</h2>
        </div>

        <div className="p-4">
          {/* Alamat dummy */}
          <p className="text-sm text-gray-600 mb-4">
            Jl. Veteran No 12 – 14, Ketawanggede, Malang, Jawa Timur
          </p>

          {/* Segmented Control – Makanan Khas / Kerajinan */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => handleTabChange('makanan')}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                tab === 'makanan'
                  ? 'bg-white shadow text-black'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              Makanan Khas
            </button>
            <button
              onClick={() => handleTabChange('kerajinan')}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                tab === 'kerajinan'
                  ? 'bg-white shadow text-black'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              Kerajinan
            </button>
          </div>

          {/* Daftar produk */}
          <div className="space-y-3">
            {items.length === 0 && (
              <p className="text-center text-gray-400">Belum ada produk.</p>
            )}
            {items.map((item) => {
              // Tentukan route detail sesuai tab yang sedang aktif
              const detailPath =
                tab === 'makanan'
                  ? `/user/umkm/makanan/${item.id_produk}`
                  : `/user/umkm/kerajinan/${item.id_produk}`;

              return (
                <Link
                  key={item.id_produk}
                  to={detailPath}
                  className="flex items-center gap-4 p-3 border-b border-gray-100 hover:bg-gray-50 rounded-lg"
                >
                  <img
                    src={item.gambar || 'https://via.placeholder.com/80'}
                    alt={item.nama_produk}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{item.nama_produk}</h3>
                    <div className="flex items-center gap-1 text-yellow-500 text-xs my-1">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1">{item.deskripsi}</p>
                    {item.harga && (
                      <p className="text-xs font-medium text-gray-700 mt-1">
                        Rp {item.harga.toLocaleString()}
                      </p>
                    )}
                  </div>
                  <i className="fa-solid fa-chevron-right text-gray-400" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom tab bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t flex justify-center py-2">
          <div className="w-1/3 h-1 bg-black rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default UmkmListPage;
import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import { Link } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

interface ProdukItem {
  id_produk: number;
  nama_produk: string;
  gambar: string;
  deskripsi: string;
  umkm: { nama_umkm: string; alamat: string };
  kategori: { nama_kategori: string };
}

const KerajinanPage = () => {
  const [items, setItems] = useState<ProdukItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/produk?kategori_id=2') // 2 = Kerajinan
      .then(res => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-[#08F]">
      <div className="bg-[#08F] text-white p-4 flex items-center gap-4">
        <BackButton to="/user" />
        <h2 className="text-xl font-semibold">Kerajinan</h2>
        <Link to="/user/umkm/makanan" className="ml-auto text-sm underline">Makanan Khas</Link>
      </div>
      <div className="bg-white rounded-t-3xl p-4 mx-2">
        <p className="text-sm text-gray-600 mb-4">Jl. Veteran No 12 – 14, Ketawanggede, Malang, Jawa Timur</p>
        {items.map(item => (
          <Link
            key={item.id_produk}
            to={`/user/umkm/kerajinan/${item.id_produk}`}
            className="flex items-center gap-4 py-3 border-b border-gray-200"
          >
            <img
              src={item.gambar || '/placeholder.jpg'}
              alt={item.nama_produk}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{item.nama_produk}</h3>
              <div className="flex items-center gap-1 text-yellow-500 text-xs mb-1">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-regular fa-star"></i>
              </div>
              <p className="text-xs text-gray-500">{item.deskripsi?.substring(0, 50)}...</p>
              <p className="text-xs text-gray-400 mt-1">450 m</p>
            </div>
            <i className="fa-solid fa-chevron-right text-gray-400" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default KerajinanPage;
import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import { Link } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import UserLoadingSpinner from '../../components/shared/LoadingSpinner';

interface ProdukItem {
  id_produk: number;
  nama_produk: string;
  gambar: string;
  deskripsi: string;
  umkm: { nama_umkm: string };
}

const KerajinanPage = () => {
  const [items, setItems] = useState<ProdukItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/produk?kategori_id=2').then(res => setItems(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <UserLoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <div className="max-w-[375px] w-full bg-white min-h-screen shadow-lg relative">
        <div className="bg-[#08F] text-white p-4 flex items-center gap-4">
          <BackButton to="/user" />
          <h2 className="text-xl font-semibold">Kerajinan</h2>
          <Link to="/user/umkm/makanan" className="ml-auto text-sm underline">Makanan Khas</Link>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-4">Jl. Veteran No 12 – 14, Ketawanggede, Malang</p>
          {items.map(item => (
            <Link key={item.id_produk} to={`/user/umkm/kerajinan/${item.id_produk}`} className="flex items-center gap-4 py-3 border-b border-gray-200">
              <img src={item.gambar || 'https://via.placeholder.com/80'} alt={item.nama_produk} className="w-20 h-20 rounded-lg object-cover" />
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{item.nama_produk}</h3>
                <div className="flex items-center gap-1 text-yellow-500 text-xs mb-1">
                  <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i>
                </div>
                <p className="text-xs text-gray-500">{item.deskripsi?.substring(0, 50)}...</p>
              </div>
              <i className="fa-solid fa-chevron-right text-gray-400" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KerajinanPage;
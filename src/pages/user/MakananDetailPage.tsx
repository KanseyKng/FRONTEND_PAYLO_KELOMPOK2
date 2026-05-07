import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../api/client';
import BackButton from '../../components/shared/BackButton';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

interface ProdukDetail {
  id_produk: number;
  nama_produk: string;
  gambar: string;
  harga: number;
  deskripsi: string;
  umkm: { nama_umkm: string; alamat: string; link_lokasi_umkm?: string };
}

const MakananDetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<ProdukDetail | null>(null);

  useEffect(() => {
    apiClient.get(`/produk/${id}`).then(res => setData(res.data)).catch(console.error);
  }, [id]);

  if (!data) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <div className="max-w-[375px] w-full bg-white min-h-screen shadow-lg relative">
        <div className="bg-[#08F] text-white p-4 flex items-center gap-4">
          <BackButton to="/user/umkm/list" />
          <h2 className="text-xl font-semibold">Detail Makanan</h2>
        </div>
        <div className="p-4">
          <img src={data.gambar} alt={data.nama_produk} className="w-full h-48 object-cover rounded-lg mb-4" />
          <h2 className="text-2xl font-bold mb-2">{data.nama_produk}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span className="text-yellow-500"><i className="fa-solid fa-star mr-1" /> 4.1</span>
            <span>| 4.5 km</span>
          </div>
          <p className="text-xl font-bold text-gray-800 mb-4">Rp {data.harga?.toLocaleString()}</p>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{data.deskripsi}</p>
          {data.umkm.link_lokasi_umkm && (
            <a href={data.umkm.link_lokasi_umkm} target="_blank" className="text-[#08F] text-sm underline block mt-2">
              <i className="fa-solid fa-location-dot mr-1" /> Lihat lokasi di Google Maps
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MakananDetailPage;
import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

interface ChartData {
  saldo: number;
  total_transaksi_minggu: number;
  grafik_harian: { tanggal: string; pemasukan: number; pengeluaran: number; total_transaksi: number }[];
}

const DashboardUserPage = () => {
  const [data, setData] = useState<ChartData | null>(null);

  useEffect(() => {
    apiClient.get('/dashboard').then((res) => setData(res.data)).catch(console.error);
  }, []);

  if (!data) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#08F] text-white p-4 flex items-center justify-between">
        <span className="text-xl font-semibold">Beranda</span>
        <Link to="/user/profil" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <i className="fa-solid fa-user text-sm" />
        </Link>
      </div>

      {/* Card */}
      <div className="p-4">
        <div className="border rounded-lg p-4 shadow-sm mb-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Transaksi</p>
              <p className="text-xl font-bold">Rp {data.total_transaksi_minggu.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Saldo</p>
              <Link to="/user/saldo" className="text-xl font-bold text-blue-800">Rp {data.saldo.toLocaleString()}</Link>
            </div>
          </div>
          {/* Grafik */}
          <div className="mt-4 flex items-end gap-2 h-32">
            {data.grafik_harian.map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-blue-100 rounded-t relative" style={{ height: `${Math.max(10, (item.total_transaksi / 10000) * 60)}px` }}>
                  <div className="absolute -top-2 w-full text-center text-[10px]">{item.total_transaksi}</div>
                </div>
                <span className="text-[10px] text-gray-500">{item.tanggal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/user/qris" className="flex flex-col items-center bg-gray-100 rounded-xl p-4 shadow-sm">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/586d82bbeee39135a281c8b48397fa3a40a62652?width=240" className="w-20 h-20 rounded-lg mb-2" />
            <span className="text-sm font-medium">QRIS</span>
          </Link>
          <Link to="/user/cashflow" className="flex flex-col items-center bg-gray-100 rounded-xl p-4 shadow-sm">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/d7b4dcef6769c9d5903aec446e5e0e433818d17d?width=240" className="w-20 h-20 rounded-lg mb-2" />
            <span className="text-sm font-medium">Cashflow</span>
          </Link>
          <Link to="/user/edukasi" className="flex flex-col items-center bg-gray-100 rounded-xl p-4 shadow-sm">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/cd29accfbe716acd7400db6ba56c1ccf91718b26?width=240" className="w-20 h-20 rounded-lg mb-2" />
            <span className="text-sm font-medium">Edukasi</span>
          </Link>
          <Link to="/user/umkm" className="flex flex-col items-center bg-gray-100 rounded-xl p-4 shadow-sm">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/7c2411b289a88de4f6f2d98a097dc4fd100346ec?width=240" className="w-20 h-20 rounded-lg mb-2" />
            <span className="text-sm font-medium">UMKM Nusantara</span>
          </Link>
        </div>
      </div>
            
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-center py-2">
        <div className="w-1/3 h-1 bg-black rounded-full" />
      </div>
    </div>
  );
};

export default DashboardUserPage;
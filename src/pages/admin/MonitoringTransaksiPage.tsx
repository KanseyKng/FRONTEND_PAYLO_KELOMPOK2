import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import { Link } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

interface TransaksiItem {
  id_transaksi: number;
  jenis_transaksi: string;
  jumlah: number;
  status: string;
  tanggal: string;
  user: { nama: string };
}

const MonitoringTransaksiPage = () => {
  const [data, setData] = useState<TransaksiItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/admin/transaksi').then(res => { setData(res.data.data); setLoading(false); });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-8">
      <div className="flex items-center gap-4 mb-8">
        <BackButton to="/admin" />
        <h1 className="text-4xl font-bold text-white">Monitoring Transaksi</h1>
      </div>
      <div className="bg-white rounded-2xl p-6">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr className="text-lg">
              <th>ID Transaksi</th>
              <th>Pengguna</th>
              <th>Jumlah</th>
              <th>Status</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id_transaksi} className="border-b">
                <td className="py-3">TG{item.id_transaksi}</td>
                <td>{item.user?.nama}</td>
                <td>Rp {item.jumlah.toLocaleString()}</td>
                <td>{item.status}</td>
                <td>{new Date(item.tanggal).toLocaleDateString()}</td>
                <td>
                  <Link to={`/admin/transaksi/${item.id_transaksi}`} className="text-blue-500 underline">Detail</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonitoringTransaksiPage;
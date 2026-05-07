import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

interface AdminDashboardData {
  total_users: number;
  new_users_this_week: number;
  total_transaksi: number;
  transaksi_this_week: number;
  user_growth: Record<string, number>;
}

const DashboardAdminPage = () => {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    apiClient.get('/admin/dashboard').then(res => setData(res.data)).catch(console.error);
  }, []);

  if (!data) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-8">
      <h1 className="text-4xl font-bold text-white mb-12">Dashboard Admin</h1>
      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="bg-white/20 backdrop-blur rounded-2xl p-6 text-white">
          <p className="text-lg">Total Users</p>
          <p className="text-3xl font-bold">{data.total_users}</p>
          <p className="text-sm mt-2">+{data.new_users_this_week} minggu ini</p>
        </div>
        <div className="bg-white/20 backdrop-blur rounded-2xl p-6 text-white">
          <p className="text-lg">Total Transaksi</p>
          <p className="text-3xl font-bold">{data.total_transaksi}</p>
          <p className="text-sm mt-2">+{data.transaksi_this_week} minggu ini</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <Link to="/admin/users" className="bg-white/80 rounded-xl p-6 shadow-lg text-center font-semibold text-lg hover:bg-white">
          Kelola User
        </Link>
        <Link to="/admin/transaksi" className="bg-white/80 rounded-xl p-6 shadow-lg text-center font-semibold text-lg hover:bg-white">
          Monitoring Transaksi
        </Link>
        <Link to="/admin/umkm" className="bg-white/80 rounded-xl p-6 shadow-lg text-center font-semibold text-lg hover:bg-white">
          Kelola UMKM
        </Link>
        <Link to="/admin/edukasi" className="bg-white/80 rounded-xl p-6 shadow-lg text-center font-semibold text-lg hover:bg-white">
          Kelola Edukasi
        </Link>
        <Link to="/admin/pengaturan" className="bg-white/80 rounded-xl p-6 shadow-lg text-center font-semibold text-lg hover:bg-white">
          Pengaturan Sistem
        </Link>
        <button onClick={logout} className="bg-red-400 rounded-xl p-6 shadow-lg text-center font-semibold text-lg text-white hover:bg-red-500">
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardAdminPage;
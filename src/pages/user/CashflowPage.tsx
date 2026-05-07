import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import BackButton from '../../components/shared/BackButton';
import UserLoadingSpinner from '../../components/shared/LoadingSpinner';


// ----- Tipe data dari backend -----
interface CashflowData {
  bulan: string;
  total_pemasukan: number;
  total_pengeluaran: number;
  pemasukan_detail: Array<{
    kategori: string;
    total: number;
    persentase: number;
  }>;
  pengeluaran_detail: Array<{
    kategori: string;
    total: number;
    persentase: number;
  }>;
}

const CashflowPage = () => {
  const [tab, setTab] = useState<'pemasukan' | 'pengeluaran'>('pemasukan');
  const [data, setData] = useState<CashflowData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Bulan default adalah bulan sekarang (format YYYY-MM)
  const [bulan, setBulan] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  // Ambil data dari backend setiap kali bulan berubah
  const fetchData = () => {
    setLoading(true);
    setError('');
    apiClient
      .get(`/cashflow?bulan=${bulan}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      
  };

  useEffect(() => {
    fetchData();
  }, [bulan]);          // ← fetch ulang setiap bulan berubah

  // -- Data yang akan ditampilkan sesuai tab --
  const currentDetail =
    tab === 'pemasukan' ? data?.pemasukan_detail : data?.pengeluaran_detail;
  const total = tab === 'pemasukan' ? data?.total_pemasukan : data?.total_pengeluaran;

  // -- Saat loading --
  if (loading) return <UserLoadingSpinner />;

  // -- Saat terjadi error --
  if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center">
      {/* Container mobile 375px */}
      <div className="max-w-[375px] w-full bg-white min-h-screen shadow-lg relative">
      {/* Header */}
      <div className="bg-[#08F] text-white p-4 flex items-center gap-4">
        <BackButton to="/user" />
        <h2 className="text-xl font-semibold">Cashflow</h2>
      </div>

      <div className="bg-white rounded-t-3xl p-4 mx-2">
        {/* Tombol pilihan Pemasukan / Pengeluaran */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setTab('pemasukan')}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              tab === 'pemasukan'
                ? 'bg-white shadow text-black'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            Pemasukan
          </button>
          <button
            onClick={() => setTab('pengeluaran')}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              tab === 'pengeluaran'
                ? 'bg-white shadow text-black'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            Pengeluaran
          </button>
        </div>

        {/* Pilih bulan */}
        <div className="mb-4">
  <label className="block text-sm text-gray-600 mb-1">Pilih Bulan</label>
  <div className="flex items-center gap-2">
    <input
      type="month"
      value={bulan}
      onChange={(e) => setBulan(e.target.value)}
      className="border rounded-lg p-2 flex-1"
    />
    <button
      onClick={fetchData}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
    >
      <i className="fa-solid fa-rotate-right mr-1"></i> Refresh
    </button>
  </div>
</div>

        {/* Donut chart sederhana */}
        <div className="text-center mb-6">
          <div className="w-32 h-32 rounded-full bg-orange-100 text-orange-500 flex flex-col items-center justify-center mx-auto">
            <span className="text-sm">
              {tab === 'pemasukan' ? 'Total Pemasukan' : 'Total Pengeluaran'}
            </span>
            <span className="text-lg font-bold">
              Rp {total?.toLocaleString() ?? 0}
            </span>
          </div>
        </div>

        {/* Daftar kategori */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-blue-800">Kategori</h3>
          {currentDetail && currentDetail.length > 0 ? (
            currentDetail.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b pb-2"
              >
                <span className="text-sm">{item.kategori}</span>
                <span className="text-sm text-gray-600">
                  Rp {item.total.toLocaleString()} ({item.persentase}%)
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">Belum ada data untuk bulan ini.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default CashflowPage;
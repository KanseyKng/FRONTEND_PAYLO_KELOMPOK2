import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import { Link } from 'react-router-dom';
import UserLoadingSpinner from '../../components/shared/LoadingSpinner';

interface ChartData {
  saldo: number;
  total_transaksi_minggu: number;
  grafik_harian: {
    tanggal: string;
    pemasukan: number;
    pengeluaran: number;
    total_transaksi: number;
  }[];
}

const DashboardUserPage = () => {
  const [data, setData] = useState<ChartData | null>(null);

  useEffect(() => {
    apiClient
      .get('/dashboard')
      .then((res) => setData(res.data))
      .catch(console.error);
  }, []);

  if (!data) return <UserLoadingSpinner />;

  // ---------- Data untuk chart ----------
  const points = data.grafik_harian;
  const maxTrans = Math.max(...points.map((p) => p.total_transaksi), 1);
  const chartWidth = 280;
  const chartHeight = 100;

  const getX = (index: number) => (index / (points.length - 1)) * chartWidth;
  const getY = (value: number) => chartHeight - (value / maxTrans) * chartHeight;

  const linePoints = points
    .map((p, i) => `${getX(i)},${getY(p.total_transaksi)}`)
    .join(' ');

  const dots = points.map((p, i) => (
    <circle
      key={i}
      cx={getX(i)}
      cy={getY(p.total_transaksi)}
      r="3"
      fill="#2D6EFF"
    />
  ));

  // Label sumbu Y (4 tingkat)
  const yLabels = [0, Math.round(maxTrans * 0.33), Math.round(maxTrans * 0.66), maxTrans];

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <div className="max-w-[375px] w-full bg-white min-h-screen shadow-lg relative">
        {/* Header */}
        <div className="bg-[#08F] text-white p-4 flex items-center justify-between">
          <span className="text-xl font-semibold">Beranda</span>
          <Link
            to="/user/profil"
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
          >
            <i className="fa-solid fa-user text-sm" />
          </Link>
        </div>

        {/* Card */}
        <div className="p-4">
          <div className="border rounded-lg p-4 shadow-sm mb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm text-gray-500">Total Transaksi</p>
                <p className="text-xl font-bold">{data.total_transaksi_minggu}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Saldo</p>
                <Link
                  to="/user/saldo"
                  className="text-xl font-bold text-blue-800"
                >
                  Rp {data.saldo.toLocaleString()}
                </Link>
              </div>
            </div>

            {/* Grafik Garis + Area */}
            <div className="mt-2 flex">
              {/* Label sumbu Y */}
              <div className="flex flex-col justify-between text-[10px] text-gray-400 pr-2 h-[100px]">
                {yLabels.reverse().map((val, i) => (
                  <span key={i} className="leading-none">{val}</span>
                ))}
              </div>

              {/* SVG Chart */}
              <div className="flex-1">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="w-full h-auto"
                >
                  {/* Garis bantu horizontal */}
                  <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#E6E6E6" strokeWidth="1" />
                  <line x1="0" y1={chartHeight * 0.66} x2={chartWidth} y2={chartHeight * 0.66} stroke="#E6E6E6" strokeWidth="1" strokeDasharray="4" />
                  <line x1="0" y1={chartHeight * 0.33} x2={chartWidth} y2={chartHeight * 0.33} stroke="#E6E6E6" strokeWidth="1" strokeDasharray="4" />
                  <line x1="0" y1="0" x2={chartWidth} y2="0" stroke="#E6E6E6" strokeWidth="1" />

                  {/* Area gradien di bawah garis */}
                  <polygon
                    points={`0,${chartHeight} ${linePoints} ${chartWidth},${chartHeight}`}
                    fill="url(#gradient)"
                    opacity="0.3"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2D6EFF" />
                      <stop offset="100%" stopColor="#2D6EFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Garis utama */}
                  <polyline
                    points={linePoints}
                    fill="none"
                    stroke="#2D6EFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Titik data */}
                  {dots}
                </svg>
              </div>
            </div>

            {/* Label sumbu X */}
            <div className="flex justify-between mt-2 text-[10px] text-gray-400 px-1 ml-8">
              {points.map((p, i) => (
                <span key={i}>{p.tanggal}</span>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/user/qris"
              className="flex flex-col items-center bg-gray-100 rounded-xl p-4 shadow-sm"
            >
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/586d82bbeee39135a281c8b48397fa3a40a62652?width=240"
                className="w-20 h-20 rounded-lg mb-2"
                alt="QRIS"
              />
              <span className="text-sm font-medium">QRIS</span>
            </Link>
            <Link
              to="/user/cashflow"
              className="flex flex-col items-center bg-gray-100 rounded-xl p-4 shadow-sm"
            >
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/d7b4dcef6769c9d5903aec446e5e0e433818d17d?width=240"
                className="w-20 h-20 rounded-lg mb-2"
                alt="Cashflow"
              />
              <span className="text-sm font-medium">Cashflow</span>
            </Link>
            <Link
              to="/user/edukasi"
              className="flex flex-col items-center bg-gray-100 rounded-xl p-4 shadow-sm"
            >
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/cd29accfbe716acd7400db6ba56c1ccf91718b26?width=240"
                className="w-20 h-20 rounded-lg mb-2"
                alt="Edukasi"
              />
              <span className="text-sm font-medium">Edukasi</span>
            </Link>
            <Link
              to="/user/umkm"
              className="flex flex-col items-center bg-gray-100 rounded-xl p-4 shadow-sm"
            >
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/7c2411b289a88de4f6f2d98a097dc4fd100346ec?width=240"
                className="w-20 h-20 rounded-lg mb-2"
                alt="UMKM"
              />
              <span className="text-sm font-medium">UMKM Nusantara</span>
            </Link>
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

export default DashboardUserPage;
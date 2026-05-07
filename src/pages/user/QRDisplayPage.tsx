import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import BackButton from '../../components/shared/BackButton';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

const QRDisplayPage = () => {
  const [kode, setKode] = useState<string | null>(null);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    apiClient.post('/qris/generate')
      .then(res => setKode(res.data.kode_qr))
      .catch(console.error);
    const interval = setInterval(() => setTimer(prev => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!kode) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <div className="max-w-[375px] w-full bg-white min-h-screen shadow-lg relative">
        <div className="bg-[#08F] text-white p-4 flex items-center gap-4">
          <BackButton to="/user/qris" />
          <h2 className="text-xl font-semibold">QRIS Siap Digunakan</h2>
        </div>
        <div className="flex flex-col items-center p-6">
          <div className="border-4 border-gray-300 p-2 rounded-lg mt-4">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${kode}`}
              alt="QR Code"
              className="w-48 h-48"
            />
          </div>
          <p className="mt-4 text-gray-600">
            Masa berlaku <span className="font-bold text-[#08F]">{`00:${timer.toString().padStart(2, '0')}`}</span>
          </p>
          <p className="text-xs text-gray-400 mt-6 text-center max-w-xs">
            Pastikan nominal transaksi sudah sesuai. Transaksi dengan QRIS akan langsung mendebet rekening anda.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRDisplayPage;
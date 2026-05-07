import { useState } from 'react';
import apiClient from '../../api/client';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import { useToast } from '../../hooks/useToast';
import { getErrorMessage } from '../../utils/errorHandler';
import { useAuth } from '../../context/AuthContext';
import { Scanner } from '@yudiel/react-qr-scanner';

interface PenerimaInfo {
  nama: string;
  no_hp: string;
}

const QRISScanPage = () => {
  const [step, setStep] = useState<'scan' | 'confirm' | 'success'>('scan');
  const [kodeQr, setKodeQr] = useState('');
  const [penerima, setPenerima] = useState<PenerimaInfo | null>(null);
  const [jumlah, setJumlah] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [dataBukti, setDataBukti] = useState<any>(null);
  const { toast, showToast } = useToast();
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  // Setelah berhasil scan
  const handleScan = async (result: any) => {
    if (!result) return;
    const kode = result[0]?.rawValue;
    if (!kode) return;
    setKodeQr(kode);
    try {
      const res = await apiClient.get(`/qris/${kode}/info`);
      setPenerima(res.data);
      setStep('confirm');
    } catch (err: any) {
      showToast(getErrorMessage(err) || 'QR tidak valid', 'error');
    }
  };

  // Kirim pembayaran QRIS
  const handleBayar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiClient.post('/qris/scan', {
        kode_qr: kodeQr,
        jumlah,
        pin,
      });
      setDataBukti(res.data);
      setStep('success');
      refreshUser();
      showToast('Pembayaran QRIS berhasil', 'success');
    } catch (err) {
      showToast(getErrorMessage(err), 'error');
    }
  };

  // --- Tampilan Bukti Sukses ---
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-200 flex justify-center">
        <div className="max-w-[375px] w-full bg-white min-h-screen shadow-lg relative">
          <div className="flex flex-col items-center justify-center p-6 text-center mt-20">
            <img
              src="https://via.placeholder.com/168?text=Success"
              className="w-32 h-32 mb-4"
              alt="Sukses"
            />
            <h2 className="text-2xl font-bold">Pembayaran QRIS Berhasil</h2>
            <p className="text-gray-600 mt-2">{new Date().toLocaleString()}</p>
            <p className="text-xl font-bold text-blue-900 mt-4">
              IDR {Number(jumlah).toLocaleString()}
            </p>
            <button
              onClick={() => navigate('/user/qris')}
              className="mt-8 bg-[#08F] text-white px-8 py-3 rounded-full font-semibold"
            >
              Selesai
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <div className="max-w-[375px] w-full bg-white min-h-screen shadow-lg relative">
        <div className="bg-[#08F] text-white p-4 flex items-center gap-4">
          <BackButton to="/user/qris" />
          <h2 className="text-xl font-semibold">
            {step === 'scan' ? 'Scan QRIS' : 'Pembayaran QRIS'}
          </h2>
        </div>

        {step === 'scan' && (
          <div className="p-4 flex flex-col items-center">
            <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden mb-4">
              <Scanner
                onScan={handleScan}
                onError={(err) => console.error(err)}
                constraints={{ facingMode: 'environment' }}
              />
            </div>
            <p className="text-sm text-gray-500">Arahkan kamera ke kode QR</p>
          </div>
        )}

        {step === 'confirm' && penerima && (
          <form onSubmit={handleBayar} className="p-6 space-y-4" autoComplete="off">
            <div className="bg-blue-50 p-3 rounded-lg mb-2">
              <p className="text-sm text-gray-600">Nomor Penerima:</p>
              <p className="text-lg font-semibold text-gray-800">{penerima.no_hp}</p>
              <p className="text-xs text-gray-500 mt-1">Nama: {penerima.nama}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Jumlah (Rp)</label>
              <input
                type="number"
                placeholder="Masukkan jumlah"
                className="border rounded-lg p-3 w-full"
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1">PIN</label>
              <input
                type={showPin ? 'text' : 'password'}
                placeholder="PIN"
                className="border rounded-lg p-3 w-full"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
                autoComplete="one-time-code"
              />
              <i
                className={`fa-solid ${showPin ? 'fa-eye' : 'fa-eye-slash'} absolute right-3 top-[38px] text-gray-400 cursor-pointer`}
                onClick={() => setShowPin(!showPin)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#08F] text-white py-3 rounded-lg font-semibold"
            >
              Bayar
            </button>
          </form>
        )}

        {/* Toast untuk error / sukses (selain bukti) */}
        {toast && (
          <div
            className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full shadow-lg z-50 text-white ${
              toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default QRISScanPage;
import { useState } from 'react';
import apiClient from '../../api/client';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../context/AuthContext';

const TransferPage = () => {
  const [noHp, setNoHp] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [pin, setPin] = useState('');
  const [catatan, setCatatan] = useState('');
  const [success, setSuccess] = useState(false);
  const [namaPenerima, setNamaPenerima] = useState('');
  const { toast, showToast } = useToast();
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiClient.post('/saldo/transfer', {
        no_hp: noHp,
        jumlah,
        pin,
        catatan,
      });
      setNamaPenerima(res.data.nama_penerima || 'Penerima');
      setSuccess(true);
      refreshUser();
      showToast('Transfer berhasil');
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Gagal', 'error');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <img src="https://via.placeholder.com/168?text=Success" className="w-32 h-32 mb-4" alt="Sukses" />
        <h2 className="text-2xl font-bold">Kirim Saldo Berhasil</h2>
        <p className="text-gray-600 mt-2">{new Date().toLocaleString()}</p>
        <p className="text-xl font-bold text-blue-900 mt-4">IDR {Number(jumlah).toLocaleString()}</p>
        <p className="text-sm text-gray-500 mt-2">Kepada {namaPenerima}</p>
        <button onClick={() => navigate('/user/saldo')} className="mt-8 bg-[#08F] text-white px-8 py-3 rounded-full font-semibold">Selesai</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#08F] text-white p-4 flex items-center gap-4">
        <BackButton to="/user/saldo" />
        <h2 className="text-xl font-semibold">Kirim Saldo</h2>
      </div>
      <form onSubmit={handleTransfer} className="p-6 space-y-4">
        <input
          type="text"
          placeholder="Nomor HP Penerima"
          className="border rounded-lg p-3 w-full"
          value={noHp}
          onChange={(e) => setNoHp(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Jumlah (Rp)"
          className="border rounded-lg p-3 w-full"
          value={jumlah}
          onChange={(e) => setJumlah(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="PIN"
          className="border rounded-lg p-3 w-full"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Catatan (opsional)"
          className="border rounded-lg p-3 w-full"
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
        />
        <button type="submit" className="w-full bg-[#08F] text-white py-3 rounded-lg font-semibold">Kirim</button>
      </form>
    </div>
  );
};

export default TransferPage;
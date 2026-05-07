import { useState } from 'react';
import apiClient from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import { useToast } from '../../hooks/useToast';

const EditProfilPage = () => {
  const { user, refreshUser } = useAuth();
  const [nama, setNama] = useState(user?.nama || '');
  const [noHp, setNoHp] = useState(user?.no_hp || '');
  const [alamat, setAlamat] = useState(user?.alamat || '');
  const [pin, setPin] = useState('');
  const navigate = useNavigate();
  const { toast, showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.put('/user', { nama, no_hp: noHp, alamat, pin });
      showToast('Profil berhasil diperbarui');
      await refreshUser();
      setTimeout(() => navigate('/user/profil'), 1500);
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Gagal', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#08F] text-white p-4 flex items-center gap-4">
        <BackButton to="/user/profil" />
        <h2 className="text-xl font-semibold">Ubah Data Diri</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <input className="border rounded-lg p-3 w-full" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} />
        <input className="border rounded-lg p-3 w-full" placeholder="No HP" value={noHp} onChange={(e) => setNoHp(e.target.value)} />
        <input className="border rounded-lg p-3 w-full" placeholder="Alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
        <input className="border rounded-lg p-3 w-full" placeholder="PIN untuk konfirmasi" type="password" value={pin} onChange={(e) => setPin(e.target.value)} required />
        <button type="submit" className="w-full bg-[#08F] text-white py-3 rounded-lg font-semibold">Simpan</button>
      </form>
      {toast && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg">
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default EditProfilPage;
import { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import BackButton from '../../components/shared/BackButton';
import { useToast } from '../../hooks/useToast';

const PengaturanPage = () => {
  const [batasTransfer, setBatasTransfer] = useState(0);
  const [biayaAdmin, setBiayaAdmin] = useState(0);
  const [namaAplikasi, setNamaAplikasi] = useState('');
  const { toast, showToast } = useToast();

  useEffect(() => {
    apiClient.get('/admin/pengaturan').then(res => {
      const d = res.data;
      setBatasTransfer(d.batas_transfer);
      setBiayaAdmin(d.biaya_admin);
      setNamaAplikasi(d.nama_aplikasi);
    });
  }, []);

  const handleSave = async () => {
    try {
      await apiClient.put('/admin/pengaturan', {
        batas_transfer: batasTransfer,
        biaya_admin: biayaAdmin,
        nama_aplikasi: namaAplikasi,
      });
      showToast('Pengaturan berhasil disimpan', 'success');
    } catch (err: any) {
      showToast('Gagal menyimpan', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-8">
      <div className="flex items-center gap-4 mb-8">
        <BackButton to="/admin" />
        <h1 className="text-4xl font-bold text-white">Pengaturan Sistem</h1>
      </div>
      <div className="bg-white rounded-2xl p-8 max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-semibold">Batas Transfer (Rp)</label>
          <input type="number" className="border rounded-lg p-3 w-full" value={batasTransfer} onChange={e => setBatasTransfer(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-semibold">Biaya Admin (Rp)</label>
          <input type="number" className="border rounded-lg p-3 w-full" value={biayaAdmin} onChange={e => setBiayaAdmin(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-semibold">Nama Aplikasi</label>
          <input type="text" className="border rounded-lg p-3 w-full" value={namaAplikasi} onChange={e => setNamaAplikasi(e.target.value)} />
        </div>
        <button onClick={handleSave} className="bg-[#08F] text-white px-8 py-3 rounded-full font-semibold">Simpan</button>
      </div>
      {toast && <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full">{toast.message}</div>}
    </div>
  );
};

export default PengaturanPage;
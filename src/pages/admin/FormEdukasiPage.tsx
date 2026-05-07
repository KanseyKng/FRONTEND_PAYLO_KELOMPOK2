import { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import { useToast } from '../../hooks/useToast';

const FormEdukasiPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const navigate = useNavigate();
  const { toast, showToast } = useToast();

  useEffect(() => {
    if (isEdit) {
      apiClient.get(`/edukasi/${id}`)
        .then(res => {
          setJudul(res.data.judul);
          setIsi(res.data.isi_edukasi);
        })
        .catch(console.error);
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { judul, isi_edukasi: isi };
    try {
      if (isEdit) {
        await apiClient.put(`/admin/edukasi/${id}`, payload);
        showToast('Edukasi berhasil diperbarui');
      } else {
        await apiClient.post('/admin/edukasi', payload);
        showToast('Edukasi berhasil ditambahkan');
      }
      setTimeout(() => navigate('/admin/edukasi'), 1500);
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Gagal', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-8">
      <div className="flex items-center gap-4 mb-8">
        <BackButton to="/admin/edukasi" />
        <h1 className="text-4xl font-bold text-white">{isEdit ? 'Edit Edukasi' : 'Tambah Edukasi'}</h1>
      </div>
      <div className="bg-white rounded-2xl p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border rounded-lg p-3 w-full"
            placeholder="Judul"
            value={judul}
            onChange={e => setJudul(e.target.value)}
            required
          />
          <textarea
            className="border rounded-lg p-3 w-full h-48"
            placeholder="Isi Edukasi"
            value={isi}
            onChange={e => setIsi(e.target.value)}
            required
          />
          <div className="flex gap-4">
            <button type="submit" className="bg-[#08F] text-white px-8 py-3 rounded-full font-semibold">
              Simpan
            </button>
            <button type="button" onClick={() => navigate('/admin/edukasi')} className="border border-gray-300 px-8 py-3 rounded-full font-semibold">
              Batal
            </button>
          </div>
        </form>
      </div>
      {toast && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full">
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default FormEdukasiPage;
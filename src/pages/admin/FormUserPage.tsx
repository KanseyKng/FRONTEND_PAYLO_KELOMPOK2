import { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import { useToast } from '../../hooks/useToast';

const FormUserPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ nama: '', email: '', no_hp: '', password: '', alamat: '' });
  const navigate = useNavigate();
  const { toast, showToast } = useToast();

  useEffect(() => {
    if (isEdit) {
      apiClient.get(`/admin/users/${id}`).then(res => {
        const user = res.data;
        setForm({ nama: user.nama, email: user.email, no_hp: user.no_hp, password: '', alamat: user.alamat || '' });
      });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await apiClient.put(`/admin/users/${id}`, form);
        showToast('User berhasil diperbarui', 'success');
      } else {
        await apiClient.post('/admin/users', form);
        showToast('User berhasil ditambahkan', 'success');
      }
      setTimeout(() => navigate('/admin/users'), 1500);
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Gagal', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-8">
      <div className="flex items-center gap-4 mb-8">
        <BackButton to="/admin/users" />
        <h1 className="text-4xl font-bold text-white">{isEdit ? 'Edit User' : 'Tambah User'}</h1>
      </div>
      <div className="bg-white rounded-2xl p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="border rounded-lg p-3 w-full" placeholder="Nama" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} required />
          <input className="border rounded-lg p-3 w-full" placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          <input className="border rounded-lg p-3 w-full" placeholder="No HP" value={form.no_hp} onChange={e => setForm({...form, no_hp: e.target.value})} required />
          <input className="border rounded-lg p-3 w-full" placeholder="Alamat" value={form.alamat} onChange={e => setForm({...form, alamat: e.target.value})} />
          {!isEdit && <input className="border rounded-lg p-3 w-full" placeholder="Password" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />}
          <div className="flex gap-4">
            <button type="submit" className="bg-[#08F] text-white px-8 py-3 rounded-full font-semibold">Simpan</button>
            <button type="button" onClick={() => navigate('/admin/users')} className="border border-gray-300 px-8 py-3 rounded-full font-semibold">Batal</button>
          </div>
        </form>
      </div>
      {toast && <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full">{toast.message}</div>}
    </div>
  );
};

export default FormUserPage;
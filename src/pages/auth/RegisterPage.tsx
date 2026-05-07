import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [form, setForm] = useState({ nama: '', email: '', no_hp: '', password: '', alamat: '' });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await register(form);
      navigate('/set-pin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal mendaftar');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="h-12 bg-gray-100 flex items-center justify-center text-xs text-red-500">Safe area</div>
      <div className="px-6 py-8 max-w-sm mx-auto">
        <h1 className="text-2xl font-bold mb-6">Daftar</h1>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input placeholder="Nama" className="border rounded-lg p-3 w-full" value={form.nama} onChange={(e) => setForm({...form, nama: e.target.value})} required />
          <input type="email" placeholder="Email" className="border rounded-lg p-3 w-full" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required />
          <input placeholder="No HP" className="border rounded-lg p-3 w-full" value={form.no_hp} onChange={(e) => setForm({...form, no_hp: e.target.value})} required />
          <input type="password" placeholder="Password" className="border rounded-lg p-3 w-full" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required />
          <input placeholder="Alamat" className="border rounded-lg p-3 w-full" value={form.alamat} onChange={(e) => setForm({...form, alamat: e.target.value})} />
          <button type="submit" className="w-full bg-[#08F] text-white py-3 rounded-lg font-semibold">Daftar</button>
        </form>
        <p className="mt-4 text-center text-sm">
          Sudah punya akun? <Link to="/" className="text-[#08F] font-bold">Masuk</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
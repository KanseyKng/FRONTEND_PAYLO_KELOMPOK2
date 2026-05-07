import { useState } from 'react';
import apiClient from '../../api/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SetPinPage = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await apiClient.post('/set-pin', { pin });
      navigate(user?.role === 'super_admin' ? '/admin' : '/user');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <h2 className="text-xl font-bold mb-4">Buat PIN Baru</h2>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input type="password" placeholder="PIN (6 digit)" maxLength={6} className="border rounded-lg p-3 w-full" value={pin} onChange={(e) => setPin(e.target.value)} required />
        <button type="submit" className="w-full bg-[#08F] text-white py-3 rounded-lg">Simpan PIN</button>
      </form>
    </div>
  );
};

export default SetPinPage;
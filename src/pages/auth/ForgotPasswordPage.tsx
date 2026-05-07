import { useState } from 'react';
import apiClient from '../../api/client';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/forgot-password', { email });
      setMsg('OTP telah dikirim ke email Anda.');
    } catch (err: any) {
      setMsg(err.response?.data?.message || 'Gagal');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <h2 className="text-2xl font-bold mb-4">Lupa Password</h2>
      {msg && <p className="text-sm text-green-600 mb-3">{msg}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input type="email" placeholder="Email terdaftar" className="border rounded-lg p-3 w-full" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit" className="w-full bg-[#08F] text-white py-3 rounded-lg">Kirim OTP</button>
      </form>
      <Link to="/" className="mt-4 text-sm text-[#08F]">Kembali ke Login</Link>
    </div>
  );
};

export default ForgotPasswordPage;
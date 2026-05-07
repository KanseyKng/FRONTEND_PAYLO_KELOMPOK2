import { useState } from 'react';
import apiClient from '../../api/client';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import { useToast } from '../../hooks/useToast';

const ChangePasswordPage = () => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { toast, showToast } = useToast();

  const requestOtp = async () => {
    try {
      await apiClient.post('/user/send-otp-sensitive');
      setStep(2);
      showToast('OTP dikirim ke email Anda.');
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Gagal', 'error');
    }
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('Password tidak cocok', 'error');
      return;
    }
    try {
      await apiClient.post('/user/change-password', {
        otp,
        password: newPassword,
        password_confirmation: confirmPassword,
      });
      showToast('Password berhasil diubah');
      setTimeout(() => navigate('/user/profil'), 1500);
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Gagal', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#08F] text-white p-4 flex items-center gap-4">
        <BackButton to="/user/profil" />
        <h2 className="text-xl font-semibold">Ubah Password</h2>
      </div>
      <div className="p-6">
        {step === 1 && (
          <button onClick={requestOtp} className="w-full bg-[#08F] text-white py-3 rounded-lg">Kirim OTP ke Email</button>
        )}
        {step === 2 && (
          <form onSubmit={changePassword} className="space-y-4">
            <input className="border rounded-lg p-3 w-full" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
            <input className="border rounded-lg p-3 w-full" type="password" placeholder="Password Baru" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            <input className="border rounded-lg p-3 w-full" type="password" placeholder="Konfirmasi Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button type="submit" className="w-full bg-[#08F] text-white py-3 rounded-lg">Simpan Password</button>
          </form>
        )}
      </div>
      {toast && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg">
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default ChangePasswordPage;
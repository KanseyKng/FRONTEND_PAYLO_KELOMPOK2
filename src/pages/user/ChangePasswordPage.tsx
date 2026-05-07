import { useState } from 'react';
import apiClient from '../../api/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BackButton from '../../components/shared/BackButton';
import { useToast } from '../../hooks/useToast';

const ChangePasswordPage = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { toast, showToast } = useToast();

  const requestOtp = async () => {
    try {
      await apiClient.post('/user/send-otp-sensitive');
      setStep(2);
      showToast('OTP telah dikirim ke email Anda.');
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
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <div className="max-w-[375px] w-full bg-white min-h-screen shadow-lg relative">
        <div className="bg-[#08F] text-white p-4 flex items-center gap-4">
          <BackButton to="/user/profil" />
          <h2 className="text-xl font-semibold">Ubah Password</h2>
        </div>
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Kode OTP akan dikirim ke email: <span className="font-bold text-black">{user?.email}</span>
              </p>
              <button onClick={requestOtp} className="w-full bg-[#08F] text-white py-3 rounded-lg font-semibold">
                Kirim OTP ke Email
              </button>
            </div>
          )}
          {step === 2 && (
            <form onSubmit={changePassword} className="space-y-4" autoComplete="off">
              <input
                className="border rounded-lg p-3 w-full"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                autoComplete="one-time-code"
                required
              />
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  placeholder="Password Baru"
                  className="border rounded-lg p-3 w-full"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
                <i
                  className={`fa-solid ${showNew ? 'fa-eye' : 'fa-eye-slash'} absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer`}
                  onClick={() => setShowNew(!showNew)}
                />
              </div>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Konfirmasi Password"
                  className="border rounded-lg p-3 w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
                <i
                  className={`fa-solid ${showConfirm ? 'fa-eye' : 'fa-eye-slash'} absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer`}
                  onClick={() => setShowConfirm(!showConfirm)}
                />
              </div>
              <button type="submit" className="w-full bg-[#08F] text-white py-3 rounded-lg font-semibold">
                Simpan Password
              </button>
            </form>
          )}
        </div>
        {toast && (
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50">
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordPage;
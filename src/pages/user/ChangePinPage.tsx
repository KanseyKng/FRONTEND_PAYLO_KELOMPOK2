import { useState } from 'react';
import apiClient from '../../api/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BackButton from '../../components/shared/BackButton';
import { useToast } from '../../hooks/useToast';

const ChangePinPage = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
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

  const changePin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin !== confirmPin) {
      showToast('PIN tidak cocok', 'error');
      return;
    }
    try {
      await apiClient.post('/user/change-pin', { otp, pin: newPin });
      showToast('PIN berhasil diubah');
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
          <h2 className="text-xl font-semibold">Ubah PIN</h2>
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
            <form onSubmit={changePin} className="space-y-4" autoComplete="off">
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
                  type={showNewPin ? 'text' : 'password'}
                  placeholder="PIN Baru (6 digit)"
                  className="border rounded-lg p-3 w-full"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  autoComplete="one-time-code"
                  required
                />
                <i
                  className={`fa-solid ${showNewPin ? 'fa-eye' : 'fa-eye-slash'} absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer`}
                  onClick={() => setShowNewPin(!showNewPin)}
                />
              </div>
              <div className="relative">
                <input
                  type={showConfirmPin ? 'text' : 'password'}
                  placeholder="Konfirmasi PIN"
                  className="border rounded-lg p-3 w-full"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  autoComplete="one-time-code"
                  required
                />
                <i
                  className={`fa-solid ${showConfirmPin ? 'fa-eye' : 'fa-eye-slash'} absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer`}
                  onClick={() => setShowConfirmPin(!showConfirmPin)}
                />
              </div>
              <button type="submit" className="w-full bg-[#08F] text-white py-3 rounded-lg font-semibold">
                Simpan PIN
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

export default ChangePinPage;
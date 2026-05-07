import { useState } from 'react';
import apiClient from '../../api/client';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import { useToast } from '../../hooks/useToast';

const ChangePinPage = () => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
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
    <div className="min-h-screen bg-white">
      <div className="bg-[#08F] text-white p-4 flex items-center gap-4">
        <BackButton to="/user/profil" />
        <h2 className="text-xl font-semibold">Ubah PIN</h2>
      </div>
      <div className="p-6">
        {step === 1 && (
          <button onClick={requestOtp} className="w-full bg-[#08F] text-white py-3 rounded-lg">Kirim OTP ke Email</button>
        )}
        {step === 2 && (
          <form onSubmit={changePin} className="space-y-4">
            <input className="border rounded-lg p-3 w-full" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
            <input className="border rounded-lg p-3 w-full" type="password" placeholder="PIN Baru (6 digit)" maxLength={6} value={newPin} onChange={(e) => setNewPin(e.target.value)} required />
            <input className="border rounded-lg p-3 w-full" type="password" placeholder="Konfirmasi PIN" maxLength={6} value={confirmPin} onChange={(e) => setConfirmPin(e.target.value)} required />
            <button type="submit" className="w-full bg-[#08F] text-white py-3 rounded-lg">Simpan PIN</button>
          </form>
        )}
      </div>
      {toast && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full">
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default ChangePinPage;
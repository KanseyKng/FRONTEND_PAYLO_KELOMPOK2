import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';

const QRISPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <div className="max-w-[375px] w-full bg-white min-h-screen shadow-lg relative">
        <div className="bg-[#08F] text-white p-4 flex items-center gap-4">
          <BackButton to="/user" />
          <h2 className="text-xl font-semibold">Scan QRIS</h2>
        </div>
        <div className="p-4 flex flex-col items-center">
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-6">
            <i className="fa-solid fa-camera text-6xl text-gray-400" />
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <button onClick={() => navigate('/user/qris/scan')} className="flex flex-col items-center bg-gray-100 p-4 rounded-xl w-28">
              <i className="fa-solid fa-qrcode text-[#08F] text-2xl" />
              <span className="text-sm mt-1">Bayar</span>
            </button>
            <button onClick={() => navigate('/user/qris/tampilkan')} className="flex flex-col items-center bg-gray-100 p-4 rounded-xl w-28">
              <i className="fa-solid fa-share text-[#08F] text-2xl" />
              <span className="text-sm mt-1">Tampilkan QR</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRISPage;
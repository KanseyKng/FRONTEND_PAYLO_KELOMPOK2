import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BackButton from '../../components/shared/BackButton';

const SaldoPage = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <div className="max-w-[375px] w-full bg-white min-h-screen shadow-lg relative">
        <div className="bg-[#08F] text-white p-4 flex items-center gap-4">
          <BackButton to="/user" />
          <h2 className="text-xl font-semibold">Kelola Saldo</h2>
        </div>
        <div className="p-6 text-center">
          <div className="my-12">
            <div className="w-40 h-40 rounded-full bg-[#FFA91F] text-white flex flex-col items-center justify-center mx-auto">
              <span className="text-sm">Jumlah Saldo Anda</span>
              <span className="text-2xl font-bold">Rp {user?.saldo?.jumlah_saldo?.toLocaleString() || 0}</span>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-8">
            <Link to="/user/saldo/topup" className="flex flex-col items-center bg-gray-100 p-4 rounded-xl w-24">
              <i className="fa-solid fa-dollar-sign text-[#08F] text-2xl" />
              <span className="text-sm mt-2">Top Up</span>
            </Link>
            <Link to="/user/saldo/transfer" className="flex flex-col items-center bg-gray-100 p-4 rounded-xl w-24">
              <i className="fa-solid fa-paper-plane text-[#08F] text-2xl" />
              <span className="text-sm mt-2">Kirim</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaldoPage;
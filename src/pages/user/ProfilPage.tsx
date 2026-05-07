import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BackButton from '../../components/shared/BackButton';

const ProfilPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <div className="max-w-[375px] w-full bg-white min-h-screen shadow-lg relative">
        <div className="bg-[#08F] text-white p-4 flex items-center gap-4">
          <BackButton to="/user" />
          <h2 className="text-xl font-semibold">Profil</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2"><span className="font-semibold">Nama</span><span>{user?.nama}</span></div>
            <div className="flex justify-between border-b pb-2"><span className="font-semibold">Email</span><span>{user?.email}</span></div>
            <div className="flex justify-between border-b pb-2"><span className="font-semibold">No HP</span><span>{user?.no_hp}</span></div>
            <div className="flex justify-between border-b pb-2"><span className="font-semibold">Alamat</span><span>{user?.alamat || '-'}</span></div>
          </div>
          <div className="mt-8 space-y-3">
            <Link to="/user/profil/ubah" className="block w-full bg-[#08F] text-white py-3 rounded-lg text-center font-semibold">Ubah Data Diri</Link>
            <Link to="/user/profil/ubah-password" className="block w-full border border-gray-300 py-3 rounded-lg text-center">Ubah Password</Link>
            <Link to="/user/profil/ubah-pin" className="block w-full border border-gray-300 py-3 rounded-lg text-center">Ubah PIN</Link>
            <button onClick={logout} className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilPage;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';

const MencariLokasiPage = () => {
  const [status, setStatus] = useState<'searching' | 'found'>('searching');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setStatus('found'), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (status === 'searching') {
    return (
      <div className="min-h-screen bg-gray-200 flex justify-center">
        <div className="max-w-[375px] w-full bg-[#08F] min-h-screen shadow-lg relative flex flex-col items-center justify-center text-white">
          <img src="https://via.placeholder.com/270?text=Searching" className="w-48 h-48 mb-4 animate-pulse" alt="Mencari" />
          <p className="text-lg">Mencari Lokasi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <div className="max-w-[375px] w-full bg-[#08F] min-h-screen shadow-lg relative flex flex-col items-center justify-center text-white">
        <div className="absolute top-4 left-4">
          <BackButton to="/user" />
        </div>
        <img src="https://via.placeholder.com/270?text=Location+Found" className="w-48 h-48 mb-4" alt="Lokasi ditemukan" />
        <p className="text-lg mb-2">Lokasi Ditemukan</p>
        <p className="text-xl font-bold text-center px-4">Jl. Veteran No 12 – 14, Ketawanggede, Malang, Jawa Timur</p>
        <button onClick={() => navigate('/user/umkm/list')} className="mt-8 bg-white text-[#08F] font-semibold py-3 px-10 rounded-full">Lihat Makanan Khas</button>
      </div>
    </div>
  );
};

export default MencariLokasiPage;
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
      <div className="min-h-screen bg-[#08F] flex flex-col items-center justify-center text-white">
        <img src="/placeholder-map.png" alt="searching" className="w-48 h-48 mb-4 animate-pulse" />
        <p className="text-lg">Mencari Lokasi...</p>
      </div>
    );
  }

  // Lokasi ditemukan
  return (
    <div className="min-h-screen bg-[#08F] flex flex-col items-center justify-center text-white">
      <div className="absolute top-4 left-4">
        <BackButton to="/user" />
      </div>
      <img src="/placeholder-map.png" alt="found" className="w-48 h-48 mb-4" />
      <p className="text-lg mb-2">Lokasi Ditemukan</p>
      <p className="text-xl font-bold text-center px-4">Jl. Veteran No 12 – 14, Ketawanggede, Malang, Jawa Timur</p>
      <button onClick={() => navigate('/user/umkm/makanan')} className="mt-8 bg-white text-[#08F] font-semibold py-3 px-10 rounded-full">
        Lihat Makanan Khas
      </button>
    </div>
  );
};

export default MencariLokasiPage;
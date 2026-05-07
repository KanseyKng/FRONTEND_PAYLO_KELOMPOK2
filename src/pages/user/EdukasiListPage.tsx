import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import { Link } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

interface EdukasiItem {
  id_edukasi: number;
  judul: string;
  isi_edukasi: string;
}

const EdukasiListPage = () => {
  const [list, setList] = useState<EdukasiItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/edukasi').then(res => setList(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-[#08F]">
      <div className="bg-[#08F] text-white p-4 flex items-center gap-4">
        <BackButton to="/user" />
        <h2 className="text-xl font-semibold">Edukasi</h2>
      </div>
      <div className="bg-white rounded-t-3xl p-4 mx-2 min-h-full">
        {list.map(item => (
          <Link key={item.id_edukasi} to={`/user/edukasi/${item.id_edukasi}`} className="flex items-center justify-between py-3 border-b border-gray-200">
            <span className="text-sm font-medium">{item.judul}</span>
            <i className="fa-solid fa-chevron-right text-gray-400" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EdukasiListPage;
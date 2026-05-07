import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../api/client';
import BackButton from '../../components/shared/BackButton';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

interface EdukasiItem {
  id_edukasi: number;
  judul: string;
  isi_edukasi: string;
}

const EdukasiDetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<EdukasiItem | null>(null);

  useEffect(() => {
    apiClient.get(`/edukasi/${id}`).then(res => setData(res.data)).catch(console.error);
  }, [id]);

  if (!data) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-[#08F]">
      <div className="bg-[#08F] text-white p-4 flex items-center gap-4">
        <BackButton to="/user/edukasi" />
        <h2 className="text-xl font-semibold">{data.judul}</h2>
      </div>
      <div className="bg-white rounded-t-3xl p-6 mx-2 min-h-full">
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{data.isi_edukasi}</p>
      </div>
    </div>
  );
};

export default EdukasiDetailPage;
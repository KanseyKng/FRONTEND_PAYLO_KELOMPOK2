import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/shared/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import SetPinPage from './pages/auth/SetPinPage';
import DashboardUserPage from './pages/user/DashboardUserPage';
import ProfilPage from './pages/user/ProfilPage';
import EditProfilPage from './pages/user/EditProfilPage';
import ChangePasswordPage from './pages/user/ChangePasswordPage';
import ChangePinPage from './pages/user/ChangePinPage';
import SaldoPage from './pages/user/SaldoPage';
import TopUpPage from './pages/user/TopUpPage';
import TransferPage from './pages/user/TransferPage';
import QRISPage from './pages/user/QRISPage';
import QRDisplayPage from './pages/user/QRDisplayPage';
import CashflowPage from './pages/user/CashflowPage';
import EdukasiListPage from './pages/user/EdukasiListPage';
import EdukasiDetailPage from './pages/user/EdukasiDetailPage';
import MencariLokasiPage from './pages/user/MencariLokasiPage';
import MakananKhasPage from './pages/user/MakananKhasPage';
import MakananDetailPage from './pages/user/MakananDetailPage';
import KerajinanPage from './pages/user/KerajinanPage';
import KerajinanDetailPage from './pages/user/KerajinanDetailPage';
import DashboardAdminPage from './pages/admin/DashboardAdminPage';
import KelolaUserPage from './pages/admin/KelolaUserPage';
import FormUserPage from './pages/admin/FormUserPage';
import MonitoringTransaksiPage from './pages/admin/MonitoringTransaksiPage';
import DetailTransaksiPage from './pages/admin/DetailTransaksiPage';
import PengaturanPage from './pages/admin/PengaturanPage';
import KelolaUMKMPage from './pages/admin/KelolaUMKMPage';
import FormUMKMPage from './pages/admin/FormUMKMPage';
import KelolaEdukasiPage from './pages/admin/KelolaEdukasiPage';
import FormEdukasiPage from './pages/admin/FormEdukasiPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/set-pin" element={<ProtectedRoute><SetPinPage /></ProtectedRoute>} />

          {/* User Pelanggan/Turis */}
          <Route path="/user" element={<ProtectedRoute role="pelanggan/turis"><DashboardUserPage /></ProtectedRoute>} />
          <Route path="/user/profil" element={<ProtectedRoute role="pelanggan/turis"><ProfilPage /></ProtectedRoute>} />
          <Route path="/user/profil/ubah" element={<ProtectedRoute role="pelanggan/turis"><EditProfilPage /></ProtectedRoute>} />
          <Route path="/user/profil/ubah-password" element={<ProtectedRoute role="pelanggan/turis"><ChangePasswordPage /></ProtectedRoute>} />
          <Route path="/user/profil/ubah-pin" element={<ProtectedRoute role="pelanggan/turis"><ChangePinPage /></ProtectedRoute>} />
          <Route path="/user/saldo" element={<ProtectedRoute role="pelanggan/turis"><SaldoPage /></ProtectedRoute>} />
          <Route path="/user/saldo/topup" element={<ProtectedRoute role="pelanggan/turis"><TopUpPage /></ProtectedRoute>} />
          <Route path="/user/saldo/transfer" element={<ProtectedRoute role="pelanggan/turis"><TransferPage /></ProtectedRoute>} />
          <Route path="/user/qris" element={<ProtectedRoute role="pelanggan/turis"><QRISPage /></ProtectedRoute>} />
          <Route path="/user/qris/tampilkan" element={<ProtectedRoute role="pelanggan/turis"><QRDisplayPage /></ProtectedRoute>} />
          <Route path="/user/cashflow" element={<ProtectedRoute role="pelanggan/turis"><CashflowPage /></ProtectedRoute>} />
          <Route path="/user/edukasi" element={<ProtectedRoute role="pelanggan/turis"><EdukasiListPage /></ProtectedRoute>} />
          <Route path="/user/edukasi/:id" element={<ProtectedRoute role="pelanggan/turis"><EdukasiDetailPage /></ProtectedRoute>} />
          <Route path="/user/umkm" element={<ProtectedRoute role="pelanggan/turis"><MencariLokasiPage /></ProtectedRoute>} />
          <Route path="/user/umkm/makanan" element={<ProtectedRoute role="pelanggan/turis"><MakananKhasPage /></ProtectedRoute>} />
          <Route path="/user/umkm/makanan/:id" element={<ProtectedRoute role="pelanggan/turis"><MakananDetailPage /></ProtectedRoute>} />
          <Route path="/user/umkm/kerajinan" element={<ProtectedRoute role="pelanggan/turis"><KerajinanPage /></ProtectedRoute>} />
          <Route path="/user/umkm/kerajinan/:id" element={<ProtectedRoute role="pelanggan/turis"><KerajinanDetailPage /></ProtectedRoute>} />

          {/* Super Admin */}
          <Route path="/admin" element={<ProtectedRoute role="super_admin"><DashboardAdminPage /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute role="super_admin"><KelolaUserPage /></ProtectedRoute>} />
          <Route path="/admin/users/tambah" element={<ProtectedRoute role="super_admin"><FormUserPage /></ProtectedRoute>} />
          <Route path="/admin/users/edit/:id" element={<ProtectedRoute role="super_admin"><FormUserPage /></ProtectedRoute>} />
          <Route path="/admin/transaksi" element={<ProtectedRoute role="super_admin"><MonitoringTransaksiPage /></ProtectedRoute>} />
          <Route path="/admin/transaksi/:id" element={<ProtectedRoute role="super_admin"><DetailTransaksiPage /></ProtectedRoute>} />
          <Route path="/admin/pengaturan" element={<ProtectedRoute role="super_admin"><PengaturanPage /></ProtectedRoute>} />
          <Route path="/admin/umkm" element={<ProtectedRoute role="super_admin"><KelolaUMKMPage /></ProtectedRoute>} />
          <Route path="/admin/umkm/tambah" element={<ProtectedRoute role="super_admin"><FormUMKMPage /></ProtectedRoute>} />
          <Route path="/admin/umkm/edit/:id" element={<ProtectedRoute role="super_admin"><FormUMKMPage /></ProtectedRoute>} />
          <Route path="/admin/edukasi" element={<ProtectedRoute role="super_admin"><KelolaEdukasiPage /></ProtectedRoute>} />
          <Route path="/admin/edukasi/tambah" element={<ProtectedRoute role="super_admin"><FormEdukasiPage /></ProtectedRoute>} />
          <Route path="/admin/edukasi/edit/:id" element={<ProtectedRoute role="super_admin"><FormEdukasiPage /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
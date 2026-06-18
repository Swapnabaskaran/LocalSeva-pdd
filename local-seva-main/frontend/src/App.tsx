import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { Navbar } from './components/common/Navbar';
import { BottomNav } from './components/common/BottomNav';
import { Sidebar } from './components/common/Sidebar';
import { AIChat } from './components/common/AIChat';

// Import Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Home } from './pages/customer/Home';
import { BookingFlow } from './pages/customer/BookingFlow';
import { BookingDetail } from './pages/customer/BookingDetail';
import { BookingsList } from './pages/customer/BookingsList';
import { WalletPage } from './pages/customer/Wallet';
import { ProfilePage } from './pages/customer/Profile';
import { WorkerDashboard } from './pages/worker/Dashboard';
import { AdminDashboard } from './pages/admin/Dashboard';

// Common Screens
import { Settings } from './pages/common/Settings';
import { Notifications } from './pages/common/Notifications';
import { HelpSupport } from './pages/common/HelpSupport';
import { PaymentMethods } from './pages/common/PaymentMethods';
import { ReviewsRatings } from './pages/common/ReviewsRatings';
import { Chat } from './pages/common/Chat';

// Worker Dashboard Expansion Screens
import { Earnings } from './pages/worker/Earnings';
import { Schedule } from './pages/worker/Schedule';
import { Catalog } from './pages/worker/Catalog';
import { Reviews } from './pages/worker/Reviews';
import { Training } from './pages/worker/Training';

// 1. Protected Route Wrapper Scoping Roles
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, token } = useAuthStore();

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect unauthorized roles back to respective dashboard cockpits
    if (user.role === 'worker') return <Navigate to="/worker" replace />;
    if (user.role === 'admin' || user.role === 'superadmin') return <Navigate to="/admin" replace />;
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  const { syncProfile, isAuthenticated } = useAuthStore();

  // Run session check on initial mount
  useEffect(() => {
    if (isAuthenticated) {
      syncProfile();
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
        
        {/* Navigation Top Header */}
        <Navbar />

        {/* Dynamic Inner Layout Body */}
        <div className="flex-grow flex">
          <Routes>
            {/* PUBLIC AUTH ROUTES */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* CUSTOMER PORTAL PROTECTED ROUTES */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <div className="w-full relative">
                    <Home />
                    <AIChat />
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/bookings" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <BookingsList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/bookings/:id" 
              element={
                <ProtectedRoute allowedRoles={['customer', 'worker', 'admin', 'superadmin']}>
                  <BookingDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/booking-flow" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <BookingFlow />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/wallet" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <WalletPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />

            {/* COMMON PROTECTED ROUTES */}
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/help" element={<ProtectedRoute><HelpSupport /></ProtectedRoute>} />
            <Route path="/payments" element={<ProtectedRoute><PaymentMethods /></ProtectedRoute>} />
            <Route path="/reviews" element={<ProtectedRoute><ReviewsRatings /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />

            {/* WORKER DASHBOARD CONTROLLER */}
            <Route 
              path="/worker" 
              element={
                <ProtectedRoute allowedRoles={['worker']}>
                  <WorkerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/worker/earnings" element={<ProtectedRoute allowedRoles={['worker']}><Earnings /></ProtectedRoute>} />
            <Route path="/worker/schedule" element={<ProtectedRoute allowedRoles={['worker']}><Schedule /></ProtectedRoute>} />
            <Route path="/worker/catalog" element={<ProtectedRoute allowedRoles={['worker']}><Catalog /></ProtectedRoute>} />
            <Route path="/worker/reviews" element={<ProtectedRoute allowedRoles={['worker']}><Reviews /></ProtectedRoute>} />
            <Route path="/worker/training" element={<ProtectedRoute allowedRoles={['worker']}><Training /></ProtectedRoute>} />

            {/* ADMINISTRATIVE COMMAND PORTAL */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
                  <div className="flex w-full">
                    {/* Left vertical sidebar */}
                    <Sidebar />
                    <div className="flex-grow overflow-y-auto">
                      <Routes>
                        <Route path="/" element={<AdminDashboard />} />
                        <Route path="/bookings" element={<AdminDashboard />} />
                        <Route path="/workers" element={<AdminDashboard />} />
                        <Route path="/customers" element={<AdminDashboard />} />
                        {/* Fallbacks */}
                        <Route path="*" element={<AdminDashboard />} />
                      </Routes>
                    </div>
                  </div>
                </ProtectedRoute>
              } 
            />

            {/* Wildcard Fallbacks */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Mobile Tab Drawer Navigation bar */}
        <BottomNav />
      </div>
    </Router>
  );
};

export default App;

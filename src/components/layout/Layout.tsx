import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Users, Package, BarChart3, LogOut, Store, Bell } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/pos', icon: ShoppingCart, label: 'POS' },
    { path: '/customers', icon: Users, label: 'Loans' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/reports', icon: BarChart3, label: 'Reports' },
  ];

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-20">
      {/* Header - Enhanced with better design */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Shop Info - Left Side */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-3d-sm">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-800">Abdi Shop</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Open
                </span>
              </div>
              <p className="text-xs text-gray-500">Since 8:00 AM</p>
            </div>
          </div>

          {/* Right Side Actions - Notification & Logout */}
          <div className="flex items-center gap-2">
            {/* Notification Bell - Optional enhancement */}
            <button className="touch-target p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 relative">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* Enhanced Logout Button */}
            <button
              onClick={handleLogout}
              className="group relative flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 rounded-lg transition-all duration-200 touch-target border border-red-200 hover:border-red-300 shadow-sm hover:shadow-md"
            >
              <LogOut className="w-4 h-4 text-red-600 group-hover:text-red-700 transition-colors" />
              <span className="text-sm font-medium text-red-600 group-hover:text-red-700 hidden sm:inline">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pb-4">
        {children}
      </main>

      {/* Enhanced Bottom Navigation with 3D effects */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <div className="flex justify-around items-center px-2 py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 touch-target ${
                  isActive
                    ? 'text-emerald-600 bg-emerald-50 shadow-3d-sm -translate-y-1'
                    : 'text-gray-500 hover:text-emerald-600 hover:bg-gray-50 hover:-translate-y-0.5'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'fill-emerald-100' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute -bottom-1 w-6 h-0.5 bg-emerald-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
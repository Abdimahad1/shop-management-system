import React from 'react';
import { TrendingUp, Users, AlertTriangle, ChevronRight, Plus, UserPlus, ArrowRight, DollarSign, CreditCard, ShoppingBag, Wallet } from 'lucide-react';
import { mockActivity } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

export const DashboardScreen: React.FC = () => {
  const navigate = useNavigate();
  
  const stats = {
    totalSales: 805,
    activeLoans: 4710,
    lowStock: 1,
    activeCustomers: 4,
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'cash':
        return <DollarSign className="w-5 h-5 text-green-500" />;
      case 'loan':
        return <CreditCard className="w-5 h-5 text-orange-500" />;
      case 'payment':
        return <Wallet className="w-5 h-5 text-blue-500" />;
      default:
        return <TrendingUp className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-24">
      {/* Stats Cards - 2x2 Grid - All White with Colored Icons */}
      <div className="grid grid-cols-2 gap-4 px-4 pt-4">
        {/* Sales Today Card */}
        <div className="card-3d bg-white rounded-2xl p-4 hover:shadow-3d-hover transition-all transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-3d-sm">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">Today</span>
          </div>
          <p className="text-gray-500 text-sm">Sales Today</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">${stats.totalSales}</p>
          <p className="text-xs text-gray-400 mt-2">Cash received</p>
        </div>

        {/* Active Loans Card */}
        <div className="card-3d bg-white rounded-2xl p-4 hover:shadow-3d-hover transition-all transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center shadow-3d-sm">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full font-medium">Active</span>
          </div>
          <p className="text-gray-500 text-sm">Active Loans</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">${stats.activeLoans}</p>
          <p className="text-xs text-gray-400 mt-2">{stats.activeCustomers} customers</p>
        </div>

        {/* New Cash Sale Card */}
        <div 
          onClick={() => navigate('/pos')}
          className="card-3d bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 cursor-pointer hover:shadow-3d-hover transition-all group transform hover:-translate-y-1"
        >
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 shadow-3d-sm">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <p className="text-white font-bold text-base">New Cash Sale</p>
          <div className="flex items-center justify-between mt-3">
            <p className="text-emerald-100 text-xs">Walk-in customer</p>
            <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* New Loan Customer Card */}
        <div 
          onClick={() => navigate('/customers')}
          className="card-3d bg-white border-2 border-emerald-500 rounded-2xl p-4 cursor-pointer hover:shadow-3d-hover transition-all group transform hover:-translate-y-1"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center mb-3 shadow-3d-sm">
            <UserPlus className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-gray-800 font-bold text-base">New Loan Customer</p>
          <div className="flex items-center justify-between mt-3">
            <p className="text-gray-500 text-xs">Register & sell</p>
            <ArrowRight className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>

      {/* Low Stock Alert Card - White with Red Left Border Only */}
      {stats.lowStock > 0 && (
        <div 
          onClick={() => navigate('/products')}
          className="card-3d bg-white rounded-2xl p-4 mx-4 mt-2 border-l-4 border-l-red-500 cursor-pointer hover:shadow-3d-hover transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center shadow-3d-sm">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="font-bold text-gray-800">Low Stock Alert</p>
                <p className="text-sm text-gray-500">{stats.lowStock} item below threshold</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-medium btn-3d hover:from-red-600 hover:to-red-700 transition-all shadow-md">
              View
            </button>
          </div>
        </div>
      )}

      {/* Recent Activity - Same Color Cards, Different Icons */}
      <div className="px-4 mt-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-gray-800 text-lg">Recent Activity</h2>
          <button className="text-emerald-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            See all
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-3">
          {mockActivity.slice(0, 5).map((activity) => (
            <div 
              key={activity.id} 
              className="card-3d bg-white rounded-2xl p-4 hover:shadow-3d-hover transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-3d-sm">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      {activity.description || activity.customerName}
                      {activity.type === 'loan' && ' (Loan)'}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {activity.type === 'cash' ? 'Cash sale' : activity.type === 'loan' ? 'Loan sale' : 'Loan payment'} · {activity.time}
                    </p>
                  </div>
                  <p className={`font-bold text-xl ${
                    activity.type === 'payment' ? 'text-red-500' : 'text-green-600'
                  }`}>
                    {activity.type === 'payment' ? '-' : '+'}${activity.amount}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 ml-2" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-2 gap-3 px-4 mt-4">
        <div className="card-3d bg-white rounded-2xl p-3 text-center hover:shadow-3d-hover transition-all transform hover:-translate-y-0.5">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-3d-sm">
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">+12%</p>
          <p className="text-xs text-gray-500">vs last week</p>
        </div>
        <div className="card-3d bg-white rounded-2xl p-3 text-center hover:shadow-3d-hover transition-all transform hover:-translate-y-0.5">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-3d-sm">
            <ShoppingBag className="w-5 h-5 text-teal-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">32</p>
          <p className="text-xs text-gray-500">total transactions</p>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { TrendingUp, Users, Download, ChevronRight, DollarSign, CreditCard, Award, Clock } from 'lucide-react';

export const ReportsScreen: React.FC = () => {
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today');

  const stats = {
    totalSales: 2810,
    cashSales: 1185,
    loanSales: 1625,
    outstandingLoans: 3460,
    loanCustomers: 4,
  };

  const topProducts = [
    { id: 1, name: "Milk", sold: 42, revenue: 2520, icon: "🥛" },
    { id: 2, name: "Bread", sold: 31, revenue: 1240, icon: "🍞" },
    { id: 3, name: "Rice 1kg", sold: 18, revenue: 1440, icon: "🍚" },
    { id: 4, name: "Eggs", sold: 28, revenue: 2520, icon: "🥚" },
  ];

  const recentTransactions = [
    { id: 1, type: 'payment', subtype: 'PAID', amount: 1545, customer: 'Rajesh Kumar', time: '16:34', date: 'Today', isPositive: false },
    { id: 2, type: 'payment', subtype: 'PAID', amount: 80, customer: 'Rajesh Kumar', time: '16:34', date: 'Today', isPositive: false },
    { id: 3, type: 'cash', subtype: 'CASH', amount: 150, customer: 'Walk-in customer', time: '16:33', date: 'Today', isPositive: true },
    { id: 4, type: 'loan', subtype: 'LOAN', amount: 375, customer: 'Rajesh Kumar', time: '16:32', date: 'Today', isPositive: true },
    { id: 5, type: 'cash', subtype: 'CASH', amount: 230, customer: 'Walk-in customer', time: '16:32', date: 'Today', isPositive: true },
  ];

  const getPeriodLabel = () => {
    switch (period) {
      case 'today': return 'Today';
      case 'week': return 'This Week';
      case 'month': return 'This Month';
      default: return 'Today';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
              <p className="text-sm text-gray-500 mt-1">{getPeriodLabel()} · Quick analytics</p>
            </div>
            <button className="btn-3d bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-emerald-600 transition-all">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Period Selector */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
          {(['today', 'week', 'month'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-2.5 rounded-xl font-medium transition-all ${
                period === p
                  ? 'bg-white shadow-md text-emerald-600 font-semibold'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        {/* Today's Sales Card */}
        <div className="card-3d bg-white rounded-2xl p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500">TODAY'S SALES</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">${stats.totalSales}</p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          
          <div className="flex gap-6 mt-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-green-600" />
                <p className="text-xs text-gray-500">CASH</p>
              </div>
              <p className="text-xl font-bold text-gray-800">${stats.cashSales}</p>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CreditCard className="w-4 h-4 text-orange-600" />
                <p className="text-xs text-gray-500">LOAN</p>
              </div>
              <p className="text-xl font-bold text-gray-800">${stats.loanSales}</p>
            </div>
          </div>
        </div>

        {/* Outstanding Loans Card */}
        <div className="card-3d bg-gradient-to-br from-orange-50 to-white rounded-2xl p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-orange-600 font-medium">OUTSTANDING LOANS</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">${stats.outstandingLoans}</p>
              <p className="text-sm text-gray-500 mt-1">{stats.loanCustomers} customers</p>
            </div>
            <div className="w-12 h-12 bg-orange-200 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="card-3d bg-white rounded-2xl p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-500">Top Selling</p>
              <p className="text-lg font-bold text-gray-800">7 days</p>
            </div>
            <Award className="w-5 h-5 text-emerald-500" />
          </div>
          
          <div className="space-y-3">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                    {product.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{product.name}</p>
                    <p className="text-xs text-gray-400">{product.sold} sold</p>
                  </div>
                </div>
                <p className="font-bold text-emerald-600">${product.revenue}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card-3d bg-white rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">Recent Transactions</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      transaction.subtype === 'CASH' ? 'bg-green-100' :
                      transaction.subtype === 'LOAN' ? 'bg-orange-100' :
                      'bg-blue-100'
                    }`}>
                      {transaction.subtype === 'CASH' && <DollarSign className="w-5 h-5 text-green-600" />}
                      {transaction.subtype === 'LOAN' && <CreditCard className="w-5 h-5 text-orange-600" />}
                      {transaction.subtype === 'PAID' && <Clock className="w-5 h-5 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          transaction.subtype === 'CASH' ? 'bg-green-100 text-green-700' :
                          transaction.subtype === 'LOAN' ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {transaction.subtype}
                        </span>
                        <span className="text-xs text-gray-400">{transaction.time}</span>
                      </div>
                      <p className="font-medium text-gray-800 mt-1">{transaction.customer}</p>
                      <p className="text-xs text-gray-400">
                        {transaction.subtype === 'PAID' ? 'Loan payment' : 
                         transaction.subtype === 'CASH' ? 'Cash sale' : 'Loan sale'} · {transaction.time}
                      </p>
                    </div>
                    <p className={`font-bold text-lg ${
                      transaction.isPositive ? 'text-green-600' : 'text-red-500'
                    }`}>
                      {transaction.isPositive ? '+' : '-'}${transaction.amount}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
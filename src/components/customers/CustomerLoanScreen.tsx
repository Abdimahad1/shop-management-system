import React, { useState } from 'react';
import { Search, Phone, X, CheckCircle, AlertCircle, UserPlus } from 'lucide-react';
import type { Customer } from '@/types';

// Somali customer data
const somaliCustomers: Customer[] = [
  { id: 1, name: "Ahmed Hassan", phone: "0612345678", balance: 1625, lastPayment: "2026-06-03", address: "Wadajir District" },
  { id: 2, name: "Fartun Ali", phone: "0612345679", balance: 450, lastPayment: "2026-06-01", address: "Hodan District" },
  { id: 3, name: "Mohamed Abdi", phone: "0612345680", balance: 2890, lastPayment: "", address: "Yaqshid District" },
  { id: 4, name: "Sahra Ibrahim", phone: "0612345681", balance: 890, lastPayment: "2026-06-02", address: "KM4" },
  { id: 5, name: "Omar Jama", phone: "0612345682", balance: 3400, lastPayment: "2026-05-30", address: "Hamargahab" },
];

export const CustomerLoanScreen: React.FC = () => {
  const [customers, setCustomers] = useState(somaliCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [confirmAction, setConfirmAction] = useState<{ type: 'payment' | 'full_payment'; amount: number } | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', address: '', notes: '' });

  const totalOutstanding = customers.reduce((sum, c) => sum + c.balance, 0);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  const handleRecordPayment = (customer: Customer) => {
    setSelectedCustomer(customer);
    setPaymentAmount('');
  };

  const handleNumberClick = (num: string) => {
    if (num === '.' && paymentAmount.includes('.')) return;
    setPaymentAmount(prev => prev + num);
  };

  const handleClear = () => {
    setPaymentAmount('');
  };

  const handleDeleteLast = () => {
    setPaymentAmount(prev => prev.slice(0, -1));
  };

  const handlePaymentClick = () => {
    if (!paymentAmount || parseInt(paymentAmount) === 0) {
      setWarningMessage('Please enter an amount');
      setShowWarningModal(true);
      return;
    }
    
    const amount = parseInt(paymentAmount);
    if (selectedCustomer && amount > selectedCustomer.balance) {
      setWarningMessage(`Payment cannot exceed balance of $${selectedCustomer.balance}`);
      setShowWarningModal(true);
      return;
    }
    
    setConfirmAction({ type: 'payment', amount });
    setShowConfirmModal(true);
  };

  const handleFullPaymentClick = () => {
    if (selectedCustomer) {
      setConfirmAction({ type: 'full_payment', amount: selectedCustomer.balance });
      setShowConfirmModal(true);
    }
  };

  const confirmPayment = () => {
    if (!selectedCustomer || !confirmAction) return;
    
    const amount = confirmAction.amount;
    const newBalance = selectedCustomer.balance - amount;
    
    setCustomers(customers.map(c =>
      c.id === selectedCustomer.id
        ? { ...c, balance: newBalance, lastPayment: new Date().toISOString().split('T')[0] }
        : c
    ));
    
    setSuccessMessage(`$${amount} received from ${selectedCustomer.name}`);
    setSelectedCustomer(null);
    setPaymentAmount('');
    setShowConfirmModal(false);
    setConfirmAction(null);
    setShowSuccessModal(true);
  };

  const handleCreateCustomer = () => {
    if (!newCustomer.name || !newCustomer.phone) {
      setWarningMessage('Please fill in name and phone number');
      setShowWarningModal(true);
      return;
    }
    
    if (!/^\d{10}$/.test(newCustomer.phone)) {
      setWarningMessage('Please enter a valid 10-digit phone number');
      setShowWarningModal(true);
      return;
    }
    
    const customer: Customer = {
      id: Date.now(),
      name: newCustomer.name,
      phone: newCustomer.phone,
      balance: 0,
      address: newCustomer.address,
      lastPayment: '',
    };
    
    setCustomers([...customers, customer]);
    setShowNewCustomerModal(false);
    setNewCustomer({ name: '', phone: '', address: '', notes: '' });
    setSuccessMessage(`${customer.name} has been added`);
    setShowSuccessModal(true);
  };

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getPaymentStatus = (customer: Customer) => {
    if (!customer.lastPayment) {
      return { text: 'No payments yet', color: 'text-red-500', isOverdue: true };
    }
    const days = Math.floor((new Date().getTime() - new Date(customer.lastPayment).getTime()) / (1000 * 3600 * 24));
    if (days <= 7) {
      return { text: `Paid ${days} ${days === 1 ? 'day' : 'days'} ago`, color: 'text-green-600', isOverdue: false };
    } else {
      return { text: 'OVERDUE', color: 'text-red-500', isOverdue: true };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Customer Loans</h1>
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-gray-500">Total outstanding</p>
            <p className="text-2xl font-bold text-orange-600">${totalOutstanding.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all text-base"
          />
        </div>

        {/* New Customer Button */}
        <button
          onClick={() => setShowNewCustomerModal(true)}
          className="w-full btn-3d bg-emerald-500 text-white py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all"
        >
          <UserPlus className="w-5 h-5" />
          + New Loan Customer
        </button>

        {/* Customer Cards */}
        <div className="space-y-3">
          {filteredCustomers.map((customer) => {
            const status = getPaymentStatus(customer);
            return (
              <div key={customer.id} className="card-3d bg-white rounded-2xl p-4 hover:shadow-3d-hover transition-all">
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-3d-sm">
                    <span className="text-2xl font-bold text-white">{getInitial(customer.name)}</span>
                  </div>
                  
                  {/* Customer Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{customer.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                          <Phone className="w-3 h-3" />
                          <span>{customer.phone}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs font-medium ${status.color}`}>{status.text}</p>
                        <p className="text-xl font-bold text-orange-600 mt-1">
                          {status.isOverdue ? 'OVERDUE' : 'OWES'} ${customer.balance.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleRecordPayment(customer)}
                      className="mt-3 w-full bg-emerald-50 border border-emerald-200 text-emerald-700 py-2.5 rounded-xl font-medium text-sm hover:bg-emerald-100 hover:border-emerald-300 transition-all btn-3d"
                    >
                      Record Payment
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

        {/* Payment Bottom Sheet with Numeric Keypad - IMPROVED LAYOUT */}
        {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
            <div className="bg-white w-full rounded-t-3xl animate-slide-up max-h-[85vh] overflow-y-auto">
            
            {/* Header - Close button only */}
            <div className="sticky top-0 bg-white rounded-t-3xl z-10">
                <div className="flex justify-end p-4">
                <button 
                    onClick={() => setSelectedCustomer(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-6 h-6 text-gray-500" />
                </button>
                </div>
            </div>

            {/* Customer Name */}
            <div className="text-center px-6 mb-6">
                <p className="text-gray-500 text-sm">RECORD PAYMENT FOR</p>
                <p className="text-2xl font-bold text-gray-800">{selectedCustomer.name}</p>
            </div>

            {/* Current Balance & Amount Received - SAME ROW */}
            <div className="grid grid-cols-2 gap-4 px-6 mb-6">
                {/* Current Balance Card */}
                <div className="bg-orange-50 rounded-2xl p-4 text-center border border-orange-200">
                <p className="text-xs text-orange-600 font-medium mb-1">CURRENT BALANCE</p>
                <p className="text-2xl font-bold text-orange-600">${selectedCustomer.balance.toFixed(2)}</p>
                </div>
                
                {/* Amount Received Card */}
                <div className="bg-emerald-50 rounded-2xl p-4 text-center border border-emerald-200">
                <p className="text-xs text-emerald-600 font-medium mb-1">AMOUNT RECEIVED</p>
                <p className="text-2xl font-bold text-emerald-600">${paymentAmount || '0.00'}</p>
                </div>
            </div>

            {/* Numeric Keypad */}
            <div className="px-6 pb-8">
                <div className="grid grid-cols-3 gap-3 mb-6">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((key) => (
                    <button
                    key={key}
                    onClick={() => handleNumberClick(key)}
                    className="py-4 text-2xl font-semibold text-gray-700 bg-gray-50 rounded-xl hover:bg-gray-100 active:scale-95 transition-all shadow-sm"
                    >
                    {key}
                    </button>
                ))}
                <button
                    onClick={() => handleNumberClick('0')}
                    className="py-4 text-2xl font-semibold text-gray-700 bg-gray-50 rounded-xl hover:bg-gray-100 active:scale-95 transition-all shadow-sm"
                >
                    0
                </button>
                <button
                    onClick={handleDeleteLast}
                    className="py-4 text-xl font-semibold text-gray-700 bg-gray-50 rounded-xl hover:bg-gray-100 active:scale-95 transition-all shadow-sm"
                >
                    ⌫
                </button>
                <button
                    onClick={handleClear}
                    className="py-4 text-xl font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 active:scale-95 transition-all shadow-sm"
                >
                    C
                </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-3">
                <button
                    onClick={handleFullPaymentClick}
                    className="flex-1 py-4 border-2 border-emerald-500 text-emerald-600 rounded-xl font-semibold text-base hover:bg-emerald-50 transition-all btn-3d"
                >
                    Full Paid
                </button>
                <button
                    onClick={handlePaymentClick}
                    className="flex-1 btn-3d bg-emerald-500 text-white py-4 rounded-xl font-semibold text-base hover:bg-emerald-600 transition-all"
                >
                    Pay ${paymentAmount || '0.00'}
                </button>
                </div>
                
                <button
                onClick={() => setSelectedCustomer(null)}
                className="w-full py-3 text-gray-500 font-medium hover:text-gray-700 transition-colors"
                >
                Cancel
                </button>
            </div>
            </div>
        </div>
        )}

      {/* Warning Modal */}
      {showWarningModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 animate-scale-in">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Warning</h3>
              <p className="text-gray-600 mb-6">{warningMessage}</p>
              <button
                onClick={() => setShowWarningModal(false)}
                className="w-full btn-3d bg-emerald-500 text-white py-3 rounded-xl font-semibold"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 animate-scale-in">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Confirm Payment</h3>
              <p className="text-gray-600 mb-2">
                Are you sure you want to record this payment?
              </p>
              <div className="bg-gray-50 rounded-xl p-3 mb-4 w-full">
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-semibold text-gray-800">{selectedCustomer?.name}</p>
                <p className="text-sm text-gray-500 mt-2">Amount</p>
                <p className="text-xl font-bold text-emerald-600">${confirmAction?.amount.toFixed(2)}</p>
              </div>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => {
                    setShowConfirmModal(false);
                    setConfirmAction(null);
                  }}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmPayment}
                  className="flex-1 btn-3d bg-emerald-500 text-white py-3 rounded-xl font-semibold"
                >
                  Yes, Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Customer Modal */}
      {showNewCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">New Loan Customer</h2>
                <button 
                  onClick={() => setShowNewCustomerModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4 pb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CUSTOMER NAME *</label>
                <input
                  type="text"
                  placeholder="e.g. Ahmed Hassan"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PHONE NUMBER *</label>
                <input
                  type="tel"
                  placeholder="10-digit number"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ADDRESS (OPTIONAL)</label>
                <input
                  type="text"
                  placeholder="Street, Area"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">NOTES (OPTIONAL)</label>
                <textarea
                  placeholder="Anything to remember"
                  value={newCustomer.notes}
                  onChange={(e) => setNewCustomer({ ...newCustomer, notes: e.target.value })}
                  rows={3}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowNewCustomerModal(false)}
                  className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCustomer}
                  className="flex-1 btn-3d bg-emerald-500 text-white py-4 rounded-xl font-semibold text-base hover:bg-emerald-600 transition-all"
                >
                  Create Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 animate-scale-in">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Success!</h3>
              <p className="text-gray-600 mb-6">{successMessage}</p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full btn-3d bg-emerald-500 text-white py-3 rounded-xl font-semibold"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
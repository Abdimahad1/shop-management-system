import React, { useState } from 'react';
import { Search, Plus, Minus, CreditCard, Users as UsersIcon, X, ShoppingBag, User, ChevronDown, Check, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { mockProducts } from '@/data/mockData';
import type { Product, CartItem, Customer } from '@/types';

// Somali customer data
const somaliCustomers: Customer[] = [
  { id: 1, name: "Ahmed Hassan", phone: "0612345678", balance: 1250, lastPayment: "2026-06-03", address: "Wadajir District" },
  { id: 2, name: "Fartun Ali", phone: "0612345679", balance: 450, lastPayment: "2026-06-01", address: "Hodan District" },
  { id: 3, name: "Mohamed Abdi", phone: "0612345680", balance: 2300, lastPayment: "2026-05-28", address: "Yaqshid District" },
  { id: 4, name: "Sahra Ibrahim", phone: "0612345681", balance: 890, lastPayment: "2026-06-02", address: "KM4" },
  { id: 5, name: "Omar Jama", phone: "0612345682", balance: 3400, lastPayment: "2026-05-30", address: "Hamargahab" },
];

export const POSScreen: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCustomerSelector, setShowCustomerSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [paymentType, setPaymentType] = useState<'cash' | 'loan' | null>(null);
  const [successMessage, setSuccessMessage] = useState({ title: '', message: '' });
  const [warningMessage, setWarningMessage] = useState('');

  const filteredProducts = mockProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCustomers = somaliCustomers.filter(c => 
    c.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    c.phone.includes(customerSearchTerm)
  );

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    // Don't auto-show cart - just show the floating button
  };

  const updateQuantity = (productId: number, delta: number) => {
    const item = cart.find(i => i.product.id === productId);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity <= 0) {
        setCart(cart.filter(i => i.product.id !== productId));
      } else {
        setCart(cart.map(i =>
          i.product.id === productId ? { ...i, quantity: newQuantity } : i
        ));
      }
    }
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCashPaymentClick = () => {
    if (cart.length === 0) {
      setWarningMessage('Cart is empty. Please add items first.');
      setShowWarningModal(true);
      return;
    }
    setPaymentType('cash');
    setShowConfirmationModal(true);
  };

  const handleLoanPaymentClick = () => {
    if (cart.length === 0) {
      setWarningMessage('Cart is empty. Please add items first.');
      setShowWarningModal(true);
      return;
    }
    if (!selectedCustomer) {
      setWarningMessage('Please select a registered customer for loan.\n\nFor cash sales, use "Full Cash Paid" button.');
      setShowWarningModal(true);
      return;
    }
    setPaymentType('loan');
    setShowConfirmationModal(true);
  };

  const confirmPayment = () => {
    setShowConfirmationModal(false);
    
    if (paymentType === 'cash') {
      setSuccessMessage({
        title: 'Sale Complete!',
        message: `$${total} received from ${selectedCustomer?.name || 'Walk-in Customer'}`,
      });
      setCart([]);
      setSelectedCustomer(null);
      setShowCart(false);
    } else if (paymentType === 'loan' && selectedCustomer) {
      setSuccessMessage({
        title: 'Loan Added Successfully!',
        message: `$${total} added to ${selectedCustomer.name}'s loan.\nNew balance: $${selectedCustomer.balance + total}`,
      });
      setCart([]);
      setSelectedCustomer(null);
      setShowCart(false);
    }
    
    setShowSuccessModal(true);
    setPaymentType(null);
  };

  const selectCustomer = (customer: Customer | null) => {
    setSelectedCustomer(customer);
    setShowCustomerSelector(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">New Sale</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Customer Selector Card */}
        <div 
          onClick={() => setShowCustomerSelector(true)}
          className="card-3d bg-white rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:shadow-3d-hover transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">CUSTOMER</p>
              <p className="font-semibold text-gray-800">
                {selectedCustomer ? selectedCustomer.name : 'Walk-in Customer'}
              </p>
              {selectedCustomer && (
                <p className="text-xs text-orange-600">Owes ${selectedCustomer.balance}</p>
              )}
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all text-base"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="card-3d bg-white rounded-2xl p-4 hover:shadow-3d-hover transition-all"
            >
              <div className="text-5xl mb-3">{product.image}</div>
              <p className="font-bold text-gray-800 text-lg">{product.name}</p>
              <p className="text-emerald-600 font-bold text-2xl mt-1">${product.price.toFixed(2)}</p>
              <div className="flex items-center justify-between mt-3">
                <p className={`text-sm ${product.stock < 5 ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
                  {product.stock} left
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="px-5 py-2.5 bg-emerald-500 text-white rounded-xl text-sm font-semibold btn-3d hover:bg-emerald-600 transition-all"
                >
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* Floating Cart Button - Green Card with View Icon */}
        {cart.length > 0 && !showCart && (
        <div 
            onClick={() => setShowCart(true)}
            className="fixed bottom-24 left-4 right-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-4 shadow-3d-lg cursor-pointer animate-slide-up hover:shadow-3d-hover transition-all"
        >
            <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                <p className="font-semibold text-base">{itemCount} items</p>
                <p className="text-sm text-emerald-100">in cart</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <p className="text-2xl font-bold">${total}</p>
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                <Eye className="w-4 h-4" />
                </div>
            </div>
            </div>
        </div>
        )}

      {/* Cart Drawer */}
      {showCart && cart.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white rounded-t-3xl mt-20 flex-1 flex flex-col animate-slide-up">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Current Cart</h2>
                <p className="text-sm text-gray-500">{itemCount} items</p>
              </div>
              <button 
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.map((item) => (
                <div key={item.product.id} className="card-3d bg-white rounded-xl p-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{item.product.image}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{item.product.name}</p>
                      <p className="text-emerald-600 font-bold">${item.product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-4 bg-white rounded-t-2xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 text-base">Total Amount</span>
                <span className="text-2xl font-bold text-emerald-600">${total.toFixed(2)}</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCashPaymentClick}
                  className="flex-1 btn-3d bg-emerald-500 text-white py-3.5 rounded-xl font-semibold text-base"
                >
                  <CreditCard className="w-5 h-5 inline mr-2" />
                  Full Cash Paid
                </button>
                <button
                  onClick={handleLoanPaymentClick}
                  className="flex-1 btn-3d bg-white border-2 border-emerald-500 text-emerald-600 py-3.5 rounded-xl font-semibold text-base"
                >
                  <UsersIcon className="w-5 h-5 inline mr-2" />
                  Add to Loan
                </button>
              </div>
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
              <p className="text-gray-600 whitespace-pre-line mb-6">{warningMessage}</p>
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
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 animate-scale-in">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Confirm Payment</h3>
              <p className="text-gray-600 mb-2">
                Are you sure this payment has been completed?
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Customer: {selectedCustomer?.name || 'Walk-in Customer'}<br />
                Amount: ${total.toFixed(2)}
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => {
                    setShowConfirmationModal(false);
                    setPaymentType(null);
                  }}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmPayment}
                  className="flex-1 btn-3d bg-emerald-500 text-white py-3 rounded-xl font-semibold"
                >
                  Yes, Complete
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
              <h3 className="text-xl font-bold text-gray-800 mb-2">{successMessage.title}</h3>
              <p className="text-gray-600 whitespace-pre-line mb-6">
                {successMessage.message}
              </p>
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

      {/* Customer Selection Modal */}
      {showCustomerSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white rounded-t-3xl mt-16 flex-1 flex flex-col animate-slide-up">
            <div className="p-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-3xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Select Customer</h2>
                <button 
                  onClick={() => setShowCustomerSelector(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or phone..."
                  value={customerSearchTerm}
                  onChange={(e) => setCustomerSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <div
                onClick={() => selectCustomer(null)}
                className={`card-3d p-4 rounded-xl cursor-pointer transition-all ${
                  !selectedCustomer ? 'border-2 border-emerald-500 bg-emerald-50' : 'bg-white hover:shadow-3d-hover'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Walk-in Customer</p>
                      <p className="text-xs text-gray-400">Cash sale only</p>
                    </div>
                  </div>
                  {!selectedCustomer && <Check className="w-5 h-5 text-emerald-500" />}
                </div>
              </div>

              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  onClick={() => selectCustomer(customer)}
                  className={`card-3d p-4 rounded-xl cursor-pointer transition-all ${
                    selectedCustomer?.id === customer.id ? 'border-2 border-emerald-500 bg-emerald-50' : 'bg-white hover:shadow-3d-hover'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <UsersIcon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{customer.name}</p>
                        <p className="text-xs text-orange-600">Owes ${customer.balance.toFixed(2)}</p>
                      </div>
                    </div>
                    {selectedCustomer?.id === customer.id && <Check className="w-5 h-5 text-emerald-500" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
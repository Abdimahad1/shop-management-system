import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Minus, Plus as PlusIcon, X, AlertCircle, CheckCircle } from 'lucide-react';
import { mockProducts } from '@/data/mockData';
import type { Product } from '@/types';

// Common product emojis
const productEmojis = [
  '🥛', '🍞', '🥚', '🍚', '🫒', '🍬', '🥤', '🍪', '🍫', '🧃',
  '🥫', '🍜', '🍕', '🥪', '🍎', '🍌', '🍊', '🥕', '🧀', '🥩'
];

export const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<number | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    image: '📦',
  });

  const totalProducts = products.length;
  const lowStockCount = products.filter(p => p.lowStock).length;

  const validateForm = () => {
    if (!formData.name.trim()) {
      setWarningMessage('Please enter product name');
      setShowWarningModal(true);
      return false;
    }
    if (!formData.price || parseInt(formData.price) <= 0) {
      setWarningMessage('Please enter a valid price (greater than 0)');
      setShowWarningModal(true);
      return false;
    }
    if (!formData.stock || parseInt(formData.stock) < 0) {
      setWarningMessage('Please enter a valid stock quantity');
      setShowWarningModal(true);
      return false;
    }
    return true;
  };

  const handleSaveProduct = () => {
    if (!validateForm()) return;

    if (editingProduct) {
      setProducts(products.map(p =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: formData.name,
              price: parseInt(formData.price),
              stock: parseInt(formData.stock),
              image: formData.image,
              lowStock: parseInt(formData.stock) < 5,
            }
          : p
      ));
      setSuccessMessage(`${formData.name} has been updated`);
    } else {
      const newProduct: Product = {
        id: Date.now(),
        name: formData.name,
        price: parseInt(formData.price),
        stock: parseInt(formData.stock),
        image: formData.image,
        lowStock: parseInt(formData.stock) < 5,
      };
      setProducts([...products, newProduct]);
      setSuccessMessage(`${formData.name} has been added`);
    }
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ name: '', price: '', stock: '', image: '📦' });
    setShowEmojiPicker(false);
    setShowSuccessModal(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      image: product.image,
    });
    setShowModal(true);
  };

  const handleDeleteClick = (id: number, name: string) => {
    setDeletingProductId(id);
    setWarningMessage(`Are you sure you want to delete "${name}"?`);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deletingProductId) {
      const deletedProduct = products.find(p => p.id === deletingProductId);
      setProducts(products.filter(p => p.id !== deletingProductId));
      setSuccessMessage(`${deletedProduct?.name} has been deleted`);
      setShowSuccessModal(true);
      setShowDeleteConfirm(false);
      setDeletingProductId(null);
    }
  };

  const updateStock = (id: number, delta: number, currentStock: number, productName: string) => {
    const newStock = currentStock + delta;
    if (newStock < 0) {
      setWarningMessage(`Cannot reduce stock below 0 for ${productName}`);
      setShowWarningModal(true);
      return;
    }
    setProducts(products.map(p =>
      p.id === id
        ? {
            ...p,
            stock: newStock,
            lowStock: newStock < 5,
          }
        : p
    ));
  };

  const selectEmoji = (emoji: string) => {
    setFormData({ ...formData, image: emoji });
    setShowEmojiPicker(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-gray-500">{totalProducts} items tracked</p>
            {lowStockCount > 0 && (
              <p className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                {lowStockCount} low stock
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Add Product Button */}
        <button
          onClick={() => {
            setEditingProduct(null);
            setFormData({ name: '', price: '', stock: '', image: '📦' });
            setShowModal(true);
          }}
          className="w-full btn-3d bg-emerald-500 text-white py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </button>

        {/* Products List */}
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className={`card-3d bg-white rounded-2xl p-4 hover:shadow-3d-hover transition-all ${
                product.lowStock ? 'border-l-4 border-l-red-500' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Product Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center shadow-3d-sm">
                  <span className="text-4xl">{product.image}</span>
                </div>
                
                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                  <p className="text-emerald-600 font-bold text-lg mt-0.5">${product.price} each</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1">
                      <button
                        onClick={() => updateStock(product.id, -1, product.stock, product.name)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded-md hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="w-3 h-3 text-gray-600" />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">{product.stock}</span>
                      <button
                        onClick={() => updateStock(product.id, 1, product.stock, product.name)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded-md hover:bg-gray-200 transition-colors"
                      >
                        <PlusIcon className="w-3 h-3 text-gray-600" />
                      </button>
                    </div>
                    <span className={`text-xs font-medium ${product.stock < 5 ? 'text-red-500' : 'text-green-600'}`}>
                      {product.stock < 5 ? 'LOW STOCK' : 'IN STOCK'}
                    </span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2.5 bg-blue-50 rounded-xl text-blue-600 hover:bg-blue-100 transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product.id, product.name)}
                    className="p-2.5 bg-red-50 rounded-xl text-red-600 hover:bg-red-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                  {editingProduct ? 'Edit Product' : 'New Product'}
                </h3>
                <button 
                  onClick={() => {
                    setShowModal(false);
                    setShowEmojiPicker(false);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Emoji/Icon Picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PICK AN ICON</label>
                <div className="relative">
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-3d-sm hover:shadow-3d-hover transition-all"
                  >
                    <span className="text-5xl">{formData.image}</span>
                  </button>
                  
                  {showEmojiPicker && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-3d-lg border border-gray-200 p-3 z-10">
                      <div className="grid grid-cols-8 gap-2 max-h-40 overflow-y-auto">
                        {productEmojis.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => selectEmoji(emoji)}
                            className="w-10 h-10 text-2xl hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PRODUCT NAME</label>
                <input
                  type="text"
                  placeholder="e.g. Milk"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PRICE ($)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
                />
              </div>

              {/* Stock Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">STOCK QTY</label>
                <input
                  type="number"
                  placeholder="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setShowEmojiPicker(false);
                  }}
                  className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold text-base hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProduct}
                  className="flex-1 btn-3d bg-emerald-500 text-white py-4 rounded-xl font-semibold text-base hover:bg-emerald-600 transition-all"
                >
                  {editingProduct ? 'Update Product' : 'Save Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 animate-scale-in">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Product</h3>
              <p className="text-gray-600 mb-6">{warningMessage}</p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeletingProductId(null);
                  }}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 btn-3d bg-red-500 text-white py-3 rounded-xl font-semibold"
                >
                  Delete
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
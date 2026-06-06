import type { Product, Customer, Transaction, ActivityItem } from '@/types';

export const mockProducts: Product[] = [
  { id: 1, name: "Fresh Milk", price: 60, stock: 8, image: "🥛", lowStock: false },
  { id: 2, name: "Wheat Bread", price: 40, stock: 3, image: "🍞", lowStock: true },
  { id: 3, name: "Organic Eggs", price: 90, stock: 12, image: "🥚", lowStock: false },
  { id: 4, name: "Basmati Rice", price: 120, stock: 2, image: "🍚", lowStock: true },
  { id: 5, name: "Cooking Oil", price: 110, stock: 5, image: "🫒", lowStock: false },
];

export const mockCustomers: Customer[] = [
  { id: 1, name: "Abdimahad Hussein", phone: "9876543210", balance: 1250, lastPayment: "2026-06-03", address: "Main Street, Shop #4" },
  { id: 2, name: "Ahmed Abdullahi", phone: "9876543211", balance: 450, lastPayment: "2026-06-01", address: "Church Road" },
  { id: 3, name: "Abdikarin Hassan", phone: "9876543212", balance: 2300, lastPayment: "2026-05-28", address: "Railway Colony" },
];

export const mockTransactions: Transaction[] = [
  { id: 1, type: 'cash', amount: 450, time: '10:30 AM', description: 'Walk-in customer' },
  { id: 2, type: 'loan', customerName: 'Abdimahad Hussein', amount: 1250, time: '09:15 AM' },
  { id: 3, type: 'payment', customerName: 'Ahmed Abdullahi', amount: 500, time: 'Yesterday' },
  { id: 4, type: 'cash', amount: 230, time: 'Yesterday', description: 'Walk-in customer' },
];

// ADD THIS - mockActivity for dashboard
export const mockActivity: ActivityItem[] = [
  { id: 1, type: 'cash', amount: 450, time: '10:30 AM', description: 'Walk-in customer' },
  { id: 2, type: 'loan', customerName: 'Abdimahad Hussein', amount: 1250, time: '09:15 AM' },
  { id: 3, type: 'payment', customerName: 'Ahmed Abdullahi', amount: 500, time: 'Yesterday' },
  { id: 4, type: 'cash', amount: 230, time: 'Yesterday', description: 'Walk-in customer' },
];
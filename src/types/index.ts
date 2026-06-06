export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  lowStock: boolean;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  balance: number;
  lastPayment?: string;
  address?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Transaction {
  id: number;
  type: 'cash' | 'loan' | 'payment';
  customerName?: string;
  amount: number;
  time: string;
  description?: string;
}

export interface ActivityItem {
  id: number;
  type: 'cash' | 'loan' | 'payment';
  customerName?: string;
  amount: number;
  time: string;
  description?: string;
}
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { DashboardScreen } from './components/dashboard/DashboardScreen';
import { POSScreen } from './components/pos/POSScreen';
import { CustomerLoanScreen } from './components/customers/CustomerLoanScreen';
import { ProductManagement } from './components/products/ProductManagement';
import { ReportsScreen } from './components/reports/ReportsScreen';
import { LoginScreen } from './components/auth/LoginScreen';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardScreen />} />
          <Route path="/pos" element={<POSScreen />} />
          <Route path="/customers" element={<CustomerLoanScreen />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/reports" element={<ReportsScreen />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
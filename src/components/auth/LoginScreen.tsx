import React, { useState } from 'react';
import { Store, Mail, Lock, ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Main Card - Reduced padding */}
        <div className="card-3d bg-white rounded-3xl p-6 shadow-3d-lg">
          
          {/* Logo & Brand Section - Compact */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-emerald-400 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl mx-auto flex items-center justify-center shadow-3d-lg">
                <Store className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mt-3">ShopManager</h1>
            <div className="flex items-center justify-center gap-2 mt-1">
              <Sparkles className="w-3 h-3 text-emerald-500" />
              <p className="text-xs text-gray-500">Smart Shop Management</p>
              <Sparkles className="w-3 h-3 text-emerald-500" />
            </div>
          </div>

          {/* Login Form - Compact */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email/Phone Field */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1">
                <Mail className="w-3 h-3 text-emerald-500" />
                Email or Phone Number
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-none transition-all text-sm"
                  placeholder="Enter your email or phone"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1">
                <Lock className="w-3 h-3 text-emerald-500" />
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-none transition-all text-sm"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <a href="#" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`btn-3d w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all ${
                isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-emerald-600 hover:to-emerald-700'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Register Link */}
            <div className="text-center pt-1">
              <p className="text-xs text-gray-500">
                Don't have an account?{' '}
                <a href="#" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                  Register New Shop
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
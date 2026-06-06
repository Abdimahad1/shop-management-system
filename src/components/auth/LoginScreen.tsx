import React, { useState } from 'react';
import { Store, Mail, Lock, ArrowRight, Eye, EyeOff, Sparkles, Shield, CheckCircle } from 'lucide-react';

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
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="card-3d bg-white rounded-3xl p-8 shadow-3d-lg">
          {/* Logo & Brand Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-emerald-400 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl mx-auto flex items-center justify-center shadow-3d-lg">
                <Store className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mt-4">ShopManager</h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <p className="text-sm text-gray-500">Smart Shop Management</p>
              <Sparkles className="w-4 h-4 text-emerald-500" />
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email/Phone Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Mail className="w-4 h-4 text-emerald-500" />
                Email or Phone Number
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-xl blur opacity-0 group-focus-within:opacity-30 transition-opacity"></div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-200 text-gray-800 placeholder-gray-400"
                    placeholder="Enter your email or phone"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Lock className="w-4 h-4 text-emerald-500" />
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-xl blur opacity-0 group-focus-within:opacity-30 transition-opacity"></div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-200 text-gray-800 placeholder-gray-400"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`btn-3d w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-200 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-emerald-600 hover:to-emerald-700'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Register Link */}
            <div className="text-center pt-2">
              <p className="text-gray-500 text-sm">
                Don't have an account?{' '}
                <a href="#" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                  Register New Shop
                </a>
              </p>
            </div>
          </form>

          {/* Features Section */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Shield className="w-3 h-3 text-emerald-500" />
                <span>Secure Login</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

    {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
        © {new Date().getFullYear()} ShopManager. All rights reserved.
        </p>
      </div>
    </div>
  );
};
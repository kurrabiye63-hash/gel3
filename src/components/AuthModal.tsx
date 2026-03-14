import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Shield, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const trimmedUsername = username.trim();
    const loginEmail = trimmedUsername.includes('@') ? trimmedUsername : `${trimmedUsername}@abiye.com`;
    const trimmedPassword = password.trim();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: trimmedPassword
      });
      
      if (error) throw error;
      
      if (data.user && !data.user.confirmed_at) {
        // This is a safety check in case the server doesn't catch it
        setError('Hesabınız henüz onaylanmamış. Lütfen Supabase panelinden "Confirm User" yapın.');
        return;
      }

      onClose();
    } catch (err: any) {
      console.error('Auth error full details:', err);
      // Show the raw message if it's not a standard one we handle
      const rawMessage = err.message || '';
      
      if (rawMessage.includes('Email not confirmed')) {
        setError('HATA: E-posta onaylanmamış. Supabase panelinde kullanıcıya tıklayıp "Confirm User" butonuna basın.');
      } else if (rawMessage.includes('Invalid login credentials')) {
        setError('HATA: Kullanıcı adı veya şifre yanlış. (Panelde admin@abiye.com ve admin3652 olduğundan emin olun)');
      } else {
        setError(`SİSTEM HATASI: ${rawMessage}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-[1200] flex items-center justify-center p-4 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Sistem Girişi
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    Stüdyoya erişmek için kimlik bilgilerinizi girin
                  </p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Kullanıcı Adı</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input 
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-[#D4AF37] outline-none transition-all placeholder:text-white/10"
                      placeholder="Size verilen kullanıcı adı"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Şifre</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input 
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-12 text-white focus:border-[#D4AF37] outline-none transition-all placeholder:text-white/10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#D4AF37] text-black font-bold py-4 rounded-lg mt-4 hover:bg-[#B8962F] transition-all disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                >
                  {loading ? 'SİSTEME BAĞLANILIYOR...' : 'GİRİŞ YAP'}
                </button>
              </form>

              <div className="mt-12 flex items-center justify-center gap-2 text-[10px] text-gray-600 uppercase tracking-widest font-bold">
                <Shield size={10} className="text-[#D4AF37]/50" /> Kurumsal Güvenli Erişim
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

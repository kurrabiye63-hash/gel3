import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gem, Zap, Shield, Check, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PACKAGES = [
  {
    id: 'package_100',
    name: 'Bronz',
    credits: 100,
    price: '₺999',
    popular: false,
    color: '#CD7F32',
    benefits: ['100 Üretim Kontörü', '25 Fotoğraf veya 10 Video', 'Standart Hız', 'Süresiz Kullanım']
  },
  {
    id: 'package_250',
    name: 'Gümüş',
    credits: 250,
    price: '₺2399',
    popular: true,
    color: '#C0C0C0',
    benefits: ['250 Üretim Kontörü', '62 Fotoğraf veya 25 Video', 'Öncelikli Render', 'Süresiz Kullanım', 'Destek Önceliği']
  },
  {
    id: 'package_500',
    name: 'Altın',
    credits: 500,
    price: '₺4699',
    popular: false,
    color: '#D4AF37',
    benefits: ['500 Üretim Kontörü', '125 Fotoğraf veya 50 Video', 'Ultra Hızlı Render', 'Süresiz Kullanım', 'Vip Destek']
  }
];

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const handlePurchase = (pkg: typeof PACKAGES[0]) => {
    if (!user) {
      alert('Lütfen paket satın almak için giriş yapın.');
      return;
    }
    
    const message = `Merhaba, FashionMaster üzerinden ${pkg.name} Paketi (${pkg.price}) satın almak istiyorum. %0A%0AKullanıcı: ${user.email}`;
    const whatsappUrl = `https://wa.me/905545050967?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-[1100] flex items-center justify-center p-4 md:p-8 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="w-full max-w-5xl bg-[#121212] border border-white/10 rounded-2xl overflow-hidden relative"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center bg-black/40">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                  <Gem className="text-[#D4AF37]" /> Kontür Paketleri
                </h2>
                <p className="text-gray-400 text-sm mt-1">İhtiyacınıza uygun paketi seçin, hemen üretmeye başlayın.</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {PACKAGES.map((pkg) => (
                <div 
                  key={pkg.id}
                  className={`relative flex flex-col p-6 rounded-xl border transition-all duration-300 ${
                    pkg.popular ? 'bg-white/5 border-[#D4AF37] scale-105 z-10' : 'bg-black/40 border-white/10 hover:border-white/20'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      En Popüler
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-white">{pkg.price}</span>
                      <span className="text-gray-500 text-sm">/ Tek Seferlik</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-6 p-3 bg-white/5 rounded-lg border border-white/5">
                    <Zap size={18} className="text-[#D4AF37]" />
                    <span className="text-lg font-bold text-white">{pkg.credits} Kontür</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                        <Check size={16} className="text-[#D4AF37] mt-0.5" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePurchase(pkg)}
                    className={`w-full py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                      pkg.popular 
                      ? 'bg-[#D4AF37] text-black hover:bg-[#B8962F]' 
                      : 'bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    <CreditCard size={18} /> Satın Al
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 bg-black/60 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                <span className="flex items-center gap-1.5"><Shield size={12} /> Güvenli Ödeme</span>
                <span className="flex items-center gap-1.5"><Zap size={12} /> Anında Teslim</span>
              </div>
              <p className="text-[11px] text-gray-600 text-center md:text-right">
                * Fotoğraf üretimi: 4 kontür, Video üretimi: 10 kontür düşer. <br />
                Tüm fiyatlara KDV dahildir.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

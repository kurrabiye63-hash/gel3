import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Gem, Zap, Shield, Check, CreditCard, ArrowLeft, Star, Crown, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PACKAGES = [
  {
    id: 'package_100',
    name: 'Bronz Paket',
    credits: 100,
    price: '₺999',
    popular: false,
    color: 'from-[#CD7F32] to-[#A0522D]',
    icon: <Star className="text-[#CD7F32]" size={32} />,
    benefits: ['100 Üretim Kontörü', '25 Fotoğraf veya 10 Video', 'Standart Öncelikli Render', 'Süresiz Kullanım Hakkı', 'E-posta Desteği']
  },
  {
    id: 'package_250',
    name: 'Gümüş Paket',
    credits: 250,
    price: '₺2399',
    popular: true,
    color: 'from-[#C0C0C0] to-[#808080]',
    icon: <Award className="text-[#C0C0C0]" size={32} />,
    benefits: ['250 Üretim Kontörü', '62 Fotoğraf veya 25 Video', 'Yüksek Öncelikli Render', 'Süresiz Kullanım Hakkı', 'Hızlı Destek Hattı', 'Yeni Modellere Erişim']
  },
  {
    id: 'package_500',
    name: 'Altın Paket',
    credits: 500,
    price: '₺4699',
    popular: false,
    color: 'from-[#D4AF37] to-[#B8860B]',
    icon: <Crown className="text-[#D4AF37]" size={32} />,
    benefits: ['500 Üretim Kontörü', '125 Fotoğraf veya 50 Video', 'VIP Öncelikli Render', 'Süresiz Kullanım Hakkı', '7/24 Teknik Destek', 'Yeni Özelliklere Erken Erişim', 'Özel Filigran Kaldırma']
  }
];

export const PricingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePurchase = (pkg: typeof PACKAGES[0]) => {
    if (!user) {
      alert('Lütfen paket satın almak için giriş yapın.');
      return;
    }
    
    const message = `Merhaba, FashionMaster üzerinden ${pkg.name} (${pkg.price}) satın almak istiyorum. %0A%0AKullanıcı: ${user.email}`;
    const whatsappUrl = `https://wa.me/905545050967?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#D4AF37]/30 py-10 px-4 relative overflow-hidden flex flex-col justify-center">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[500px] rounded-full bg-[#D4AF37]/[0.05] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] rounded-full bg-[#c27ba0]/[0.04] blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/30 hover:text-[#D4AF37] transition-all mb-4 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Stüdyoya Dön</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="font-serif text-3xl md:text-5xl tracking-tight mb-2">
              Yaratıcılığınızı <span className="text-[#D4AF37]">Özgür Bırakın</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto text-xs md:text-sm leading-relaxed">
              Profesyonel yapay zeka araçlarımızla sınırsız tasarım üretin. 
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`relative group`}
            >
              <div className={`h-full flex flex-col p-6 rounded-2xl border transition-all duration-500 overflow-hidden ${
                pkg.popular 
                ? 'bg-[#D4AF37]/[0.03] border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.08)]' 
                : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}>
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-[#D4AF37] text-black text-[9px] font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-[0.15em]">
                    Önerilen
                  </div>
                )}

                {/* Package Icon & Name */}
                <div className="mb-6 text-center md:text-left">
                  <div className="mb-2 scale-75 origin-left">{pkg.icon}</div>
                  <h3 className="text-xl font-bold tracking-tight mb-1">{pkg.name}</h3>
                  <div className="flex items-baseline gap-2 justify-center md:justify-start">
                    <span className="text-3xl font-black">{pkg.price}</span>
                    <span className="text-gray-500 text-[9px] font-bold uppercase tracking-widest">/ Tek Ödeme</span>
                  </div>
                </div>

                {/* Credits Highlight */}
                <div className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br ${pkg.color} bg-opacity-10 mb-6 border border-white/5`}>
                  <Zap size={20} className="text-white" />
                  <div>
                    <span className="block text-lg font-black text-white">{pkg.credits} KONTRÖR</span>
                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Üretim Kredisi</span>
                  </div>
                </div>

                {/* Benefits */}
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-[11px] text-gray-400">
                      <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={10} className="text-[#D4AF37]" />
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* Purchase Button */}
                <button
                  onClick={() => handlePurchase(pkg)}
                  className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                    pkg.popular 
                    ? 'bg-[#D4AF37] text-black hover:bg-[#B8962F] shadow-lg shadow-[#D4AF37]/10' 
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <CreditCard size={14} /> Paketi Satın Al
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/5 pt-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Shield className="text-emerald-500/60" size={18} />
            <h4 className="font-bold text-white/60 mb-0.5 uppercase text-[9px] tracking-widest">%100 Güvenli Ödeme</h4>
            <p className="text-gray-600 text-[10px] leading-tight">256-bit SSL şifreleme ile korunur.</p>
          </div>
          
          <div className="flex flex-col items-center md:items-start gap-2">
            <Zap className="text-[#D4AF37]/60" size={18} />
            <h4 className="font-bold text-white/60 mb-0.5 uppercase text-[9px] tracking-widest">Anında Teslimat</h4>
            <p className="text-gray-600 text-[10px] leading-tight">Saniyeler içinde hesabınıza tanımlanır.</p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2">
            <Gem className="text-blue-500/60" size={18} />
            <h4 className="font-bold text-white/60 mb-0.5 uppercase text-[9px] tracking-widest">Adil Kullanım</h4>
            <p className="text-gray-600 text-[10px] leading-tight">Sadece başarılı sonuçlar için kontür düşülür.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

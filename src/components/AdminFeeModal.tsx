import React, { useState } from 'react';
import { X, Save, RefreshCw, Settings, Check, MapPin, CreditCard, Phone } from 'lucide-react';
import { StateWaybillConfig, BusinessConfig } from '../data/logistics';

interface AdminFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  stateLogistics: StateWaybillConfig[];
  onUpdateStateRate: (state: string, newFee: number) => void;
  onResetRates: () => void;
  businessConfig: BusinessConfig;
  onUpdateBusinessConfig: (updated: BusinessConfig) => void;
}

export const AdminFeeModal: React.FC<AdminFeeModalProps> = ({
  isOpen,
  onClose,
  stateLogistics,
  onUpdateStateRate,
  onResetRates,
  businessConfig,
  onUpdateBusinessConfig
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'logistics' | 'business'>('logistics');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedToast, setSavedToast] = useState(false);

  // Business config edit state
  const [tempConfig, setTempConfig] = useState<BusinessConfig>({ ...businessConfig });

  const filteredStates = stateLogistics.filter((s) =>
    s.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBusinessConfig(tempConfig);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative max-w-2xl w-full max-h-[90vh] bg-[#1E0719] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col text-[#FFF1F6]">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#260B20]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FAD38D]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">Owner & Logistics Settings</h3>
              <p className="text-xs text-[#F8DDE8]/70">Admin configuration for Chukwudebe Ifeanyi</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-white/10 px-5 pt-3 gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('logistics')}
            className={`pb-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'logistics'
                ? 'border-[#FF1A88] text-white'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>State Waybill Fees ({stateLogistics.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('business')}
            className={`pb-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'business'
                ? 'border-[#D4AF37] text-white'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Bank & Studio Info</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {activeTab === 'logistics' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <input
                  type="text"
                  placeholder="Filter state (e.g. Lagos, Delta, Kano)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="py-2 px-3.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#FF1A88] flex-1 min-w-[200px]"
                />
                <button
                  onClick={onResetRates}
                  className="text-xs text-[#FAD38D] hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Default Rates</span>
                </button>
              </div>

              <div className="space-y-2">
                {filteredStates.map((item) => (
                  <div
                    key={item.state}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-black/30 border border-white/10 text-xs"
                  >
                    <div>
                      <p className="font-semibold text-white">{item.state}</p>
                      <p className="text-[10px] text-[#F8DDE8]/60">{item.deliveryDays}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[#FAD38D] font-bold">₦</span>
                      <input
                        type="number"
                        step="500"
                        min="0"
                        value={item.defaultFee}
                        onChange={(e) => onUpdateStateRate(item.state, Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-24 py-1.5 px-2.5 rounded-lg bg-[#14040E] border border-white/20 text-xs font-bold text-white text-right focus:outline-none focus:ring-1 focus:ring-[#FF1A88]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveBusiness} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 font-medium mb-1">PalmPay Account Name</label>
                  <input
                    type="text"
                    value={tempConfig.palmpayAccountName}
                    onChange={(e) => setTempConfig({ ...tempConfig, palmpayAccountName: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-black/40 border border-white/15 text-white"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-1">PalmPay Account Number</label>
                  <input
                    type="text"
                    value={tempConfig.palmpayAccountNumber}
                    onChange={(e) => setTempConfig({ ...tempConfig, palmpayAccountNumber: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-black/40 border border-white/15 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-1">WhatsApp Order Number</label>
                  <input
                    type="text"
                    value={tempConfig.whatsapp}
                    onChange={(e) => setTempConfig({ ...tempConfig, whatsapp: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-black/40 border border-white/15 text-white"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-1">Studio Phone Number</label>
                  <input
                    type="text"
                    value={tempConfig.phone}
                    onChange={(e) => setTempConfig({ ...tempConfig, phone: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-black/40 border border-white/15 text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-white/80 font-medium mb-1">Business Pickup Address</label>
                  <input
                    type="text"
                    value={tempConfig.pickupAddress}
                    onChange={(e) => setTempConfig({ ...tempConfig, pickupAddress: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-black/40 border border-white/15 text-white"
                  />
                </div>
              </div>

              {savedToast && (
                <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center font-semibold flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Business settings saved successfully!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F4D068] text-[#29151F] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md hover:brightness-110"
              >
                <Save className="w-4 h-4" />
                <span>Save Business Settings</span>
              </button>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#160513] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition"
          >
            Close Settings
          </button>
        </div>

      </div>
    </div>
  );
};

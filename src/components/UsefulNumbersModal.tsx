import React from 'react';
import { X, PhoneCall, ShieldAlert, HeartHandshake, GraduationCap, Building2 } from 'lucide-react';
import { Language, translations } from '../utils/i18n';

interface UsefulNumbersModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const UsefulNumbersModal: React.FC<UsefulNumbersModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  const t = translations[lang];

  const categories = [
    {
      category: t.emergencyCategory,
      icon: ShieldAlert,
      color: 'bg-[#FF3B30]/10 text-[#FF3B30] border-[#FF3B30]/20',
      numbers: [
        { title: 'Coimbatore District Collectorate Helpline', number: '0422-2301114', desc: 'District emergency assistance & student grievance cell (Toll Free: 1077).' },
        { title: 'Tamil Nadu Anti-Ragging 24x7 Helpline', number: '1800-180-5522', desc: 'National & Tamil Nadu state anti-ragging toll-free emergency helpline.' },
        { title: 'Tamil Nadu Student & Women Helpline', number: '181', desc: '24/7 State helpline for immediate protection and counseling support.' }
      ]
    },
    {
      category: t.mentalHealthCategory,
      icon: HeartHandshake,
      color: 'bg-[#0071E3]/10 text-[#0071E3] border-[#0071E3]/20',
      numbers: [
        { title: 'Tele-MANAS Tamil Nadu Mental Health Line', number: '14416', desc: '24/7 Free confidential mental health, exam stress & anxiety support (1800-891-4416).' },
        { title: 'Sneha Counseling Helpline (Tamil Nadu)', number: '044-24640050', desc: 'Renowned 24/7 suicide prevention & emotional crisis support helpline.' }
      ]
    },
    {
      category: t.academicCategory,
      icon: GraduationCap,
      color: 'bg-[#34C759]/10 text-[#34C759] border-[#34C759]/20',
      numbers: [
        { title: 'Anna University Regional Campus Coimbatore', number: '0422-2694433', desc: 'Academic affairs, attendance condonation petitions & backlog guidance.' },
        { title: 'Tamil Nadu Higher Education Advisory Cell', number: '044-24321430', desc: 'State academic cell for student grievance & university affairs.' }
      ]
    },
    {
      category: t.medicalCategory,
      icon: Building2,
      color: 'bg-[#FF9500]/10 text-[#FF9500] border-[#FF9500]/20',
      numbers: [
        { title: 'Coimbatore Medical College Hospital (CMCH)', number: '0422-2301393', desc: 'Government hospital emergency desk & medical condonation verification.' },
        { title: 'Tamil Nadu Emergency Medical Service', number: '108', desc: '24/7 Free state medical emergency ambulance dispatcher.' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1C1C1E] w-full max-w-2xl rounded-[24px] border border-black/[0.08] dark:border-white/[0.12] shadow-2xl overflow-hidden my-8 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between bg-[#F5F5F7] dark:bg-[#2C2C2E]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0071E3] text-white flex items-center justify-center shadow-md">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                {t.coimbatoreHelplinesTitle}
              </h2>
              <p className="text-xs text-[#86868B]">
                {t.coimbatoreHelplinesSub}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={idx} className="space-y-3">
                <h3 className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2 text-xs uppercase tracking-wider">
                  <Icon className="w-4 h-4 text-[#86868B]" />
                  {cat.category}
                </h3>

                <div className="grid grid-cols-1 gap-2.5">
                  {cat.numbers.map((item, nIdx) => (
                    <div key={nIdx} className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${cat.color}`}>
                      <div>
                        <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] block text-xs">
                          {item.title}
                        </span>
                        <p className="text-[11px] text-[#86868B] dark:text-[#A1A1A6] mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                      <a
                        href={`tel:${item.number}`}
                        className="px-3.5 py-2 bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-[#F5F5F7] font-mono font-semibold rounded-xl text-xs shadow-xs hover:bg-[#F5F5F7] dark:hover:bg-[#3A3A3C] transition-colors text-center shrink-0 cursor-pointer border border-black/[0.08] dark:border-white/[0.12]"
                      >
                        📞 {item.number}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F5F5F7] dark:bg-[#2C2C2E] border-t border-black/[0.06] dark:border-white/[0.08] text-center text-xs text-[#86868B]">
          All official Coimbatore and Tamil Nadu helpline services are available free of charge. Confidentiality is strictly maintained.
        </div>

      </div>
    </div>
  );
};

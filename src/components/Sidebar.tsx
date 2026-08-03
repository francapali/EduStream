import React from 'react';
import { UserRole } from '../types';
import { LayoutDashboard, AlertTriangle, Sliders, Activity, PhoneCall, Heart } from 'lucide-react';
import { Language, translations } from '../utils/i18n';

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  onTabChange: (tab: string) => void;
  atRiskCount: number;
  lang: Language;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  role,
  activeTab,
  onTabChange,
  atRiskCount,
  lang
}) => {
  const t = translations[lang];

  const teacherNavItems: NavItem[] = [
    { id: 'overview', label: t.overviewTab, icon: LayoutDashboard },
    { id: 'at_risk', label: t.atRiskTab, icon: AlertTriangle, badge: atRiskCount },
    { id: 'what_if', label: t.whatIfTab, icon: Sliders },
    { id: 'analytics', label: t.analyticsTab, icon: Activity },
    { id: 'useful_numbers', label: t.helplinesBtn, icon: PhoneCall },
  ];

  const studentNavItems: NavItem[] = [
    { id: 'student_dashboard', label: t.studentDashboardTab, icon: Heart },
    { id: 'what_if', label: t.whatIfTab, icon: Sliders },
    { id: 'useful_numbers', label: t.helplinesBtn, icon: PhoneCall },
  ];

  const navItems = role === 'teacher' ? teacherNavItems : studentNavItems;

  return (
    <aside className="w-64 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-md border-r border-black/[0.08] dark:border-white/[0.12] p-4 flex flex-col justify-between hidden md:flex shrink-0">
      
      <div className="space-y-6">
        <div>
          <h2 className="px-3 text-[10px] font-semibold text-[#86868B] uppercase tracking-wider mb-3">
            {role === 'teacher' ? t.teacherPortal : t.studentView}
          </h2>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0071E3] text-white shadow-sm font-semibold'
                      : 'text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#86868B]'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white text-[#FF3B30]' : 'bg-[#FF3B30]/10 text-[#FF3B30]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Proactive Usability Tip Widget */}
        <div className="p-4 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-black/[0.06] dark:border-white/[0.08] text-xs space-y-1.5">
          <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] block text-[11px]">
            💡 {t.smartAdviceTitle}
          </span>
          <p className="text-[11px] text-[#86868B] leading-relaxed">
            {t.smartAdviceText}
          </p>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] text-[10px] text-[#86868B] space-y-1">
        <p className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">EduStream ML v2.4</p>
        <p>Python RandomForest • SQLite DB</p>
        <p>Coimbatore District, India</p>
      </div>

    </aside>
  );
};

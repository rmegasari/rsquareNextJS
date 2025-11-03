"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAdmin } from "../../contexts/AdminContext";
import { t } from "../../locales/admin";

export default function AdminDashboard() {
  const { language } = useAdmin();
  const [stats, setStats] = useState({
    totalTemplates: 0,
    freeTemplates: 0,
    premiumTemplates: 0,
    featuredTemplates: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await fetch("/api/products");
        const products = await response.json();

        const freeCount = products.filter(p => Number(p.harga) === 0).length;
        const featuredCount = products.filter(p => p.featured === true).length;

        setStats({
          totalTemplates: products.length,
          freeTemplates: freeCount,
          premiumTemplates: products.length - freeCount,
          featuredTemplates: featuredCount,
        });
      } catch (error) {
        console.error("Error loading stats:", error);
      }
    }

    loadStats();
  }, []);

  const statCards = [
    {
      title: t("totalTemplates", language),
      value: stats.totalTemplates,
      icon: "📄",
      color: "bg-gray-700",
    },
    {
      title: t("freeTemplates", language),
      value: stats.freeTemplates,
      icon: "🎁",
      color: "bg-gray-600",
    },
    {
      title: t("premiumTemplates", language),
      value: stats.premiumTemplates,
      icon: "💎",
      color: "bg-gray-800",
    },
    {
      title: t("featuredTemplates", language),
      value: stats.featuredTemplates,
      icon: "⭐",
      color: "bg-orange-500",
    },
  ];

  const quickActions = [
    {
      title: t("addNewTemplate", language),
      description: t("addNewTemplateDesc", language),
      icon: "➕",
      href: "/admin/templates/new",
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      title: t("manageTemplates", language),
      description: t("manageTemplatesDesc", language),
      icon: "📝",
      href: "/admin/templates",
      color: "bg-gray-700 hover:bg-gray-800",
    },
    {
      title: t("viewWebsite", language),
      description: t("viewWebsiteDesc", language),
      icon: "🌐",
      href: "/",
      color: "bg-gray-800 hover:bg-gray-900",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="admin-page-header">
        <h1 className="admin-page-title">{t("dashboard", language)}</h1>
        <p className="admin-page-subtitle">{t("welcomeMessage", language)}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const colorMap = {
            'bg-gray-700': { from: '#374151', to: '#1F2937' },
            'bg-gray-600': { from: '#4B5563', to: '#374151' },
            'bg-gray-800': { from: '#1F2937', to: '#111827' },
            'bg-orange-500': { from: '#F97316', to: '#EA580C' },
          };
          const colors = colorMap[stat.color];

          return (
            <div
              key={index}
              className="admin-stat-card"
              style={{
                '--stat-color-from': colors.from,
                '--stat-color-to': colors.to,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`admin-stat-icon ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className="admin-stat-value">{stat.value}</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-600">{stat.title}</h3>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("quickActions", language)}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className={`admin-action-card ${action.color}`}
            >
              <div className="text-5xl mb-4">{action.icon}</div>
              <h3 className="text-xl font-bold mb-2">{action.title}</h3>
              <p className="text-sm text-white/90">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Info Panel */}
      <div className="admin-info-panel">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="admin-info-panel-title">{t("managementTips", language)}</h3>
            <ul className="admin-info-panel-list space-y-2">
              <li>• {t("tip1", language)}</li>
              <li>• {t("tip2", language)}</li>
              <li>• {t("tip3", language)}</li>
              <li>• {t("tip4", language)}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

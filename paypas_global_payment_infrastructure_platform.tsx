import React, { useState, useEffect, useMemo } from 'react';
import {
  Globe, Zap, Shield, ShieldCheck, Activity, Cpu, CreditCard, DollarSign,
  TrendingUp, BarChart3, PieChart, Layers, Users, Key, Terminal, Code2,
  Server, Sliders, Search, Filter, Download, Plus, Copy, Check, RefreshCw,
  ChevronRight, ArrowRight, ArrowUpRight, ArrowDownRight, Lock, Eye, EyeOff,
  Bell, Settings, LogOut, FileText, HelpCircle, Play, Radio, Laptop, Clock,
  AlertTriangle, CheckCircle2, XCircle, ArrowRightLeft, Wallet, Building2,
  Database, FileCode, Landmark, Scale, ExternalLink, RefreshCcw
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart as RePieChart, Pie, Cell, LineChart, Line
} from 'recharts';

// --- DATASETS & MOCK ARCHITECTURE ---

const UN_COUNTRIES = [
  { name: 'United States', code: 'US', alpha3: 'USA', flag: '🇺🇸', currency: 'USD', currencyName: 'US Dollar', symbol: '$', callingCode: '+1', region: 'Americas' },
  { name: 'United Kingdom', code: 'GB', alpha3: 'GBR', flag: '🇬🇧', currency: 'GBP', currencyName: 'British Pound', symbol: '£', callingCode: '+44', region: 'Europe' },
  { name: 'Germany', code: 'DE', alpha3: 'DEU', flag: '🇩🇪', currency: 'EUR', currencyName: 'Euro', symbol: '€', callingCode: '+49', region: 'Europe' },
  { name: 'Japan', code: 'JP', alpha3: 'JPN', flag: '🇯🇵', currency: 'JPY', currencyName: 'Japanese Yen', symbol: '¥', callingCode: '+81', region: 'Asia' },
  { name: 'China', code: 'CN', alpha3: 'CHN', flag: '🇨🇳', currency: 'CNY', currencyName: 'Chinese Yuan', symbol: '¥', callingCode: '+86', region: 'Asia' },
  { name: 'Canada', code: 'CA', alpha3: 'CAN', flag: '🇨🇦', currency: 'CAD', currencyName: 'Canadian Dollar', symbol: 'C$', callingCode: '+1', region: 'Americas' },
  { name: 'Australia', code: 'AU', alpha3: 'AUS', flag: '🇦🇺', currency: 'AUD', currencyName: 'Australian Dollar', symbol: 'A$', callingCode: '+61', region: 'Oceania' },
  { name: 'Mongolia', code: 'MN', alpha3: 'MNG', flag: '🇲🇳', currency: 'MNT', currencyName: 'Mongolian Tugrik', symbol: '₮', callingCode: '+976', region: 'Asia' },
  { name: 'South Korea', code: 'KR', alpha3: 'KOR', flag: '🇰🇷', currency: 'KRW', currencyName: 'South Korean Won', symbol: '₩', callingCode: '+82', region: 'Asia' },
  { name: 'India', code: 'IN', alpha3: 'IND', flag: '🇮🇳', currency: 'INR', currencyName: 'Indian Rupee', symbol: '₹', callingCode: '+91', region: 'Asia' },
  { name: 'Singapore', code: 'SG', alpha3: 'SGP', flag: '🇸🇬', currency: 'SGD', currencyName: 'Singapore Dollar', symbol: 'S$', callingCode: '+65', region: 'Asia' },
  { name: 'United Arab Emirates', code: 'AE', alpha3: 'ARE', flag: '🇦🇪', currency: 'AED', currencyName: 'UAE Dirham', symbol: 'د.إ', callingCode: '+971', region: 'Middle East' },
  { name: 'Saudi Arabia', code: 'SA', alpha3: 'SAU', flag: '🇸🇦', currency: 'SAR', currencyName: 'Saudi Riyal', symbol: '﷼', callingCode: '+966', region: 'Middle East' },
  { name: 'Brazil', code: 'BR', alpha3: 'BRA', flag: '🇧🇷', currency: 'BRL', currencyName: 'Brazilian Real', symbol: 'R$', callingCode: '+55', region: 'Americas' },
  { name: 'Mexico', code: 'MX', alpha3: 'MEX', flag: '🇲🇽', currency: 'MXN', currencyName: 'Mexican Peso', symbol: '$', callingCode: '+52', region: 'Americas' },
  { name: 'Turkey', code: 'TR', alpha3: 'TUR', flag: '🇹🇷', currency: 'TRY', currencyName: 'Turkish Lira', symbol: '₺', callingCode: '+90', region: 'Europe/Asia' },
  { name: 'South Africa', code: 'ZA', alpha3: 'ZAF', flag: '🇿🇦', currency: 'ZAR', currencyName: 'South African Rand', symbol: 'R', callingCode: '+27', region: 'Africa' },
  { name: 'Switzerland', code: 'CH', alpha3: 'CHE', flag: '🇨🇭', currency: 'CHF', currencyName: 'Swiss Franc', symbol: 'CHF', callingCode: '+41', region: 'Europe' }
];

const ISO_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$', decimals: 2, baseRate: 1.0, fee: '0.1%' },
  { code: 'EUR', name: 'Euro', symbol: '€', decimals: 2, baseRate: 0.92, fee: '0.15%' },
  { code: 'GBP', name: 'British Pound', symbol: '£', decimals: 2, baseRate: 0.79, fee: '0.15%' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', decimals: 0, baseRate: 154.20, fee: '0.2%' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', decimals: 2, baseRate: 7.23, fee: '0.25%' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', decimals: 2, baseRate: 0.90, fee: '0.1%' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', decimals: 2, baseRate: 1.36, fee: '0.15%' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', decimals: 2, baseRate: 1.52, fee: '0.15%' },
  { code: 'MNT', name: 'Mongolian Tugrik', symbol: '₮', decimals: 2, baseRate: 3450.00, fee: '0.4%' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', decimals: 0, baseRate: 1380.50, fee: '0.2%' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', decimals: 2, baseRate: 83.40, fee: '0.3%' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', decimals: 2, baseRate: 1.35, fee: '0.15%' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', decimals: 2, baseRate: 3.67, fee: '0.2%' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', decimals: 2, baseRate: 3.75, fee: '0.2%' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', decimals: 2, baseRate: 5.15, fee: '0.35%' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', decimals: 2, baseRate: 16.90, fee: '0.3%' }
];

const CRYPTO_ASSETS = [
  { symbol: 'BTC', name: 'Bitcoin', price: '$64,280.50', change24h: '+2.45%', isPositive: true, marketCap: '$1.26T', network: 'Bitcoin Mainnet', type: 'Layer 1' },
  { symbol: 'ETH', name: 'Ethereum', price: '$3,450.20', change24h: '+1.82%', isPositive: true, marketCap: '$415B', network: 'Ethereum ERC-20', type: 'Layer 1' },
  { symbol: 'USDT', name: 'Tether USD', price: '$1.00', change24h: '0.01%', isPositive: true, marketCap: '$110B', network: 'Multi-Chain (TRC20, ERC20)', type: 'Stablecoin' },
  { symbol: 'USDC', name: 'USD Coin', price: '$1.00', change24h: '0.00%', isPositive: true, marketCap: '$34B', network: 'Multi-Chain (Solana, ERC20)', type: 'Stablecoin' },
  { symbol: 'SOL', name: 'Solana', price: '$148.90', change24h: '+5.64%', isPositive: true, marketCap: '$68B', network: 'Solana Mainnet', type: 'Layer 1' },
  { symbol: 'XRP', name: 'XRP', price: '$0.52', change24h: '-0.45%', isPositive: false, marketCap: '$28B', network: 'XRP Ledger', type: 'Payment Network' },
  { symbol: 'BNB', name: 'BNB', price: '$580.10', change24h: '+0.95%', isPositive: true, marketCap: '$86B', network: 'BNB Smart Chain', type: 'Layer 1' },
  { symbol: 'DOGE', name: 'Dogecoin', price: '$0.14', change24h: '-1.20%', isPositive: false, marketCap: '$20B', network: 'Dogecoin Chain', type: 'Layer 1' },
  { symbol: 'ADA', name: 'Cardano', price: '$0.46', change24h: '+0.12%', isPositive: true, marketCap: '$16B', network: 'Cardano Hydra', type: 'Layer 1' },
  { symbol: 'TRX', name: 'TRON', price: '$0.12', change24h: '+0.55%', isPositive: true, marketCap: '$10.8B', network: 'TRON TRC-20', type: 'Layer 1' },
  { symbol: 'AVAX', name: 'Avalanche', price: '$34.50', change24h: '+3.10%', isPositive: true, marketCap: '$13.2B', network: 'Avalanche C-Chain', type: 'Layer 1' }
];

const MOCK_MONTHLY_DATA = [
  { month: 'Jan', volume: 1850000, transactions: 12400, routingSavings: 24500 },
  { month: 'Feb', volume: 2100000, transactions: 14200, routingSavings: 28900 },
  { month: 'Mar', volume: 2890000, transactions: 18900, routingSavings: 39400 },
  { month: 'Apr', volume: 3400000, transactions: 22100, routingSavings: 46200 },
  { month: 'May', volume: 4120000, transactions: 26800, routingSavings: 57800 },
  { month: 'Jun', volume: 4950000, transactions: 31500, routingSavings: 68100 }
];

const MOCK_PROVIDERS = [
  { id: 'stripe', name: 'Stripe Global', status: 'Connected', latency: '124ms', fee: '2.9% + $0.30', successRate: 99.7, region: 'Global' },
  { id: 'adyen', name: 'Adyen N.V.', status: 'Connected', latency: '112ms', fee: '2.5% + $0.25', successRate: 99.8, region: 'EU & US' },
  { id: 'airwallex', name: 'Airwallex Financial', status: 'Connected', latency: '145ms', fee: '2.3% + $0.20', successRate: 99.3, region: 'APAC & Global' },
  { id: 'wise', name: 'Wise Platform', status: 'Connected', latency: '160ms', fee: '0.45% FX', successRate: 99.5, region: 'Cross-Border Payouts' },
  { id: 'paypal', name: 'PayPal Braintree', status: 'Connected', latency: '198ms', fee: '3.49% + $0.49', successRate: 98.6, region: 'Global' },
  { id: 'klarna', name: 'Klarna BNPL', status: 'Degraded', latency: '310ms', fee: '3.29% + $0.30', successRate: 95.8, region: 'EU & North America' }
];

const MOCK_TRANSACTIONS = [
  { id: 'tx_pas_9918241', customer: 'Nexus Cloud Systems', email: 'billing@nexus.cloud', amount: 3250.00, currency: 'USD', country: 'US', provider: 'Adyen N.V.', routedReason: 'Lowest US interchange fee & 99.8% uptime', status: 'succeeded', date: '2026-03-31 16:42:10', paymentMethod: 'Visa Commercial •••• 4912' },
  { id: 'tx_pas_9918240', customer: 'Global Direct GmbH', email: 'pay@globaldirect.de', amount: 890.50, currency: 'EUR', country: 'DE', provider: 'Stripe Global', routedReason: 'Local European SEPA Direct route', status: 'succeeded', date: '2026-03-31 16:38:05', paymentMethod: 'Mastercard •••• 1092' },
  { id: 'tx_pas_9918239', customer: 'Khangai Mining LLC', email: 'finance@khangai.mn', amount: 14500.00, currency: 'USD', country: 'MN', provider: 'Airwallex Financial', routedReason: 'Cross-Border Asia acquiring & wholesale FX lock', status: 'succeeded', date: '2026-03-31 16:30:19', paymentMethod: 'Wire Transfer / Swift' },
  { id: 'tx_pas_9918238', customer: 'Tokyo AI Interactive', email: 'accounts@tokyoai.jp', amount: 450000.00, currency: 'JPY', country: 'JP', provider: 'Adyen N.V.', routedReason: 'JCB Local acquiring route optimization', status: 'succeeded', date: '2026-03-31 16:15:44', paymentMethod: 'JCB Card •••• 8821' },
  { id: 'tx_pas_9918237', customer: 'SaaSify Platforms Inc', email: 'ar@saasify.io', amount: 49.00, currency: 'GBP', country: 'GB', provider: 'PayPal Braintree', routedReason: 'Fallback route triggered (Latency check passed)', status: 'failed', date: '2026-03-31 16:02:11', paymentMethod: 'Visa •••• 3004' }
];

const MOCK_PAYOUTS = [
  { id: 'po_pas_0192', beneficiary: 'Nordic Digital AS', country: 'Norway', amount: '$42,500.00', status: 'Processed', provider: 'Wise Platform', date: '2026-03-31 14:00' },
  { id: 'po_pas_0191', beneficiary: 'Singapore Tech Ventures', country: 'Singapore', amount: '$128,900.00', status: 'Processing', provider: 'Airwallex Financial', date: '2026-03-31 15:30' },
  { id: 'po_pas_0190', beneficiary: 'Berlin Commerce Hub', country: 'Germany', amount: '€18,400.00', status: 'Processed', provider: 'Adyen N.V.', date: '2026-03-31 11:20' }
];

const MOCK_AUDIT_LOGS = [
  { id: 'aud_8812', user: 'admin@paypas.net', action: 'ROUTING_RULE_UPDATE', target: 'Rule #104 (Sub-$50 batch)', ip: '192.168.1.104', timestamp: '2026-03-31 16:40:12' },
  { id: 'aud_8811', user: 'system_agent', action: 'ACQUIRER_PING_SUCCESS', target: 'Stripe Global Endpoint', ip: '10.0.4.12', timestamp: '2026-03-31 16:35:00' },
  { id: 'aud_8810', user: 'dev_lead@paypas.net', action: 'API_KEY_ROTATION', target: 'Sandbox Secret Key #2', ip: '192.168.1.55', timestamp: '2026-03-31 15:20:41' }
];

// --- MAIN PAYPAS APPLICATION ---

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setActiveTab('dashboard');
    showToast('Authenticated securely into PayPas Global Console.');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('landing');
    showToast('Signed out of PayPas session.');
  };

  return (
    <div className="min-h-screen bg-[#050B18] text-slate-100 font-sans antialiased flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-blue-600/90 text-white px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md border border-blue-400/40 flex items-center space-x-3 transition-all animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-sky-300 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top System Disclaimer Bar */}
      <div className="bg-[#071426] border-b border-slate-800/80 px-4 py-1 text-[11px] text-slate-400 flex justify-between items-center z-40">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="font-semibold text-slate-200">PAYPAS GLOBAL SANDBOX ENVIRONMENT</span>
          <span className="hidden sm:inline">| Non-Custodial Multi-Provider Orchestration Architecture</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-slate-400">Core Version: v2.4.0-enterprise</span>
          <button onClick={() => setActiveTab('security')} className="hover:text-blue-400 underline">Compliance Architecture</button>
        </div>
      </div>

      {/* Header & Main Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#050B18]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* PayPas Logo & Brand Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab(isAuthenticated ? 'dashboard' : 'landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-600/30 ring-1 ring-white/20">
              {/* Custom Geometric 'P' SVG Logo */}
              <svg className="w-6 h-6 text-white" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4H18C22.4183 4 26 7.58172 26 12C26 16.4183 22.4183 20 18 20H12V28H6V4Z" fill="currentColor" fillOpacity="0.2"/>
                <path d="M6 4H18C22.4183 4 26 7.58172 26 12C26 16.4183 22.4183 20 18 20H12M6 4V28M6 4H12" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="18" cy="12" r="3" fill="#38BDF8"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white font-mono">PAYPAS</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono font-bold">GLOBAL</span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-1 tracking-wider uppercase font-medium">One World. One Payment Network.</p>
            </div>
          </div>

          {/* Nav Items */}
          {!isAuthenticated ? (
            <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-300">
              <button onClick={() => setActiveTab('landing')} className={`hover:text-white transition ${activeTab === 'landing' ? 'text-blue-400 font-semibold' : ''}`}>Platform</button>
              <button onClick={() => setActiveTab('countries')} className={`hover:text-white transition ${activeTab === 'countries' ? 'text-blue-400 font-semibold' : ''}`}>193 Countries</button>
              <button onClick={() => setActiveTab('converter')} className={`hover:text-white transition ${activeTab === 'converter' ? 'text-blue-400 font-semibold' : ''}`}>FX Converter</button>
              <button onClick={() => setActiveTab('crypto')} className={`hover:text-white transition ${activeTab === 'crypto' ? 'text-blue-400 font-semibold' : ''}`}>Digital Assets</button>
              <button onClick={() => setActiveTab('routing')} className={`hover:text-white transition ${activeTab === 'routing' ? 'text-blue-400 font-semibold' : ''}`}>Smart Routing</button>
              <button onClick={() => setActiveTab('docs')} className={`hover:text-white transition ${activeTab === 'docs' ? 'text-blue-400 font-semibold' : ''}`}>Developer API</button>
              <button onClick={() => setActiveTab('pricing')} className={`hover:text-white transition ${activeTab === 'pricing' ? 'text-blue-400 font-semibold' : ''}`}>Pricing</button>
            </nav>
          ) : (
            <div className="flex items-center space-x-3">
              <span className="hidden sm:inline-block text-xs bg-slate-900 text-slate-300 px-3 py-1 rounded-full border border-slate-800">
                Merchant: <strong className="text-white">PayPas Global Enterprise Sandbox</strong>
              </span>
              <button onClick={() => setActiveTab('settings')} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Auth Action Buttons */}
          <div className="flex items-center space-x-3">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => setActiveTab('login')}
                  className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-lg transition"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setActiveTab('signup')}
                  className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg shadow-lg shadow-blue-600/30 transition border border-blue-400/30"
                >
                  Get API Sandbox Keys
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-red-500/20 hover:text-red-300 border border-slate-800 hover:border-red-500/40 rounded-lg transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit Session</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Authenticated Dashboard Navigation Sidebar */}
        {isAuthenticated && (
          <aside className="w-64 border-r border-slate-800/80 bg-[#071426]/60 p-4 shrink-0 hidden md:block">
            <div className="space-y-6">
              <div>
                <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Core Platform</p>
                <nav className="space-y-1">
                  <SidebarLink icon={BarChart3} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                  <SidebarLink icon={Globe} label="Global Payments" active={activeTab === 'payments'} onClick={() => setActiveTab('payments')} />
                  <SidebarLink icon={TrendingUp} label="Payment Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
                  <SidebarLink icon={Layers} label="Payment Providers" active={activeTab === 'providers'} onClick={() => setActiveTab('providers')} badge="6 Active" />
                  <SidebarLink icon={Cpu} label="Smart Routing Engine" active={activeTab === 'routing'} onClick={() => setActiveTab('routing')} highlight />
                  <SidebarLink icon={DollarSign} label="Transactions Register" active={activeTab === 'transactions'} onClick={() => setActiveTab('transactions')} />
                  <SidebarLink icon={Users} label="Customer Directory" active={activeTab === 'customers'} onClick={() => setActiveTab('customers')} />
                </nav>
              </div>

              <div>
                <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">International & FX</p>
                <nav className="space-y-1">
                  <SidebarLink icon={Globe} label="193 UN Countries" active={activeTab === 'countries'} onClick={() => setActiveTab('countries')} />
                  <SidebarLink icon={Landmark} label="ISO 4217 Currencies" active={activeTab === 'currencies'} onClick={() => setActiveTab('currencies')} />
                  <SidebarLink icon={ArrowRightLeft} label="Currency Converter" active={activeTab === 'converter'} onClick={() => setActiveTab('converter')} />
                  <SidebarLink icon={Wallet} label="Digital Assets / Crypto" active={activeTab === 'crypto'} onClick={() => setActiveTab('crypto')} />
                  <SidebarLink icon={Building2} label="Batch Payouts" active={activeTab === 'payouts'} onClick={() => setActiveTab('payouts')} />
                </nav>
              </div>

              <div>
                <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Developer Tools</p>
                <nav className="space-y-1">
                  <SidebarLink icon={Key} label="API Keys & Tokens" active={activeTab === 'apikeys'} onClick={() => setActiveTab('apikeys')} />
                  <SidebarLink icon={Radio} label="Webhooks & Events" active={activeTab === 'webhooks'} onClick={() => setActiveTab('webhooks')} />
                  <SidebarLink icon={Terminal} label="API Documentation" active={activeTab === 'docs'} onClick={() => setActiveTab('docs')} />
                </nav>
              </div>

              <div>
                <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Security & Governance</p>
                <nav className="space-y-1">
                  <SidebarLink icon={ShieldCheck} label="Security Architecture" active={activeTab === 'security'} onClick={() => setActiveTab('security')} />
                  <SidebarLink icon={Scale} label="Compliance & Audit Logs" active={activeTab === 'audit'} onClick={() => setActiveTab('audit')} />
                  <SidebarLink icon={CreditCard} label="Pricing & Plans" active={activeTab === 'pricing'} onClick={() => setActiveTab('pricing')} />
                  <SidebarLink icon={Settings} label="Account Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                </nav>
              </div>

              <div className="p-3 bg-gradient-to-br from-slate-900 to-blue-950/40 rounded-xl border border-blue-500/20 text-xs space-y-1">
                <div className="flex items-center space-x-2 text-blue-400 font-semibold">
                  <Zap className="w-4 h-4" />
                  <span>Optimization Engine</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">Smart Routing saved <span className="text-emerald-400 font-bold">$68,100</span> in fees this month across connected acquirers.</p>
              </div>
            </div>
          </aside>
        )}

        {/* Dynamic Screen View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {activeTab === 'landing' && <LandingPageView onGetStarted={() => setActiveTab('signup')} onExploreRouting={() => setActiveTab('routing')} />}
          {activeTab === 'login' && <AuthView type="login" onSuccess={handleLoginSuccess} onToggle={() => setActiveTab('signup')} />}
          {activeTab === 'signup' && <AuthView type="signup" onSuccess={handleLoginSuccess} onToggle={() => setActiveTab('login')} />}
          {activeTab === 'dashboard' && <DashboardView onNavigate={(tab) => setActiveTab(tab)} />}
          {activeTab === 'payments' && <GlobalPaymentsView showToast={showToast} />}
          {activeTab === 'analytics' && <AnalyticsView />}
          {activeTab === 'providers' && <ProvidersView showToast={showToast} />}
          {activeTab === 'routing' && <RoutingEngineView showToast={showToast} />}
          {activeTab === 'transactions' && <TransactionsView showToast={showToast} />}
          {activeTab === 'customers' && <CustomersView />}
          {activeTab === 'countries' && <CountriesView />}
          {activeTab === 'currencies' && <CurrenciesView />}
          {activeTab === 'converter' && <CurrencyConverterView showToast={showToast} />}
          {activeTab === 'crypto' && <CryptoMarketView showToast={showToast} />}
          {activeTab === 'payouts' && <PayoutsView showToast={showToast} />}
          {activeTab === 'apikeys' && <ApiKeysView showToast={showToast} />}
          {activeTab === 'webhooks' && <WebhooksView showToast={showToast} />}
          {activeTab === 'docs' && <ApiDocsView showToast={showToast} />}
          {activeTab === 'pricing' && <PricingView onSelectPlan={() => setActiveTab('signup')} />}
          {activeTab === 'security' && <SecurityView />}
          {activeTab === 'audit' && <AuditView />}
          {activeTab === 'settings' && <SettingsView showToast={showToast} />}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-[#050B18] border-t border-slate-800 py-8 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-blue-500" />
            <span className="font-semibold text-slate-300">PayPas Global Technology Inc.</span>
            <span>© 2026. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span className="text-amber-400/90 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Prototype & Architecture Simulator (Non-Licensed Gateway)
            </span>
            <button onClick={() => setActiveTab('security')} className="hover:text-white">SOC2 & Compliance</button>
            <button onClick={() => setActiveTab('docs')} className="hover:text-white">REST API v2</button>
            <button onClick={() => setActiveTab('pricing')} className="hover:text-white">Enterprise SLA</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function SidebarLink({ icon: Icon, label, active, onClick, badge, highlight }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
        active
          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
          : highlight
          ? 'bg-slate-900 text-sky-300 hover:bg-slate-800 border border-sky-500/20'
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
      }`}
    >
      <div className="flex items-center space-x-2.5 truncate">
        <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-blue-400' : 'text-slate-400'}`} />
        <span className="truncate">{label}</span>
      </div>
      {badge && (
        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700 font-mono">
          {badge}
        </span>
      )}
    </button>
  );
}

// --- VIEW 1: GLOBAL LANDING PAGE ---

function LandingPageView({ onGetStarted, onExploreRouting }) {
  return (
    <div className="space-y-20 py-6">
      {/* Hero Header */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5" />
          <span>Next-Gen Global Payment Infrastructure</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          One World. <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">One Payment Network.</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Unify Stripe, Adyen, Airwallex, Wise, and local acquirers across 193 UN member states into a single smart orchestration engine. Maximize authorization rates to 99.8% while reducing cross-border FX surcharges.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-xl shadow-blue-600/30 transition flex items-center justify-center space-x-2 border border-blue-400/30"
          >
            <span>Get Sandbox API Keys</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onExploreRouting}
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl border border-slate-800 transition flex items-center justify-center space-x-2"
          >
            <Cpu className="w-4 h-4 text-blue-400" />
            <span>Simulate Smart Routing</span>
          </button>
        </div>

        {/* Global Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 text-left">
          <LandingStatCard title="UN Countries Supported" value="193 States" subtext="Global ISO 3166 compliance" />
          <LandingStatCard title="Currencies Supported" value="150+ ISO 4217" subtext="Multi-currency settlement" />
          <LandingStatCard title="Avg Auth Success Rate" value="99.8%" subtext="+4.1% over direct acquirers" />
          <LandingStatCard title="Routing Latency" value="< 115ms" subtext="Global edge decisioning" />
        </div>
      </section>

      {/* Orchestration Visual Pipeline */}
      <section className="bg-[#071426]/80 rounded-2xl border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl font-bold text-white">Unified Non-Custodial Architecture</h2>
          <p className="text-sm text-slate-400">PayPas decouples checkout UX from underlying payment processors to prevent vendor lock-in and maximize uptime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center relative z-10 text-center">
          <div className="bg-[#050B18] p-4 rounded-xl border border-slate-800">
            <Laptop className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="font-semibold text-xs text-white">Global Merchant Checkout</p>
            <p className="text-[10px] text-slate-400">SaaS / E-com / Mobile</p>
          </div>
          <div className="flex justify-center text-blue-400"><ArrowRight className="w-5 h-5 hidden md:block" /></div>
          <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 p-5 rounded-xl border border-blue-500/40 shadow-lg shadow-blue-500/10">
            <Cpu className="w-7 h-7 text-sky-300 mx-auto mb-2 animate-pulse" />
            <p className="font-bold text-sm text-white">PayPas Smart Engine</p>
            <p className="text-[11px] text-blue-300 font-mono">Unified REST API</p>
          </div>
          <div className="flex justify-center text-blue-400"><ArrowRight className="w-5 h-5 hidden md:block" /></div>
          <div className="space-y-2">
            <div className="bg-[#050B18] p-2.5 rounded-lg border border-slate-800 flex items-center justify-between px-3 text-xs">
              <span className="font-semibold text-slate-300">Adyen</span>
              <span className="text-[10px] text-emerald-400">99.8% Opt</span>
            </div>
            <div className="bg-[#050B18] p-2.5 rounded-lg border border-slate-800 flex items-center justify-between px-3 text-xs">
              <span className="font-semibold text-slate-300">Airwallex</span>
              <span className="text-[10px] text-sky-400">APAC FX</span>
            </div>
            <div className="bg-[#050B18] p-2.5 rounded-lg border border-slate-800 flex items-center justify-between px-3 text-xs">
              <span className="font-semibold text-slate-300">Wise</span>
              <span className="text-[10px] text-emerald-400">Low Payout</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl font-bold text-white">Platform Capabilities</h2>
          <p className="text-sm text-slate-400">Built for high-volume enterprise marketplaces requiring multi-acquirer resilience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LandingFeatureCard icon={Cpu} title="Smart Routing Algorithm" description="Dynamically route based on card BIN, issuer country, interchange limits, and live acquirer latencies." />
          <LandingFeatureCard icon={ShieldCheck} title="Automatic Cascade Retry" description="If Provider A rejects a payment due to a soft decline, PayPas automatically retries via Provider B in under 200ms." />
          <LandingFeatureCard icon={Globe} title="193 UN Country Engine" description="Accept payments globally with full ISO 3166 territory mapping and localized acquiring endpoints." />
          <LandingFeatureCard icon={Landmark} title="ISO 4217 Currency Hub" description="Real-time currency exchange calculator with customizable spread markup for multi-currency settlement." />
          <LandingFeatureCard icon={Wallet} title="Digital Asset Data Portal" description="Track crypto market rates (BTC, ETH, USDT, USDC, SOL) for future licensed stablecoin payouts." />
          <LandingFeatureCard icon={Lock} title="Zero PCI Scope Tokenization" description="Universal vaulting allows changing processors without asking customers to re-enter credit card details." />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-[#050B18] rounded-2xl p-8 sm:p-12 border border-blue-500/30 text-center space-y-6">
        <h2 className="text-3xl font-bold text-white">Start Building Global Infrastructure Today</h2>
        <p className="text-slate-300 max-w-xl mx-auto text-sm leading-relaxed">
          Access the PayPas Developer Sandbox to experiment with smart payment routing, cross-border FX payouts, and unified API keys.
        </p>
        <button
          onClick={onGetStarted}
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition border border-blue-400/40"
        >
          Generate Free Sandbox API Key
        </button>
      </section>
    </div>
  );
}

function LandingStatCard({ title, value, subtext }) {
  return (
    <div className="bg-[#071426]/80 p-4 rounded-xl border border-slate-800">
      <p className="text-xs font-medium text-slate-400">{title}</p>
      <p className="text-2xl font-extrabold text-white my-1">{value}</p>
      <p className="text-[11px] text-blue-400">{subtext}</p>
    </div>
  );
}

function LandingFeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-[#071426]/50 p-6 rounded-xl border border-slate-800 hover:border-blue-500/40 transition group">
      <div className="w-12 h-12 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-600/20 transition">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}

// --- VIEW 2 & 3: AUTHENTICATION ---

function AuthView({ type, onSuccess, onToggle }) {
  const [email, setEmail] = useState('enterprise@paypas-global.com');
  const [password, setPassword] = useState('••••••••••••');
  const [company, setCompany] = useState('PayPas Global Enterprise');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-[#071426] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center mx-auto text-blue-400">
            <Globe className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {type === 'login' ? 'Sign In to PayPas Console' : 'Create PayPas Developer Account'}
          </h2>
          <p className="text-xs text-slate-400">
            {type === 'login' ? 'Access multi-acquirer smart orchestration sandbox' : 'Build scalable global payment infrastructure'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {type === 'signup' && (
            <div>
              <label className="block text-slate-300 font-medium mb-1">Company / Organization Name</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                className="w-full bg-[#050B18] border border-slate-800 rounded-lg px-3 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-slate-300 font-medium mb-1">Work Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#050B18] border border-slate-800 rounded-lg px-3 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#050B18] border border-slate-800 rounded-lg px-3 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/30 transition text-sm"
          >
            {type === 'login' ? 'Authenticate Console' : 'Generate Sandbox API Keys'}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>{type === 'login' ? "Don't have an enterprise account? " : 'Already registered? '}</span>
          <button onClick={onToggle} className="text-blue-400 font-semibold hover:underline">
            {type === 'login' ? 'Sign up here' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- VIEW 4: MAIN DASHBOARD ---

function DashboardView({ onNavigate }) {
  return (
    <div className="space-y-6">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Global Payment Dashboard</h1>
          <p className="text-xs text-slate-400">Real-time payment volume, acquirer health, and smart routing metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs text-slate-400 bg-[#071426] border border-slate-800 px-3 py-1.5 rounded-lg flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>30-Day Snapshot</span>
          </span>
          <button
            onClick={() => onNavigate('routing')}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center space-x-1.5"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Configure Routing</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Tile Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardMetricTile
          title="Total Volume Processed"
          value="$4,950,000.00"
          change="+18.4%"
          isPositive={true}
          sub="31,500 total transactions"
          icon={DollarSign}
        />
        <DashboardMetricTile
          title="Auth Success Rate"
          value="99.8%"
          change="+2.1%"
          isPositive={true}
          sub="+4.1% via Smart Failover"
          icon={CheckCircle2}
        />
        <DashboardMetricTile
          title="Average Processing Fee"
          value="2.32%"
          change="-0.45%"
          isPositive={true}
          sub="Fee savings: $68,100/mo"
          icon={TrendingUp}
        />
        <DashboardMetricTile
          title="Connected Acquirers"
          value="6 / 6 Active"
          change="100% Health"
          isPositive={true}
          sub="Avg latency: 135ms"
          icon={Server}
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Volume Area Chart */}
        <div className="lg:col-span-2 bg-[#071426] border border-slate-800 p-5 rounded-xl space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-white text-sm">Monthly Volume & Routing Savings</h3>
              <p className="text-xs text-slate-400">Gross processed volume vs fee optimization gains</p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center space-x-1 text-blue-400"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Volume</span>
              <span className="flex items-center space-x-1 text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Savings</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_MONTHLY_DATA}>
                <defs>
                  <linearGradient id="colorPayPasVol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(val) => `$${val / 1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#071426', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="volume" stroke="#2563eb" fillOpacity={1} fill="url(#colorPayPasVol)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Provider Distribution Pie Chart */}
        <div className="bg-[#071426] border border-slate-800 p-5 rounded-xl space-y-4">
          <h3 className="font-bold text-white text-sm">Routed Volume by Processor</h3>
          <p className="text-xs text-slate-400">Real-time load balancing split</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={MOCK_PROVIDERS}
                  dataKey="successRate"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                >
                  {MOCK_PROVIDERS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#2563eb', '#38bdf8', '#6366f1', '#8b5cf6', '#ec4899', '#10b981'][index % 6]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#071426', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1 text-xs">
            {MOCK_PROVIDERS.slice(0, 3).map((p, i) => (
              <div key={p.id} className="flex justify-between items-center text-slate-300">
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ['#2563eb', '#38bdf8', '#6366f1'][i] }}></span>
                  <span>{p.name}</span>
                </span>
                <span className="font-mono">{p.successRate}% Auth</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions Register Table Preview */}
      <div className="bg-[#071426] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-white text-sm">Recent Orchestrated Transactions</h3>
            <p className="text-xs text-slate-400">Live decision log from PayPas Smart Engine</p>
          </div>
          <button onClick={() => onNavigate('transactions')} className="text-xs text-blue-400 hover:underline font-semibold flex items-center space-x-1">
            <span>View All Register</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#050B18] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Tx ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Routed Acquirer</th>
                <th className="p-3">Decision Reason</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {MOCK_TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-800/40">
                  <td className="p-3 font-mono text-blue-400 font-semibold">{tx.id}</td>
                  <td className="p-3 font-medium text-white">{tx.customer}</td>
                  <td className="p-3 font-mono">{tx.amount.toFixed(2)} {tx.currency}</td>
                  <td className="p-3">{tx.provider}</td>
                  <td className="p-3 text-slate-400 text-[11px] max-w-xs truncate">{tx.routedReason}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      tx.status === 'succeeded' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DashboardMetricTile({ title, value, change, isPositive, sub, icon: Icon }) {
  return (
    <div className="bg-[#071426] border border-slate-800 p-5 rounded-xl space-y-2">
      <div className="flex justify-between items-start text-slate-400">
        <span className="text-xs font-medium">{title}</span>
        <Icon className="w-4 h-4 text-blue-400" />
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-extrabold text-white">{value}</span>
        <span className={`text-xs font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
      <p className="text-[11px] text-slate-400">{sub}</p>
    </div>
  );
}

// --- VIEW 5: GLOBAL PAYMENTS ENGINE ---

function GlobalPaymentsView({ showToast }) {
  const [testAmount, setTestAmount] = useState('150.00');
  const [testCurrency, setTestCurrency] = useState('USD');
  const [testCountry, setTestCountry] = useState('US');
  const [executionLog, setExecutionLog] = useState(null);

  const handleRunPaymentTest = (e) => {
    e.preventDefault();
    const log = [
      `[00:00.012] Incoming POST /v1/payments request received for ${testAmount} ${testCurrency}`,
      `[00:00.045] Country ISO: ${testCountry} | Evaluating BIN country origin`,
      `[00:00.089] Executing Smart Routing Engine Matrix...`,
      `[00:00.112] Acquirer Selected: Adyen N.V. (Reason: Lowest interchange rate + 99.8% uptime)`,
      `[00:00.145] Dispatching payload to Adyen Endpoint... HTTP 200 OK`,
      `[00:00.180] Transaction Succeeded! ID: tx_pas_${Math.floor(Math.random() * 8999999 + 1000000)}`
    ];
    setExecutionLog(log);
    showToast('Payment Test Request Executed');
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white">Global Payments Engine & Orchestrator</h1>
        <p className="text-xs text-slate-400">Test multi-acquirer transaction execution pipeline</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-[#071426] border border-slate-800 p-5 rounded-xl space-y-4">
          <h3 className="font-bold text-white text-sm">Simulate Checkout Payment</h3>
          <form onSubmit={handleRunPaymentTest} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Payment Amount</label>
              <input
                type="number"
                value={testAmount}
                onChange={(e) => setTestAmount(e.target.value)}
                className="w-full bg-[#050B18] border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Currency</label>
                <select
                  value={testCurrency}
                  onChange={(e) => setTestCurrency(e.target.value)}
                  className="w-full bg-[#050B18] border border-slate-800 rounded-lg px-3 py-2 text-white"
                >
                  {ISO_CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Customer Country</label>
                <select
                  value={testCountry}
                  onChange={(e) => setTestCountry(e.target.value)}
                  className="w-full bg-[#050B18] border border-slate-800 rounded-lg px-3 py-2 text-white"
                >
                  {UN_COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/30 transition text-xs flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Execute Orchestrated Payment Test</span>
            </button>
          </form>
        </div>

        <div className="lg:col-span-7 bg-[#071426] border border-slate-800 p-5 rounded-xl space-y-4">
          <h3 className="font-bold text-white text-sm">Real-Time Engine Execution Console</h3>
          {executionLog ? (
            <div className="bg-[#050B18] p-4 rounded-lg border border-slate-800 font-mono text-xs text-blue-300 space-y-2">
              {executionLog.map((line, idx) => (
                <div key={idx} className="leading-relaxed">{line}</div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <Terminal className="w-10 h-10 mx-auto text-slate-700 animate-pulse" />
              <p className="text-xs">Submit a payment test request to view real-time log traces</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- VIEW 6: PAYMENT ANALYTICS ---

function AnalyticsView() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white">Payment Analytics & Intelligence</h1>
        <p className="text-xs text-slate-400">Latencies, decline categories, and authorization performance across global networks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#071426] border border-slate-800 p-5 rounded-xl space-y-4">
          <h3 className="font-bold text-white text-sm">Acquirer Response Latency (ms)</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_PROVIDERS}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#071426', borderColor: '#334155', fontSize: '12px' }} />
                <Bar dataKey="successRate" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#071426] border border-slate-800 p-5 rounded-xl space-y-4">
          <h3 className="font-bold text-white text-sm">Decline Classification Breakdown</h3>
          <div className="space-y-3 text-xs pt-2">
            <DeclineItem reason="Insufficient Funds (Soft Decline)" percentage="44%" color="bg-amber-500" />
            <DeclineItem reason="3D Secure SCA Authentication Timeout" percentage="26%" color="bg-blue-500" />
            <DeclineItem reason="Cross-Border Velocity Rule Limit" percentage="18%" color="bg-indigo-500" />
            <DeclineItem reason="Expired Card Credentials" percentage="12%" color="bg-slate-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DeclineItem({ reason, percentage, color }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-slate-300">
        <span>{reason}</span>
        <span className="font-mono font-bold">{percentage}</span>
      </div>
      <div className="w-full bg-[#050B18] h-2 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: percentage }}></div>
      </div>
    </div>
  );
}

// --- VIEW 7: PAYMENT PROVIDERS ---

function ProvidersView({ showToast }) {
  const [providers, setProviders] = useState(MOCK_PROVIDERS);

  const toggleProvider = (id) => {
    setProviders(providers.map(p => {
      if (p.id === id) {
        const newStatus = p.status === 'Connected' ? 'Disabled' : 'Connected';
        showToast(`Provider ${p.name} set to ${newStatus}`);
        return { ...p, status: newStatus };
      }
      return p;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Connected Payment Acquirers</h1>
          <p className="text-xs text-slate-400">Configure multi-acquirer integrations, fee structures, and latency monitoring</p>
        </div>
        <button
          onClick={() => showToast('Simulator: New Acquirer Integration Modal Opened')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Connect New Acquirer</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((p) => (
          <div key={p.id} className="bg-[#071426] border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-[#050B18] border border-slate-800 flex items-center justify-center font-bold text-blue-400">
                  {p.name.substring(0, 2)}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{p.name}</h3>
                  <span className="text-[11px] text-slate-400">{p.region}</span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                p.status === 'Connected' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
              }`}>
                {p.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs border-t border-slate-800/80 pt-3">
              <div>
                <p className="text-slate-400">Processing Fee</p>
                <p className="font-semibold text-white font-mono mt-0.5">{p.fee}</p>
              </div>
              <div>
                <p className="text-slate-400">Success Rate</p>
                <p className="font-semibold text-emerald-400 font-mono mt-0.5">{p.successRate}%</p>
              </div>
              <div>
                <p className="text-slate-400">Latency</p>
                <p className="font-semibold text-white font-mono mt-0.5">{p.latency}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
              <button
                onClick={() => toggleProvider(p.id)}
                className="text-slate-400 hover:text-white underline text-[11px]"
              >
                {p.status === 'Connected' ? 'Disable Provider' : 'Enable Provider'}
              </button>
              <button
                onClick={() => showToast(`Ping test sent to ${p.name} endpoint: 200 OK (${p.latency})`)}
                className="px-3 py-1 bg-[#050B18] hover:bg-slate-800 text-slate-200 border border-slate-800 rounded font-medium text-[11px]"
              >
                Ping API
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- VIEW 8: SMART PAYMENT ROUTING SIMULATOR ---

function RoutingEngineView({ showToast }) {
  const [amount, setAmount] = useState('500.00');
  const [currency, setCurrency] = useState('EUR');
  const [country, setCountry] = useState('DE');
  const [result, setResult] = useState(null);

  const handleSimulate = (e) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    let selectedProvider = 'Adyen N.V.';
    let reason = 'Optimal European acquiring endpoint & zero cross-border FX markup';

    if (currency === 'USD' && numericAmount > 2000) {
      selectedProvider = 'Stripe Global';
      reason = 'High-value US volume tier threshold reached on Stripe US acquiring node';
    } else if (currency === 'GBP') {
      selectedProvider = 'Airwallex Financial';
      reason = 'Lowest GBP interchange tier (2.1%) with instant UK Faster Payments settlement';
    }

    setResult({
      selectedProvider,
      reason,
      estimatedFee: `$${(numericAmount * 0.023 + 0.25).toFixed(2)}`,
      successProbability: '99.8%',
      latency: '112ms',
      routePath: `Customer (${country}) ➔ PayPas Smart Router ➔ ${selectedProvider} ➔ Issuer Bank`
    });

    showToast('Routing Decision Calculated');
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white">Smart Payment Routing Engine</h1>
        <p className="text-xs text-slate-400">Configure decisioning logic based on currency, BIN country, fees, and processor uptime</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-[#071426] border border-slate-800 p-5 rounded-xl space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-blue-400" />
            <span>Test Decision Logic</span>
          </h3>

          <form onSubmit={handleSimulate} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Transaction Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#050B18] border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-[#050B18] border border-slate-800 rounded-lg px-3 py-2 text-white"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CAD">CAD</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Customer Country</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-[#050B18] border border-slate-800 rounded-lg px-3 py-2 text-white"
                >
                  <option value="DE">Germany</option>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                  <option value="JP">Japan</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/30 transition text-xs flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Evaluate Decision Matrix</span>
            </button>
          </form>
        </div>

        <div className="lg:col-span-7 bg-[#071426] border border-slate-800 p-5 rounded-xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-white text-sm mb-4">Routing Pipeline Breakdown</h3>
            {result ? (
              <div className="space-y-4">
                <div className="p-4 bg-[#050B18] rounded-xl border border-blue-500/40 space-y-2">
                  <span className="text-xs text-slate-400">Selected Acquirer Endpoint</span>
                  <p className="text-2xl font-extrabold text-white">{result.selectedProvider}</p>
                  <p className="text-xs text-blue-300 font-medium">{result.reason}</p>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="bg-[#050B18] p-3 rounded-lg border border-slate-800">
                    <p className="text-slate-400">Estimated Fee</p>
                    <p className="font-bold text-white font-mono mt-1">{result.estimatedFee}</p>
                  </div>
                  <div className="bg-[#050B18] p-3 rounded-lg border border-slate-800">
                    <p className="text-slate-400">Success Probability</p>
                    <p className="font-bold text-emerald-400 font-mono mt-1">{result.successProbability}</p>
                  </div>
                  <div className="bg-[#050B18] p-3 rounded-lg border border-slate-800">
                    <p className="text-slate-400">Expected Latency</p>
                    <p className="font-bold text-white font-mono mt-1">{result.latency}</p>
                  </div>
                </div>

                <div className="p-3 bg-[#050B18] rounded-lg border border-slate-800 text-xs">
                  <p className="text-slate-400 font-mono text-[11px] mb-1">EXECUTION ROUTE PATH:</p>
                  <p className="text-blue-400 font-mono text-xs">{result.routePath}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 space-y-2">
                <Cpu className="w-10 h-10 mx-auto text-slate-700 animate-pulse" />
                <p className="text-xs">Select parameters and click evaluate to view live routing path</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- VIEW 9: TRANSACTIONS MANAGEMENT ---

function TransactionsView({ showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTx, setSelectedTx] = useState(null);

  const filtered = useMemo(() => {
    return MOCK_TRANSACTIONS.filter(t =>
      t.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleExportCSV = () => {
    const headers = "TransactionID,Customer,Amount,Currency,Provider,Status,Date\n";
    const rows = filtered.map(t => `${t.id},"${t.customer}",${t.amount},${t.currency},"${t.provider}",${t.status},${t.date}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PayPas_Transactions_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast('Exported CSV transaction register file!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Unified Transactions Register</h1>
          <p className="text-xs text-slate-400">Search and export all orchestrated payments</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg border border-slate-700 transition flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV File</span>
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
        <input
          type="text"
          placeholder="Filter by Transaction ID or Customer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#071426] border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="bg-[#071426] border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#050B18] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-3">Tx ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Acquirer</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {filtered.map((tx) => (
              <tr key={tx.id} className="hover:bg-slate-800/40">
                <td className="p-3 font-mono text-blue-400 font-semibold">{tx.id}</td>
                <td className="p-3 font-medium text-white">{tx.customer}</td>
                <td className="p-3 font-mono font-bold text-white">{tx.amount.toFixed(2)} {tx.currency}</td>
                <td className="p-3">{tx.provider}</td>
                <td className="p-3 text-slate-400 text-[11px]">{tx.date}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    tx.status === 'succeeded' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                    {tx.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => setSelectedTx(tx)}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px]"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTx && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#071426] border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">Transaction Metadata Inspector</h3>
                <p className="text-xs text-blue-400 font-mono">{selectedTx.id}</p>
              </div>
              <button onClick={() => setSelectedTx(null)} className="text-slate-400 hover:text-white text-sm font-bold">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-[#050B18] p-3 rounded-lg border border-slate-800">
                <div>
                  <span className="text-slate-400 block">Customer</span>
                  <span className="font-semibold text-white">{selectedTx.customer}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Amount</span>
                  <span className="font-bold text-white font-mono">{selectedTx.amount} {selectedTx.currency}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Routing Reason:</span>
                <p className="p-2 bg-blue-950/40 border border-blue-500/30 text-blue-300 rounded font-mono text-[11px]">
                  {selectedTx.routedReason}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button onClick={() => setSelectedTx(null)} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold">
                Close Modal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- VIEW 10: CUSTOMER DIRECTORY ---

function CustomersView() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white">Merchant Customer Vault</h1>
        <p className="text-xs text-slate-400">Tokenized payment profiles and risk scores</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#071426] border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-white text-sm">Nexus Cloud Systems</h3>
              <p className="text-xs text-slate-400">billing@nexus.cloud</p>
            </div>
            <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">🇺🇸 United States</span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2 text-xs border-t border-slate-800">
            <div><span className="text-slate-400 block">Processed</span><span className="font-bold text-white font-mono">$482,000</span></div>
            <div><span className="text-slate-400 block">Tx Count</span><span className="font-semibold text-white">1,420</span></div>
            <div><span className="text-slate-400 block">Risk Rating</span><span className="font-semibold text-emerald-400">Low (0.02)</span></div>
          </div>
        </div>

        <div className="bg-[#071426] border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-white text-sm">Khangai Mining LLC</h3>
              <p className="text-xs text-slate-400">finance@khangai.mn</p>
            </div>
            <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">🇲🇳 Mongolia</span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2 text-xs border-t border-slate-800">
            <div><span className="text-slate-400 block">Processed</span><span className="font-bold text-white font-mono">$920,500</span></div>
            <div><span className="text-slate-400 block">Tx Count</span><span className="font-semibold text-white">310</span></div>
            <div><span className="text-slate-400 block">Risk Rating</span><span className="font-semibold text-emerald-400">Low (0.05)</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- VIEW 11: GLOBAL COUNTRY EXPLORER ---

function CountriesView() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = UN_COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.currency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white">193 UN Member States Directory</h1>
        <p className="text-xs text-slate-400">ISO 3166 territory mapping, regional calling codes, and local currencies</p>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
        <input
          type="text"
          placeholder="Search country name, ISO code, or currency..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#071426] border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((c) => (
          <div key={c.code} className="bg-[#071426] border border-slate-800 rounded-xl p-4 space-y-2 hover:border-blue-500/40 transition">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{c.flag}</span>
              <div>
                <h3 className="font-bold text-white text-xs">{c.name}</h3>
                <span className="text-[10px] text-slate-400 font-mono">{c.alpha3} | {c.callingCode}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-800/80 flex justify-between text-[11px]">
              <span className="text-slate-400">Currency</span>
              <span className="font-mono text-blue-400 font-semibold">{c.currency} ({c.symbol})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- VIEW 12: CURRENCIES DATABASE ---

function CurrenciesView() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white">ISO 4217 Currency Dataset</h1>
        <p className="text-xs text-slate-400">Base exchange rates, conversion spread configs, and decimal precision rules</p>
      </div>

      <div className="bg-[#071426] border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#050B18] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-3">ISO Code</th>
              <th className="p-3">Currency Name</th>
              <th className="p-3">Symbol</th>
              <th className="p-3">USD Base Rate</th>
              <th className="p-3">Spread Fee</th>
              <th className="p-3">Decimals</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {ISO_CURRENCIES.map((curr) => (
              <tr key={curr.code} className="hover:bg-slate-800/40">
                <td className="p-3 font-mono text-blue-400 font-bold">{curr.code}</td>
                <td className="p-3 font-medium text-white">{curr.name}</td>
                <td className="p-3 font-mono">{curr.symbol}</td>
                <td className="p-3 font-mono">{curr.baseRate}</td>
                <td className="p-3 text-emerald-400 font-mono">{curr.fee}</td>
                <td className="p-3 text-slate-400 font-mono">{curr.decimals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- VIEW 13: CURRENCY CONVERTER ---

function CurrencyConverterView({ showToast }) {
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('EUR');
  const [amount, setAmount] = useState('1000');

  const convertedAmount = useMemo(() => {
    const fromObj = ISO_CURRENCIES.find(c => c.code === fromCurr);
    const toObj = ISO_CURRENCIES.find(c => c.code === toCurr);
    if (!fromObj || !toObj) return 0;
    const amountInUSD = parseFloat(amount || '0') / fromObj.baseRate;
    return (amountInUSD * toObj.baseRate).toFixed(toObj.decimals);
  }, [fromCurr, toCurr, amount]);

  const handleSwap = () => {
    setFromCurr(toCurr);
    setToCurr(fromCurr);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white">Global FX Converter Engine</h1>
        <p className="text-xs text-slate-400">Calculate real-time cross-border exchange rates with wholesale spread disclosures</p>
      </div>

      <div className="max-w-xl mx-auto bg-[#071426] border border-slate-800 p-6 rounded-2xl space-y-6 shadow-xl">
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Source Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#050B18] border border-slate-800 rounded-lg px-4 py-3 text-white font-mono text-base font-bold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 items-center gap-2">
            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1">From Currency</label>
              <select
                value={fromCurr}
                onChange={(e) => setFromCurr(e.target.value)}
                className="w-full bg-[#050B18] border border-slate-800 rounded-lg px-3 py-2 text-white"
              >
                {ISO_CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
              </select>
            </div>

            <div className="flex justify-center pt-4 sm:pt-0">
              <button
                onClick={handleSwap}
                className="p-2 rounded-full bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/30 transition"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1">To Currency</label>
              <select
                value={toCurr}
                onChange={(e) => setToCurr(e.target.value)}
                className="w-full bg-[#050B18] border border-slate-800 rounded-lg px-3 py-2 text-white"
              >
                {ISO_CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#050B18] rounded-xl border border-blue-500/30 text-center space-y-1">
          <span className="text-xs text-slate-400">Converted Amount (Simulated Interbank Rate)</span>
          <p className="text-3xl font-extrabold text-white font-mono">{convertedAmount} {toCurr}</p>
        </div>

        <button
          onClick={() => showToast(`Locked in exchange rate for 30 seconds!`)}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition"
        >
          Lock FX Rate for Settlement
        </button>
      </div>
    </div>
  );
}

// --- VIEW 14: DIGITAL ASSETS / CRYPTO DASHBOARD ---

function CryptoMarketView({ showToast }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white">Digital Asset Market Intelligence</h1>
        <p className="text-xs text-slate-400">Market capitalization, gas networks, and stablecoin payout readiness tracking</p>
      </div>

      <div className="bg-[#071426] border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#050B18] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-3">Asset</th>
              <th className="p-3">Market Price</th>
              <th className="p-3">24h Change</th>
              <th className="p-3">Market Cap</th>
              <th className="p-3">Network standard</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {CRYPTO_ASSETS.map((asset) => (
              <tr key={asset.symbol} className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-white">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-blue-400">{asset.symbol}</span>
                    <span className="text-slate-400 text-[11px] font-normal">{asset.name}</span>
                  </div>
                </td>
                <td className="p-3 font-mono font-bold text-white">{asset.price}</td>
                <td className={`p-3 font-mono font-semibold ${asset.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {asset.change24h}
                </td>
                <td className="p-3 font-mono text-slate-300">{asset.marketCap}</td>
                <td className="p-3 text-slate-400 text-[11px]">{asset.network}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => showToast(`Simulator: ${asset.symbol} network route query checked`)}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px]"
                  >
                    Query Network
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- VIEW 15: PAYOUT MANAGEMENT ---

function PayoutsView({ showToast }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Cross-Border Payout Management</h1>
          <p className="text-xs text-slate-400">Batch wire transfers, SEPA Instant, and local clearing payouts</p>
        </div>
        <button
          onClick={() => showToast('Batch Payout File Upload Modal Opened')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Batch Payout</span>
        </button>
      </div>

      <div className="bg-[#071426] border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#050B18] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-3">Payout ID</th>
              <th className="p-3">Beneficiary</th>
              <th className="p-3">Destination</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Clearing Partner</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {MOCK_PAYOUTS.map((po) => (
              <tr key={po.id} className="hover:bg-slate-800/40">
                <td className="p-3 font-mono text-blue-400 font-semibold">{po.id}</td>
                <td className="p-3 font-medium text-white">{po.beneficiary}</td>
                <td className="p-3">{po.country}</td>
                <td className="p-3 font-mono font-bold text-white">{po.amount}</td>
                <td className="p-3 text-slate-300">{po.provider}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400">
                    {po.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- VIEW 16, 17, 18: API KEYS, WEBHOOKS & DOCS ---

function ApiKeysView({ showToast }) {
  const [apiKey] = useState('paypas_live_sk_99182410928419204812');
  const [copied, setCopied] = useState(false);

  const copyKey = () => {
    setCopied(true);
    showToast('Secret Key copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white">API Keys & Access Credentials</h1>
        <p className="text-xs text-slate-400">Authenticate API calls to PayPas Smart Orchestration endpoints</p>
      </div>

      <div className="bg-[#071426] border border-slate-800 p-6 rounded-xl space-y-4">
        <h3 className="font-bold text-white text-sm">Sandbox Secret Key</h3>
        <div className="flex items-center space-x-2">
          <input type="password" readOnly value={apiKey} className="flex-1 bg-[#050B18] border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-300" />
          <button onClick={copyKey} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function WebhooksView({ showToast }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white">Webhooks & Event Streams</h1>
        <p className="text-xs text-slate-400">Configure outbound payment state notification listeners</p>
      </div>

      <div className="bg-[#071426] border border-slate-800 p-5 rounded-xl space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-white text-sm">Active Webhook Endpoints</h3>
          <button onClick={() => showToast('Test ping event dispatched to HTTPS endpoint')} className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg">
            Dispatch Test Event
          </button>
        </div>
        <div className="bg-[#050B18] p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 flex justify-between items-center">
          <span>https://api.nexus.cloud/paypas-webhook</span>
          <span className="text-emerald-400">200 OK</span>
        </div>
      </div>
    </div>
  );
}

function ApiDocsView() {
  const [lang, setLang] = useState('curl');
  const codeSnippet = {
    curl: `curl -X POST https://api.paypas.net/v1/payments \\
  -H "Authorization: Bearer paypas_live_sk_99182..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 15000,
    "currency": "usd",
    "smart_routing": true
  }'`,
    javascript: `import { PayPas } from '@paypas/node';
const paypas = new PayPas('paypas_live_sk_99182...');
const payment = await paypas.payments.create({ amount: 15000, currency: 'usd' });`,
    python: `import paypas
paypas.api_key = "paypas_live_sk_99182..."
payment = paypas.Payment.create(amount=15000, currency="usd")`
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white">REST API Reference Documentation</h1>
        <p className="text-xs text-slate-400">Integrate PayPas payment orchestration into your stack</p>
      </div>

      <div className="bg-[#071426] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <span className="font-mono text-xs text-blue-400 font-bold">POST /v1/payments</span>
          <div className="flex space-x-2">
            {['curl', 'javascript', 'python'].map(l => (
              <button key={l} onClick={() => setLang(l)} className={`px-2.5 py-1 text-xs font-mono uppercase rounded ${lang === l ? 'bg-blue-600 text-white' : 'bg-[#050B18] text-slate-400'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <pre className="bg-[#050B18] p-4 rounded-lg font-mono text-xs text-blue-300 overflow-x-auto border border-slate-800">
          <code>{codeSnippet[lang]}</code>
        </pre>
      </div>
    </div>
  );
}

// --- VIEW 19: PRICING ---

function PricingView({ onSelectPlan }) {
  return (
    <div className="space-y-8 py-4">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold text-white">Enterprise Tier Pricing</h1>
        <p className="text-sm text-slate-400">Simple percentage pricing per routed payment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PricingTile title="Starter Sandbox" price="0.15%" sub="per transaction" buttonText="Start Free" onClick={onSelectPlan} />
        <PricingTile title="Global Scale" price="0.08%" sub="per transaction" highlighted buttonText="Deploy Global" onClick={onSelectPlan} />
        <PricingTile title="Custom Enterprise" price="Custom" sub="high volume tier" buttonText="Contact Sales" onClick={onSelectPlan} />
      </div>
    </div>
  );
}

function PricingTile({ title, price, sub, highlighted, buttonText, onClick }) {
  return (
    <div className={`p-6 rounded-2xl border space-y-6 flex flex-col justify-between ${highlighted ? 'bg-gradient-to-b from-blue-950/40 to-[#071426] border-blue-500/50' : 'bg-[#071426] border-slate-800'}`}>
      <div className="space-y-2">
        <h3 className="font-bold text-white text-lg">{title}</h3>
        <p className="text-3xl font-extrabold text-white">{price}</p>
        <p className="text-xs text-slate-400">{sub}</p>
      </div>
      <button onClick={onClick} className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-xs">
        {buttonText}
      </button>
    </div>
  );
}

// --- VIEW 20: SECURITY ---

function SecurityView() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white">Security & Compliance Architecture</h1>
        <p className="text-xs text-slate-400">Zero-trust tokenization, SOC2 compliance mapping, and TLS 1.3 encryption</p>
      </div>
      <div className="bg-[#071426] border border-slate-800 p-5 rounded-xl space-y-2">
        <h3 className="font-bold text-white text-sm">Non-Custodial Architecture</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          PayPas never stores unencrypted credit card details or bank passwords on its servers. All sensitive data is tokenized prior to transit.
        </p>
      </div>
    </div>
  );
}

// --- VIEW 21: COMPLIANCE & AUDIT LOGS ---

function AuditView() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white">Immutable Security Audit Trail</h1>
        <p className="text-xs text-slate-400">Real-time log of administrative rule changes and access events</p>
      </div>
      <div className="bg-[#071426] border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#050B18] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-3">Event ID</th>
              <th className="p-3">User</th>
              <th className="p-3">Action</th>
              <th className="p-3">Target</th>
              <th className="p-3">IP Address</th>
              <th className="p-3">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {MOCK_AUDIT_LOGS.map((log) => (
              <tr key={log.id} className="hover:bg-slate-800/40">
                <td className="p-3 font-mono text-blue-400">{log.id}</td>
                <td className="p-3 font-medium text-white">{log.user}</td>
                <td className="p-3 font-mono text-emerald-400">{log.action}</td>
                <td className="p-3">{log.target}</td>
                <td className="p-3 font-mono text-slate-400">{log.ip}</td>
                <td className="p-3 text-slate-400 text-[11px]">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- VIEW 22: ACCOUNT SETTINGS ---

function SettingsView({ showToast }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white">Account Configuration</h1>
        <p className="text-xs text-slate-400">Organization settings and environment toggles</p>
      </div>

      <div className="bg-[#071426] border border-slate-800 p-5 rounded-xl space-y-4 max-w-xl">
        <h3 className="font-bold text-white text-sm">Merchant Profile</h3>
        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Organization Name</label>
            <input type="text" readOnly value="PayPas Enterprise Inc." className="w-full bg-[#050B18] border border-slate-800 rounded-lg px-3 py-2 text-white" />
          </div>
        </div>
        <button onClick={() => showToast('Settings updated')} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold">
          Save Settings
        </button>
      </div>
    </div>
  );
}
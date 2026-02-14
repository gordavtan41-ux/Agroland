import { useMemo, useState } from 'react';
import { LoginView } from './pages/LoginView.jsx';
import { ProductList } from './pages/ProductList.jsx';
import { StockAlert } from './pages/StockAlert.jsx';
import { SupplyPage } from './pages/SupplyPage.jsx';
import { OrderPage } from './pages/OrderPage.jsx';
import { ContractorsPage } from './pages/ContractorsPage.jsx';
import { AdminPage } from './pages/AdminPage.jsx';
import { ReportsPage } from './pages/ReportsPage.jsx';
import './styles.css';

const tabs = [
  { id: 'auth', label: 'Авторизация', component: LoginView },
  { id: 'products', label: 'Продукция', component: ProductList },
  { id: 'alerts', label: 'Уведомления', component: StockAlert },
  { id: 'supply', label: 'Поставки', component: SupplyPage },
  { id: 'orders', label: 'Заказы', component: OrderPage },
  { id: 'contractors', label: 'Контрагенты', component: ContractorsPage },
  { id: 'admin', label: 'Администрирование', component: AdminPage },
  { id: 'reports', label: 'Отчёты', component: ReportsPage },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('auth');
  const ActiveComponent = useMemo(
    () => tabs.find((tab) => tab.id === activeTab)?.component || LoginView,
    [activeTab],
  );

  return (
    <main className="layout">
      <header>
        <h1>АгроЛэнд — рабочие страницы ИС</h1>
        <p>Интерфейсы для функционала из ТЗ: авторизация, склад, поставки, заказы, отчёты и админка.</p>
      </header>

      <nav className="tabs" aria-label="Разделы системы">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={tab.id === activeTab ? 'tab active' : 'tab'}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <section className="card">
        <ActiveComponent />
      </section>
    </main>
  );
}

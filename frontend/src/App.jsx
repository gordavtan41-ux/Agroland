import { LoginView } from './pages/LoginView.jsx';
import { ProductList } from './pages/ProductList.jsx';
import { StockAlert } from './pages/StockAlert.jsx';

export default function App() {
  return (
    <main>
      <h1>АгроЛэнд</h1>
      <LoginView />
      <ProductList />
      <StockAlert />
    </main>
  );
}

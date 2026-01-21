import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className="flex flex-col h-full bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Navigation />
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

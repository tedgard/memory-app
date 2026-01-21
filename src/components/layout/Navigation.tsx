import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/exercises', label: 'Exercises', icon: '🎯' },
  { path: '/progress', label: 'Progress', icon: '📈' },
  { path: '/education', label: 'Learn', icon: '🧠' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function Navigation() {
  return (
    <nav className="w-64 bg-surface border-r border-gray-800 p-4">
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  'hover:bg-background',
                  isActive
                    ? 'bg-primary/20 text-primary font-semibold'
                    : 'text-text-secondary hover:text-text-primary'
                )
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/30">
        <p className="text-xs text-text-secondary mb-2">Daily Training Tip</p>
        <p className="text-sm">
          Consistency is key! Train for 15-20 minutes daily for best results.
        </p>
      </div>
    </nav>
  );
}

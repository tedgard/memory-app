import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/exercises', label: 'Exercises', icon: '🎯' },
  { path: '/achievements', label: 'Achievements', icon: '🏆' },
  { path: '/progress', label: 'Progress', icon: '📈' },
  { path: '/education', label: 'Learn', icon: '🧠' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
];

interface NavigationProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Navigation({ isOpen = true, onClose }: NavigationProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Navigation Sidebar */}
      <nav
        className={cn(
          'fixed md:static inset-y-0 left-0 z-50',
          'w-64 bg-surface border-r border-gray-800 p-4',
          'transform transition-transform duration-300 ease-in-out',
          'md:transform-none',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-background rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                onClick={onClose}
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
    </>
  );
}

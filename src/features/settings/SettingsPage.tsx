import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useUserStore } from '@/store/useUserStore';

export default function SettingsPage() {
  const { soundEnabled, volume, theme, toggleSound, setVolume, setTheme } = useSettingsStore();
  const { profile, resetProfile } = useUserStore();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <Card className="p-6 bg-surface mb-4">
        <h2 className="text-xl font-bold mb-4">Audio</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Sound Effects</p>
              <p className="text-sm text-text-secondary">Play sounds during exercises</p>
            </div>
            <Button
              variant={soundEnabled ? 'default' : 'outline'}
              onClick={toggleSound}
            >
              {soundEnabled ? 'Enabled' : 'Disabled'}
            </Button>
          </div>

          <div>
            <p className="font-semibold mb-2">Volume</p>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full"
              disabled={!soundEnabled}
            />
            <p className="text-sm text-text-secondary mt-1">{Math.round(volume * 100)}%</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-surface mb-4">
        <h2 className="text-xl font-bold mb-4">Appearance</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Theme</p>
            <p className="text-sm text-text-secondary">Current: {theme}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={theme === 'dark' ? 'default' : 'outline'}
              onClick={() => setTheme('dark')}
            >
              Dark
            </Button>
            <Button
              variant={theme === 'light' ? 'default' : 'outline'}
              onClick={() => setTheme('light')}
            >
              Light
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-surface">
        <h2 className="text-xl font-bold mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Name</p>
            <p className="text-text-secondary">{profile?.name}</p>
          </div>

          <div>
            <p className="font-semibold">Training Goal</p>
            <p className="text-text-secondary capitalize">{profile?.goal}</p>
          </div>

          <div>
            <p className="font-semibold">Experience Level</p>
            <p className="text-text-secondary capitalize">{profile?.experienceLevel}</p>
          </div>

          <Button
            variant="destructive"
            onClick={() => {
              if (confirm('Are you sure? This will delete all your progress.')) {
                resetProfile();
                window.location.reload();
              }
            }}
          >
            Reset All Data
          </Button>
        </div>
      </Card>
    </div>
  );
}

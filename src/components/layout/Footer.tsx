import packageJson from '../../../package.json';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-gray-800 px-6 py-4 mt-auto">
      <div className="flex items-center justify-between text-sm text-text-secondary">
        <div className="flex items-center gap-2">
          <span>Made with ❤️ by Edgard N.</span>
        </div>
        <div className="flex items-center gap-4">
          <span>v{packageJson.version}</span>
        </div>
      </div>
    </footer>
  );
}

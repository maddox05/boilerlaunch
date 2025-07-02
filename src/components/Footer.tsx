export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-light)] bg-[var(--surface)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-2xl font-bold text-gradient mb-4">
            🚀 BoilerLaunch
          </div>
          <p className="text-[var(--text-secondary)] mb-4">
            Built with ❤️ for the Purdue community
          </p>
          <div className="flex justify-center space-x-6 text-sm text-[var(--text-muted)]">
            <span>Showcase • Discover • Connect</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

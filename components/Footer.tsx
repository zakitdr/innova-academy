export function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-600 flex flex-col md:flex-row gap-4 items-center justify-between">
        <p>© {new Date().getFullYear()} Innova Academy. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="/terms" className="hover:text-innova-purple">Terms</a>
          <a href="/privacy" className="hover:text-innova-purple">Privacy</a>
        </div>
      </div>
    </footer>
  );
}

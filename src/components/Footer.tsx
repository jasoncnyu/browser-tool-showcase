import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-card">
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div>
          <h4 className="font-heading text-sm font-semibold text-foreground">Local Tools</h4>
          <p className="mt-2 text-xs text-muted-foreground">
            Discover browser-based tools that respect your privacy.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-muted-foreground hover:text-foreground">All Tools</Link></li>
            <li><Link to="/about" className="text-muted-foreground hover:text-foreground">What are Local Tools?</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Community</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/submit" className="text-muted-foreground hover:text-foreground">Submit a Tool</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Account</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="text-muted-foreground hover:text-foreground">Log in</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
        © 2026 Local Tools. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;

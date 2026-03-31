import Layout from "@/components/Layout";
import { Shield, Zap, Eye, Lock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data never leaves your device. All processing happens locally in your browser using modern web APIs.",
  },
  {
    icon: Zap,
    title: "Instant & No Install",
    description: "No downloads, no sign-ups, no waiting. Open the URL and start using the tool immediately.",
  },
  {
    icon: Eye,
    title: "Transparent",
    description: "Many local tools are open source. You can inspect the code and verify exactly what's happening with your data.",
  },
  {
    icon: Lock,
    title: "Works Offline",
    description: "Once loaded, most local tools work without an internet connection. Perfect for sensitive documents.",
  },
];

const About = () => (
  <Layout>
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-heading text-4xl font-bold text-foreground">
        What are Local Browser Tools?
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        Local browser tools are web applications that process everything directly in your browser. 
        Unlike traditional web apps, they don't upload your files to a server — your data stays on your device.
        They leverage modern browser technologies like WebAssembly, Web Workers, Canvas API, and the File System API.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border bg-card p-6">
            <f.icon className="h-8 w-8 text-primary" />
            <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl bg-accent p-8">
        <h2 className="font-heading text-xl font-bold text-accent-foreground">How do I know if a tool is truly local?</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>• Open your browser's Network tab — no file uploads should appear</li>
          <li>• The tool should work even when you disconnect from the internet</li>
          <li>• Check if the source code is available on GitHub</li>
          <li>• Look for privacy policies that confirm no data collection</li>
        </ul>
      </div>
    </div>
  </Layout>
);

export default About;

import { useParams, Link } from "react-router-dom";
import { ExternalLink, Github, ArrowLeft, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";
import StarRating from "@/components/StarRating";
import { tools } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ReviewSection from "@/components/ReviewSection";

const ToolDetail = () => {
  const { id } = useParams();
  const tool = tools.find((t) => t.id === id);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  if (!tool) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground">Tool not found</h1>
          <Link to="/" className="mt-4 inline-block text-primary hover:underline">← Back to all tools</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to all tools
        </Link>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Screenshots */}
          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-xl border bg-card">
              <img
                src={tool.screenshots[currentScreenshot]}
                alt={`${tool.name} screenshot ${currentScreenshot + 1}`}
                className="aspect-video w-full object-cover"
              />
              {tool.screenshots.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentScreenshot((p) => (p - 1 + tool.screenshots.length) % tool.screenshots.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-1.5 backdrop-blur-sm transition hover:bg-card"
                  >
                    <ChevronLeft className="h-4 w-4 text-foreground" />
                  </button>
                  <button
                    onClick={() => setCurrentScreenshot((p) => (p + 1) % tool.screenshots.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-1.5 backdrop-blur-sm transition hover:bg-card"
                  >
                    <ChevronRight className="h-4 w-4 text-foreground" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {tool.screenshots.length > 1 && (
              <div className="mt-3 flex gap-2">
                {tool.screenshots.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentScreenshot(i)}
                    className={`overflow-hidden rounded-lg border-2 transition ${i === currentScreenshot ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    <img src={s} alt="" className="h-16 w-24 object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="mt-8">
              <h2 className="font-heading text-lg font-semibold text-foreground">About</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{tool.description}</p>
            </div>

            <ReviewSection toolId={tool.id} />
          </div>

          {/* Sidebar info */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border bg-card p-6">
              <h1 className="font-heading text-2xl font-bold text-foreground">{tool.name}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{tool.tagline}</p>

              <div className="mt-4">
                <StarRating rating={tool.rating} reviewCount={tool.reviewCount} size="md" />
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full gap-2">
                    <ExternalLink className="h-4 w-4" /> Visit Website
                  </Button>
                </a>
                {tool.githubUrl && (
                  <a href={tool.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full gap-2">
                      <Github className="h-4 w-4" /> View on GitHub
                    </Button>
                  </a>
                )}
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categories</h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {tool.categories.map((cat, i) => (
                      <Badge key={i} variant="secondary">{cat.primary} → {cat.secondary}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Languages</h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {tool.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="gap-1">
                        <Globe className="h-3 w-3" /> {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {tool.alternativeTo.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Alternative to</h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {tool.alternativeTo.map((alt) => (
                        <Badge key={alt} variant="outline">{alt}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ToolDetail;

import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/data/mockData";
import { X, Plus, AlertTriangle, Upload, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Submit = () => {
  const [selectedCategories, setSelectedCategories] = useState<{ primary: string; secondary: string }[]>([]);
  const [alternatives, setAlternatives] = useState<string[]>([]);
  const [altInput, setAltInput] = useState("");
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [customSub, setCustomSub] = useState("");
  const [activePrimary, setActivePrimary] = useState<string | null>(null);

  const addCategory = (primary: string, secondary: string) => {
    if (selectedCategories.length >= 3) return;
    if (selectedCategories.some((c) => c.primary === primary && c.secondary === secondary)) return;
    setSelectedCategories([...selectedCategories, { primary, secondary }]);
  };

  const removeCategory = (i: number) => setSelectedCategories(selectedCategories.filter((_, idx) => idx !== i));

  const addAlternative = () => {
    if (altInput.trim() && !alternatives.includes(altInput.trim())) {
      setAlternatives([...alternatives, altInput.trim()]);
      setAltInput("");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <h1 className="font-heading text-3xl font-bold text-foreground">Submit a Tool</h1>
        <p className="mt-2 text-muted-foreground">Share a browser-based tool with the community.</p>

        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Basic info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input id="siteName" placeholder="e.g. Squoosh" className="mt-1.5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <Label htmlFor="toolName">Tool / Feature Name <span className="text-xs text-muted-foreground">(optional)</span></Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-[220px] text-xs">
                      Only fill this in if the site offers multiple tools.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input id="toolName" placeholder="e.g. Image Compressor" className="mt-1.5" />
            </div>
          </div>

          <div>
            <Label htmlFor="tagline">Tagline <span className="text-xs text-muted-foreground">(max 100 characters)</span></Label>
            <Input id="tagline" placeholder="One-line description of what the tool does" maxLength={100} className="mt-1.5" />
          </div>

          <div>
            <Label htmlFor="description">Description <span className="text-xs text-muted-foreground">(max 2000 characters)</span></Label>
            <Textarea id="description" placeholder="Detailed description of the tool, its features, and how it works..." maxLength={2000} rows={6} className="mt-1.5" />
          </div>

          {/* Categories */}
          <div>
            <Label>Categories <span className="text-xs text-muted-foreground">(up to 3)</span></Label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {selectedCategories.map((cat, i) => (
                <Badge key={i} variant="secondary" className="gap-1 pr-1">
                  {cat.primary} → {cat.secondary}
                  <button onClick={() => removeCategory(i)} className="rounded-full p-0.5 hover:bg-muted">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {selectedCategories.length < 3 && (
                <button
                  type="button"
                  onClick={() => setShowCategoryPicker(!showCategoryPicker)}
                  className="inline-flex items-center gap-1 rounded-full border border-dashed px-3 py-1 text-xs text-muted-foreground transition hover:border-primary hover:text-primary"
                >
                  <Plus className="h-3 w-3" /> Add category
                </button>
              )}
            </div>

            {showCategoryPicker && (
              <div className="mt-3 rounded-lg border bg-card p-4">
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => setActivePrimary(activePrimary === cat.name ? null : cat.name)}
                      className={`rounded-full px-3 py-1 text-sm transition ${
                        activePrimary === cat.name ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"
                      }`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>

                {activePrimary && (
                  <div className="mt-3 border-t pt-3">
                    <p className="mb-2 text-xs text-muted-foreground">Select a subcategory (primary is optional):</p>
                    <div className="flex flex-wrap gap-1.5">
                      {categories
                        .find((c) => c.name === activePrimary)
                        ?.subcategories.map((sub) => (
                          <button
                            key={sub}
                            type="button"
                            onClick={() => {
                              addCategory(activePrimary, sub);
                              setShowCategoryPicker(false);
                              setActivePrimary(null);
                            }}
                            className="rounded-full border px-3 py-1 text-xs transition hover:bg-accent hover:text-accent-foreground"
                          >
                            {sub}
                          </button>
                        ))}
                    </div>

                    {/* Custom subcategory */}
                    <div className="mt-3 flex items-center gap-2">
                      <Input
                        placeholder="Add custom subcategory..."
                        value={customSub}
                        onChange={(e) => setCustomSub(e.target.value)}
                        className="h-8 text-xs"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (customSub.trim()) {
                            addCategory(activePrimary, customSub.trim());
                            setCustomSub("");
                            setShowCategoryPicker(false);
                            setActivePrimary(null);
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>
                    <p className="mt-2 flex items-center gap-1 text-xs text-star">
                      <AlertTriangle className="h-3 w-3" />
                      Using existing subcategories improves discoverability.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Alternative to */}
          <div>
            <Label>Alternative to</Label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {alternatives.map((alt) => (
                <Badge key={alt} variant="outline" className="gap-1 pr-1">
                  {alt}
                  <button onClick={() => setAlternatives(alternatives.filter((a) => a !== alt))} className="rounded-full p-0.5 hover:bg-muted">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <Input
                placeholder="e.g. Photoshop"
                value={altInput}
                onChange={(e) => setAltInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addAlternative())}
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={addAlternative}>Add</Button>
            </div>
          </div>

          {/* App icon */}
          <div>
            <Label>App Icon <span className="text-xs text-muted-foreground">(optional)</span></Label>
            <div className="mt-2 flex h-20 w-20 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed transition hover:border-primary hover:bg-accent/50">
              <Upload className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          {/* Screenshots */}
          <div>
            <Label>Screenshots <span className="text-xs text-muted-foreground">(1–5 required)</span></Label>
            <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex aspect-video cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition hover:border-primary hover:bg-accent/50"
                >
                  <Plus className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="website">Website URL</Label>
              <Input id="website" placeholder="https://" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="github">GitHub URL <span className="text-xs text-muted-foreground">(optional)</span></Label>
              <Input id="github" placeholder="https://github.com/..." className="mt-1.5" />
            </div>
          </div>

          {/* Languages */}
          <div>
            <Label htmlFor="languages">Supported Languages</Label>
            <Input id="languages" placeholder="e.g. English, Korean, Japanese" className="mt-1.5" />
          </div>

          <Button type="submit" size="lg" className="w-full">
            Submit Tool for Review
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default Submit;

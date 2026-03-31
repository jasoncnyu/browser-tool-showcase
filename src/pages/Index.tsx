import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ToolCard from "@/components/ToolCard";
import CategoryFilter from "@/components/CategoryFilter";
import { tools, categories } from "@/data/mockData";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const handleCategorySelect = (cat: string | null, sub: string | null) => {
    setSelectedCategory(cat);
    setSelectedSubcategory(sub);
  };

  const filtered = tools.filter((t) => {
    const matchesCategory = !selectedCategory || t.categories.some((c) => c.primary === selectedCategory);
    const matchesSub = !selectedSubcategory || t.categories.some((c) => c.secondary === selectedSubcategory);
    const matchesSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.tagline.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSub && matchesSearch;
  });

  const featured = tools.filter((t) => t.featured);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-card">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Discover{" "}
              <span className="bg-gradient-to-r from-primary to-[hsl(200,70%,50%)] bg-clip-text text-transparent">
                Browser-First
              </span>{" "}
              Tools
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Curated collection of tools that run entirely in your browser. No installs, no uploads, no tracking.
            </p>

            {/* Search */}
            <div className="relative mx-auto mt-8 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tools..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>

          {/* Category quick stats */}
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-3 gap-4 md:grid-cols-6">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name === selectedCategory ? null : cat.name)}
                className="flex flex-col items-center gap-1.5 rounded-xl border bg-card p-3 text-center transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-medium text-muted-foreground">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      {!search && !selectedCategory && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="font-heading text-2xl font-bold text-foreground">⭐ Featured Tools</h2>
          <p className="mt-1 text-sm text-muted-foreground">Hand-picked favorites from the community</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((tool) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* All Tools */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              {selectedSubcategory ? selectedSubcategory : selectedCategory ? `${selectedCategory} Tools` : "All Tools"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{filtered.length} tools found</p>
          </div>
        </div>

        <div className="mt-4 flex gap-8">
          <CategoryFilter selectedCategory={selectedCategory} selectedSubcategory={selectedSubcategory} onSelect={handleCategorySelect} />

          <div className="flex-1">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((tool) => (
                <motion.div
                  key={tool.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ToolCard tool={tool} />
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-20 text-center text-muted-foreground">
                No tools found. Try a different search or category.
              </div>
            )}
            >
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No tools found. Try a different search or category.
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Index;

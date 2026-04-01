import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { categories } from "@/data/mockData";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CategoryFilterProps {
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onSelect: (category: string | null, subcategory: string | null) => void;
}

const CategoryFilter = ({ selectedCategory, selectedSubcategory, onSelect }: CategoryFilterProps) => {
  return (
    <>
      {/* Desktop: vertical sidebar panels (unchanged) */}
      <div className="hidden md:flex gap-4">
        <div className="flex min-w-[160px] flex-col gap-0.5 rounded-xl border bg-card p-2">
          <button
            onClick={() => onSelect(null, null)}
            className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
              selectedCategory === null
                ? "bg-primary text-primary-foreground"
                : "text-secondary-foreground hover:bg-accent"
            }`}
          >
            All Tools
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onSelect(cat.name, null)}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                selectedCategory === cat.name
                  ? "bg-primary text-primary-foreground"
                  : "text-secondary-foreground hover:bg-accent"
              }`}
            >
              <span>{cat.icon} {cat.name}</span>
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            </button>
          ))}
        </div>

        {selectedCategory && (
          <div className="flex min-w-[180px] flex-col gap-0.5 rounded-xl border bg-card p-2">
            <button
              onClick={() => onSelect(selectedCategory, null)}
              className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                selectedSubcategory === null
                  ? "bg-accent text-accent-foreground"
                  : "text-secondary-foreground hover:bg-accent"
              }`}
            >
              All {selectedCategory}
            </button>
            {categories
              .find((c) => c.name === selectedCategory)
              ?.subcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => onSelect(selectedCategory, sub)}
                  className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    selectedSubcategory === sub
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {sub}
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Mobile: horizontal scrollable chips */}
      <div className="flex flex-col gap-2 md:hidden">
        {/* Level 1: primary categories (or back button + selected) */}
        <ScrollArea className="w-full">
          <div className="flex gap-2 pb-2">
            {!selectedCategory ? (
              <>
                <button
                  onClick={() => onSelect(null, null)}
                  className="shrink-0 rounded-full border bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground"
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => onSelect(cat.name, null)}
                    className="shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent"
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </>
            ) : (
              <>
                <button
                  onClick={() => onSelect(null, null)}
                  className="shrink-0 flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent"
                >
                  <ChevronLeft className="h-3 w-3" />
                  All
                </button>
                <span className="shrink-0 rounded-full bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground">
                  {categories.find((c) => c.name === selectedCategory)?.icon} {selectedCategory}
                </span>
              </>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Level 2: subcategories when a primary is selected */}
        {selectedCategory && (
          <ScrollArea className="w-full">
            <div className="flex gap-2 pb-2">
              <button
                onClick={() => onSelect(selectedCategory, null)}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  selectedSubcategory === null
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent"
                }`}
              >
                All
              </button>
              {categories
                .find((c) => c.name === selectedCategory)
                ?.subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => onSelect(selectedCategory, sub)}
                    className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      selectedSubcategory === sub
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </div>
    </>
  );
};

export default CategoryFilter;

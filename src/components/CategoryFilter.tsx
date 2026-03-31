import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { categories } from "@/data/mockData";

interface CategoryFilterProps {
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onSelect: (category: string | null, subcategory: string | null) => void;
}

const CategoryFilter = ({ selectedCategory, selectedSubcategory, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex gap-4">
      {/* Primary categories - vertical list */}
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

      {/* Subcategories - drill-down panel */}
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
  );
};

export default CategoryFilter;

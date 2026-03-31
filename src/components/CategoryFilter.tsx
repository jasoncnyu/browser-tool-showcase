import { categories } from "@/data/mockData";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
}

const CategoryFilter = ({ selectedCategory, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          selectedCategory === null
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground hover:bg-accent"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => onSelect(cat.name)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            selectedCategory === cat.name
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-accent"
          }`}
        >
          {cat.icon} {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;


import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Category = {
  id: string;
  name: string;
  count: number;
};

const categories: Category[] = [
  { id: "all", name: "All", count: 124 },
  { id: "feature", name: "Feature Requests", count: 45 },
  { id: "bug", name: "Bug Reports", count: 32 },
  { id: "improvement", name: "Improvements", count: 28 },
  { id: "discussion", name: "Discussions", count: 19 },
];

interface CategoryListProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const CategoryList = ({
  selectedCategory = "all",
  onSelectCategory,
}: CategoryListProps) => {
  return (
    <div className="space-y-1">
      <h3 className="mb-2 px-3 text-lg font-semibold">Categories</h3>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="ghost"
          className={cn(
            "w-full justify-start px-3",
            selectedCategory === category.id && "bg-accent text-accent-foreground"
          )}
          onClick={() => onSelectCategory(category.id)}
        >
          <span className="flex-1 text-left">{category.name}</span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
            {category.count}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default CategoryList;

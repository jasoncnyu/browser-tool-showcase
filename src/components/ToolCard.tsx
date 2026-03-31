import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import StarRating from "./StarRating";
import { Tool } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  return (
    <div className="group card-elevated overflow-hidden rounded-xl border bg-card">
      {/* Screenshot */}
      <Link to={`/tool/${tool.id}`} className="block aspect-video overflow-hidden">
        <img
          src={tool.screenshots[0]}
          alt={`${tool.name} screenshot`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/tool/${tool.id}`} className="flex-1">
            <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-primary transition-colors">
              {tool.name}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{tool.siteName}</p>
          </Link>
          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-0.5 shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            title="Open website"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{tool.tagline}</p>

        <div className="mt-3 flex items-center justify-between">
          <StarRating rating={tool.rating} reviewCount={tool.reviewCount} />
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {tool.categories.map((cat, i) => (
            <Badge key={i} variant="secondary" className="text-xs font-normal">
              {cat.secondary}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolCard;

import { useState } from "react";
import { Star, User, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface ReviewSectionProps {
  toolId: string;
}

const STORAGE_KEY = (id: string) => `localtools-reviews-${id}`;

const mockReviews: Record<string, Review[]> = {
  squoosh: [
    { id: "m1", author: "David Kim", rating: 5, comment: "Best image compressor I've used. The side-by-side comparison is incredibly helpful, and the fact that everything runs in the browser means my images never leave my device.", date: "Mar 15, 2026", helpful: 12 },
    { id: "m2", author: "Sarah Chen", rating: 4, comment: "Great tool for quick compression. Only wish it had a batch mode for processing multiple images at once without the CLI.", date: "Feb 28, 2026", helpful: 5 },
    { id: "m3", author: "Anonymous", rating: 5, comment: "AVIF support is a game changer. Reduced my website's image payload by 60% with barely any visible quality loss.", date: "Jan 10, 2026", helpful: 8 },
  ],
  excalidraw: [
    { id: "m4", author: "Alex Rivera", rating: 5, comment: "Perfect for quick diagrams and brainstorming. The hand-drawn style makes everything look approachable and less intimidating in presentations.", date: "Mar 20, 2026", helpful: 15 },
    { id: "m5", author: "Mina Park", rating: 5, comment: "Real-time collaboration works flawlessly. We use this daily for architecture discussions. Export to SVG is super clean.", date: "Mar 1, 2026", helpful: 9 },
  ],
};

const loadReviews = (toolId: string): Review[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(toolId));
    const saved: Review[] = raw ? JSON.parse(raw) : [];
    const defaults = mockReviews[toolId] || [];
    const defaultIds = new Set(defaults.map((r) => r.id));
    return [...saved.filter((r) => !defaultIds.has(r.id)), ...defaults];
  } catch {
    return mockReviews[toolId] || [];
  }
};

const saveReviews = (toolId: string, reviews: Review[]) => {
  localStorage.setItem(STORAGE_KEY(toolId), JSON.stringify(reviews));
};

const InteractiveStars = ({
  value,
  onChange,
  size = "md",
}: {
  value: number;
  onChange: (v: number) => void;
  size?: "sm" | "md" | "lg";
}) => {
  const [hover, setHover] = useState(0);
  const iconSize =
    size === "lg" ? "h-7 w-7" : size === "md" ? "h-5 w-5" : "h-4 w-4";

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(i)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={`${iconSize} transition-colors ${
              i <= (hover || value)
                ? "fill-star text-star"
                : "fill-star-empty text-star-empty"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

const ReadOnlyStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${
          i <= Math.round(rating)
            ? "fill-star text-star"
            : "fill-star-empty text-star-empty"
        }`}
      />
    ))}
  </div>
);

const ReviewSection = ({ toolId }: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>(() => loadReviews(toolId));
  const [rating, setRating] = useState(0);
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const handleSubmit = () => {
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    if (!comment.trim()) {
      setError("Please write a review.");
      return;
    }

    const newReview: Review = {
      id: crypto.randomUUID(),
      author: author.trim() || "Anonymous",
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      helpful: 0,
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    saveReviews(toolId, updated);
    setRating(0);
    setAuthor("");
    setComment("");
    setError("");
  };

  const handleHelpful = (reviewId: string) => {
    const updated = reviews.map((r) =>
      r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
    );
    setReviews(updated);
    saveReviews(toolId, updated);
  };

  return (
    <div className="mt-10">
      <h2 className="font-heading text-lg font-semibold text-foreground">
        Ratings & Reviews
      </h2>

      {/* Summary */}
      {reviews.length > 0 && (
        <div className="mt-4 flex items-start gap-8 rounded-xl border bg-card p-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground">
              {avgRating.toFixed(1)}
            </div>
            <ReadOnlyStars rating={avgRating} />
            <p className="mt-1 text-xs text-muted-foreground">
              {reviews.length} review{reviews.length !== 1 && "s"}
            </p>
          </div>
          <div className="flex-1 space-y-1.5">
            {ratingDistribution.map(({ star, count }) => (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="w-3 text-muted-foreground">{star}</span>
                <Star className="h-3 w-3 fill-star text-star" />
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-star transition-all"
                    style={{
                      width:
                        reviews.length > 0
                          ? `${(count / reviews.length) * 100}%`
                          : "0%",
                    }}
                  />
                </div>
                <span className="w-6 text-right text-xs text-muted-foreground">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Write Review */}
      <div className="mt-6 rounded-xl border bg-card p-6">
        <h3 className="font-heading text-sm font-semibold text-foreground">
          Write a Review
        </h3>

        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-muted-foreground">
              Your Rating
            </label>
            <InteractiveStars value={rating} onChange={setRating} size="lg" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-muted-foreground">
              Name (optional)
            </label>
            <Input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Anonymous"
              className="max-w-xs"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-muted-foreground">
              Your Review
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this tool..."
              rows={4}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <Button onClick={handleSubmit}>Submit Review</Button>
        </div>
      </div>

      {/* Review List */}
      {reviews.length > 0 && (
        <div className="mt-6 space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-xl border bg-card p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {review.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {review.date}
                    </p>
                  </div>
                </div>
                <ReadOnlyStars rating={review.rating} />
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {review.comment}
              </p>

              <Separator className="my-3" />

              <button
                onClick={() => handleHelpful(review.id)}
                className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <ThumbsUp className="h-3 w-3" />
                Helpful ({review.helpful})
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;

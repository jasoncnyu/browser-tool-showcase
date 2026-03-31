import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, Copy, Check, ExternalLink, Search, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

const SubmitBacklink = () => {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [backlinkConfirmed, setBacklinkConfirmed] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<"success" | "not_found" | null>(null);

  const siteUrl = "https://localtools.app";

  const badges = [
    {
      label: "Featured on LocalTools",
      code: `<a href="${siteUrl}" target="_blank" rel="noopener"><img src="${siteUrl}/badges/featured.svg" alt="Featured on LocalTools" height="36" /></a>`,
    },
    {
      label: `★ ${rating > 0 ? rating.toFixed(1) : "0.0"} on LocalTools`,
      code: `<a href="${siteUrl}" target="_blank" rel="noopener"><img src="${siteUrl}/badges/rating-${rating > 0 ? rating.toFixed(1) : "0.0"}.svg" alt="Rated ${rating > 0 ? rating.toFixed(1) : "0.0"} on LocalTools" height="36" /></a>`,
    },
  ];

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleVerifyBacklink = async () => {
    setVerifying(true);
    setVerifyResult(null);

    // Simulate backlink verification (replace with actual crawl logic)
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // For demo: randomly succeed or fail
    const found = Math.random() > 0.5;
    setVerifyResult(found ? "success" : "not_found");
    setVerifying(false);

    if (found) {
      toast.success("Backlink badge detected on your website!");
    } else {
      toast.error("Backlink badge not found. Please make sure you've added it to your site.");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-xl border bg-card p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-7 w-7 text-primary" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Tool Submitted!</h1>
          <p className="mt-2 text-muted-foreground">
            Thank you for your submission. One last step — rate your tool and add a backlink badge.
          </p>
        </div>

        {/* Self Rating — emphasize first product rating */}
        <div className="mt-8 rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground">Be the first to rate your product</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Give your product its first rating — this score will appear on your listing and backlink badge until others review it.
          </p>
          <div className="mt-4 flex items-center justify-center gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                type="button"
                onMouseEnter={() => setHoveredStar(i)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setRating(i)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 transition-colors ${
                    i <= (hoveredStar || rating)
                      ? "fill-star text-star"
                      : "fill-transparent text-muted-foreground/40"
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="mt-2 text-center text-sm font-medium text-foreground">
              You rated <span className="text-primary">{rating}.0</span> out of 5
            </p>
          )}
        </div>

        {/* Backlink Badges */}
        {rating > 0 && (
          <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="rounded-xl border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground">Choose a backlink badge</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Pick one of the badges below and paste the code on your website. The rating on the badge updates dynamically based on your actual score.
              </p>

              <div className="mt-5 space-y-4">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className="rounded-lg border bg-muted/30 p-4"
                  >
                    {/* Badge Preview */}
                    <div className="mb-3 flex items-center justify-center">
                      <div className="inline-flex items-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-sm">
                        {index === 0 ? (
                          <>
                            <ExternalLink className="h-4 w-4 text-primary" />
                            <span>Featured on <strong>LocalTools</strong></span>
                          </>
                        ) : (
                          <>
                            <Star className="h-4 w-4 fill-star text-star" />
                            <span>{rating.toFixed(1)} on <strong>LocalTools</strong></span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Code Block */}
                    <div className="relative">
                      <pre className="overflow-x-auto rounded-md bg-background p-3 text-xs text-muted-foreground">
                        <code>{badge.code}</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute right-2 top-2 h-7 gap-1.5 text-xs"
                        onClick={() => copyCode(badge.code, index)}
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check className="h-3 w-3" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" /> Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verify Backlink */}
            <Button
              size="lg"
              variant="outline"
              className="w-full gap-2"
              disabled={verifying}
              onClick={handleVerifyBacklink}
            >
              {verifying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Checking your website…
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Verify Backlink
                </>
              )}
            </Button>

            {/* Verification Result */}
            {verifyResult && (
              <div
                className={`rounded-xl border p-5 animate-in fade-in slide-in-from-bottom-4 duration-300 ${
                  verifyResult === "success"
                    ? "border-green-500/30 bg-green-500/5"
                    : "border-destructive/30 bg-destructive/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  {verifyResult === "success" ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  ) : (
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                  )}
                  <div>
                    <p className="font-semibold text-foreground">
                      {verifyResult === "success"
                        ? "Backlink badge detected!"
                        : "Backlink badge not found"}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {verifyResult === "success"
                        ? "We've successfully found the LocalTools backlink on your website. Your listing will now receive a dofollow link."
                        : "We couldn't find the LocalTools backlink badge on your website. Please make sure you've added the badge code to your site and try again."}
                    </p>
                    {verifyResult === "not_found" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-3 gap-1.5"
                        onClick={handleVerifyBacklink}
                        disabled={verifying}
                      >
                        <Search className="h-3 w-3" />
                        Try Again
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Confirmation & Complete Submission */}
            <div className="rounded-xl border bg-card p-6">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="backlink-confirm"
                  checked={backlinkConfirmed}
                  onCheckedChange={(checked) => setBacklinkConfirmed(checked === true)}
                  className="mt-0.5"
                />
                <label htmlFor="backlink-confirm" className="cursor-pointer text-sm leading-relaxed text-foreground">
                  I confirm that I have placed the backlink badge on my website's footer or an appropriate location.
                </label>
              </div>
              <p className="mt-3 rounded-md bg-primary/5 p-3 text-xs text-muted-foreground">
                🔗 Once we verify the backlink on your site, your listing will receive a <strong className="text-foreground">dofollow</strong> link from LocalTools.
              </p>
              <Button size="lg" className="mt-4 w-full">
                Complete Submission
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SubmitBacklink;

import React, { useEffect } from "react";
import { ShoppingBag, CheckCircle2, AlertTriangle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { shopifyApi } from "../api/shopifyApi";

const mockupImagePlaceholder = "https://unsplash.com";

export default function ShopifyImport({
  shopifyUrl,
  setShopifyUrl,
  onDirty,
  onResultChange,
}) {
  const { mutate, data, isPending, isError } = useMutation({
    mutationFn: shopifyApi,
  });

  // Let the parent know whether there's an extracted product to publish
  useEffect(() => {
    onResultChange?.(Boolean(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3 items-end">
        <Input
          icon={ShoppingBag}
          label="Shopify Store Product Link URL"
          placeholder="https://your-store.com/products/your-item"
          value={shopifyUrl}
          onChange={(e) => {
            setShopifyUrl(e.target.value);
            onDirty?.();
          }}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={() => {
            onDirty?.();
            mutate(shopifyUrl);
          }}
          disabled={!shopifyUrl.trim() || isPending}
          variant="secondary"
          className="h-11.5 w-full sm:w-auto px-6 whitespace-nowrap rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isPending ? "Extracting..." : "Extract Assets"}
        </Button>
      </div>

      {isError && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2.5 text-xs text-amber-300">
          <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>Couldn't extract that product.</span>
        </div>
      )}

      <div className="p-4 rounded-2xl bg-[#0B0F19] border border-slate-800 space-y-4">
        <div>
          <h4 className="text-sm font-bold text-white truncate">
            {data ? data.title : "Sample Scraped Product Heading"}
          </h4>
          <p className="text-xs text-[#94A3B8] truncate mt-0.5">
            {data
              ? data.description
              : "Asset grid ready for extraction collection hooks."}
          </p>
          {data?.price && (
            <p className="text-xs text-[#00F2FE] font-semibold mt-1">
              ${data.price}
            </p>
          )}
        </div>

        <div className="grid grid-cols-4 gap-3">
          {(data?.mediaLinks?.length
            ? data.mediaLinks
            : [mockupImagePlaceholder]
          ).map((img, idx) => (
            <div
              key={img + idx}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-[#00F2FE] ring-2 ring-[#00F2FE]/20"
            >
              <img
                src={img}
                alt={data ? `${data.title} ${idx + 1}` : "Mock element"}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-[#00F2FE] text-[#010610] rounded-full p-0.5 shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5 fill-[#010610]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

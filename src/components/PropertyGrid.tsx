
import React from "react";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyGridHeader } from "./PropertyGridHeader";
import { PropertyGridEmptyState } from "./PropertyGridEmptyState";
import { filterProperties, sortProperties } from "@/utils/propertyFiltering";
import { useToast } from "@/hooks/use-toast";
import { useAllProperties } from "@/hooks/useAllProperties";
import { useLanguage } from "@/contexts/LanguageContext";

interface PropertyGridProps {
  filters: any;
  sort: string;
  onSortChange: (sort: string) => void;
}

export const PropertyGrid = ({
  filters,
  sort = "most-recent",
  onSortChange,
}: PropertyGridProps) => {
  const { allProperties, loading, error, refetch, triggerScraping } = useAllProperties();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleScrapeData = async () => {
    try {
      toast({
        title: t('common.scraping.start') || "Starting scraping...",
        description: t('common.scraping.description') || "Fetching latest property data from remaxjerusalem.com",
      });
      await triggerScraping();
      await refetch();
      toast({
        title: t('common.scraping.success') || "Scraping completed!",
        description: t('common.scraping.success.description') || "Property data has been updated successfully.",
      });
    } catch (error) {
      console.error("Scraping failed:", error);
      toast({
        title: t('common.scraping.failed') || "Scraping failed",
        description: t('common.scraping.failed.description') || "Failed to fetch property data. Please try again.",
        variant: "destructive",
      });
    }
  };

  let filteredProperties = filterProperties(allProperties, filters);
  filteredProperties = sortProperties(filteredProperties, sort);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <span className="animate-spin mx-auto mb-4 text-gray-500">
            {/* Loading spinner icon */}
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12A8 8 0 0 1 20 12"
              ></path>
            </svg>
          </span>
          <p className="text-gray-600">{t('common.loading.properties') || 'Loading properties...'}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{t('common.error.loading') || 'Failed to load properties'}</p>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium border-gray-300 hover:bg-gray-100"
        >
          <svg
            className="w-4 h-4 mr-2 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12A8 8 0 0 1 20 12"
            ></path>
          </svg>
          {t('common.try.again') || 'Try Again'}
        </button>
      </div>
    );
  }

  return (
    <div>
      <PropertyGridHeader
        filteredCount={filteredProperties.length}
        totalCount={allProperties.length}
        onUpdateData={handleScrapeData}
        sort={sort}
        onSortChange={onSortChange}
      />
      {filteredProperties.length === 0 ? (
        <PropertyGridEmptyState
          hasAnyProperties={allProperties.length > 0}
          onScrape={handleScrapeData}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

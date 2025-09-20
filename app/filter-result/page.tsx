"use client";

import { FilterProvider } from "@/contexts/filter-context";
import FilterResultContent from "@/components/filter-result-content";

export default function FilterResultPage() {
  return (
    <FilterProvider>
      <FilterResultContent />
    </FilterProvider>
  );
}

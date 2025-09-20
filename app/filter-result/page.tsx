"use client";

import { FilterProvider } from "@/contexts/filter-context";
import FilterResultContent from "@/components/filter-result-content";
import { Suspense } from "react";

export default function FilterResultPage() {
  return (
    <FilterProvider>
      <Suspense fallback={<div>Loading filters...</div>}>
        <FilterResultContent />
      </Suspense>
    </FilterProvider>
  );
}

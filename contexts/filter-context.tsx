"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { FilterState, getDefaultFilterState } from "@/lib/filter";

interface FilterContextType {
  filterState: FilterState;
  updatePriceRange: (range: [number, number]) => void;
  updateProductTypes: (types: string[]) => void;
  updateExpiryRanges: (ranges: number[]) => void;
  updateCategory: (categoryId?: string) => void;
  resetFilters: () => void;
  applyFilters: () => void;
  onFiltersApplied?: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
  onFiltersChange?: (filters: FilterState) => void;
}

export function FilterProvider({
  children,
  onFiltersChange,
}: FilterProviderProps) {
  const [filterState, setFilterState] = useState<FilterState>(
    getDefaultFilterState()
  );

  const updatePriceRange = useCallback((range: [number, number]) => {
    setFilterState((prev) => ({ ...prev, priceRange: range }));
  }, []);

  const updateProductTypes = useCallback((types: string[]) => {
    setFilterState((prev) => ({ ...prev, selectedProductTypes: types }));
  }, []);

  const updateExpiryRanges = useCallback((ranges: number[]) => {
    setFilterState((prev) => ({ ...prev, selectedExpiryRanges: ranges }));
  }, []);

  const updateCategory = useCallback((categoryId?: string) => {
    setFilterState((prev) => ({ ...prev, selectedCategory: categoryId }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilterState(getDefaultFilterState());
  }, []);

  const applyFilters = useCallback(() => {
    onFiltersChange?.(filterState);
  }, [filterState, onFiltersChange]);

  const value: FilterContextType = {
    filterState,
    updatePriceRange,
    updateProductTypes,
    updateExpiryRanges,
    updateCategory,
    resetFilters,
    applyFilters,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}

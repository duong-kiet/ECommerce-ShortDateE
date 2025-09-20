import { Header } from "@/components/header";
import { FilterProvider } from "@/contexts/filter-context";
import FilteredContent from "@/components/filtered-content";

export default function Home() {
  return (
    <FilterProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <FilteredContent />
      </div>
    </FilterProvider>
  );
}

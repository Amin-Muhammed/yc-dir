import Form from "next/form";
import type { ReactNode } from "react";
import ResetSearchForm from "./ResetSearchForm";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
interface SearchFormProps {
  query?: string;
}
const SearchForm = ({ query }: SearchFormProps) => {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        className="search-input"
        placeholder="search"
        name="search-query"
      />
      <div className="flex items-center gap-4">
        {query && <ResetSearchForm />}
        <Button type="submit" className="search-btn text-amber-50!">
          <SearchIcon />
        </Button>
      </div>
    </Form>
  );
};

export default SearchForm;

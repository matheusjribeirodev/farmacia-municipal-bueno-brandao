import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { medications } from '../data/medications';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBox = ({ onSearch, placeholder = "Digite o nome do medicamento..." }: SearchBoxProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = medications
        .filter(med => 
          med.name.toLowerCase().includes(query.toLowerCase())
        )
        .map(med => med.name);
      
      // Remove duplicates and limit to 5 unique names
      const uniqueNames = [...new Set(filtered)].slice(0, 5);
      
      // Only show suggestions if we have results
      if (uniqueNames.length > 0) {
        setSuggestions(uniqueNames);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch(searchQuery);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Immediately hide suggestions first
    setShowSuggestions(false);
    
    // Update query and search
    setQuery(suggestion);
    onSearch(suggestion);
    
    // Clear suggestions array
    setSuggestions([]);
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    // Immediately hide suggestions on any input change
    setShowSuggestions(false);
    setSuggestions([]);
    
    // Let useEffect re-evaluate and show suggestions if appropriate
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors bg-white shadow-sm"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg animate-fade-in">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onMouseDown={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors first:rounded-t-lg last:rounded-b-lg border-b border-slate-100 last:border-b-0 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <Search className="h-4 w-4 text-slate-400" />
                <span className="text-slate-700">{suggestion}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;

import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Search, ChevronDown, Check } from "lucide-react";
import {
  searchCountries,
  searchCities,
  findCountryByCode,
  type Country,
  type City,
} from "@/lib/locations";

export interface LocationValue {
  countryCode?: string;
  countryName?: string;
  cityName?: string;
  isCustomCountry?: boolean;
  isCustomCity?: boolean;
}

interface CountryCitySelectProps {
  value?: LocationValue;
  onChange: (value: LocationValue) => void;
  error?: string;
}

export function CountryCitySelect({
  value,
  onChange,
  error,
}: CountryCitySelectProps) {
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [cityOpen, setCityOpen] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [customCountryMode, setCustomCountryMode] = useState(false);
  const [customCityMode, setCustomCityMode] = useState(false);
  const [customCountry, setCustomCountry] = useState("");
  const [customCity, setCustomCity] = useState("");

  const countryRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);

  const selectedCountry = value?.countryCode
    ? findCountryByCode(value.countryCode)
    : null;

  const filteredCountries = useMemo(
    () => searchCountries(countrySearch),
    [countrySearch]
  );

  const filteredCities = useMemo(() => {
    if (!value?.countryCode) return [];
    return searchCities(value.countryCode, citySearch);
  }, [value?.countryCode, citySearch]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        setCityOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleCountrySelect = (country: Country) => {
    onChange({
      countryCode: country.code,
      countryName: country.name,
      isCustomCountry: false,
      cityName: undefined,
      isCustomCity: false,
    });
    setCountrySearch("");
    setCountryOpen(false);
    setCitySearch("");
  };

  const handleCitySelect = (city: City) => {
    onChange({
      ...value,
      cityName: city.name,
      isCustomCity: false,
    });
    setCitySearch("");
    setCityOpen(false);
  };

  const handleCustomCountryApply = () => {
    if (!customCountry.trim()) return;
    onChange({
      countryName: customCountry.trim(),
      isCustomCountry: true,
      countryCode: undefined,
      cityName: undefined,
      isCustomCity: false,
    });
    setCustomCountryMode(false);
    setCustomCountry("");
  };

  const handleCustomCityApply = () => {
    if (!customCity.trim()) return;
    onChange({ ...value, cityName: customCity.trim(), isCustomCity: true });
    setCustomCityMode(false);
    setCustomCity("");
  };

  return (
    <div className="space-y-4">
      {/* ---------- Country ---------- */}
      <div ref={countryRef} className="relative">
        <label className="block text-sm font-medium text-fg mb-1.5">
          Country
        </label>

        {value?.isCustomCountry ? (
          <div className="flex items-center gap-2 rounded-xl border border-line-strong bg-surface px-3 h-11">
            <MapPin className="h-4 w-4 text-accent-500 shrink-0" />
            <span className="text-sm text-fg flex-1 truncate">
              {value.countryName}
            </span>
            <button
              type="button"
              onClick={() => onChange({})}
              className="text-xs text-brand hover:underline"
            >
              Change
            </button>
          </div>
        ) : customCountryMode ? (
          <div className="space-y-2">
            <input
              type="text"
              value={customCountry}
              onChange={(e) => setCustomCountry(e.target.value)}
              placeholder="Type your country name..."
              className="w-full h-11 rounded-xl border border-line-strong bg-surface px-3 text-sm text-fg placeholder:text-fg-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-400"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCustomCountryApply}
                disabled={!customCountry.trim()}
                className="text-xs font-semibold text-brand hover:underline disabled:opacity-50"
              >
                Use "{customCountry || "..."}"
              </button>
              <button
                type="button"
                onClick={() => {
                  setCustomCountryMode(false);
                  setCustomCountry("");
                }}
                className="text-xs text-fg-muted hover:text-fg-strong"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setCountryOpen((v) => !v)}
              className="w-full h-11 rounded-xl border border-line-strong bg-surface px-3 text-sm text-left flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-400"
            >
              <Search className="h-4 w-4 text-fg-muted shrink-0" />
              <span
                className={
                  value?.countryName
                    ? "text-fg flex-1 flex items-center gap-2"
                    : "text-fg-muted/60 flex-1"
                }
              >
                {value?.countryName ? (
                  <>
                    {selectedCountry && (
                      <span className="text-lg leading-none">
                        {selectedCountry.flag}
                      </span>
                    )}
                    {value.countryName}
                  </>
                ) : (
                  "Search country..."
                )}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-fg-muted transition-transform ${
                  countryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {countryOpen && (
              <div className="absolute z-30 mt-1 w-full rounded-xl border border-line bg-surface-card shadow-lg overflow-hidden">
                <div className="p-2 border-b border-line">
                  <input
                    type="text"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    placeholder="Search country..."
                    className="w-full h-9 rounded-lg border border-line-strong bg-surface px-3 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-accent-500/40"
                    autoFocus
                  />
                </div>
                <ul className="max-h-64 overflow-y-auto">
                  {filteredCountries.length === 0 && (
                    <li className="px-3 py-6 text-sm text-fg-muted text-center">
                      No country found
                    </li>
                  )}
                  {filteredCountries.map((c) => (
                    <li key={c.code}>
                      <button
                        type="button"
                        onClick={() => handleCountrySelect(c)}
                        className="w-full text-left px-3 py-2.5 text-sm text-fg hover:bg-chip transition-colors flex items-center gap-3"
                      >
                        <span className="text-lg leading-none">{c.flag}</span>
                        <span className="flex-1">{c.name}</span>
                        <span className="text-xs text-fg-muted">
                          {c.nameAr}
                        </span>
                        {value?.countryCode === c.code && (
                          <Check className="h-4 w-4 text-accent-500" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="button"
              onClick={() => setCustomCountryMode(true)}
              className="mt-2 text-xs text-fg-muted hover:text-brand hover:underline"
            >
              Can't find your country? Add it manually
            </button>
          </>
        )}

        {error && (
          <p className="mt-1.5 text-xs text-danger-700 dark:text-danger-500">
            {error}
          </p>
        )}
      </div>

      {/* ---------- City ---------- */}
      <div ref={cityRef} className="relative">
        <label className="block text-sm font-medium text-fg mb-1.5">
          City
        </label>

        {!value?.countryCode && !value?.isCustomCountry ? (
          <p className="text-xs text-fg-muted">
            Select a country first to see cities.
          </p>
        ) : value?.isCustomCity ? (
          <div className="flex items-center gap-2 rounded-xl border border-line-strong bg-surface px-3 h-11">
            <MapPin className="h-4 w-4 text-accent-500 shrink-0" />
            <span className="text-sm text-fg flex-1 truncate">
              {value.cityName}
            </span>
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...value,
                  cityName: undefined,
                  isCustomCity: false,
                })
              }
              className="text-xs text-brand hover:underline"
            >
              Change
            </button>
          </div>
        ) : customCityMode || value?.isCustomCountry ? (
          <div className="space-y-2">
            <input
              type="text"
              value={customCity || value?.cityName || ""}
              onChange={(e) => setCustomCity(e.target.value)}
              placeholder="Type your city name..."
              className="w-full h-11 rounded-xl border border-line-strong bg-surface px-3 text-sm text-fg placeholder:text-fg-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-400"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCustomCityApply}
                disabled={!customCity.trim()}
                className="text-xs font-semibold text-brand hover:underline disabled:opacity-50"
              >
                Use "{customCity || "..."}"
              </button>
              {!value?.isCustomCountry && (
                <button
                  type="button"
                  onClick={() => {
                    setCustomCityMode(false);
                    setCustomCity("");
                  }}
                  className="text-xs text-fg-muted hover:text-fg-strong"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setCityOpen((v) => !v)}
              className="w-full h-11 rounded-xl border border-line-strong bg-surface px-3 text-sm text-left flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-400"
            >
              <Search className="h-4 w-4 text-fg-muted shrink-0" />
              <span
                className={
                  value?.cityName
                    ? "text-fg flex-1"
                    : "text-fg-muted/60 flex-1"
                }
              >
                {value?.cityName || "Search city..."}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-fg-muted transition-transform ${
                  cityOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {cityOpen && (
              <div className="absolute z-30 mt-1 w-full rounded-xl border border-line bg-surface-card shadow-lg overflow-hidden">
                <div className="p-2 border-b border-line">
                  <input
                    type="text"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    placeholder="Search city..."
                    className="w-full h-9 rounded-lg border border-line-strong bg-surface px-3 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-accent-500/40"
                    autoFocus
                  />
                </div>
                <ul className="max-h-64 overflow-y-auto">
                  {filteredCities.length === 0 && (
                    <li className="px-3 py-6 text-sm text-fg-muted text-center">
                      No city found
                    </li>
                  )}
                  {filteredCities.map((c) => (
                    <li key={c.name}>
                      <button
                        type="button"
                        onClick={() => handleCitySelect(c)}
                        className="w-full text-left px-3 py-2.5 text-sm text-fg hover:bg-chip transition-colors flex items-center justify-between gap-3"
                      >
                        <span className="flex-1">{c.name}</span>
                        <span className="text-xs text-fg-muted">
                          {c.nameAr}
                        </span>
                        {value?.cityName === c.name && (
                          <Check className="h-4 w-4 text-accent-500" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="button"
              onClick={() => setCustomCityMode(true)}
              className="mt-2 text-xs text-fg-muted hover:text-brand hover:underline"
            >
              Can't find your city? Add it manually
            </button>
          </>
        )}
      </div>
    </div>
  );
}
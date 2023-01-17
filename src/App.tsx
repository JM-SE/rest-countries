import { useQuery } from 'react-query';
import { useState } from 'react';
import useLocalStorage from 'use-local-storage';
import './App.css';

import Navigation from './components/Navigation/Navigation';
import CountryCard from './components/CountryCard/CountryCard';
import CountryDetail from './components/CountryDetail/CountryDetail';

import { getCountries } from './services/getCountries';

function App() {
    const [filter, setFilter] = useState('');
    const [region, setRegion] = useState('');
    const [selectedCountry, setSelectedCountry] = useState<any>(undefined);

    const defaultDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
    ).matches;
    const [theme, setTheme] = useLocalStorage(
        'theme',
        defaultDark ? 'dark' : 'light'
    );

    const { isLoading, data, error } = useQuery<any>('countries', getCountries);

    const filteredCountry = data?.find(
        (count: any) =>
            count.name.common ===
            filter.charAt(0).toUpperCase() + filter.slice(1)
    );

    if (isLoading) {
        return <div>Loading</div>;
    }

    const switchTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    const filteredRegion =
        region && data?.filter((count: any) => count.region === region);

    const filterRegion = () => {
        return region
            ? filteredRegion.map((country: any) => (
                  <CountryCard
                      key={country.name.common}
                      country={country}
                      onClick={() => setSelectedCountry(country)}
                  />
              ))
            : data?.map((country: any) => (
                  <CountryCard
                      key={country.name.common}
                      country={country}
                      onClick={() => setSelectedCountry(country)}
                  />
              ));
    };

    return error ? (
        <div>Error</div>
    ) : (
        <div className="app" data-theme={theme}>
            <Navigation switchTheme={switchTheme} />
            {selectedCountry ? (
                <CountryDetail
                    country={selectedCountry}
                    onBackClick={() => setSelectedCountry(undefined)}
                />
            ) : (
                <>
                    <input
                        style={{ margin: '10px 0 0 10px' }}
                        type="text"
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Search for a country..."
                    />
                    <select
                        style={{ display: 'block', margin: '10px 0 0 10px' }}
                        onChange={(e) => setRegion(e.target.value)}
                        disabled={filteredCountry}
                    >
                        <option value=""></option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">America</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                    {!filteredCountry ? (
                        filterRegion()
                    ) : (
                        <CountryCard
                            key={filteredCountry.name.common}
                            country={filteredCountry}
                            onClick={() => setSelectedCountry(filteredCountry)}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default App;

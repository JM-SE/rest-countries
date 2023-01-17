import { useQuery } from 'react-query';
import { useState } from 'react';
import useLocalStorage from 'use-local-storage';
import './App.css';

import Navigation from './components/Navigation/Navigation';
import CountryCard from './components/CountryCard/CountryCard';
import CountryDetail from './components/CountryDetail/CountryDetail';
import Filter from './components/Filter/Filter';
import Selector from './components/Selector/Selector';

import { getCountries } from './services/getCountries';

const App = () => {
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

    const switchTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    const { isLoading, data, error } = useQuery<any>('countries', getCountries);

    if (isLoading) {
        return <div>Loading</div>;
    }

    const filteredCountry = data?.find(
        (count: any) =>
            count.name.common ===
            filter.charAt(0).toUpperCase() + filter.slice(1)
    );

    const filteredRegion =
        region && data?.filter((count: any) => count.region === region);

    const filterRegionRender = () =>
        region
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

    const filteredCountryRender = () =>
        !filteredCountry ? (
            filterRegionRender()
        ) : (
            <CountryCard
                key={filteredCountry.name.common}
                country={filteredCountry}
                onClick={() => setSelectedCountry(filteredCountry)}
            />
        );

    return error ? (
        <div>
            <h3>Server error</h3>
            <h6>Try again in a few moments</h6>.
        </div>
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
                    <Filter setFilter={setFilter} />
                    <Selector
                        setRegion={setRegion}
                        filteredCountry={filteredCountry}
                    />
                    {filteredCountryRender()}
                </>
            )}
        </div>
    );
};

export default App;

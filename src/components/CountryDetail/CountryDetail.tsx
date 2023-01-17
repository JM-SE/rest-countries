import { useState, useEffect } from 'react';
import './CountryDetail.css';

const CountryDetail = ({ country, onBackClick }: any) => {
    const {
        flags,
        name,
        population,
        region,
        subregion,
        capital,
        tld,
        currencies,
        languages,
    } = country;

    const langsKeys = Object.keys(languages);

    return country.name ? (
        <div className="wrapper-card-detail">
            <button className="back-button" onClick={onBackClick}>
                Back
            </button>
            <img className="country-detail-flag" src={flags.png} />
            <div className="wrapper-card-detail-data">
                <div className="country-title">{name.common}</div>
                <div className="country-item">
                    Native Name:{' '}
                    <span>
                        {
                            name?.nativeName[Object.keys(name?.nativeName)[0]]
                                .common
                        }
                    </span>
                </div>
                <div className="country-item">
                    Population: <span>{population}</span>
                </div>
                <div className="country-item">
                    Region: <span>{region}</span>
                </div>
                <div className="country-item">
                    Sub Region: <span>{subregion}</span>
                </div>
                <div className="country-item">
                    Capital: <span>{capital}</span>
                </div>
            </div>
            <div className="wrapper-card-detail-data">
                <div className="country-item">
                    Top Level Domain: <span>{tld[0]}</span>
                </div>
                <div className="country-item">
                    Currencies:{' '}
                    <span>{currencies[Object.keys(currencies)[0]].name}</span>
                </div>
                <div className="country-item">
                    Languages:{' '}
                    {langsKeys.map((key, index) => {
                        const lang = languages[key];

                        return (
                            <span key={key}>
                                {index !== langsKeys.length - 1
                                    ? `${lang}, `
                                    : lang}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    ) : (
        <div>Loading</div>
    );
};

export default CountryDetail;

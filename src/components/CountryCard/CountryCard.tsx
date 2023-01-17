import './CountryCard.css';

function CountryCard({ country, onClick }: any) {
    const { flags, name, population, region, capital } = country;

    return country.name ? (
        <div className="wrapper-card-home" onClick={onClick}>
            <img className="country-home-flag" src={flags.png} />
            <div className="wrapper-card-home-data">
                <div className="country-title">{name.common}</div>
                <div className="country-item">
                    Population: <span>{population}</span>
                </div>
                <div className="country-item">
                    Region: <span>{region}</span>
                </div>
                <div className="country-item">
                    Capital: <span>{capital}</span>
                </div>
            </div>
        </div>
    ) : (
        <div>Loading</div>
    );
}

export default CountryCard;

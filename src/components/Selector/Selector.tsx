const Selector = ({ setRegion, filteredCountry }: any) => (
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
);

export default Selector;

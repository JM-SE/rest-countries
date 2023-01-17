const Filter = ({ setFilter }: any) => (
    <input
        style={{ margin: '10px 0 0 10px' }}
        type="text"
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search for a country..."
    />
);

export default Filter;

import './Navigation.css';

function Navigation({ switchTheme }: { switchTheme: () => void }) {
    return (
        <div className="wrapper">
            <div>Where in the world?</div>
            <button type="button" onClick={switchTheme}>
                Dark Mode
            </button>
        </div>
    );
}

export default Navigation;

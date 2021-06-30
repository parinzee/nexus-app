import logo from "../assets/nexus-logo.png";
const Header = () => {
    return (
        <div className="header">
            <div id="header-logo">
                <img src={logo} alt="Nexus-logo" id="nexus-logo" />
                <div id="header-text">
                    <p id="text-upper">Elevate BCIS Together.</p>
                    <p id="text-lower">EXUS</p>
                </div>
            </div>
        </div>
    );
};

export default Header;

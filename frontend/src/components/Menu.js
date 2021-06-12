import MenuSelector from "./MenuSelector";

// * Photo Assets
import sleepingMan from "../assets/sleepingMan.gif";

const Menu = () => {
    return (
        <div className="menu">
            <MenuSelector id="links" image={sleepingMan} text="LINKS" />
        </div>
    );
};

export default Menu;

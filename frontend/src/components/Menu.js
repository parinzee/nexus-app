import MenuSelect1 from "./MenuSelect1";
import MenuSelect2 from "./MenuSelect2";

// * Photo Assets
import sleepingMan from "../assets/sleepingMan.gif";

const Menu = () => {
    return (
        <div className="menu">
            <MenuSelect1 id="1" image={sleepingMan} />
            <MenuSelect2 id="2" />
            <MenuSelect1 id="3" />
            <MenuSelect2 id="4" />
        </div>
    );
};

export default Menu;

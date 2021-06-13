import MenuSelector from "./MenuSelector";

// * Photo Assets
import sleepingMan from "../assets/sleepingMan.gif";
import typingMan from "../assets/typingMan.gif";
import AGuy from "../assets/A+Guy.gif";

const Menu = () => {
    return (
        <div className="menu">
            <MenuSelector id="links" image={sleepingMan} text="LINKS" />
            <MenuSelector
                id="events"
                image={typingMan}
                text="UPCOMING EVENTS"
            />
            <MenuSelector
                id="activities"
                image={AGuy}
                text="UPCOMING ACTIVITIES"
            />
        </div>
    );
};

export default Menu;

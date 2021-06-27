import MenuSelector from "./MenuSelector";

// * Photo Assets
import sleepingMan from "../assets/sleepingMan.gif";
import typingMan from "../assets/typingMan.gif";
import AGuy from "../assets/A+Guy.gif";
import teacher from "../assets/teacher.gif";

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
            <MenuSelector
                id="competitions"
                image={teacher}
                text="QUARTERLY COMPETITIONS"
            />
        </div>
    );
};

export default Menu;

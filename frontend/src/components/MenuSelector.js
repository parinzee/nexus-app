const MenuSelector = ({ id, image, text }) => {
    return (
        <div id={id}>
            <img className="menu-image" src={image} alt="" />
            <p className="menu-text">{text}</p>
        </div>
    );
};

export default MenuSelector;

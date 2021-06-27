const MenuSelector = ({ id, image, text, text2 }) => {
    return (
        <div id={id}>
            <img className="menu-image" src={image} alt="" />
            <p className="menu-text">{text}</p>
            {text2 && (
                <p id="text2" className="menu-text">
                    {text}
                </p>
            )}
        </div>
    );
};

export default MenuSelector;

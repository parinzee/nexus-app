const MenuSelect1 = ({ id, image, text }) => {
    return (
        <div id={id} className="menu-select-1">
            <img src={image} alt="" />
            <p>{text}</p>
        </div>
    );
};

export default MenuSelect1;

const MenuSelect1 = ({ id, image, text }) => {
    return (
        <div className="menu-select-1" id={id}>
            <img src={image} alt="" />
            <p>{text}</p>
        </div>
    );
};

export default MenuSelect1;

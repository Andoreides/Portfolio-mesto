import React from "react";
import headerLogo from '../images/fistreview.svg';

function Header () {
    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="логотип сайт место" />
        </header>
    );
}

export default Header;
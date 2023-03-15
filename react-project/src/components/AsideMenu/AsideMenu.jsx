import React, { useContext } from "react";
import { StoreContext } from "../../store/StoreProvider";
import bemCssModule from 'bem-css-modules';
import { default as AsideMenuStyles } from './AsideMenu.module.scss';
import AdminMenu from "./subcomponents/AdminMenu";
import UserMenu from "./subcomponents/UserMenu";

const style = bemCssModule(AsideMenuStyles);

const ADMIN_TYPE = 1;

const AsideMenu = () => {
    const { user } = useContext(StoreContext);

    const adminMenuComponent = user?.accessLevel === ADMIN_TYPE ? (<AdminMenu />) : null;

    return (
        <section className={style()}>
            <div className={style('nav-wrapper')}>
                <UserMenu isUserLogged={Boolean(user)}/>
                {adminMenuComponent}
            </div>
        </section>
    );
};

export default AsideMenu;
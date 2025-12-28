

import Link from "next/link";
import logoImg from "@/assets/logo.png";
import Image from "next/image";

import classes from "./main-header.module.css";
import MainHeaderBackground from "@/compinents/main-header/main-header-background";
import NavLink from "@/compinents/main-header/nav-link";

export default function MainHeader() {

    return (
        <>
            <MainHeaderBackground />
            <header className={classes.header}>
                <Link className={classes.logo} href={"/"}>
                    <Image src={logoImg} alt="A plate with food on it." priority />
                    NextLevel Food
                </Link>
                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <NavLink href={"/meals"}>Browse meals</NavLink>
                        </li>
                        <li>
                            <NavLink href={"/community"}>Foodies Community</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}

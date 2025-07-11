import { EXAMPLES } from "../data";
import TabButton from "./TabButton";
import { Fragment } from "react";

export default function Tabs({ children, buttons,ButtonContainer="ul" }) {
    // const ButtonContainer =  buttonContainer
    return (
        <Fragment>
            <ButtonContainer>
                {buttons}
            </ButtonContainer>
            {children}
        </Fragment>
    );
}

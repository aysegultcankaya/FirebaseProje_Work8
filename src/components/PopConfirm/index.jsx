import React from "react";
import { Button, ButtonToolbar, Popover, Whisper } from "rsuite";
import { useTranslation } from "react-i18next";


const PopConfirm = ({ children }) => {
    const { t } = useTranslation();
    const triggerRef = React.useRef();
    const open = () => triggerRef.current.open();
    const close = () => triggerRef.current.close();

    const speaker = (
        <Popover title={t("general.warning")}>

        </Popover>
    );

    return (
        <div>
            <Whisper placement="top" speaker={speaker} ref={triggerRef} trigger="none">
                {children}
            </Whisper>
            <hr />
            <ButtonToolbar>
                <Button onClick={open}>Open</Button>
                <Button onClick={close}>Close</Button>
            </ButtonToolbar>
        </div>
    );
}

export default PopConfirm
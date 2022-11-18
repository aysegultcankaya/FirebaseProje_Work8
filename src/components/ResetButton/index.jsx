import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "rsuite"
import RemindFillIcon from '@rsuite/icons/RemindFill';

const ResetButton = ({ onOk, disabled }) => {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onSubmit = () => {
        handleClose()
        onOk()
    }

    return (
        <>
            <Modal backdrop="static" keyboard={false} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>
                        <RemindFillIcon color="yellow" style={{ marginRight: 5, fontSize: 24 }} />
                        {t("general.warning")}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {t("general.resetText")}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onSubmit} appearance="primary">
                        {t("general.ok")}
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        {t("general.cancel")}
                    </Button>
                </Modal.Footer>
            </Modal>
            <Button onClick={handleOpen} disabled={disabled}>
                {t("general.reset")}
            </Button>
        </>
    )
}

export default ResetButton
import React from "react"
import { OffRound, Speaker, TagDate, UserInfo } from "@rsuite/icons"
import { Badge, Button, Modal, Nav, Navbar, SelectPicker, Toggle } from "rsuite"
import { ThemeContext } from '../../App'
import { useLocation } from "react-router-dom"
import { changeLanguage } from "i18next"
import { useSelector } from 'react-redux';
import { getCurrentUser, logout } from "../../redux/authSlice"
import { useAppDispatch } from "../../hooks"
import { useTranslation } from "react-i18next"
import { getAuth, signOut } from "firebase/auth";
// import { useLogoutMutation } from "../../redux/api"
const moment = require('moment')

const TopHeader = () => {
    const { setTheme, theme } = React.useContext(ThemeContext);
    const location = useLocation()
    const { t } = useTranslation()
    const currentUser = useSelector(getCurrentUser)
    const dispatch = useAppDispatch()

    const [open, setOpen] = React.useState(false);
    // const [userLogout] = useLogoutMutation()

    const checkedChange = (value) => {
        localStorage.setItem("theme", value)
        setTheme(value)
    }

    const logoutUser = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            dispatch(logout())
        }).catch((error) => {
            // An error happened.
        });

    }

    const handleModalOpen = () => {
        setOpen(true)
    }
    const handleModalClose = () => {
        setOpen(false)
    }

    const changeLang = (e) => {
        changeLanguage(e)
    }
    return (
        <Navbar>
            <Nav pullRight>
                <Nav.Item icon={<TagDate style={{ fontSize: 24 }} />}>{moment().format("DD/MM/YYYY")}</Nav.Item>
                {!location?.pathname.startsWith("/user") &&
                    <React.Fragment>
                        <Nav.Item>
                            <Badge content={1}>
                                <Speaker style={{ fontSize: 24 }} />
                            </Badge>
                        </Nav.Item>
                    </React.Fragment>}
                <Nav.Item onSelect={() => checkedChange(theme === "dark" ? "light" : "dark")}>
                    <Toggle checked={theme === "dark"} checkedChildren="Dark" unCheckedChildren="Light" />
                </Nav.Item>
                {!location?.pathname.startsWith("/user") && <Nav.Item onSelect={() => handleModalOpen()}>
                    <OffRound style={{ fontSize: 24 }} />
                </Nav.Item>}
                <Nav.Item>{currentUser?.firstName} {currentUser?.lastName}</Nav.Item>
                <Nav.Item>
                    <SelectPicker
                        onSelect={changeLang}
                        cleanable={false}
                        defaultValue={"tr"}
                        style={{ width: 100 }}
                        data={[{ label: 'Türkçe', value: 'tr' }, { label: 'English', value: 'en' }]}
                        searchable={false} />
                </Nav.Item>
            </Nav>
            <Modal size="xs" role="alertdialog" backdrop="static" keyboard={false} open={open} onClose={handleModalClose}>
                <Modal.Header>
                    <Modal.Body>{t("pages.user.login.logout_confirm")}</Modal.Body>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={logoutUser} appearance="primary">
                        {t("general.yes")}
                    </Button>
                    <Button onClick={handleModalClose} appearance="subtle">
                        {t("general.cancel")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Navbar>
    )
}

export default TopHeader
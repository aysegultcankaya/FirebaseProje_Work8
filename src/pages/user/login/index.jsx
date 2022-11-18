import React from "react";
import { Button, ButtonToolbar, Col, Container, Content, FlexboxGrid, Form, Panel, Schema } from "rsuite"
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../hooks'
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../../redux/authSlice";
import PasswordInput from "../../../components/PasswordInput";
import TextInput from "../../../components/TextInput";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
const { StringType } = Schema.Types


const Login = () => {
    const { t } = useTranslation();
    const formRef = React.useRef();
    const history = useNavigate()
    const dispatch = useAppDispatch()

    const model = Schema.Model({
        userName: StringType().isRequired(t('pages.user.login.valid.usernameRequired')),
        password: StringType().isRequired(t('pages.user.login.valid.passwordRequired'))
    })

    const [formValue, setFormValue] = React.useState({
        userName: '',
        password: '',
    })

    const signIn = () => {
        if (!formRef.current.check()) {
            return;
        }
        const authentication = getAuth();
        signInWithEmailAndPassword(authentication, formValue.userName, formValue.password)
            .then((response) => {
                history("/")
                dispatch(setLogin(response._tokenResponse.refreshToken))
            })

    }

    const signUp = () => {
        if (!formRef.current.check()) {
            return;
        }
        const authentication = getAuth();
        createUserWithEmailAndPassword(authentication, formValue.userName, formValue.password)
            .then((response) => {
                dispatch(setLogin(response._tokenResponse.refreshToken))
                history("/")
            })
    }

    return (
        <div className="show-fake-browser login-page">
            <Container>
                <Content>
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item className="animated" as={Col} colspan={24} md={6}>
                            <Panel className="box" header={<h3>{t('pages.user.login.title')}</h3>} bordered>
                                <Form className="" fluid
                                    model={model}
                                    formValue={formValue}
                                    onChange={setFormValue}
                                    ref={formRef}  >
                                    <div style={{ borderRadius: 8, inset: 2, zIndex: 522 }}>
                                        <Form.Group>
                                            <TextInput
                                                name="userName"
                                                label={t('pages.user.login.username')}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <PasswordInput
                                                name="password"
                                                label={t('pages.user.login.password')}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <ButtonToolbar>
                                                <Button onClick={signIn} type="submit" appearance="primary">{t('pages.user.login.title')}</Button>
                                                <Button onClick={signUp} type="button" appearance="primary">Kayıt Ol</Button>
                                            </ButtonToolbar>
                                        </Form.Group>
                                    </div>
                                </Form>
                            </Panel>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>
            </Container>
        </div>
    )
}

export default Login
import { Unvisible, Visible } from "@rsuite/icons";
import React from "react";
import { Form, InputGroup } from "rsuite";

const PasswordInput = (props) => {
    const { name, message, label, accepter, error, disabled = false, readOnly = false, style, ...rest } = props
    const [visible, setVisible] = React.useState(false);

    const handleChange = () => {
        setVisible(!visible);
    }

    return (
        <Form.Group className={error ? 'has-error' : ''} style={{ marginBottom: 24 }}>
            <Form.ControlLabel>{label && `${label} :`}</Form.ControlLabel>
            <InputGroup inside>
                <Form.Control type={visible ? 'text' : 'password'} style={style} disabled={disabled} readOnly={readOnly} name={name} accepter={accepter} errorMessage={error} {...rest} />
                <InputGroup.Button onClick={handleChange}>
                    {visible ? <Visible /> : <Unvisible />}
                </InputGroup.Button>
            </InputGroup>
            {message && <Form.HelpText>{message}</Form.HelpText>}
        </Form.Group>
    )
}

export default PasswordInput
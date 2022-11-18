import React from "react";
import { Form } from "rsuite";

const TextInput = (props) => {
    const { name, message, label, accepter, error, disabled = false, readOnly = false, style, ...rest } = props
    return (
        <Form.Group className={error ? 'has-error' : ''} style={{ marginBottom: 24 }}>
            <Form.ControlLabel>{label && `${label} :`}</Form.ControlLabel>
            <Form.Control style={style} disabled={disabled} readOnly={readOnly} name={name} accepter={accepter} errorMessage={error} {...rest} />
            {message && <Form.HelpText>{message}</Form.HelpText>}
        </Form.Group>
    )
}

export default TextInput
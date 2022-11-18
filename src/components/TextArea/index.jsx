import React from "react";
import { Input } from "rsuite";

const TextArea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

export default TextArea
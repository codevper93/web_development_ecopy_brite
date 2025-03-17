import { Form, InputGroup } from 'react-bootstrap';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";


export const LoginInputs = (props) => {

    const { useIsShowPassword, setIsShowPassword, values, valueChange } = props;

    const { email, password } = values;

    return <>
        <Form.Group className="mb-3" controlId="email">
            <Form.Label className='label_text_input'>Email address</Form.Label>
            <Form.Control type="text" placeholder="Enter email" className='input_style'
                name="email" value={email} onChange={(e) => valueChange(e)}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
            <Form.Label className='label_text_input'>Password</Form.Label>

            <InputGroup className="mb-3">
                <Form.Control type={useIsShowPassword ? "text" : "password"} placeholder="Enter password" className='input_style'
                    name="password" value={password} onChange={(e) => valueChange(e)}
                />
                <InputGroup.Text className='btn_isShowPassword' onClick={() => setIsShowPassword(!useIsShowPassword)}>
                    {!useIsShowPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </InputGroup.Text>
            </InputGroup>
        </Form.Group>
    </>;
}

export const RegisterInputs = (props) => {

    const { useIsShowConfirmPassword, setIsShowConfirmPassword, values, valueChange } = props;

    const { confirm_password } = values;

    return <Form.Group className="mb-3" controlId="confirm_password">
        <Form.Label className='label_text_input'>Confirm password</Form.Label>
        <InputGroup className="mb-3">
            <InputGroup className="mb-3">
                <Form.Control type={useIsShowConfirmPassword ? "text" : "password"} placeholder="Enter password" className='input_style'
                    name="confirm_password" value={confirm_password} onChange={(e) => valueChange(e)} />
                <InputGroup.Text className='btn_isShowPassword' onClick={() => setIsShowConfirmPassword(!useIsShowConfirmPassword)}>
                    {!useIsShowConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </InputGroup.Text>
            </InputGroup>
        </InputGroup>
    </Form.Group>;
}
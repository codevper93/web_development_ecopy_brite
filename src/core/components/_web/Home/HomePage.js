import { useForms } from "../../_hooks/useForms";
import { useEffect, useState } from "react";
import { LoginInputs, RegisterInputs } from "./InputsForm";
import { Row, Col, Card, Button, Form } from "react-bootstrap";


export const HomePage = () => {

    const [useChangeStatus, setChangeStatus] = useState(false);
    const [useIsShowPassword, setIsShowPassword] = useState(false);
    const [useIsShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

    const { useFieldsInputsValues, useErrorInput, onChangeInputValues, setFieldsInputsValues, setErrorInput, onSubmitFormData } = useForms({
        email: "",
        password: "",
        confirm_password: ""
    });

    const { email, password, confirm_password } = useFieldsInputsValues;

    useEffect(() => {
        setFieldsInputsValues({
            email: "",
            password: ""
        });
        setErrorInput([]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setFieldsInputsValues, useChangeStatus]);


    return <Row>
        <Col md={6} className="mx-auto mb-5">
            <Card>
                <Card.Body>

                    <div className="title_login_and_register mb-3">
                        {!useChangeStatus ? "Log in" : "Create an account"}
                    </div>

                    <hr />

                    {
                        !useChangeStatus ? <div className="text-center">
                            <p><b>Email: </b>test@hotmail.com | <b>Password: </b>123456</p>
                        </div> : null
                    }

                    {
                        useErrorInput.length > 0 ? useErrorInput.map((e, i) => <div style={{ textAlign: "center" }}>
                            <Form.Text key={i} className="label_footer_text_error_field">
                                {e}
                            </Form.Text>
                        </div>) : null
                    }

                    <form onSubmit={(e) => onSubmitFormData(useChangeStatus ? "AUTH_REGISTER" : "AUTH_LOGIN", "", e)} autoComplete='off'>
                        <LoginInputs useIsShowPassword={useIsShowPassword}
                            setIsShowPassword={setIsShowPassword} values={{ email, password }} valueChange={onChangeInputValues} />
                        {
                            useChangeStatus ? < RegisterInputs useIsShowConfirmPassword={useIsShowConfirmPassword}
                                setIsShowConfirmPassword={setIsShowConfirmPassword} values={{ confirm_password }} valueChange={onChangeInputValues}
                            /> : null
                        }

                        <div className="d-grid gap-2">
                            <Button className='btn_orange_submit' type="submit" onMouseDown={(e) => e.preventDefault()}>
                                {useChangeStatus ? "Sign up" : "Log in"}
                            </Button>
                        </div>
                    </form>
                </Card.Body>

                <div className="text_footer_login_and_register">
                    <span onClick={() => {
                        setChangeStatus(!useChangeStatus); setIsShowPassword(false);
                        setIsShowConfirmPassword(false);
                    }}>
                        {!useChangeStatus ? "[ Sign up ]" : "[ Log in ]"}
                    </span>
                </div>
            </Card>
        </Col>
    </Row>;
}
import { MdEmail } from "react-icons/md";
import { FaRandom } from "react-icons/fa";
import { VscError } from "react-icons/vsc";
import { useForms } from "../../../_hooks/useForms";
import { BiSolidUser } from "react-icons/bi";
import { BsImageFill } from "react-icons/bs";
import { GoCheckCircle } from "react-icons/go";
import { AuthUserContext } from "../../../_hooks/_Context/AuthUserContext";
import { useContext, useEffect, useState } from "react";
import { Card, Button, Row, Col, Form, InputGroup } from "react-bootstrap";

const IMG_SUGGESTED = [
    "https://res.cloudinary.com/djuw129p2/image/upload/v1691867400/avatars/avatar-nasimiyu-danai_jxploe.png",
    "https://res.cloudinary.com/djuw129p2/image/upload/v1691867399/avatars/avatar-alcides-antonio_kbyjyr.png",
    "https://res.cloudinary.com/djuw129p2/image/upload/v1691867400/avatars/avatar-iulia-albu_eo9rrk.png"
];

export const FormConfig = () => {

    const { useUserLoggedData } = useContext(AuthUserContext);

    const [useChangeInput, setChangeInput] = useState(false);

    const { useFieldsInputsValues, setFieldsInputsValues, onChangeInputValues, onSubmitFormData } = useForms({
        fullname: "",
        profile_picture: ""
    });

    const { fullname, profile_picture } = useFieldsInputsValues;

    useEffect(() => {
        if (useUserLoggedData.data.auth.currentUser.photoURL) {
            console.log("has")
            setFieldsInputsValues({
                ...useFieldsInputsValues,
                profile_picture: useUserLoggedData.data.auth.currentUser.photoURL
            });
        }

        if (useUserLoggedData.data.auth.currentUser.displayName) {
            setFieldsInputsValues({
                ...useFieldsInputsValues,
                fullname: useUserLoggedData.data.auth.currentUser.displayName
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    function onChangeInput() {
        setChangeInput(!useChangeInput);
        setFieldsInputsValues({});
    }

    return <>
        <Card style={{ border: "1px solid #4553e6" }}>
            <Card.Header style={{ background: "#4553e6", color: "white", letterSpacing: "3px" }}>
                USER CONFIG
            </Card.Header>
            <Card.Body>
                <Row className="mb-3">
                    <Col md={3}>
                        <Card.Img variant="top" src={useUserLoggedData.data.auth.currentUser.photoURL ? useUserLoggedData.data.auth.currentUser.photoURL : "https://res.cloudinary.com/djuw129p2/image/upload/v1692657078/avatar_batman_mfhejl.png"} />
                    </Col>
                    <Col md={9}>
                        <div>
                            <p><b>Status:</b> {useUserLoggedData.data.auth.currentUser.emailVerified ? <span style={{ color: "#2ee03a" }}><GoCheckCircle /> This account is verified</span> : <span style={{ color: "#e02e46" }}><VscError /> This account is not verified</span>}</p>
                            <p><b>Fullname:</b> {useUserLoggedData.data.auth.currentUser.displayName ? <span style={{ color: "#2ee03a" }}><GoCheckCircle /> {useUserLoggedData.data.displayName}</span> : <span style={{ color: "#e02e46" }}><VscError /> There's not a name assigned</span>}</p>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <hr />
                    <form onSubmit={(e) => onSubmitFormData("FORM_CONFIG", "", e)} autoComplete="off">
                        <InputGroup className="mb-3">
                            <InputGroup.Text className="input_style"><MdEmail /></InputGroup.Text>
                            <Form.Control className=' input_style_readonly input_style'
                                readOnly
                                placeholder="E-mail"
                                name="email" value={useUserLoggedData.data.auth.currentUser.email}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text className="input_style"><BiSolidUser /></InputGroup.Text>
                            <Form.Control className=' input_style'
                                placeholder="Fullname" name="fullname" value={fullname} onChange={onChangeInputValues} />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text className="input_style"><BsImageFill /></InputGroup.Text>

                            {
                                !useChangeInput ? <Form.Control className=' input_style'
                                    placeholder="Profile picture (URL)" name="profile_picture" value={profile_picture ? profile_picture : useUserLoggedData.data.auth.currentUser.photoURL} onChange={onChangeInputValues}
                                /> : <Form.Select className=' input_style' name="profile_picture" value={profile_picture ? profile_picture : useUserLoggedData.data.auth.currentUser.photoURL} onChange={onChangeInputValues}>
                                    <option>Select avatar suggested</option>
                                    {
                                        IMG_SUGGESTED.map((e, i) => <option key={i} value={e}>Avatar #{i + 1}</option>)
                                    }
                                </Form.Select>
                            }

                            <InputGroup.Text className="input_style btn_change_input" onClick={onChangeInput}><FaRandom /></InputGroup.Text>
                        </InputGroup>
                        <div className="text-end">
                            <Button className="btn_orange_submit" type="submit">
                                Update info
                            </Button>
                        </div>
                    </form>
                </Row>
            </Card.Body>
        </Card >
    </>;
}
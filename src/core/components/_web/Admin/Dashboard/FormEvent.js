import { getAuth } from "firebase/auth";
import { useForms } from "../../../_hooks/useForms";
import { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { MdOutlineMoneyOff, MdAttachMoney } from "react-icons/md";
import { selectCategoryEvent, selectStartTimeEvent, selectTypeEvent } from "../../../../HELPERS/dataEventSelect";

export const FormEvent = ({ args }) => {

    const [useEventItsFree, setEventItsFree] = useState(true);

    const { useFieldsInputsValues, useErrorInput, setFieldsInputsValues, onChangeInputValues, onSubmitFormData } = useForms({
        title: "",
        organizer: "",
        entity: "",
        type: "",
        category: "",
        event_starts: "",
        event_ends: "",
        start_time: "",
        end_time: "",
        description: "",
        isItsFree: true,
        price: ""
    });

    const { title, entity, type, category,
        event_starts, event_ends, start_time, end_time, description, price } = useFieldsInputsValues;

    useEffect(() => {
        if (Object.keys(args).length > 0) {
            setFieldsInputsValues(args);
        } else {
            setFieldsInputsValues({
                title: "",
                organizer: "",
                entity: "",
                type: "",
                category: "",
                event_starts: "",
                event_ends: "",
                start_time: "",
                end_time: "",
                description: "",
                isItsFree: true,
                price: ""
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickChangeEventItsFree = (status) => {
        setEventItsFree(status);
        setFieldsInputsValues({
            ...useFieldsInputsValues,
            isItsFree: status,
            price: ""
        });
    }

    return <form onSubmit={(e) => onSubmitFormData("EVENTS", Object.keys(args).length > 0 ? "EDIT" : "ADD", e)} autoComplete="off">
        <div id="error_inputs">
            {
                useErrorInput.length > 0 ? useErrorInput.map((e, i) => <div style={{ textAlign: "center" }}>
                    <Form.Text key={i} className="label_footer_text_error_field">
                        {e}
                    </Form.Text>
                </div>) : null
            }
            <Row >
                <div className="text-center">
                    <b>The event will be {useEventItsFree ? "free" : "paid"}</b>
                </div>
                <Col md={6} className="mb-3 form_event_card_its_pay" onClick={() => onClickChangeEventItsFree(true)} style={{ pointerEvents: useEventItsFree ? "none" : "", backgroundColor: useEventItsFree ? "#bb2c00" : "" }}>
                    <MdOutlineMoneyOff style={{ color: useEventItsFree ? "white" : "" }} />
                </Col>
                <Col md={6} className="mb-3 form_event_card_its_pay" onClick={() => onClickChangeEventItsFree(false)} style={{ pointerEvents: useEventItsFree ? "" : "none", backgroundColor: useEventItsFree ? "" : "#bb2c00" }}>
                    <MdAttachMoney style={{ color: useEventItsFree ? "" : "white" }} />
                </Col>
            </Row>
        </div>

        {
            !useEventItsFree ? <Row className="mb-3">
                <Col md={6} className="mx-auto">
                    <Form.Group className="text-center"  >
                        <Form.Label className='label_text_input'>Price {"(value)"}</Form.Label>
                        <Form.Control className='input_style' type="text" placeholder="Enter event value"
                            name="price" value={price} onChange={(e) => onChangeInputValues(e)} />
                    </Form.Group>
                </Col>
            </Row> : null
        }

        <Row className="mb-3">
            <Form.Group  >
                <Form.Label className='label_text_input'>Event title</Form.Label>
                <Form.Control className='input_style' type="text" placeholder="Enter event title"
                    name="title" value={title} onChange={(e) => onChangeInputValues(e)} />
            </Form.Group>
        </Row>
        <Row className="mb-3">
            <Col md={6}>
                <Form.Group  >
                    <Form.Label className='label_text_input'>Organizer</Form.Label>
                    <Form.Control readOnly className='input_style_readonly  input_style' type="text" placeholder="Enter organizer"
                        name="organizer" value={getAuth().currentUser.displayName ? getAuth().currentUser.displayName : getAuth().currentUser.email} onChange={(e) => onChangeInputValues(e)} />
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group  >
                    <Form.Label className='label_text_input'>Location</Form.Label>
                    <Form.Control className='input_style' type="text" placeholder="Enter Location"
                        name="entity" value={entity} onChange={(e) => onChangeInputValues(e)} />
                </Form.Group>
            </Col>
        </Row>

        <Row className="mb-3">
            <Col md={6}>
                <Form.Select className='input_style' name="type" value={type} onChange={(e) => onChangeInputValues(e)} >
                    <option>Select type</option>
                    {selectTypeEvent.map((e, i) => <option value={e} key={i}>{e}</option>)}
                </Form.Select>
            </Col>
            <Col md={6}>
                <Form.Select className='input_style' name="category" value={category} onChange={(e) => onChangeInputValues(e)} >
                    <option>Select category</option>
                    {selectCategoryEvent.map((e, i) => <option value={e} key={i}>{e}</option>)}
                </Form.Select>
            </Col>
        </Row>

        <Row className="mb-3">
            <Col md={6}>
                <Form.Group  >
                    <Form.Label className='label_text_input'>Event Starts</Form.Label>
                    <Form.Control className='input_style' type="date"
                        name="event_starts" value={event_starts} onChange={(e) => onChangeInputValues(e)} />
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group  >
                    <Form.Label className='label_text_input'>Start Time</Form.Label>

                    <Form.Select className='input_style'
                        name="start_time" value={start_time} onChange={(e) => onChangeInputValues(e)} >
                        <option>Select time</option>
                        {selectStartTimeEvent.map((e, i) => <option value={e} key={i}>{e}</option>)}
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>

        <Row className="mb-3">
            <Col md={6}>
                <Form.Group  >
                    <Form.Label className='label_text_input'>Event Ends</Form.Label>
                    <Form.Control className='input_style' type="date"
                        name="event_ends" value={event_ends} onChange={(e) => onChangeInputValues(e)} />
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group  >
                    <Form.Label className='label_text_input'>End Time</Form.Label>
                    <Form.Select className='input_style'
                        name="end_time" value={end_time} onChange={(e) => onChangeInputValues(e)} >
                        <option>Select time</option>
                        {selectStartTimeEvent.map((e, i) => <option value={e} key={i}>{e}</option>)}
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>

        <Row className="mb-3">
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label className='label_text_input'>Event description</Form.Label>
                <Form.Control className='input_style input_description' as="textarea" rows={3}
                    name="description" value={description} onChange={(e) => onChangeInputValues(e)} />
            </Form.Group>
        </Row>

        <div className="text-end">
            <Button className="btn_orange_submit" type="submit">
                {Object.keys(args).length > 0 ? "Update event" : "Add new event"}
            </Button>
        </div>
    </form>;
}
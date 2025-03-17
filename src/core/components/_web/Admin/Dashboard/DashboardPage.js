import { useGetData } from "../../../_hooks/useGetData";
import { deleteEvent } from "../../../../HELPERS/firebase/queries/events";
import { PiFileDashed } from "react-icons/pi";
import { ModalAppContext } from "../../../_hooks/_Context/ModalAppContext";
import { AuthUserContext } from "../../../_hooks/_Context/AuthUserContext";
import { FaTrash, FaEdit } from "react-icons/fa";
import { FaRegCalendarPlus } from "react-icons/fa";
import { useContext, useEffect } from "react";
import { Container, Row, Col, Card, Button, Table, ButtonGroup } from "react-bootstrap";

export const DashboardPage = () => {

    const { useUserLoggedData } = useContext(AuthUserContext);

    const { useFirebaseData, setDataPrepareToAction } = useGetData("ALL", "EVENTS", true);

    const { useIsOpenModal, onOpenModal } = useContext(ModalAppContext);

    useEffect(() => {
        if (!useIsOpenModal) {
            setDataPrepareToAction({});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useIsOpenModal]);

    const getDataToEdit = (data) => {
        setDataPrepareToAction(data);
        onOpenModal("FORM_EVENT", data);
    }

    const getDataToDelete = (data) => {
        let isDelete = window.confirm(`Do you wish delete the event "${data.title}"?`);

        if (isDelete) {
            deleteEvent(data).then(() => {
                setDataPrepareToAction(data);
            });
        }
    }

    return <Container>
        <Row>
            <Col md={7} className="mx-auto">
                {
                    useUserLoggedData.isLoading ? <div className="title_loading">Loading...</div> :
                        <Card style={{ borderColor: "#39364f", borderRadius: "0" }}>
                            <Card.Header className="text-end card_header_content_table">
                                <Button onClick={() => onOpenModal("FORM_EVENT", {})} className="btn_add_event"><FaRegCalendarPlus style={{ transform: "scale(1.5)" }} /></Button>
                            </Card.Header>
                            <Card.Body>

                                {
                                    useFirebaseData.isLoading ? "LOADING" : useFirebaseData.data.length === 0 ? <div className="no_record">
                                        <PiFileDashed />
                                        <div>
                                            No record
                                        </div>
                                    </div> :
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th style={{ textAlign: "center", borderColor: "#cacaca" }}>#</th>
                                                    <th style={{ textAlign: "center", borderColor: "#cacaca" }}>Title</th>
                                                    <th style={{ textAlign: "center", borderColor: "#cacaca" }}>Category</th>
                                                    <th style={{ textAlign: "center", borderColor: "#cacaca" }}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    useFirebaseData.data.map((e, i) => <tr key={i}>
                                                        <td style={{ width: "5%", borderColor: "#cacaca" }}>{i + 1}</td>
                                                        <td style={{ width: "45%", borderColor: "#cacaca" }}>{e.title}</td>
                                                        <td style={{ width: "25%", borderColor: "#cacaca" }}>{e.category}</td>
                                                        <td style={{ width: "25%", textAlign: "center", borderColor: "#cacaca" }}>
                                                            <ButtonGroup>
                                                                <Button variant="danger" onClick={() => getDataToDelete(e)}
                                                                    onMouseDown={(e) => e.preventDefault()}><FaTrash /></Button>
                                                                <Button variant="warning" onClick={() => getDataToEdit(e)}
                                                                    onMouseDown={(e) => e.preventDefault()}><FaEdit /></Button>
                                                            </ButtonGroup>
                                                        </td>
                                                    </tr>)
                                                }
                                            </tbody>
                                        </Table>
                                }
                            </Card.Body>
                        </Card>
                }
            </Col>
        </Row>
    </Container>;
}
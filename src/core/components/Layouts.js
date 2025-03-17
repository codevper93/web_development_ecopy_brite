import { ModalApp } from "./_web/UI/ModalApp";
import { HeaderTop } from "./_web/UI/HeaderTop";
import { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { ModalAppContext } from "./_hooks/_Context/ModalAppContext";
import { Navigate, Route, Routes } from "react-router-dom";

export const LayoutPrivate = ({ routes }) => {

    const { useIsOpenModal, useRenderComponentInModal, onOpenModal, onCloseModal } = useContext(ModalAppContext);

    if (localStorage.getItem("ACCESS_TOKEN")) {
        return <>

            <HeaderTop onOpenModal={onOpenModal} />

            <Routes>
                {
                    routes.map((route) => (
                        <Route key={route.path} path={route.path}
                            exact={route.exact} element={<route.element />} />
                    ))
                }
                <Route path='*' element={<Navigate to='/admin' />} />
            </Routes>

            <ModalApp useIsOpenModal={useIsOpenModal} onCloseModal={onCloseModal}>
                {useRenderComponentInModal}
            </ModalApp>
        </>;

    } else {
        window.location.replace("/");
    }
}

export const LayoutPublic = ({ routes }) => {

    if (localStorage.getItem("ACCESS_TOKEN") == null) {

        return <>

            <HeaderTop />

            <Container>
                <Row>
                    <Routes>
                        {
                            routes.map((route) => (
                                <Route key={route.path} path={route.path} exact={route.exact} element={<route.element />} />
                            ))
                        }

                        <Route path="*" element={<Navigate to="/admin" />} />

                    </Routes>
                </Row>
            </Container>
        </>;

    } else {
        window.location.replace("/admin");
    }
}
import { FormEvent } from "../../_web/Admin/Dashboard/FormEvent";
import { FormConfig } from "../../_web/Admin/Dashboard/FormConfig";
import { useState, createContext } from "react";

export const ModalAppContext = createContext();

export const ModalAppProvider = ({ children }) => {

    const [useIsOpenModal, setIsOpenModal] = useState(false);
    const [useRenderComponentInModal, setRenderComponentInModal] = useState({});

    const onOpenModal = (COMPONENT = "", props = {}) => {

        switch (COMPONENT) {
            case "FORM_EVENT":
                setRenderComponentInModal(<FormEvent args={props} />);
                break;

            case "FORM_CONFIG":
                setRenderComponentInModal(<FormConfig />);
                break;

            default:
                break;
        }
        setIsOpenModal(true);
    }

    const onCloseModal = () => {
        setIsOpenModal(false);
    }


    return <ModalAppContext.Provider
        value={{
            useIsOpenModal,
            useRenderComponentInModal,
            setIsOpenModal,
            onOpenModal,
            onCloseModal
        }}
    >
        {children}

    </ModalAppContext.Provider>;
}
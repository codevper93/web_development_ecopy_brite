import { useParams } from "react-router-dom";
import { getEvents } from "../../HELPERS/firebase/queries/events";
import { ModalAppContext } from "../_hooks/_Context/ModalAppContext";
import { useContext, useEffect, useState } from "react";


export const useGetData = (TYPE_GET = "", ENTITY = "", isPrivate = false) => {

    const params = useParams();

    const [useFirebaseData, setFirebaseData] = useState({
        isLoading: true,
        data: undefined
    });

    const [useDataPrepareToAction, setDataPrepareToAction] = useState({});

    const { useIsOpenModal } = useContext(ModalAppContext);

    useEffect(() => {
        switch (TYPE_GET) {
            case "ALL":
                if (ENTITY === "USERS") {

                } else if (ENTITY === "EVENTS") {
                    getEvents("ALL", useFirebaseData, setFirebaseData, "", isPrivate);
                }
                break;
            case "BY_ID":
                if (ENTITY === "USERS") {

                } else if (ENTITY === "EVENTS") {
                    getEvents("BY_ID", useFirebaseData, setFirebaseData, params.id);
                }
                break;
            default:
                break;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useDataPrepareToAction, useIsOpenModal]);

    return {
        useFirebaseData,
        useDataPrepareToAction,
        setDataPrepareToAction
    };
}
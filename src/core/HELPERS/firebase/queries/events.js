import { GET_AUTH } from "./users";
import { appConfigFirebase } from "../FireAppConfig";
import { collection, addDoc, getFirestore, getDoc, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";

const GET_DB = getFirestore(appConfigFirebase);


export const getEvents = async (TYPE_GET = "", useFirebaseData, setFirebaseData, id_event = "", isPrivate = false) => {

    const getDocs_collection = await getDocs(collection(GET_DB, "events"));

    let arr_docs = [];
    let new_obj = {};

    if (TYPE_GET === "ALL") {

        getDocs_collection.forEach((record) => {

            new_obj = {
                id: record.id,
                user_id: isPrivate ? GET_AUTH.currentUser.uid : "",
                ...record.data()
            }

            arr_docs.push(new_obj);

            setFirebaseData({
                ...useFirebaseData,
                isLoading: false
            });
        });

        let new_arr = [];

        if (isPrivate) {
            if (new_arr.length === 0) {

                for (let i = 0; i < arr_docs.length; i++) {
                    if (arr_docs[i].user_id === GET_AUTH.currentUser.uid) {
                        new_arr.push(arr_docs[i]);
                    }
                }
            }
        }

        setFirebaseData({
            isLoading: false,
            data: isPrivate ? new_arr : arr_docs
        });

    } else if (TYPE_GET === "BY_ID") {

        const record_ref = doc(GET_DB, "events", id_event);


        const getDocs_ref_collection = await getDoc(record_ref);

        if (getDocs_ref_collection.exists()) {

            new_obj = {
                id: getDocs_ref_collection.id,
                ...getDocs_ref_collection.data()
            };

            setFirebaseData({
                isLoading: false,
                data: new_obj
            });

        } else {
            setFirebaseData({
                isLoading: false,
                data: {}
            });
        }
    }
}


export const createEvent = async (values) => {

    try {

        await addDoc(collection(
            GET_DB,
            "events"
        ), {
            user_id: GET_AUTH.currentUser.uid,
            title: values.title,
            organizer: values.organizer,
            entity: values.entity,
            type: values.type,
            category: values.category,
            event_starts: values.event_starts,
            event_ends: values.event_ends,
            start_time: values.start_time,
            end_time: values.end_time,
            description: values.description,
            isItsFree: true,
            price: values.price
        });

    } catch (error) {
        alert(error.message);
    }
}

export const editEvent = async (values = {}) => {

    if (values.user_id === GET_AUTH.currentUser.uid) {
        await setDoc(doc(GET_DB, "events", values.id), {
            user_id: GET_AUTH.currentUser.uid,
            title: values.title,
            organizer: values.organizer,
            entity: values.entity,
            type: values.type,
            category: values.category,
            event_starts: values.event_starts,
            event_ends: values.event_ends,
            start_time: values.start_time,
            end_time: values.end_time,
            description: values.description,
            isItsFree: true,
            price: values.price
        });
    }
}


export const deleteEvent = async (id_event) => {

    if (id_event.user_id === GET_AUTH.currentUser.uid) {
        return deleteDoc(doc(GET_DB, "events", id_event.id));
    }
}
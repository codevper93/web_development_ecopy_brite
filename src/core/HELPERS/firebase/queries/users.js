
import { appConfigFirebase } from "../FireAppConfig";

import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged, signOut, updateProfile
} from "firebase/auth";


export const DATABASE_APP_CONFIG = (appConfigFirebase);

export const GET_AUTH = getAuth();

export const userIsLogged = (setUserLoggedData) => {

    onAuthStateChanged(GET_AUTH, (user_data) => {

        if (user_data) {
            setUserLoggedData({
                isLoading: false,
                data: user_data
            });
        } else {
            setUserLoggedData({
                isLoading: false,
                data: {}
            });
        }
    });
}


export const userLogout = () => {

    signOut(GET_AUTH)
        .then(() => {
            localStorage.removeItem("ACCESS_TOKEN");
            window.location.replace("/");
        }).catch((error) => {
            alert(error.message);
        });
}


export const register = (email, password) => {

    createUserWithEmailAndPassword(GET_AUTH, email, password)
        .then((user_credential) => {

            const { user } = user_credential;

            localStorage.setItem("ACCESS_TOKEN", user.accessToken);

            window.location.replace("/admin");

        }).catch((error) => {
            alert(error.message);
        });
}


export const login = (email, password) => {

    signInWithEmailAndPassword(GET_AUTH, email, password)
        .then((user_credential) => {

            const { user } = user_credential;

            localStorage.setItem("ACCESS_TOKEN", user.accessToken);

            window.location.replace("/admin");

        }).catch((error) => {
            alert(error.message);
        });
}


export const updateUser = (values = {}, onCloseModal) => {

    updateProfile(GET_AUTH.currentUser, {
        displayName: values.fullname ? values.fullname : GET_AUTH.currentUser.displayName,
        photoURL: values.profile_picture ? values.profile_picture : GET_AUTH.currentUser.photoURL
    }).then(() => {
        onCloseModal();

    }).catch((error) => {
        alert(alert.message);
    });
}
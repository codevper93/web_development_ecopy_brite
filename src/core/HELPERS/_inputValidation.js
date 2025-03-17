export const inputEmailValidation = (email = "") => {
    // eslint-disable-next-line
    const PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return PATTERN.test(email) ? true : false;
}
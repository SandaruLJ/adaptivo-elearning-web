import { save } from "./http.service";

const url = `${process.env.REACT_APP_BE_URL}api/drm`;

export const generateLicenseToken = async (keyId) => {
    const data = {keyId:keyId}
    const token = await save(url, data);
    console.log(token);
    return token;
}
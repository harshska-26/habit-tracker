import axios from "axios";

export const habitTrackerData = async() => {
    try {
        const apiRes = await axios.get("http://localhost:4000/")
        return apiRes.data;
    } catch (error) {
        console.log(`error is at fetching response ${error}`)
    }
}



import axios from "axios";

export const habitTrackerData = async() => {
    try {
        const apiRes = await axios.get("http://localhost:4000/")
        return apiRes.data;
    } catch (error) {
        console.log(`error is at fetching response ${error}`)
        throw error
    }
}

export const addHabit = async (id, name, description) => {
    const payload = { 
        id: id,
        name: name, 
        description: description 
    };
    const res = await axios.post("http://localhost:4000/addHabit", payload);
    return res.data;
};
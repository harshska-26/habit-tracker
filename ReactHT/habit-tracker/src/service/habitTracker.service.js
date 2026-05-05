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

export const addHabit = async (id, name, description, completed, streak, progress, lw_progress) => {
    try{
        const payload = { 
            id: id,
            name: name, 
            description: description,
            streak: streak,
            completed_days: JSON.stringify(completed),
            progress: JSON.stringify(progress),
            last_week_progress: lw_progress,
        };
        const res = await axios.post("http://localhost:4000/addHabit", payload);
        return res.data;
    }catch(error){
        console.log(`error is at posting response ${error}`)
        throw error
    }
};

export const deleteHabit = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:4000/delHabit/`, {
            data: { id: id }
        });
        return res;
    } catch (error) {
        console.log(`error at delete Service ${error}`);
        throw error;
    }
};


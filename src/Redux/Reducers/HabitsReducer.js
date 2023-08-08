import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Tools/firebase";
import { tostify } from "../../Tools/tostify";

const initialState = {
    habits: []
}

export const addHabit = createAsyncThunk("habits/addHabit", async (payload, thunkAPI) => {

    const userUID = thunkAPI.getState().userReducer.userUID;
    const habitName = payload;
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;//~ 2023-08-10 time formate

    try {
        // Adding a new user with a custom userUID
        const userCollectionRef = collection(db, "users");
        const newUserDocRef = await doc(userCollectionRef, userUID);

        // Adding a new habit with habitName as the document ID
        const habitsCollectionRef = collection(newUserDocRef, "habits");
        const newHabitDocRef = await addDoc(habitsCollectionRef, { habitName });

        // Adding days to the habit
        const daysCollectionRef = collection(newHabitDocRef, "days");
        await addDoc(daysCollectionRef, { date: today, status: "none" });

    } catch (error) {
        console.log(error)
    }
})

// export const updateDayData = createAsyncThunk("habits/updateDayData", async (payload, thunkAPI) => {
//     const { habitDocRefPath, daysData } = (payload);

// })

export const updateHabitStatus = createAsyncThunk("habits/updateHabitStatus", async (payload, thunkAPI) => {

    const { dayReferencePath, newStatus } = payload;
    console.log(dayReferencePath, newStatus)
    try {
        await updateDoc(doc(db, dayReferencePath), {
            status: newStatus
        });

    } catch (error) {
        tostify("error", error.massage)
    }
})



const habitsSlice = createSlice({
    name: "habits",
    initialState,
    reducers: {
        "initialHabits": (state, action) => {
            state.habits = action.payload;
        },
        "updateDayData": (state, action) => {
            const { habitDocRefPath, daysData } = action.payload;
            state.habits = state.habits.map(habit => {
                if (habit.habitDocRefPath === habitDocRefPath) {
                    return {
                        ...habit,
                        days: daysData
                    };
                }
                return habit;
            });
        }
    }
});


export const habitsReducer = habitsSlice.reducer;
export const habitsAction = habitsSlice.actions;
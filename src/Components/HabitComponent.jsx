import React, { useEffect, useState } from 'react'
import css from "../css/Habit.module.css"
import none from "../Image/circle.png";
import notDone from "../Image/cross.png";
import done from "../Image/star.png"
import { useDispatch, useSelector } from 'react-redux';
import { habitsAction, updateHabitStatus } from '../Redux/Reducers/HabitsReducer';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../Tools/firebase';
import { habitsSelector } from '../Redux/Selectors';

export default function HabitComponent(props) {

    const dispatch = useDispatch();

    const [currentDay, setCurrentDay] = useState({});

    const { habitName, habitDocRefPath, daysCollectionRefPath } = props.habit;

    useEffect(() => {
        let unsubscribe;

        async function callMe() {
            try {
                unsubscribe = onSnapshot(collection(db, daysCollectionRefPath), async (daysQuerySnapshot) => {
                    const daysData = [];
                    const date = new Date();
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const today = `${year}-${month}-${day}`;//~ 2023-08-10 time formate

                    if (!daysQuerySnapshot.empty) {
                        daysQuerySnapshot.forEach((dayDoc) => {

                            const dayReferencePath = dayDoc.ref.path; // used to uniquely identify a document

                            daysData.push({ id: dayDoc.id, ...dayDoc.data(), dayReferencePath });

                            if (dayDoc.data().date === today) {
                                setCurrentDay({ id: dayDoc.id, ...dayDoc.data(), dayReferencePath })
                            }
                        });
                        await dispatch(habitsAction.updateDayData({ habitDocRefPath, daysData }));
                    }
                });
            } catch (error) {
                console.log(error)
            }
        }
        callMe();

        return () => {
            if (unsubscribe)
                unsubscribe();
        }
    }, [dispatch]);


    const handleHabitStatus = async () => {
        const newStatus = (currentDay.status === "done" ? "not_done" : currentDay.status === "not_done" ? "none" : "done");
        // Dispatch an action to update the status of the habit in Redux store
        console.log(currentDay.dayReferencePath, currentDay.status)
        await dispatch(updateHabitStatus({ dayReferencePath: currentDay.dayReferencePath, newStatus }));
    }

    return (
        <div className={css.container}>
            <div className={css.habitDetail}>
                <h3>{habitName}</h3>
            </div>
            <div onClick={() => handleHabitStatus()} className={css.btn}>
                <img src={currentDay.status === "done" ? done : currentDay.status === "not_done" ? notDone : none} alt="" />
            </div>
        </div >
    )

}

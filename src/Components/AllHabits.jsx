import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { habitsAction, updateHabitStatus } from '../Redux/Reducers/HabitsReducer';
import { doc, onSnapshot, addDoc, collection, getDocs } from "firebase/firestore";
import { db } from '../Tools/firebase';
import { habitsSelector, userSelector } from '../Redux/Selectors';
import HabitComponent from './HabitComponent';

export default function Habit() {

    const userUID = useSelector(userSelector);
    const habits = useSelector(habitsSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!userUID) return;

        let unsubscribe;
        async function initialHabits() {
            try {

                unsubscribe = onSnapshot(collection(db, "users", userUID, "habits"), async (querySnapshot) => {
                    const habitsData = [];
                    if (!querySnapshot.empty) {
                        for (const habitDoc of querySnapshot.docs) {
                            const habitData = habitDoc.data();
                            const daysCollectionRef = collection(habitDoc.ref, "days");

                            habitsData.push({
                                habitName: habitData.habitName,
                                habitDocRefPath: habitDoc.ref.path, // Store Firestore path
                                daysCollectionRefPath: daysCollectionRef.path,
                            });
                        }
                        await dispatch(habitsAction.initialHabits(habitsData));
                    }
                });
            } catch (error) {
                console.log(error)
            }
        }

        initialHabits();

        return () => {
            if (unsubscribe)
                unsubscribe();
        }
    }, [userUID, dispatch]);


    return (<>
        < div className="habitsContainer" >
            {habits && habits.map((habit, index) => <HabitComponent key={index} habit={habit} allHabits={habits} />)}
        </div>
    </>
    )
}

import React from 'react'
import css from "../css/WeeklyHabit.module.css"
export default function WeeklyHabit() {
    return (<>
        <div className={css.title}>
            <div>sun</div>
            <div>mon</div>
            <div>tue</div>
            <div>wed</div>
            <div>thu</div>
            <div>fri</div>
            <div>sat</div>
        </div>
        <div className={css.habitsContainer}>
            <div className={css.container}>
                <div className={css.habitDetail}>
                    <h3>workout</h3>
                </div>
                <div className={css.weeklyDetail}>
                    <div style={{ backgroundColor: "green" }}>sun</div>
                    <div style={{ backgroundColor: "red" }}>mon</div>
                    <div style={{ backgroundColor: "green" }}>tue</div>
                    <div style={{ backgroundColor: "grey" }}>wed</div>
                    <div style={{ backgroundColor: "grey" }}>thu</div>
                    <div style={{ backgroundColor: "green" }}>fri</div>
                    <div style={{ backgroundColor: "red" }}>sat</div>
                </div>
            </div>
            <div className={css.container}>
                <div className={css.habitDetail}>
                    <h3>workout</h3>
                </div>
                <div className={css.weeklyDetail}>
                    <div style={{ backgroundColor: "green" }}>sun</div>
                    <div style={{ backgroundColor: "red" }}>mon</div>
                    <div style={{ backgroundColor: "green" }}>tue</div>
                    <div style={{ backgroundColor: "grey" }}>wed</div>
                    <div style={{ backgroundColor: "grey" }}>thu</div>
                    <div style={{ backgroundColor: "green" }}>fri</div>
                    <div style={{ backgroundColor: "red" }}>sat</div>
                </div>
            </div>
        </div>
    </>)
}

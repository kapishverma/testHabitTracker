import React, { useState } from 'react'
import css from "../css/NavBar.module.css"
import { Outlet, useNavigate } from "react-router-dom"
import { tostify } from '../Tools/tostify';
import { useDispatch } from 'react-redux';
import { logOut } from '../Redux/Reducers/UserReducer';

export default function NavBar() {

    const [menu, setMenu] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDailyView = () => {
        tostify("success", "Daily View page")
        navigate('/')
    }
    const handleWeeklyView = () => {
        tostify("success", "Weekly View page");
        navigate('/weeklyView')
    }
    const handleLogOut = async () => {

        await dispatch(logOut())

        navigate("/signIn")
    }
    const handleAddBtn = () => {
        navigate("/addHabit")
    }
    return (<>
        <div className={css.container}>
            <div onMouseEnter={() => setMenu(true)}
                onMouseLeave={() => setMenu(false)}
                style={{ height: menu ? "130px" : "40px" }}
                className={css.menu}>
                <div ><i className="bi bi-list"></i></div>
                {menu && <div className={css.menuOn}>
                    <div onClick={() => handleDailyView()}><i className="bi bi-calendar-day"></i> Daily</div>
                    <div onClick={() => handleWeeklyView()}><i className="bi bi-calendar3"></i> Weekly</div>
                    <div onClick={() => handleLogOut()}><i className="bi bi-box-arrow-left"></i> LogOut</div>
                </div>}
            </div>
            <div className={css.pageName}>
                <h3>Daily View</h3>
            </div>
            <div onClick={() => handleAddBtn()} className={css.add}>
                <i className="bi bi-plus-lg"></i>
            </div>
        </div>
        <Outlet />
    </>)
}

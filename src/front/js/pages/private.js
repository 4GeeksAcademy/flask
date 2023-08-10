
import React, {useState, useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Private =() =>{

    const {store, actions} = useContext(Context)
    console.log(store.user)
    return (
        <div>
        {store.user.email ? (<div><h1> Welcome to private page </h1>
        <button onClick={()=>actions.logout()}>Logout</button></div>) : (<div><h1> You are not logged in</h1>
        <Link to="/login">
            <button>Login</button>
        </Link>
        </div>)

         
    }
    </div>
    )
}
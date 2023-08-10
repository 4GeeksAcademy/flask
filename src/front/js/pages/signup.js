import React, {useState, useContext} from "react";
import { Context } from "../store/appContext";



export const Signup = () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const {store, actions} = useContext(Context)
  return (
    <form>
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input onChange={(e)=>setPassword(e.target.value)}type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <div className="form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button onClick={(e)=>{
    e.preventDefault()
    actions.signup(email,password)}} type="submit" className="btn btn-primary">Submit</button>
</form>
  )
}
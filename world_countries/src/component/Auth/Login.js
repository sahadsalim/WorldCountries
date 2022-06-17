import React, { useEffect, useState } from 'react';
import {  login } from '../../redux/actions';
import {
  Link,
  useNavigate
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

const Login=()=>{
  const pattern = /^[a-zA-Z0-9]{15,}$/;

  let navigate  = useNavigate ();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  localStorage.setItem('logged',false);
  useEffect(() => {
    if (auth.isLogged) {
      localStorage.setItem('logged',true);
      navigate("/home");
    }else{
      localStorage.setItem('logged',false);
    }

  }, [auth,navigate])
  const [data, setData] = useState( {
    userName: '',
    password: '',
    error:'',
    submitted:false
  });
  const userNameChange=(event)=> {
   setData({...data,
     userName: event.target.value
   });
 };
const passwordChange=(event)=>{
  setData({...data,password:event.target.value});
}
const  handleSubmit=(event)=> {
  event.preventDefault();
  if(pattern.test(data?.password) ){
    dispatch(
      login(data),
    );
  }else{
    setData({...data,error:'15 Letters and digits',submitted:true});
  }
}

return(

 <div className="w-full max-w-xs mar">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Username
      </label>
      <input  value={data.userName} type="email" onChange={userNameChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username"  placeholder="Email"/>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input  value={data.password} onChange={passwordChange} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
      {data.submitted && data.error ? <p className="text-red-500 text-xs italic">Invalid credentials.</p>:null}
    </div>
    <div className="flex items-center justify-between">
      <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Login
      </button>
      <Link to="/SignUp" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" >
        SignUp
      </Link>
    </div>
  </form>
  </div>
  )
}
export default Login;

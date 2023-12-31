import React,{useState} from 'react'
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import  "../../style/AuthStyles.css"
import { useAuth } from '../../context/auth'


const Login = () => {



    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [auth,setAuth]=useAuth()
    const navigate=useNavigate()
    const location=useLocation()


    // form function
    const handleSubmit=async(e)=>{
        e.preventDefault();

        try {
            
            const res=await axios.post(`/api/v1/auth/login`,{email,password});
            console.log(res);
            if(res && res.data.success){
           
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token
                })
                localStorage.setItem("auth",JSON.stringify(res.data));
                navigate(location.state|| '/')
              }else{

                toast.error(res.data.message);

              }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    }
  return (
    <Layout title='Register Page'>
            <div className="form-container">
            <h1>Login Page</h1>
                <form onSubmit={handleSubmit}>
             
                

                    <div className="mb-3">
                        <input type="email" onChange={(e)=>setEmail(e.target.value)}  value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Your Email' required />
                    </div>
                    <div className="mb-3">
                        <input type="password" onChange={(e)=>setPassword(e.target.value)}  value={password} className="form-control" id="exampleInputPassword1"  placeholder=' Enter Your Password' required/>
                    </div>
                    <div className="mb-3">
                    <button type="button" className="btn btn-primary" onClick={()=>{
                        navigate('/forgot-password')
                    }}>Forgot Password</button>

                    </div>
                    
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>


            </div>

        </Layout>
  )
}

export default Login
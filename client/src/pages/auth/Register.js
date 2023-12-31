import React,{useState} from 'react'
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import  "../../style/AuthStyles.css";

const Register = () => {
    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [answer, setAnswer] = useState('')
    const navigate=useNavigate();


    // form function
    const handleSubmit=async(e)=>{
        e.preventDefault();
        // toast.success('Registered successfully')

        try {
            
            const res=await axios.post(`/api/v1/auth/register`,{name,email,password,phone,address,answer});
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                navigate('/login')
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
            <h1>Register Page</h1>
                <form onSubmit={handleSubmit}>
             
                <div className="mb-3">
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" id="exampleInputname1" aria-describedby="nameHelp" placeholder=' Enter Your Name' required/>
                    </div>

                    <div className="mb-3">
                        <input type="email" onChange={(e)=>setEmail(e.target.value)}  value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Your Email' required />
                    </div>
                    <div className="mb-3">
                        <input type="password" onChange={(e)=>setPassword(e.target.value)}  value={password} className="form-control" id="exampleInputPassword1"  placeholder=' Enter Your Password' required/>
                    </div>
                    <div className="mb-3">
                        <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)}  className="form-control" id="exampleInputPassword1"  placeholder='Enter Your Phone' required/>
                    </div>
                    <div className="mb-3">
                        <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)}  className="form-control" id="exampleInputPassword1" placeholder='Enter Your Address' required/>
                    </div>

                    <div className="mb-3">
                        <input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)}  className="form-control" id="exampleInputPassword1" placeholder='Enter Your Favorite sports' required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>


            </div>

        </Layout>
    )
}

export default Register
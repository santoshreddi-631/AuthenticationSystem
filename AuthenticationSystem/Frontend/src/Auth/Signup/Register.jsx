import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../Utils/axiosClient';
import "./Register.css"
function Register() {
    const [userDetails , setUserDetails] = useState({
        name:"",
        email:"",
        password:""
    })

    function updateFieldData(e){
        setUserDetails(prev =>({
            ...prev , 
            [e.target.name]:e.target.value
        }))
    }
    async function userSubmitDetails(){
        let responce = await axiosClient.post('/register',userDetails);
        console.log(responce);
        if(responce.status === 200){
            alert("User Registered Successfully");
        }else{
            alert("Something went wrong Please try again");
        }

    }
    return (
        <div className="container-fluid signup-page">
            <img src="/man.jpg" alt="hero" className="hero-image" />
            <div className="signup-card">
                <Form>
                    <h1 style={{textAlign:'center'}}>Sign Up</h1>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Enter your Name" className="form-field" value={userDetails.name} name="name" onChange={updateFieldData}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="email" placeholder="Enter your Email" className="form-field" value={userDetails.email}  name="email" onChange={updateFieldData}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="password" placeholder="Enter your Password" className="form-field" value={userDetails.password} name="password" onChange={updateFieldData}/>
                    </Form.Group>
                    <Button variant="primary" type="button" className="w-100" onClick={()=>userSubmitDetails()}>
                        SignUp
                    </Button>
                </Form>
                <p>
                    Already Registered? <Link to="/login"><span style={{textDecoration:'underline'}}>Signin</span></Link>
                </p>
            </div>
        </div>
    );
}
export default Register;
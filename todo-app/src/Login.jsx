import { useEffect , useState } from "react"
import { Button, Card, TextField, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";



function Login()
{
    const navigate = useNavigate();
    const [username ,setUsername] = useState("");
    const [password , setPassword] = useState("");
    function sign(){
        console.log("in sign function ")
        useEffect(()=>{
            
        },[])
        
    }
    return (
        <div style={{display:"flex" , justifyContent:"center" , padding:"30"}}>
            {/* {username}{password} */}
            <center style={{  justifyContent:"center" , width:"40%" , marginTop:100}}>
                <Card style={{padding:"20"}}>
                    <TextField id="standard-basic" label="Username" variant="standard" onChange={(e)=>{
                        setUsername(e.target.value)
                    }} /><br /><br />

                    <TextField id="standard-basic" label="Password" variant="standard" style={{padding:"20"}}
                    onChange={(e)=>{

                        setPassword(e.target.value)
                    }}/><br /><br />

                    <Button variant="contained" style={{marginBottom:10}}
                    onClick={()=>{
                        console.log("bhenchod clicked here")
                        
                        fetch("http://localhost:3000/login",{
                            method:"POST",
                            body:JSON.stringify({
                                username,
                                password                    
                            }),
                            headers:{
                                "Content-type":"application/json"
                            }
                        }).then((respond)=>{
                            if(respond.status==403)
                            {
                                alert("wrong credentials. please enter again");
                                window.location.reload();
                                
                            }
                            else{
                                respond.json().then((data)=>{
                                
                                    console.log(data.token);
                                    
                                    localStorage.setItem("token", data.token);
                                    
                                })
                            }
                        })
                        navigate("/")
                    }}>Login</Button>
                </Card>
            </center>
        </div>
    )
}

export default Login;
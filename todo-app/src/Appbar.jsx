import { useEffect , useState } from "react"
import { useNavigate } from 'react-router-dom';
import { Button, Card, TextField, Typography } from '@mui/material';

function Appbar(){
   
    var navigate = useNavigate();
    const [username , setUsername] = useState(null);
    const [password , setPassword] = useState(null);
    useEffect(()=>{
        fetch("http://localhost:3000/me",{
            method:"GET",
            headers:{
                "Content-type": "application/json",
                "token" : localStorage.getItem("token")
            }


        }).then((response)=>{
            response.json().then((data)=>{
                if(data.username)
                {
                    setUsername(data.username) ;
                    setPassword(data.password);
                }
                else{
                    setUsername(null);
                    setPassword(null);
                }
            })
        })
    },[])
    console.log(username);
    console.log(password);
    if(!username)//username is null
    {
        return (
            <div style={{display:"flex" , justifyContent:"center"}}>
                <Typography variant="h6" component="h6" style={{padding:10}}>
                    Todo App
                </Typography>  
                <Button variant="contained" style={{padding:10}}
                onClick={()=>{
                    navigate("/singup");
                }}>Singup</Button>
                <Button variant="contained" style={{padding:10}}
                onClick={()=>{
                    navigate("/login");
                }}>Login</Button>
                {username}{password}
            </div>
        )
    }else{
        navigate("/todos");
        return(
            <div style={{display:"flex" , justifyContent:"center"}}>
                <Typography variant="h6" component="h6" style={{padding:10}}>
                    Todo App
                </Typography>  
                <Button variant="contained" 
                onClick={()=>{
                    
                    localStorage.setItem("token",null);
                    navigate("/");
                    console.log("hi")
                   
                }}>Logout</Button>
                {username}{password}
            </div>
        )
        
    }
    
}
export default Appbar;
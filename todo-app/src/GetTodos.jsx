import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, TextField, Typography } from '@mui/material';
function GetTodos(){
    const navigate = useNavigate();
    const [todos , setTodos] = useState([]);
    const [title , setTitle] = useState("");
    const [description , setDescription] = useState("");
    useEffect(()=>{
        fetch("http://localhost:3000/todos",{
            method:"GET",
            headers:{
                "Content-type" : "application/json",
                "token" : localStorage.getItem("token")
            }
        } ).then((response)=>{
            if(response.status == 404)
            {
                //wrong token was sent
                //the person is logged out
                //he must return to singup page
                navigate("/");
            }
            else if (response.status==403)
            {
                console.log("response status 403 in /todos")
                // setTodos([]);
            }
            else if(response.status==200)
            {
                console.log("response status 200 in todos")
                //token is correct 
                //we set the todos array.
                response.json().then((data)=>{
                    console.log(data.newTodo);
                    setTodos(data.newTodo);
                }) 
            }
        })
    },[navigate]);
    return (
        <table>
            <tr>
                <td>
                    <div>
                        {todos.map((val)=>{
                        return <div style={{display:"flex"}}> 
                            <h3>{val.title}</h3>
                            <h5 style={{padding:20}}>{val.description}</h5>
                            </div>
                        })}
                        {/* {title}{description}<br/> */}
                    </div>
                </td>
                <td>
                    <div>
                    <TextField id="standard-basic" label="Title" variant="standard" onChange={(e)=>{
                        setTitle(e.target.value)
                    }} /><br /><br />
                    <TextField id="standard-basic" label="Description" variant="standard" onChange={(e)=>{
                        setDescription(e.target.value)
                    }} /><br /><br />
                    <Button variant="contained" onClick={()=>{
                        fetch("http://localhost:3000/addTodo" , {
                            method : "POST",
                            headers:{
                                "Content-type" : "application/json",
                                "token" : localStorage.getItem("token")
                            },
                            body:JSON.stringify({
                                title:title,
                                description:description
                            })
                        }).then((response)=>{
                            response.json().then((data)=>{
                                console.log("data received from backend")
                                console.log(data);
                                window.location.reload();
                            })
                        })


                    }}>Add Todo</Button>
                    </div>
                </td>
            </tr>
        </table>
    )
}
export default GetTodos;
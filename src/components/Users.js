import React, { useEffect, useState } from 'react'


import { v4 as uuidv4 } from 'uuid';
uuidv4();

const Users = () => {
    const [content,setContent] = useState(<Userlist showForm={showForm}/>)


    function showList(){
        setContent(<Userlist showForm={showForm}/>)
    }

    function showForm(user){
        setContent(<Userform user={user} showList={showList}/>)
    }
  return (
    <div className='container my-5'>
      {content}
    </div>
  )
}

export default Users;


function Userlist(props){
    const[users,setUsers] = useState([])


    function fetchUsers(){
        fetch("http://localhost:3004/users") // api for the get request
    .then(response =>{
        if(!response.ok){
            throw new Error("Unexpected Error Occur")
        }
        
        return response.json()
    })

    .then((data)=> {
       console.log(data)
        setUsers(data)
    })
    .catch((error)=> console.log("Error", error))

    }

      useEffect(()=> {
        fetchUsers();
    },[])


    function deleteUser(id){
        fetch('http://localhost:3004/users/' + id,{
            method: "DELETE"
        }) 

        .then((response)=>(response.json()))
        .then((data)=>fetchUsers())

    }
    
return <>
  <h2 className='text-center mb-3'>List of Userlist</h2>
  <button onClick={()=> {props.showForm({})}} className='btn btn-primary me-3' type='button'>Create</button>
  <button onClick={()=> fetchUsers()} className='btn btn-outline-primary me-3' type='button'>Refresh</button>
  <table className='table'>
    <thead>
        <tr>
           <th>ID</th>
           <th>username</th>
           <th>email</th>
           <th>role</th>
        </tr>
    </thead>
    <tbody>
        {
            users.map((user,index)=> {
                return (
                    <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td style={{width:'10px',whiteSpace:"nowrap"}}>
                            <button  onClick={()=>props.showForm(user)}  type='button' className='btn btn-primary btn-sm me-2'>Edit</button>
                            <button onClick={()=> deleteUser(user.id)}type='button' className='btn btn-danger btn-sm'>Delete</button>

                        </td>
                    </tr>
                )
            })
        }
    </tbody>

  </table>
</>
}



function Userform(props){
    const[errorMessage,setErrorMessage] = useState("")


    function handleSubmit(event){
        event.preventDefault();
        //read form data
        const formData = new FormData(event.target)

        // convert form data into object
        const user =Object.fromEntries(formData.entries())

        // Validation for

        if( !user.username || !user.email || !user.role){
            console.log("Please fill all the providing deatils")
            setErrorMessage(
                <div className="alert alert-warning" role="alert">
                   Please fill all the providing deatils
                </div>
            )
            return;
        }



    
        // create new product
        user.createdAt = new Date().toISOString().slice(0, 10)
        fetch('http://localhost:3004/users', {
            method:'POST',
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
        })

        .then((response)=>{
            if(!response.ok){
                throw new Error("Unexpected Error Occur")
            }
            
            return response.json()})
        .then((data)=>props.showList())
        .catch((error)=> console.log("Error", error))
}

    
    return <>
      <h2 className='text-center mb-3'>{props.user.id ? "Edit  Product" :"CreateNew Product"}</h2>
     
      <div className='row'>
        <div className='col-lg-6 mx-auto'>
            {errorMessage}
            <form onSubmit={(event)=>handleSubmit(event)}>
               { props.user.id && <div className='row mb-3'>
                    <label className='col-sm-4 col-form-label'>ID</label>
                    <div className='col-sm-8'>
                        <input  readOnly className='form-control-plaintext' 
                          name="username"
                          defaultValue={props.user.id}  />
                    </div>
                </div> }
                <div className='row mb-3'>
                    <label className='col-sm-4 col-form-label'>Name</label>
                    <div className='col-sm-8'>
                        <input className='form-control' 
                          name="username"
                          defaultValue={props.user.username}  />
                    </div>
                </div>
                <div className='row mb-3'>
                    <label className='col-sm-4 col-form-label'>Email</label>
                    <div className='col-sm-8'>
                        <input className='form-control' 
                          name="email"
                          defaultValue={props.user.email} />
                    </div>
                </div>
                <div className='row mb-3'>
                    <label className='col-sm-4 col-form-label'>Role</label>
                    <div className='col-sm-8'>
                        <input className='form-control' 
                          name="role"
                          defaultValue={props.user.role} />
                    </div>
                </div>
                <div className='row'>
                    <div className='offset-sm-4 col-sm-4 d-grid'>
                        <button type='submit' className='btn btn-primary btn-sm sm-3'>Save</button>
                    </div>
                    <div className='col-sm-4 d-grid'>
                    <button onClick={()=> {props.showList()}
                
                } className='btn btn-secondary me-3' type='button'>Cancel</button>
                    </div>

                </div>
            </form>

        </div>

      </div>
    </>
    }
    

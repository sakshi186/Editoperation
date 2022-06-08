import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { NavLink, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
const config = require('../config.json')
//rfc
export default function GetStudent() {
    const[student,setStudent]=useState({
      data:[]
    })
    //1.states hook variables
    let params = useParams()


    useEffect(()=>{
      console.log("page Loaded successfully");
      getStudents();
    },[]);//empty array


    //2.functions
    let getStudents = (pageno=1)=>{
      console.log("hello");
      //always wrap up the api calling code in try and catch block
      try {
        //api calling
        //there are 2 ways to call the api
        //1.fetch api 2.axios
        fetch(`${config.base_url}/api/friends`)
        .then((data)=>{
          //let's make the data readable
          return data.json();
         }).then((data)=>{
          console.log(data);
      
          //now set the data in hook variable
          setStudent(data);
          
        }).catch((err)=>{
          console.log(err);
        });
  
      } catch (error) {
        console.log(error)
      }
       }
    //3.return statements
    return(
        <>
              <Layout>
                  <h1>GetStudent {params.student_id}{params.id}</h1>
              </Layout>   
      <>
          <div className='d-flex justify-content-center'>
          <h1>Edit operation</h1>
          <Button onClick={(e)=>{ getStudents ()}}>Get Friends</Button>
          </div>
          {
            student.data.length > 0 &&
          <>
             <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Friend Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
               {
                 student.data.map(function(currentValue, index, arr){
                   console.log(arr[index].id)
                   console.log(arr[index].attributes.name)
                   return (
                       <tr key={index}>
                         <td>{arr[index].id}</td>
                         <td>{arr[index].attributes.name}</td>
                         <td>
                           <Button variant="primary" size="sm">View</Button>&nbsp;
                           <NavLink to={`/edit_student/${arr[index].id}`} variant="success" size="sm">Edit</NavLink>&nbsp;
                           <Button variant="danger" size="sm">Delete</Button>
                         </td>
                       </tr>
                   )
                 })
                }
               </tbody>
             </Table>
          </>
          }
      </>
        </>

    )
  
}

import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import { NavLink, useParams } from 'react-router-dom'
import swal from 'sweetalert'
import Layout from '../components/Layout'
const config = require('../config.json')
//rfc
export default function GetStudent() {
      //1.states hook variables
    const[student,setStudent]=useState({
      data:[]
    })
    const[show,setShow] = useState(false);

    const [name,setName] = useState('')

    const[id,setId] =useState('')

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
    
       let submitStudent=(e)=>{
        console.log("submitted")
        e.preventDefault();
        //setIsLoading(true);
        //setIsSubmitted('disabled')
        let data={
           "data": {
              "name": name
          }
        };
    
        fetch(`${config.base_url}/api/friends/${id}`,{
          method:'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
          .then((data)=>{
            //let's make the data readable
            return data.json();
          }).then((data)=>{
            console.log(data);
            //setIsLoading(false);
            //setIsSubmitted('disabled')
            swal("Good job!", "Friend updated successfully", "success");
            //now set the data in hook variable
            //setStudent(data);
            
          }).catch((err)=>{
            console.log(err);
          });
      }

    let handleShow=(e)=>{
      //alert("ok")
      setShow(true);
      let n = (e.target.closest('tr').querySelector('td:nth-child(2)').innerHTML);
      let id = (e.target.closest('tr').querySelector('td:nth-child(1)').innerHTML);
      setId(id);
      //console.log(e.target.closest('tr').querySelector('td:nth-child(2)').innerHTML);
      setName(n)
    }   

    let handleClose=()=>{
      setShow(false)
    }
    //3.return statements
    return(
        <>
              <Layout>
                <Modal size="lg"show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Student</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <form>
                        <div>
                        <div className="mb-3">
                          <label htmlFor="friendname" className="form-label">Friend Name</label>
                          <input type="text" name="friend_name" value={ name }  className="form-control" id="friendname" onChange={(e)=>{setName(e.target.value)}}/>
                          <div id="emailHelp" className="form-text"></div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                      </div>
                   </form>   

                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={submitStudent}>
                        Save Changes
                      </Button>
                  </Modal.Footer>
                </Modal>

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
                           <Button variant="primary" onClick={(e)=>{handleShow(e)}}>
                                Edit with modal
                           </Button>
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

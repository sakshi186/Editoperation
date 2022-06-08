import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import swal from 'sweetalert';
import Layout from '../components/Layout';
const config= require("../config.json")


//rfc
export default function EditStudent() {

  //1. states/hook variable

  var student_id;
  const[student,setStudent]=useState({
    data:{
      attributes:{
        name:""
      }
    }
  });
  const [isLoading,setIsLoading]=useState(false);
  const [isSubmitted,setIsSubmitted]=useState('');

  let params = useParams();

  useEffect(()=>{
    console.log("page loaded successfully")
    getStudent(params.stu_id)
  },[]);
  //2.function defination
  let getStudent = (student_id=1)=>{
    console.log("hello");
    //always wrap up the api calling code in try and catch block
    try {
      //api calling
      //there are 2 ways to call the api
      //1.fetch api 2.axios
      fetch(`${config.base_url}/api/friends/`+student_id  )
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

  let handleChange=(e)=>{
    console.log("hello",e.target.value);
    setStudent({
      ...student,
      data:{
        attributes:{
          name:e.target.value
        }
      }
    })
  }

  let submitStudent=(e)=>{
    console.log("submitted")
    e.preventDefault();
    setIsLoading(true);
    setIsSubmitted('disabled')
    let data={
       "data": {
          "name": student.data.attributes.name
      }
    };

    fetch(`${config.base_url}/api/friends/`+params.stu_id,{
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
        setIsLoading(false);
        setIsSubmitted('disabled')
        swal("Good job!", "Friend updated successfully", "success");
        //now set the data in hook variable
        //setStudent(data);
        
      }).catch((err)=>{
        console.log(err);
      });
  }

  //3.return statements
  return(
    <>
    <Layout>
        {
               isLoading  &&
               <div className='d-flex justify-content-center'>
                  <Spinner animation="grow" />
               </div>
         }
      <div>EditStudent {params.stu_id}</div>
          <form onSubmit={(e)=>{submitStudent(e)}}>
            <label>Enter your name:
              <input 
                type="text" 
                name="friend_name" 
                value={student.data.attributes.name}
                onChange={(e)=>{handleChange(e)}}
              />
            </label>
            <input type="submit" class={`btn btn-primary ${isSubmitted}`} />
          </form>
    </Layout>
    </>
  )
}

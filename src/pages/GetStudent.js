import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
//rfc
export default function GetStudent() {

    //1.states hook variables
    let params = useParams()



    //2.functions
    //3.return statements
  return (
    <Layout>
        <h1>GetStudent {params.student_id}{params.id}</h1>
    </Layout>   
  )
}

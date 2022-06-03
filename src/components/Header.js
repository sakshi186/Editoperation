import React from 'react'
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'


export default function Header() {
  return (
    <div>Header
            <Nav
                activeKey="/home"
                onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                >
                <Nav.Item>
                    <NavLink to ="/">Home</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to ="/login">Login</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to ="/register">Register</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to ="/get_students/1/200">GetStudent</NavLink>
                </Nav.Item>
            </Nav>
    </div>
  )
}

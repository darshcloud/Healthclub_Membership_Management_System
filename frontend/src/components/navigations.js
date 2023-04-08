import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect} from 'react';
export function Navigation() {
   const [isAuth, setIsAuth] = useState(false);
   const [type, setType] = useState('');
   useEffect(() => {
     if (localStorage.getItem('token') !== null) {
        setIsAuth(true); 
      }
    }, [isAuth]);

   useEffect(() => {
       let ut = localStorage.getItem("user_type")
       if (ut !== undefined) {
           setType(ut);
       }
   })
    

     return ( 
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Healthclub App</Navbar.Brand> 
          <Nav>
          <Nav.Link href="/">Contact</Nav.Link> </Nav>           
          <Nav className="me-auto">
              {
                  (() => {
                     if (isAuth) {
                        if (type === "Member") {
                            return <Nav.Link href="/memberhome">Home</Nav.Link>
                        } else if (type === "Admin") {
                            return <Nav.Link href="/adminhome/home">Home</Nav.Link>
                        }
                     } else {
                         return <Nav.Link href="/">Home</Nav.Link>
                     }
                  })()
              }
          </Nav>
          <Nav>
          {isAuth ? <Nav.Link href="/logout">Logout</Nav.Link> :  
                    <Nav.Link href="/login">Login</Nav.Link>}
          </Nav>
          
        </Navbar>
       </div>
     );
}
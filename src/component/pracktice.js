/*import React, { useState } from 'react'
import { Container, Row, Alert, Form, Button, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../FirebaseConfig'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Registration = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cfpassword, setCfpassword] = useState('')
    const [loding, setLoding]= useState(false)

    const [errorUser, setErrorUser] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorCfpassword, setErrorCfpassword] = useState('')
    const [matchPassword, setMatchPassword] = useState('')

    const handeluser = (user)=>{
        setUser(user.target.value)
    }
    const handelemail = (email)=>{
        setEmail(email.target.value)
    }
    const handelpassword = (pass)=>{
        setPassword(pass.target.value) 
    }
    const handelcfpassword = (cfpass)=>{
        setCfpassword(cfpass.target.value)
    }

    const handleSubmit = (submit)=>{
        submit.preventDefault()
        if(user===''){
            setErrorUser(' Enter your names') 
        }
        else if(email === ''){
            setErrorEmail(' Enter your email')  
        }
        else if(password === ''){
            setErrorPassword(' Enter a password')
        }
        else if(cfpassword === ''){
            setErrorCfpassword(' confirm your password')
        }
        else if(password !== cfpassword){
            setMatchPassword('Those passwords didn’t match. Try again.')
        }else{
            setLoding(true)
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log(user);
                setLoding(false)
                navigate("/login",{state:'account successfull'});
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
            });
        }
    }
  return (
    <>
      <Container>
        <Row>
            <Alert  variant='info' className='text-center'>
            <h2>Registration</h2>
            </Alert>
        </Row>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>User Name</Form.Label>
                <Form.Control onChange={handeluser} type="text" placeholder="Enter your full name" />
                {
                  errorUser ?
                  <Form.Text className="text-muted messeges">
                   <span>!</span>{errorUser}
                  </Form.Text> 
                  :'' 
                }
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={handelemail} type="email" placeholder="Enter email" />
                {
                  errorEmail ?
                  <Form.Text className="text-muted messeges">
                   <span>!</span>{errorEmail}
                  </Form.Text> 
                  :'' 
                }
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={handelpassword}  type="password" placeholder="Password" />
                {
                  errorPassword ?
                  <Form.Text className="text-muted messeges">
                   <span>!</span>{errorPassword}
                  </Form.Text> 
                  :'' 
                }
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control onChange={handelcfpassword} type="password" placeholder="Confirm Password" />
                {
                  errorCfpassword ?
                  <Form.Text className="text-muted messeges">
                   <span>!</span>{errorCfpassword}
                  </Form.Text> 
                  :'' 
                }
                {
                  matchPassword ?
                  <Form.Text className="text-muted messeges">
                   <span>!</span>{matchPassword}
                  </Form.Text> 
                  :'' 
                }
            </Form.Group>
            <Button onClick={handleSubmit} variant="primary" type="submit">
                {
                    loding ?
                    <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    :'Submit'
                }
               
            </Button>
            <div className='text-center'>
                <Form.Text id="passwordHelpBlock" muted>
                    Alredy have an account? <Link to="/login">login</Link>
                </Form.Text>
            </div>
        </Form>
      </Container>
    </>
  )
}

export default Registration*/ 

/* import React, { useState } from 'react'
import { Container, Row, Alert, Form, Button, Spinner } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../FirebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
   
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loding, setLoding]= useState(false)

    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [message, setMessage]=useState(true)

    const handelemail = (email)=>{
        setEmail(email.target.value)
    }
    const handelpassword = (pass)=>{
        setPassword(pass.target.value) 
    }
    const handleSubmit = (submit)=>{
        submit.preventDefault()
        if(email === ''){
            setErrorEmail(' Enter your email')  
        }
        else if(password === ''){
            setErrorPassword(' Enter a password')
        }else{
            setLoding(true)
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                navigate("/", {state:'Welcome to home page'});
                setLoding(false)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
            });
        }
    }
    const notify = () => toast(state);
    if(message){
        if(state){
            notify()
            setMessage(false)
        }
    }

  return (
    <> 
       <Container>
            <ToastContainer />
            <Row>
                <Alert  variant='info' className='text-center'>
                <h2>Registration</h2>
                </Alert>
            </Row>
            <Form>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={handelemail} type="email" placeholder="Enter email" />
                    {
                    errorEmail ?
                    <Form.Text className="text-muted messeges">
                    <span>!</span>{errorEmail}
                    </Form.Text> 
                    :'' 
                    }
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handelpassword}  type="password" placeholder="Password" />
                    {
                    errorPassword ?
                    <Form.Text className="text-muted messeges">
                    <span>!</span>{errorPassword}
                    </Form.Text> 
                    :'' 
                    }
                </Form.Group>
                <Button onClick={handleSubmit} variant="primary" type="submit">
                {
                    loding ?
                    <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    :'Submit'
                }
                </Button>
                <div className='text-center'>
                    <Form.Text id="passwordHelpBlock" muted>
                        Don't have an account? <Link to='/registration'> Creat Account</Link>
                    </Form.Text>
                </div>
            </Form>
      </Container>
    </>
  )
}

export default Login */


/*===================================================================================================================================
                                                            class-30
====================================================================================================================================*/

/* import React from 'react'
import Header from './component/Header';    
import Home from './component/Home';
import Registration from './component/Registration';
import Login from './component/Login';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";

const router = createBrowserRouter(
            createRoutesFromElements(
                <Route>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/home" element={<Home/>}/>
                  <Route path="/registration" element={<Registration/>}/>
                  <Route path="login" element={<Login/>}/>
                </Route>
            )
          )
function App() {
  return (
    <>
      <Header></Header>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
*/


/* import React, { useState } from 'react'
import { Container, Row, Alert, Form, Button, Spinner } from 'react-bootstrap'
import { Link,  useNavigate } from 'react-router-dom'
import '../FirebaseConfig'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
const Registration = () => {
    const navigate = useNavigate();
    const [username, setUser]= useState('')
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [cfpassword, setCfpassword]= useState('')
    const [loading, setLoading]=useState(false)

    const [errorUser, setErrorUser]=useState("")
    const [errorEmail, setErrorEmail]=useState("")
    const [errorPassword, setErrorPassword]=useState("")
    const [errorCfpassword, setErrorCfpassword]=useState("")
    const [matchPassword, setMatchPassword]=useState("")
    const [matchEmail, setMatchEmail]=useState("")

    const handelUser = (e)=>{
        setUser(e.target.value)
    }
    const handelEmail = (e)=>{
        setEmail(e.target.value) 
    }
    const handelPassword = (e)=>{
        setPassword(e.target.value)
    }
    const handelCfpassword = (e)=>{
        setCfpassword(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(username === ""){
            setErrorUser('! Enter your names')
          }
          else if(email === ""){
            setErrorEmail('! Enter your email')
          }
          else if(password === ""){
            setErrorPassword('! Enter a password')
          }
          else if(cfpassword === ""){
            setErrorCfpassword('! confirm your password')
          }
          else if(password !== cfpassword){
            setMatchPassword('! Those passwords didn’t match. Try again.')
          }else{
            setLoading(true)
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                updateProfile(auth.currentUser, {
                    displayName: username,
                     photoURL: "https://th.bing.com/th/id/R.e5e4f3b22566b2ccea9bc6680987f913?rik=uVBstjRkbiuw7g&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f12%2fBoy-Emoji-Avatar-PNG.png&ehk=SgpajcnA5u9WwI2Xh9dZlQv%2ftFhmblCXdw7OIQTR2dM%3d&risl=&pid=ImgRaw&r=0"
                  }).then(() => {
                    // Profile updated!
                    const db = getDatabase();
                    set(ref(db, 'users/'+ user.user.uid), {
                        username: username,
                        email:email,
                        userid:user.user.uid,
                        img:user.user.photoURL,
                        createdAt: Date()
                    }).then(()=>{
                        setUser("")
                        console.log(user)
                        setLoading(false)
                        sendEmailVerification(auth.currentUser)
                        .then(() => {
                            console.log('email verified')
                        });
                        navigate("/login",{state:"Account Created Successful"});
                    })
                   
                
                  }).catch((error) => {
                    // An error occurred
                    // ...
                    console.log(error)
                  });

                  

            })
            .catch((error) => { 
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorCode.includes('email')){
                    setMatchEmail('Email Alredy in used')
                    setLoading(false)
                }
                
            });
          }
    }
   
  return (
    <>
      <Container>
            <Row>
                <Alert  variant='success' className='text-center'>
                    <h2>Rgistration</h2>
                </Alert>
            </Row>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control onChange={handelUser} type="text" placeholder="Enter full name" value={username}/>
                    {
                    errorUser ?
                    <Form.Text className="text-muted">
                        {errorUser}
                    </Form.Text>
                    : ""
                    }
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={handelEmail} type="email" placeholder="Enter email" />
                    {
                    errorEmail ?
                    <Form.Text className="text-muted">
                        {errorEmail}
                    </Form.Text>
                    : ""
                    }
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handelPassword} type="password" placeholder="Password" />
                    {
                    errorPassword ?
                    <Form.Text className="text-muted">
                    {errorPassword}
                    </Form.Text>
                    : ""
                    }
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control onChange={handelCfpassword} type="password" placeholder="Confirm Password" />
                    {
                    errorCfpassword ?
                    <Form.Text className="text-muted">
                        {errorCfpassword}
                    </Form.Text>
                    : ""
                    }
                    {
                    matchPassword ?
                    <Form.Text className="text-muted">
                        {matchPassword}
                    </Form.Text>
                    : ""
                    }
                    {
                     matchEmail ?
                    <Form.Text className="text-muted">
                        {matchEmail}
                    </Form.Text>
                    : ""
                    }
                </Form.Group>
                
                {
                    loading ?
                    <Button  variant="primary" type="submit" className='px-5'>
                        <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Button>
                    : 
                    <Button onClick={handleSubmit} variant="primary" type="submit" className='px-5'>Submit</Button>
                }
               
                <div className='text-center'>
                    <Form.Text id="passwordHelpBlock" muted>
                        Alredy have an account? <Link to="/login">login</Link>
                    </Form.Text>
                </div>
            </Form>
        </Container>
    </>
  )
}

export default Registration
*/
/* import React, { useState } from 'react'
import { Container, Row, Alert, Form, Button, Spinner, Modal } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../FirebaseConfig'
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
  
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [wrongPassword, setWrongPassword] = useState('')
    const [resetemail, setResetemail]= useState('')
    const [loading, setLoading]=useState(false)
    const [message, setMessage]= useState(true)

    const [errorEmail, setErrorEmail]=useState("")
    const [errorPassword, setErrorPassword]=useState("")
    const [errorResetemail, setErrorResetemail]= useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handelEmail = (e)=>{
        setEmail(e.target.value) 
    }
    const handelPassword = (e)=>{
        setPassword(e.target.value)
    }
    const auth = getAuth();
    const handleSubmit = (e)=>{
        e.preventDefault()
         if(email === ""){
            setErrorEmail('! Enter your email')
          }
          else if(password === ""){
            setErrorPassword('! Enter a password')
          }else{
            setLoading(true)
            signInWithEmailAndPassword(auth, email, password)
            .then((user) => {     
                setLoading(false)
                console.log(user)
                navigate("/home", {state:'WelCome to home page'});
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorCode.includes('password')){
                    setWrongPassword('password not match')
                    setLoading(false)
                }
            });
          }
    }
    const notify = () => toast(state);
    const notify2 = () => toast('please Check your Email');
    if(message){
        if(state){
            notify()
            setMessage(false)
        }
    }

    const handleResetEmail = (e)=>{
        setResetemail(e.target.value)
    }

    const handlePasswordReset= ()=>{
        if(resetemail ===""){
            setErrorResetemail('Please give your email')
        }else{
              sendPasswordResetEmail(auth, resetemail)
                .then(() => {
                   setShow(false)
                   notify2()
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(error)
                });
        }
      
    }
  return (
    <>
      <Container>
        <ToastContainer />
            <Row>
                <Alert  variant='success' className='text-center'>
                    <h2>Login</h2>
                </Alert>
            </Row>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={handelEmail} type="email" placeholder="Enter email" />
                    {
                    errorEmail ?
                    <Form.Text className="text-muted">
                        {errorEmail}
                    </Form.Text>
                    : ""
                    }
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handelPassword} type="password" placeholder="Password" />
                    {
                    errorPassword ?
                    <Form.Text className="text-muted">
                    {errorPassword}
                    </Form.Text>
                    : ""
                    }
                    {
                    wrongPassword ?
                    <Form.Text className="text-muted">
                    {wrongPassword}
                    </Form.Text>
                    : ""
                    }
                   
                </Form.Group>
                
                    {
                        loading ?
                        <Button  variant="primary" type="submit" className='px-5'>
                        <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        </Button>
                        : <Button onClick={handleSubmit} variant="primary" type="submit" className='px-5'>Submit</Button>
                    }
                
                <div className='text-center'>
                    <Form.Text id="passwordHelpBlock" muted>
                        Don't have an account? <Link to='/registration'> Creat Account</Link>
                    </Form.Text>
                </div>
                <div className='text-center'>
                    <Form.Text id="passwordHelpBlock" muted>
                         <Button  onClick={handleShow}>Forgot your password ?</Button>
                    </Form.Text>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={handleResetEmail} type="email" placeholder="Enter email" />
                        {
                            errorResetemail ?
                            <h6>{errorResetemail}</h6>
                            :""
                        }
                    </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handlePasswordReset}>Reset</Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </Container>
    </>
  )
}

export default Login
*/
/* import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";
import {useLocation, useNavigate } from 'react-router-dom'
import Left from './Left';
import Middle from './Middle';
import Right from './Right';

const Home = () => {
  const [message, setMessage]= useState(true)
  const [varifyemail, setVaryfyemail]= useState(false)
  const [name, setName] = useState('')
  const [img, setImg] = useState('')
  const [id, setId] = useState('')
  const [time, setTime] = useState('')
  const navigate = useNavigate();
  const {state} = useLocation();
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setId(user.uid)
      setTime(user.metadata.creationTime)
      setName(user.displayName)
      setImg(user.photoURL)
      if(user.emailVerified){
        setVaryfyemail(true);
      }
      const uid = user.uid;
     
    } else {
      navigate('/login', {state:'plice login'})
      console.log('login kra nai')
    }
  });

    let handleLogout = ()=>{
      signOut(auth).then(() => {
        navigate("/login");
      }).catch((error) => {
       console.log(error)
      });
    }

    setTimeout(()=>{
      setMessage(false)
    },4000)
  return (
    <>
      {
         message ?
         <h2>{state}</h2>
         :''
        }
      
          <Container fluid>
            <Row>
              <Col lg={3}>
                <Left handleLogout ={handleLogout}
                      username = {name}
                      img = {img}
                      id= {id}
                ></Left>
              </Col>
              <Col lg={6}>
                <Middle></Middle>
              </Col>
              <Col lg={3}>
                <Right time={time}></Right>
              </Col>
            </Row>
          </Container>
     
    </>
  )
}

export default Home
*/
/* import React, { useEffect, useState } from 'react'
import { Button, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap'
import { getDatabase, ref, onValue} from "firebase/database";
const Left = (props) => {
  // console.log(props.img)
  const [usernam, setUsers] = useState([])
  let userArr = []
  useEffect(()=>{
    const db = getDatabase();
    const userRef = ref(db, 'users/');
    // let userArr = []
    onValue(userRef, (snapshot) => {
      snapshot.forEach(item=>{
        if(props.id !== item.key){
          userArr.push(item.val())
        }
      })
      setUsers(userArr)
    }); 
  },[props.id])

  return (
    <>
     <div className="left-site">

     <div className="images">
     <img className='w-25' src={props.img} alt="" />
     </div>
     <DropdownButton
            as={ButtonGroup}
            id={`dropdown-variants-warning`}
            variant= "warning"
            title= {props.username}
          >
            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
            <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
            <Dropdown.Item eventKey="3" active>
              Active Item
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4"> <Button onClick={props.handleLogout} variant="dark">Log out</Button></Dropdown.Item>
          </DropdownButton>
          <h3>Peoples</h3>
          {
            usernam.map(item=>(<p>{item.username}</p>))
          }
    
     </div>
    </>
  )
}

export default Left
*/
/*import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { getDatabase, ref, set, onValue } from "firebase/database";
const Middle = () => {
    const [message, setMessage]= useState('')
    const [usermessage, setUsermessage]= useState('')
    const handlemessage = (e)=>{
        setMessage(e.target.value)
    }
    const handleSend = (e)=>{
            const db = getDatabase();
            set(ref(db, 'message/' ), {
                message: message,
            });
    }

    useEffect(()=>{
        const db = getDatabase();
        const starCountRef = ref(db, 'message/');
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        setUsermessage(data)
        })
    },[])
  return (
    <>
    <div className="middle">
        <h5>{usermessage.message}</h5>
        
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control onChange={handlemessage} type="text"/>
          </Form.Group>
        </Form>
        <Button className='w-50' onClick={handleSend} variant="primary" size="lg" active>
            Primary button
          </Button>
          <Button className='w-50' variant="secondary" size="lg" active>
            Button
        </Button>
          
        </>
      )
    }
    
    export default Middle
     */
/* import React from 'react'
import moment from 'moment'
const Right = (props) => {
  return (
    <div>
      <h6>{moment(props.time).fromNow()}</h6>
    </div>
  )
}

export default Right
*/
/* */



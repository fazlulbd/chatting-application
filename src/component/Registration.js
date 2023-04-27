import {useState} from 'react'
import {Button,Container,Row,Alert,Form,Spinner} from 'react-bootstrap'
import {Link,useNavigate } from 'react-router-dom'
import '../FirebaseConfig'
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification,updateProfile  } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
const Registration = () => {
    let navigate = useNavigate();
    let [username,setUsername] = useState("")
    let [errusername,setErrusername] = useState("")
    let [email,setEmail] = useState("")
    let [erremail,setErremail] = useState("")
    let [password,setPassword] = useState("")
    let [loading,setLoading] = useState(false)
    
    let [errpassword,setErrpassword] = useState("")
    let [cpassword,setCpassword] = useState("")
    let [errcpassword,setErrcpassword] = useState("")
    let [match,setmatch] = useState("")
    let [sameemail,setSameemail] = useState("")
  
    let handleUsername = (e)=>{
      setUsername(e.target.value)
    }
    let handleEmail = (e)=>{
      setEmail(e.target.value)
    }
    let handlePassword = (e)=>{
      setPassword(e.target.value)
    }
    let handleCpassword = (e)=>{
      setCpassword(e.target.value)
    }
  
    let handleSubmit=(e)=>{
    e.preventDefault()
    if(username === ""){
      setErrusername("Give A Name")
    }else if(email === ""){
      setErremail("Give AN Email")
  
    }else if(password === ""){
      setPassword("Give A Password")
  
    }else if(cpassword === ""){
      setErrcpassword("Please Confirm Password")
  
    }else if(password !== cpassword){
      setmatch("Password Not Match")
  
    }else{
        setLoading(true)
        const auth = getAuth();
        console.log(auth.currentUser)
        createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          console.log(user)
          updateProfile(auth.currentUser, {
            displayName: username,
            photoURL: 'https://th.bing.com/th/id/R.e5e4f3b22566b2ccea9bc6680987f913?rik=uVBstjRkbiuw7g&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f12%2fBoy-Emoji-Avatar-PNG.png&ehk=SgpajcnA5u9WwI2Xh9dZlQv%2ftFhmblCXdw7OIQTR2dM%3d&risl=&pid=ImgRaw&r=0',
            
          }).then(() => {
            const db = getDatabase();
            set(ref(db, 'users/'+user.user.uid), {
              username: username,
              email: email,
              id:user.user.uid,
              img: user.user.photoURL
            }).then(()=>{
              setUsername("")
              setErrusername("")
              setEmail("")
              setErremail("")
              setPassword("")
              setErrpassword("")
              setCpassword("")
              setErrcpassword("")
              setmatch("")
              setLoading(false)
              sendEmailVerification(auth.currentUser)
              .then(() => {
                console.log("Mail chole gece")
              });
              navigate("/login",{state:"Account Created SuccessFul"});
            })
            
          }).catch((error) => {
            // An error occurred
            // ...
          });
         
        
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode.includes("email")){
              setSameemail("Email Already In Use")
              setLoading(false)
            }
        });
    }
  }
  return (
    <>
      <Container>
        <Row>
        <Alert className="text-center mt-5" variant="primary">
          <h1>Registration</h1>
        </Alert>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control onChange={handleUsername} type="text" placeholder="Write Your Full Name"  value={username}/>
                  {errusername
                  ?
                  <Form.Text className="text-muted err">
                    {errusername}
                  </Form.Text>
                  :
                  ""
                  }
                  
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control onChange={handleEmail} type="email" placeholder="Enter email" value={email}/>
                  {erremail
                  ?
                  <Form.Text className="text-muted err">
                    {erremail}
                  </Form.Text>
                  :
                  ""
                  }
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control onChange={handlePassword} type="password" placeholder="Password" value={password}/>
                  {errpassword
                  ?
                  <Form.Text className="text-muted err">
                    {errpassword}
                  </Form.Text>
                  :
                  ""
                  }
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Comfirm Password</Form.Label>
                  <Form.Control onChange={handleCpassword} type="password" placeholder="Password" value={cpassword}/>
                  {errcpassword
                  ?
                  <Form.Text className="text-muted err">
                    {errcpassword}
                  </Form.Text>
                  :
                  ""
                  }
                  {match
                  ?
                  <Form.Text className="text-muted err">
                    {match}
                  </Form.Text>
                  :
                  ""
                  }
                  {sameemail
                  ?
                  <Form.Text className="text-muted err">
                    {sameemail}
                  </Form.Text>
                  :
                  ""
                  }
                </Form.Group>
                {loading
                    
                        ?
                      <Button className="w-100" variant="primary" type="submit">
                        <Spinner animation="border" role="status">
                         <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </Button>
                        :
                        <Button onClick={handleSubmit} className="w-100" variant="primary" type="submit">
                          Submit
                        </Button>
                        
                    }
                  
                
                <div  className='text-center mt-3'>
                <Form.Text id="passwordHelpBlock" muted>
                    Already Have An Acoount? <Link to="/login">Login</Link>
                </Form.Text>
                </div>
            </Form>
            
        </Row>
      </Container>
    </>
  )
}

export default Registration
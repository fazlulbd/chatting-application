import {useState} from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";
import {Button,Alert,Container,Row,Col} from 'react-bootstrap'
import Left from './Left';
import Right from './Right';
import 'react-toastify/dist/ReactToastify.css';
import Middle from './Middle';
const Home = () => {
    let navigate = useNavigate();
    const {state} = useLocation();
    const [msg,setMsg] = useState(true)
    const [name,setName] = useState("")
    const [img,setImg] = useState("")
    const [id,setId] = useState("")
    const [varifyemail,setVarifyemail] = useState(false)
    const [time,setTime] = useState("")

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setId(user.uid)
            setTime(user.metadata.creationTime)
            setName(user.displayName)
            setImg(user.photoURL)
          if(user.emailVerified){
            setVarifyemail(true)
          }
        } else {
          navigate("/login",{state: "Please Login For Continue"})
        }
    })
    
    

    let handleLogOut = ()=>{
        
        signOut(auth).then(() => {
            navigate("/login")
        }).catch((error) => {
            console.log(error)
        });
    }

    setTimeout(()=>{
        setMsg(false)
    },2000)
  return (
    <>
            {/* {msg
                ?
                <Alert variant="primary">
                 <h1>{state}</h1>
                </Alert>
                :
                ""
            } */}

         
                    <Row>
                        <Col lg={3}>
                            <Left username={name} img={img} id={id}/>
                        </Col>
                        <Col lg={6}>
                            <Middle/>
                        </Col>
                        <Col lg={3}>

                            <Right createtime={time}/>
                        </Col>
                    </Row>
             
        
    </>
  )
}

export default Home
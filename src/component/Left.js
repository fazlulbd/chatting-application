import React, { useEffect, useState } from 'react'
import { DropdownButton,Dropdown,ButtonGroup,Button,ListGroupButton,Modal,Form,ProgressBar,ListGroup } from 'react-bootstrap'
import { getAuth, signOut } from "firebase/auth";
import {useLocation,useNavigate} from 'react-router-dom'
import { getDatabase, ref, onValue,set} from "firebase/database";
import { getStorage, ref as refer, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useDispatch } from 'react-redux';
const Left = (props) => {
  const dispatch = useDispatch()
  let [users,setUsers] = useState([])
  let [activeuser,setActiveuser] = useState("")
  let [fileforupload,setFileforupload] = useState("")
    let [progress2,setProgress2] = useState(0)
    let [bar,setBar] = useState(false)
    const [show, setShow] = useState(false);
    const [profile, setProfile] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const auth = getAuth();
    let navigate = useNavigate();
    let handleLogOut = ()=>{
        
        signOut(auth).then(() => {
            navigate("/login")
        }).catch((error) => {
            console.log(error)
        });
    }

    let userArr = []

    useEffect(()=>{
      const db = getDatabase();
      const userRef = ref(db, 'users/');
      onValue(userRef, (snapshot) => {
        snapshot.forEach(item=>{
          if(props.id !== item.key){

            userArr.push(item.val())
          }else{
            setProfile(item.val().img)
          }
        })
        setUsers(userArr)
 
      });
    },[props.id])

    let handleActive = (id)=>{
      setActiveuser(id)
      dispatch({type:"ACTIVE_USER",payload:id})
      
    }

    let handleImageSelect = (e)=>{
      setFileforupload(e.target.files[0])
    }

    let handleFileUpload = () => {
      setProgress2(2)
      const storage = getStorage();
      const storageRef = refer(storage, `userprofile/${auth.currentUser.uid}/${fileforupload.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileforupload);
   
      uploadTask.on('state_changed', 
      
          (snapshot) => {
              setBar(true)
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress2(progress)
              console.log('Upload is ' + progress + '% done');
              if(progress == 100){
                  setFileforupload("")
                  setBar(false)
                  setShow(false)
              }
              
          }, 
(error) => {
  console.log(error)
}, 
() => {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    console.log('File available at', downloadURL);
    const db = getDatabase();
        set(ref(db, 'users/'+auth.currentUser.uid), {
            username: props.username,
            id: props.id,
            img: downloadURL
        });
  });
}
);
  }


  return (
    <div className='left'>
      {/* <img className='w-25' src={profile}/> */}
      <br/>
        <DropdownButton
        as={ButtonGroup}
        id={`dropdown-variants-warning`}
        variant="dark"
        title={props.username}
      >
        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
        <Dropdown.Item onClick={handleShow} eventKey="2">Change Pic</Dropdown.Item>
        <Dropdown.Item eventKey="3">
          Change Username
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4">
        <Button onClick={handleLogOut} variant="dark">Logout</Button>
        </Dropdown.Item>
      </DropdownButton>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Profile Pic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Control onChange={handleImageSelect} type="file"  />
        {bar    ? <ProgressBar now={progress2?progress2:5} label={`${progress2?progress2:5}%`} />:""}
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFileUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>

      <h3>Peoples</h3>

    {users.map(item=>(
      <ListGroup>
          <ListGroup.Item style={activeuser === item.id ? active:notactive} onClick={()=>handleActive(item.id)}>{item.username}</ListGroup.Item>
    </ListGroup>
    ))}

    </div>
  )
}

let active = {
  color: "red"
}
let notactive = {
  color: "#000"
}

export default Left
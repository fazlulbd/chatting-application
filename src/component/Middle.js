import React, { useEffect, useState } from 'react'
import { Form,Button,Modal,ProgressBar,Card } from 'react-bootstrap'
import { getDatabase, ref, set,onValue,push } from "firebase/database";
import { getStorage, ref as refer, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import {useSelector} from 'react-redux'

const Middle = () => {
  let auth = getAuth()

  let userdata = useSelector(item=> item.activeuser.id)
  

    let [msg,setMsg] = useState("")
    let [usermsg,setUserMsg] = useState([])
    let [fileforupload,setFileforupload] = useState("")
    let [progress2,setProgress2] = useState(0)
    let [bar,setBar] = useState(false)
    let [one,setOne] = useState(false)

    const [show, setShow] = useState(false);

    

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    let handleMsg = (e)=>{
        setMsg(e.target.value)

    }

    let handleSend = ()=>{
      // console.log("j mag dicce",auth.currentUser.uid)
      // console.log("j msg pacce",userdata)
        const db = getDatabase();
        set(push(ref(db, 'messages/')), {
            msg: msg,
            sender:auth.currentUser.uid,
            receiver: userdata
        });
        setOne(!one)
    }



    useEffect(()=>{
  
        const db = getDatabase();
        const starCountRef = ref(db, 'messages/');
   
        onValue(starCountRef, (snapshot) => {
          let msgarr = []
        snapshot.forEach(item=>{
          msgarr.push(item.val())
        })
        setUserMsg(msgarr)
      });
    },[one])


    let handleFileSelect = (e)=>{
        setFileforupload(e.target.files[0])
    }

    let handleFileUpload = () => {
        setProgress2(2)
        const storage = getStorage();
        const storageRef = refer(storage, `test/${fileforupload.name}`);
        const uploadTask = uploadBytesResumable(storageRef, fileforupload);
     
        uploadTask.on('state_changed', 
        
            (snapshot) => {
                setBar(true)
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress2(progress)
                console.log('Upload is ' + progress + '% done');
                if(progress === 100){
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
    });
  }
);
    }


  return (
  <>
      <div className='middle'>
            {usermsg.map(item=>(
              <Card style={item.sender === auth.currentUser.uid? sender:receiver}>
              <Card.Body>
                <Card.Title>{item.sender}</Card.Title>
                <Card.Text>
                 {item.msg}
                </Card.Text>
              </Card.Body>
            </Card>
         
            ))}
      </div>
       <Form.Control onChange={handleMsg} type="email" placeholder="name@example.com" />
       <Button className='w-50' onClick={handleSend} >Send</Button>
       <Button className='w-50' variant="primary" onClick={handleShow}>File</Button>
   

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose a File FOr upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Control onChange={handleFileSelect} type="file" placeholder="Enter email" />
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
  </>
  )
}

let sender = {
  width: "400px",
  marginLeft: "auto",
  background: "green",
  color: "#fff"
}

let receiver = {
  width: "400px",
  marginRight: "auto",
  background: "blue",
  color: "#fff"
}

export default Middle
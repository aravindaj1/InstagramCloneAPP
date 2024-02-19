import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Popup from "./Popup";

export default function Post() {
    const luser=JSON.parse(localStorage.getItem('user'))
    const navigate=useNavigate()
    const [popup, setPopup] = useState({ isOpen: false, content: '' });

    const handleSubmit = async (event) => {

      event.preventDefault();
      let formData = new FormData(event.target)
      formData.append('uid',luser.userid)

      await axios.post("http://localhost:8081/createpost", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }}).then(async()=>{
          setPopup({
            isOpen: true,
            content: 'Posted'
          });
    
          setTimeout(() =>{
            setPopup({ isOpen: false, action: '', content: '' })
            navigate('/myprofile')
          }, 1000)
          
      }).catch((err)=>{
        if(err.response.status===400){
          alert("Please select a picture")
        }
      })
    
  }

  const handleClosePopup = () => {
    setPopup({ isOpen: false, action: '', content: '' });
  }


  if(luser){
  return (
    <div style={{marginTop:"150px"}}>
      <div style={{backgroundColor:"black",margin:"10px auto",textAlign:"center",width:"500px",color:"white",padding:"5px",borderRadius:"5px"}}>
            Create New Post
        </div>

    <div className="card" style={{width:"500px"}}>

      

    <form id="postupload" name="postupload" onSubmit={handleSubmit} className="card-body">
      
      <input type="file" className="btn btn-secondary" style={{width:"450px"}} name="image" id="image" required/><br />

      <input
        type="text"
        name="cap"
        id="cap"
        placeholder="Add Caption" 
        className="form-control"
        style={{width:"450px",marginLeft:"8px"}}
      /><br/>

      <button type="submit" className="btn btn-dark" style={{width:"450px"}} value="add post">Create Post</button>
    </form>
    </div>
    <Popup isOpen={popup.isOpen} onClose={handleClosePopup} content={popup.content} />
    </div>
  )}
  else{
    return <div style={{marginTop:"150px",padding:"15px"}}>
        <p style={{textAlign:"center"}}>Your session has expired.  <Link to={'/login'}>Login </Link> </p>
    </div>
}
}
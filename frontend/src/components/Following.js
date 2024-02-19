import { useEffect, useState } from "react"
import axios from 'axios'
import { Link, useNavigate, useParams } from "react-router-dom"

export default function Following(){
    const navigate=useNavigate()
    let {fid}=useParams()
    const luser=JSON.parse(localStorage.getItem('user'))
    const [following,setFollowing]=useState(['loading'])
    const [proceed,setproceed]=useState(false)

    const fetchFollowing=async()=>{
        var checkuser=await axios.post('http://localhost:8081/user',{userid:fid})
        if(checkuser.data){
            setproceed(true)
        }else{
            return null
        }
        var f=await axios.post('http://localhost:8081/user/following',{userid:fid})
        return f.data
    }
    useEffect(() => {
        fetchFollowing().then((data) => setFollowing(data)).catch((err) => console.log(err))
    }, [])

    if(luser){
        if(proceed){
    return (<div>
        <div className="card bg-dark" style={{width:"800px",margin:"10px auto"}}>
            <div className="card-body" style={{height:"60px",color:"white"}}>
                <p>Following</p>
            </div>
        </div>
        {following.length>0 && following[0]!=='loading' && following.map((f)=>{

            return (<div className="card" style={{width:"800px",marginBottom:"5px"}}>
                <div className="card-body" style={{height:"70px"}} onClick={()=>{
                    if(f.userid===luser.userid) navigate('/myprofile')
                    else navigate('/profilepage/'+f.userid)}}>
                <img className="card-img-top"  src={"http://localhost:8081/"+f._id+".jpg"}
                     alt="pfp" style={{float:"left",width:"40px",borderRadius:"50%",marginRight:"10px",height:"40px",objectFit:"cover",objectPosition:"center center"}}/>
                <p style={{marginTop:"5px"}}>{f.userid}</p>
                </div>
            </div>)
        })}

        {following[0]==='loading' && <div >
                <img className="card" src='http://mir-s3-cdn-cf.behance.net/project_modules/max_1200/eb0e6b135349075.61e6909c085be.gif' alt='loading' style={{width:"200px",margin:"200px auto",border:"none"}}/>
            </div>}

        {following.length===0 && <div style={{marginTop:"100px"}}>
            <p style={{textAlign:"center"}}> {fid!==luser.userid?fid+" is":"You are"} not following anyone </p>
        </div>}
    </div>)}
    else{
        return <div style={{marginTop:"150px",padding:"15px"}}>
            <p style={{textAlign:"center"}}>No such user found.</p>
        </div>
    }
    }
    else{
        return <div style={{marginTop:"150px",padding:"15px"}}>
            <p style={{textAlign:"center"}}>Your session has expired.  <Link to={'/login'}>Login </Link> </p>
        </div>
    }
}
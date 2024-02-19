import { useEffect, useState } from "react"
import axios from 'axios'
import { Link, useNavigate, useParams } from "react-router-dom"
import Following from "./Following"

export default function Followers(){
    const navigate=useNavigate()
    let {fid}=useParams()
    const luser=JSON.parse(localStorage.getItem('user'))

    const [followers,setFollowers]=useState('loading')
    const [proceed,setproceed]=useState(false)

    const fetchFollowers=async()=>{
        var checkuser=await axios.post('http://localhost:8081/user',{userid:fid})
        if(checkuser.data){
            setproceed(true)
        }else{
            return null
        }
        var f=await axios.post('http://localhost:8081/user/followers',{userid:fid})
        return f.data
    }
    useEffect(() => {
        fetchFollowers().then((data) => {
            setFollowers(data);
        }).catch((err) => console.log(err))
    }, [])

    if(luser){
        if(proceed){
            return (<div>
                <div className="card bg-dark" style={{width:"800px",margin:"10px auto"}}>
                    <div className="card-body" style={{height:"60px",color:"white"}}>
                        <p>Followers</p>
                    </div>
                </div>
                {followers && followers!=='loading' && followers.length>0 && followers.map((f)=>{

                    return (<div className="card" style={{width:"800px",marginBottom:"5px"}}>
                        <div className="card-body" style={{height:"70px"}} onClick={()=>{
                            if(f.userid===luser.userid){ navigate('/myprofile')}
                            else {navigate('/profilepage/'+f.userid)}}}>

                            <img className="card-img-top"  src={"http://localhost:8081/"+f._id+".jpg"}
                                alt="pfp" style={{float:"left",width:"40px",borderRadius:"50%",marginRight:"10px",height:"40px",objectFit:"cover",objectPosition:"center center"}}/>
                            <p style={{marginTop:"5px"}}>{f.userid}</p>
                        </div>
                    </div>)
                })}
        
                {followers.length===0 && <div style={{marginTop:"100px"}}>
                    <p style={{textAlign:"center"}}> No followers </p>
                </div>}

                {followers==='loading' && <div>
                    <img className="card" src='http://mir-s3-cdn-cf.behance.net/project_modules/max_1200/eb0e6b135349075.61e6909c085be.gif' alt='loading' style={{width:"200px",margin:"200px auto",border:"none"}}/>
                </div>}
            </div>)}
        else{
            return <div style={{marginTop:"250px",padding:"15px"}}>
                <p style={{textAlign:"center"}}>No such user found.</p>
            </div>
        }
    }
    else{
        return <div style={{marginTop:"250px",padding:"15px"}}>
            <p style={{textAlign:"center"}}>Your session has expired.  <Link to={'/login'}>Login </Link> </p>
        </div>
    }
}
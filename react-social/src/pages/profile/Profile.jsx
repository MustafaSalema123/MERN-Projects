import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./profile.css"
import { useEffect,useState  , useRef} from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Create } from "@mui/icons-material"

export default function Profile() {
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setUser]= useState({});
  //const username = "John new";
  const username = useParams().username;
  //console.log(usernameparams);
  // const [file ,setFile] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  // const [username, setUsername] = useState('');
  //const [desc, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const desc = useRef();
  const usernameRef = useRef();
  
  const handleEditProfileClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleUpdateProfile = async () => {
    // Perform update profile logic here
    try {
      
      // formData.append('username', username);
      // formData.append('desc', desc);
      // if (coverImage) {
      //   formData.append('coverImage', coverImage);
      // }
      // if (profileImage) {
      //   formData.append('profileImage', profileImage);
      // }
      const UpdatedData = 
      {
        userId: user._id,
        username : usernameRef.current.value,
        desc : desc.current.value,
        
      };

      const formData = new FormData();
      if (coverImage) {
          const fileName = Date.now() + coverImage.name;
        formData.append('name', fileName);
        formData.append("file",coverImage);
        UpdatedData.coverPicture = fileName;

        try
        {
          await axios.post("/upload", formData);
        }catch(err){}
  
       }
    //    if (profileImage) {
    //     const fileName = Date.now() + profileImage.name;
    //   formData.append('name', fileName);
    //   formData.append("file",profileImage);
    //   UpdatedData.profilePicture = fileName;

    //   try
    //     {
    //       await axios.post("/upload", formData);
    //     }catch(err){}
    //  }
      //formData.append("name" , fileName); // name is request take buy body
     
    //  UpdatedData.profileImage = fileName;
      //console.log(UpdatedData);
      // const response = await axios.put(`/api/users/${user._id}`, formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
     
      
     const response = await axios.put(`/users/${user._id}`, UpdatedData);
     //const response = await axios.put(`/users/${user._id}`, {userId:user._id  , ...formData});


      console.log(response.data); 
  

      // Close the popup after updating
      setShowPopup(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error here
    }
    // You can use the values of username, description, coverImage, profileImage
    // Close the popup after updating
    setShowPopup(false);
  };


  useEffect(()=> {
    const fetchPost =  async () => {
      const res = await axios.get(`/users?username=${username}`);
     // console.log(" profile data " ,res.data);
     setUser(res.data);
    };
    fetchPost();
  },[username])

  // const submitHandler= async (e) => 
  // {
  //   e.preventDefault();
  //   const newPost = 
  //   {
  //     userId: user._id,
  //     desc : desc.current.value,
  //   };
  //   if(file)
  //   {
  //     const data = new FormData();
  //     const fileName = Date.now() + file.name;
  //     data.append("name" , fileName);
  //     data.append("file",file);
  //     newPost.img = fileName;
  //     console.log("share new post: " , newPost);
  //     try
  //     {
  //       await axios.post("/upload", data);
  //     }catch(err){}

  //   }
    
  // }


  return (
   <div className="profile">
    <Sidebar/>
    <div className="profileRight">
      <div className="profileRightTop">
        <div className="profileCover">
          <img className="profileCoverImg"  src={ user.coverPicture ?  PF +user.coverPicture : PF+"person/noCover.png" }
                alt=""
            />
             <img className="profileUserImg"  src={user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png"}
                alt=""
            />
            
            <div className="UploadMediaIcon">
            <label className="EditProfile" onClick={handleEditProfileClick}>
            <Create/>
            
              </label>

              
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <input
              type="text"
              placeholder="Username"
              ref={usernameRef}
              disabled
              value={user.username}
              // onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              ref={desc}
              // value={desc}
              // onChange={(e) => setDescription(e.target.value)}
            />
           
            {/* <input
              type="file"
              placeholder="Cover Image"
              onChange={(e) => setCoverImage(e.target.files[0])}
            /> */}
            <input type="file"
              id="file"   placeholder="Cover Image" accept=".png,.jpeg,.jpg"
              onChange={(e) => setCoverImage(e.target.files[0])}
              /> 
            <input
              type="file"
              placeholder="Profile Image"
              id="file" accept=".png,.jpeg,.jpg"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
            <div className="buttons">
              <button onClick={handleClosePopup}>Close</button>
              <button onClick={handleUpdateProfile}>Update Profile</button>
            </div>
          </div>
        </div>
      )}
              
            </div>
         
            {/* <input style={{display: "none"}} type="file"
              id="file" accept=".png,.jpeg,.jpg"
              onChange={(e) => setFile(e.target.files[0])}
              /> */}
            
        </div>
        < div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
      </div>
      <div className="profileRightBottom">
            <Feed username={username} />
            {/* <Rightbar profile/> */}
            <Rightbar user={user}/>
          </div>
    </div>
   </div>
  )
}

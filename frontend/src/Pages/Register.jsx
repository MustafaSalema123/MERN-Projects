import axios from 'axios';
import React, { useContext ,useState } from 'react'
import { Link ,Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Context } from '../main';

const Register = () => {

  const {isAuthenticated , setIsAuthenticated } = useContext(Context);
  // http://localhost:4000/api/user/patient/register
// {
//     "firstName": "Testp",
//     "lastName":"Name",
//     "email":"test@gmail.com",
//     "phone":"99999999999",
//     "nic":"1234567890123",
//     "dob":"1/5/2005",
//     "gender":"Male",
//     "password":"asdfghjkl",
//     "role":"Patient"
   
// }
  const [firstName , setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");

  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
   const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);


  const navigateTo = useNavigate();

  const handleSendOtp = async () => {
    try {
       await axios.post("http://localhost:4000/api/user/send-otp", { email }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        toast.success(res.data.message);
       
        
        //setEmail(email.toString());
        //console.log(email , " email sent opt " )
        setIsOtpSent(true);
      });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  
  const handleVerifyOtp = async () => {
    try {
      await axios.post("http://localhost:4000/api/user/verify-otp", { email, otp }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        toast.success(res.data.message);
        setIsOtpVerified(true);
      });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };


  const handleRegistration  =  async(e) => 
    {
      console.log("myemail " , email);
      e.preventDefault();
      try
      {
        await axios.post("http://localhost:4000/api/user/patient/register" , {firstName, lastName, email, phone, nic, dob, gender, password},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
        ).then((res) => 
          {
            console.log("register data ")
            toast.success(res.data.message);
            setIsAuthenticated(true);
            navigateTo("/");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setNic("");
            setDob("");
            setGender("");
            setPassword("");
          })
      }catch(err)
      {
        toast.error(err.response.data.message);
      }
    };

    if (isAuthenticated) {
      return <Navigate to={"/"} />;
    }

  return (
    <>
      <div className="container form-component register-form">
      <h2>Sign Up</h2>
      <p>Please Sign Up To Continue</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
        voluptas expedita itaque ex, totam ad quod error?
      </p>
      <form onSubmit={handleRegistration}>
        {!isOtpSent ? (
          <>
            <div>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Email"
                value={email}
              
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="button" disabled={isOtpSent} onClick={handleSendOtp}>
                Send OTP
              </button>
            </div>
          </>
        ) : (
          <>
            {!isOtpVerified ? (
              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button type="button" onClick={handleVerifyOtp}>
                  Verify OTP
                </button>
              </div>
            ) : (
              <>
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    disabled
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Mobile Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="NIC"
                    value={nic}
                    onChange={(e) => setNic(e.target.value)}
                  />
                  <input
                    type={"date"}
                    placeholder="Date of Birth"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
                <div>
                  <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div style={{ gap: "10px", justifyContent: "flex-end", flexDirection: "row" }}>
                  <p style={{ marginBottom: 0 }}>Already Registered?</p>
                  <Link to={"/signin"} style={{ textDecoration: "none", color: "#271776ca" }}>
                    Login Now
                  </Link>
                </div>
                <div style={{ justifyContent: "center", alignItems: "center" }}>
                  <button type="submit">Register</button>
                </div>
              </>
            )}
          </>
        )}
      </form>
    </div>
    {/* <div className="container form-component register-form">
        <h2>Sign Up</h2>
        <p>Please Sign Up To Continue</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
          voluptas expedita itaque ex, totam ad quod error?
        </p>
        <form onSubmit={handleRegistration}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
            <input
              type={"date"}
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Already Registered?</p>
            <Link
              to={"/signin"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Login Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div> */}
    </>
  )
}

export default Register
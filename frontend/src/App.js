import React, {useState,useEffect,useCallback,useMemo} from 'react';
import { Routes, Route, Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Home from './home';
import Recharge from './Recharge';
import Login from './login';
import Register from './register';
function App() {
    const [user,setuser]=useState(''); 
    const navigate=useNavigate();
    const [ishovered, setishovered] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const options = ["Profile", "Settings"];
    const memoiseduser =  useMemo(()=>user,[user]);
    const toggleTheme = () => {
      setDarkMode(!darkMode);
    };
    const handleaddchannel = async(pack)=>{
      try{
        if(!user){
          handleSwitchToLogin();
        }
        const response= await axios.post("http://localhost:5000/api/users/addchannel",{pack,mailid:memoiseduser});
        if(response.status === 200){
          alert('channel added to the cart');
        }
      }
      catch(err){
      }
    }
    const handleaddpack = async(channel)=>{
      if(!user){navigate('/login')}
      try{
        const response= await axios.post("http://localhost:5000/api/users/addpack",{channel,mailid:memoiseduser});
        if(response.status === 200){
          alert('pack added to the cart');
        }
      }
      catch(err){
      }
    }
    const handlegetchannel = useCallback(async()=>{
      try{
        const response= await axios.get("http://localhost:5000/api/users/getchannel",{params:{mailid:memoiseduser},});
        if(response.status === 200){
          return response.data;
        }
      }
      catch(err){
      }
    },[memoiseduser]);
    const handlegetpack = useCallback(async()=>{
      try{
        const response= await axios.get("http://localhost:5000/api/users/getpack",{params:{mailid:memoiseduser},});
        if(response.status ===200){
          return response.data;
        }
      }
      catch(err){
      }
    },[memoiseduser]);
    const handleremovepack = async(index)=>{
      try{
        const response= await axios.delete("http://localhost:5000/api/users/removepack",{data:{index,mailid:memoiseduser}});
        if(response.status === 200){
          alert('pack removed from the cart');
          return response.data;
        }
      }
      catch(err){
      }
    }
    const handleremovechannel = async(index)=>{
      try{
        const response= await axios.delete("http://localhost:5000/api/users/removechannel",{data:{index,mailid:memoiseduser}});
        if(response.status === 200){
          alert('channel removed from the cart');
          return response.data;
        }
      }
      catch(err){
      }
    }
    const handleLogin = async(username,password)=>{
      try
      {
          const response = await axios.post("http://localhost:5000/api/users/login",{mailid: username, password,});
          if(response.status === 200)
          {
              const token = response.data.token;
              localStorage.setItem('authToken',token);
              localStorage.setItem('username',username);
              alert("loginned successfully");
              setuser(username);
              navigate('/');
          }
      }
      catch(err)
      {
      }
  };
    const handleSwitchToRegister = () => {
        navigate('/register');
        console.log('Switching to Register page');
    };
    const handleSwitchToLogin = () => {
        navigate('/login');
    }
    const handlelogout = () =>{
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
      setuser('');
    }
    useEffect(() => {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, [darkMode]);
    useEffect(()=>{
      try{
        const token = localStorage.getItem('authToken');
        const username = localStorage.getItem('username');
        if(token){
          setuser(username);
        }
        else{
          setuser('');
        }
      }catch{
      }
    },[]);
  return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
        <header className="fixed top-0 z-10 left-0 right-0 flex items-center justify-between p-4 bg-blue-400 dark:bg-blue-600 text-white">
          <div className="text-lg font-bold">Logo</div>
          <div className="flex items-center space-x-4">
            <Link to='/' className='hover:underline'>HOME</Link>
            <Link to="/Recharge" className="hover:underline">Recharge</Link>
            {!user &&(<Link to="/login" className="hover:underline">Login</Link>)}
      <button
        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-100 bg-gray-200 dark:bg-gray-950 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setishovered(true)}
      >
        <span className="mr-2">User</span>
        <svg
          className="w-5 h-5 text-gray-600 dark:text-gray-100"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      </div>
      </header>
      {ishovered && (
        <div className="absolute z-30 top-20 right-0 mt-0 w-44 bg-white border dark:bg-gray-950 border-gray-200 dark:border-gray-900 rounded-md shadow-lg">
          <ul className="py-1">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={()=>{setishovered(false);}}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                {option}
              </li>
            ))}
            {!user && (<li
              onClick={()=>{navigate('/login');
                setishovered(false);
              }}
              className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >Login</li>)}
            {user && (<li
              onClick={()=>{handlelogout();
                setishovered(false);
              }}
              className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >Logout</li>)}
            <button 
            onClick={()=>{toggleTheme();
              setishovered(false);
            }
            } 
            className="block bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-950 p-2 rounded-md w-full hover:bg-gray-600 dark:hover:bg-gray-300">
            Toggle {darkMode ? 'Light' : 'Dark'} Mode
            </button>
            </ul>
            </div>
      )}
        <main className='pt-20'>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/recharge" element={<Recharge onaddchannel={handleaddchannel} onaddpack={handleaddpack} ongetchannel={handlegetchannel} ongetpack={handlegetpack} onremovechannel={handleremovechannel} onremovepack={handleremovepack}/>} />
        <Route path="/login" element={<Login onLogin={handleLogin} onSwitchToRegister={handleSwitchToRegister} />}/>
        <Route path="/register" element={<Register onSwitchToLogin={handleSwitchToLogin}/>}/>
        </Routes>
        </main>
      </div>
  );
}

export default App;

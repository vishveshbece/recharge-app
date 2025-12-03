import './register.css'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register({ onSwitchToLogin }) {
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [phone, setphone] = useState('');
    const [mailid, setmailid] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('');
    const [error3, setError3] = useState('');
    const [error4, setError4] = useState('');
    const [error5, setError5] = useState('');
    const [error6, setError6] = useState('');
    const navigate = useNavigate();
    const handleBlur = (field) => {
            if (field === 'firstname' && !firstname) {
                setError1('First Name is required');
            } else if (field === 'lastname' && !lastname) {
                setError2('Last Name is required');
            }else if(field === 'phone' && !phone) {
                setError3('mobile number is required');
            }else if(field === 'mailid' && !mailid){
                setError4('email is required');
            }else if(field === 'password' && !password){
                setError5('password is required');
            }else if(field === 'confirmpassword' && !confirmpassword){
                setError6('password is required');
            }else {
                if (field === 'firstname') setError1('');
                if (field === 'lastname') setError2('');
                if(field === 'phone') setError3('');
                if(field === 'mailid') setError4('');
                if(field === 'password') setError5('');
                if(field === 'confirm password') setError6('');
            }
    };
    const handleSubmit = async () => {
        try{
            const response = await axios.post("https://recharge-app-1-innv.onrender.com/api/users",{firstname, lastname, phone, mailid, password});
            if(response.status === 201){
                alert("registered successfully");
                navigate('/login');
            }
        }catch (err){
            if(err.response && err.response.status === 400){
                setError("username or password already exists");
            }
            console.error(err);
        }
    };
    const handleRegister = (e) => {
        e.preventDefault();
        if (!firstname || !password || !confirmpassword || !lastname || !mailid || !phone) {
            setError('All fields are required');
        } else if (password !== confirmpassword) {
            setError('Passwords do not match');
        } else {
            setError('');
            handleSubmit();
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-red-200 dark:bg-red-950 overflow-hidden m-0 h-full" style={{backgroundImage: `url(/back.png)`}}>
            <div className="w-full max-w-lg p-6 bg-red-300 dark:bg-red-950 rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">Register</h2>
                <form onSubmit={handleRegister} className="flex flex-col space-y-4">
                    <div class="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div className='relative w-full sm:w-1/2'>
                    <input
                        type="text"
                        id="firstname"
                        placeholder=""
                        value={firstname}
                        onChange={(e) => setfirstname(e.target.value)}
                        className="peer p-2 border rounded border-gray-300 dark:bg-red-300 dark:border-gray-700 focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-800"
                        onBlur={() => handleBlur('firstname')}
                    />
                    <label
                        htmlFor="firstname"
                        className={`absolute left-2 top-2 text-gray-500 dark:text-gray-700 dark:bg-red-300 transition-all duration-200 transform scale-100 origin-top-left
                        ${firstname ? 'top-[-0.10rem] text-blue-500 dark:text-blue-800 text-sm scale-75' : ''}
                        peer-focus:top-0rem peer-focus:text-blue-500 dark:peer-focus:text-blue-800 peer-focus:text-sm peer-focus:scale-75`}
                    >
                        Firstname <span className="text-red-500">*</span>
                    </label>
                        {error1 && <p className="text-red-500 text-sm">{error1}</p>}
                    </div>
                    <div className='relative w-full sm:w-1/2'>
                    <input
                        type="text"
                        id="lastname"
                        placeholder=""
                        value={lastname}
                        onChange={(e) => setlastname(e.target.value)}
                        className="peer p-2 border rounded border-gray-300 dark:bg-red-300 focus:outline-none focus:ring focus:ring-blue-200"
                        onBlur={() => handleBlur('lastname')}
                    />
                    <label
                        htmlFor="lastname"
                        className={`absolute left-2 top-2 text-gray-500 dark:text-gray-700 transition-all duration-200 transform scale-100 origin-top-left
                            ${firstname ? 'top-[-0.10rem] text-blue-500 dark:text-blue-800 text-sm scale-75' : ''}
                            peer-focus:top-0rem peer-focus:text-blue-500 dark:peer-focus:text-blue-800 peer-focus:text-sm peer-focus:scale-75`}
                        >
                        Lastname <span className="text-red-500">*</span>
                    </label>
                        {error2 && <p className="text-red-500 text-sm">{error2}</p>}
                    </div>
                    </div>
                    <div class="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div class="relative w-full sm:w-1/2">
                    <input
                        type="number"
                        placeholder=""
                        value={phone}
                        id="phone"
                        onChange={(e) => setphone(e.target.value)}
                        className="peer p-2 border rounded border-gray-300 focus:outline-none dark:bg-red-300 focus:ring focus:ring-blue-200"
                        onBlur={()=>handleBlur('phone')}
                    />
                    <label
                        htmlFor="phone"
                        className={`absolute left-2 top-2 text-gray-500 dark:text-gray-700 transition-all duration-200 transform scale-100 origin-top-left
                            ${firstname ? 'top-[-0.10rem] text-blue-500 dark:text-blue-800 text-sm scale-75' : ''}
                            peer-focus:top-0rem peer-focus:text-blue-500 dark:peer-focus:text-blue-800 peer-focus:text-sm peer-focus:scale-75`}
                        >
                        Phone <span className="text-red-500">*</span>
                    </label>
                        {error3 && <p className="text-red-500 text-sm">{error3}</p>}
                    </div>
                    <div class="relative w-full sm:w-1/2">
                    <input
                        type="email"
                        placeholder=""
                        value={mailid}
                        id="mailid"
                        onChange={(e) => setmailid(e.target.value)}
                        className="peer p-2 border rounded border-gray-300 focus:outline-none dark:bg-red-300 focus:ring focus:ring-blue-200"
                        onBlur={()=>handleBlur('mailid')}
                    />
                    <label
                        htmlFor="mailid"
                        className={`absolute left-2 top-2 text-gray-500 dark:text-gray-700 transition-all duration-200 transform scale-100 origin-top-left
                            ${firstname ? 'top-[-0.10rem] text-blue-500 dark:text-blue-800 text-sm scale-75' : ''}
                            peer-focus:top-0rem peer-focus:text-blue-500 dark:peer-focus:text-blue-800 peer-focus:text-sm peer-focus:scale-75`}
                        >
                        Email <span className="text-red-500">*</span>
                    </label>
                        {error4 && <p className="text-red-500 text-sm">{error4}</p>}
                    </div>
                    </div>
                    <div class="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div class="relative w-full sm:w-1/2">
                    <input
                        type="password"
                        placeholder=""
                        value={password}
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="peer p-2 border rounded border-gray-300 focus:outline-none dark:bg-red-300 focus:ring focus:ring-blue-200"
                        onBlur={()=>handleBlur('password')}
                    />
                    <label
                        htmlFor="password"
                        className={`absolute left-2 top-2 text-gray-500 dark:text-gray-700 transition-all duration-200 transform scale-100 origin-top-left
                            ${firstname ? 'top-[-0.10rem] text-blue-500 dark:text-blue-800 text-sm scale-75' : ''}
                            peer-focus:top-0rem peer-focus:text-blue-500 dark:peer-focus:text-blue-800 peer-focus:text-sm peer-focus:scale-75`}
                        >
                        Password <span className="text-red-500">*</span>
                    </label>
                        {error5 && <p className="text-red-500 text-sm">{error5}</p>}
                    </div>
                    <div class="relative w-full sm:w-1/2">
                    <input
                        type="password"
                        placeholder=""
                        value={confirmpassword}
                        id="confirmpassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="peer p-2 border rounded border-gray-300 focus:outline-none dark:bg-red-300 focus:ring focus:ring-blue-200"
                        onBlur={()=>handleBlur('confirmpassword')}
                    />
                    <label
                        htmlFor="confirmpassword"
                        className={`absolute left-2 top-2 text-gray-500 dark:text-gray-700 transition-all duration-200 transform scale-100 origin-top-left
                            ${firstname ? 'top-[-0.10rem] text-blue-500 dark:text-blue-800 text-sm scale-75' : ''}
                            peer-focus:top-0rem peer-focus:text-blue-500 dark:peer-focus:text-blue-800 peer-focus:text-sm peer-focus:scale-75`}
                        >
                        confirmpassword <span className="text-red-500">*</span>
                    </label>
                        {error6 && <p className="text-red-500 text-sm">{error6}</p>}
                    </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="px-4 py-2 font-semibold text-white bg-red-400 rounded dark:bg-red-900 hover:bg-red-500 dark:hover:bg-red-800">
                        Register
                    </button>
                </form>
                <p className="mt-4 text-sm text-center dark:text-white">
                    Already have an account?{' '}
                    <button onClick={onSwitchToLogin} className="text-blue-500 dark:text-blue-900 hover:underline">
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Register;

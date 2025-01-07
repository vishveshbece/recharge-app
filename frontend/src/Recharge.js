import React,{ useEffect, useState,useMemo } from 'react';
import data from './data.json';
import pack from './pack.json';
import './Recharge.css';

function Recharge({onaddchannel,onaddpack,ongetchannel,ongetpack,onremovechannel,onremovepack}) {
  const [Pack,Setpack]=useState(false);
  const [channels,setchannels] = useState([]);
  const [packs,setpacks] = useState([]);
  const [Channel,Setchannel]=useState(false);
  const [Dashboard,Setdashboard] = useState(true);
  const [isphone,setisphone] = useState(window.innerWidth > 768);
  const [ishovered,setishovered] = useState(false);
  const calculateTotalCost = () => {
    var totalPackCost = 0;
    if(Array.isArray(packs)){
    totalPackCost = packs.reduce((total, pack) => total + parseFloat(pack['Cost of the pack'] || 0), 0);
    }
    var totalChannelCost = 0;
    if(Array.isArray(channels)){
    totalChannelCost = channels.reduce((total, channel) => total + parseFloat(channel['Maximum Retail Price (MRP) \r\n\r\n(Excluding Taxes)'] || 0), 0);
    }
    return totalPackCost + totalChannelCost;
  };
  const togglechannel=()=>{
    Setchannel(true);
    Setpack(false);
    Setdashboard(false);
  }
  const togglepack = () =>{
    Setpack(true);
    Setchannel(false);
    Setdashboard(false);
  }
  const removepack = async(index)=>{
    try{const packs1 = await onremovepack(index);
    if (packs1 && Array.isArray(packs1)) {
      setpacks(packs1);
    } else {
      console.error("Invalid packs data received");
    }
  } catch (error) {
    console.error("Error removing pack:", error);
  }
  }
  const removechannel = async(index)=>{
    try{const packs1 = await onremovechannel(index);
    if (packs1 && Array.isArray(packs1)) {
      setchannels(packs1);
    } else {
      setchannels([]);
      console.error("Invalid packs data received");
    }
  } catch (error) {
    console.error("Error removing pack:", error);
  }
  }
  const toggledashboard =()=>{
    Setpack(false);
    Setchannel(false);
    Setdashboard(true);
  }
  useEffect(()=>{
    const handleResize = ()=>{
    setisphone(window.innerWidth > 768);
    }
    window.addEventListener('resize',handleResize);
    return ()=>{
      window.removeEventListener('resize',handleResize);
    };
  },[]);
  useEffect(() => {
    if (Dashboard) {
      const fetchData = async () => {
        const channels1 = await ongetchannel();
        if(Array.isArray(channels1)){
        setchannels(channels1);
        }
        else{
          setchannels([]);
        }
        const packs1 = await ongetpack();
        if(Array.isArray(packs1)){
          setpacks(packs1);
          }
        else{
          setpacks([]);
        }
      };
      fetchData();
    }
  }, [ongetchannel,ongetpack,Dashboard]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState('');
  const [genre, setGenre] = useState('');
  const [hd, setHd] = useState('');
  const [high, sethigh] = useState('');
  const getKey = (item, key) => item[key]?.toLowerCase() ?? '';
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearchTerm = getKey(item, "Name of the channel").includes(searchTerm.toLowerCase());
      const matchesLanguage = getKey(item, "Repoarted  Language").includes(language.toLowerCase());
      const matchesGenre = genre ? getKey(item, " Reported Genre as per Regulatory framework ") === genre.toLowerCase() : true;
      const matchesHd = hd ? getKey(item,"Declared as SD or HD ") === hd.toLowerCase() : true;
  
      return matchesSearchTerm && matchesLanguage && matchesGenre && matchesHd;
    });
  }, [searchTerm, language, genre, hd]);  
     const sortedChannelData = useMemo(() => { const sorted = [...filteredData]; 
    if (high.toLowerCase() === "lower") { sorted.sort((a, b) => parseFloat(a["Maximum Retail Price (MRP) \r\n\r\n(Excluding Taxes)"] || 0) - parseFloat(b["Maximum Retail Price (MRP) \r\n\r\n(Excluding Taxes)"] || 0) ); } 
    else if (high.toLowerCase() === "higher") { sorted.sort((a, b) => parseFloat(b["Maximum Retail Price (MRP) \r\n\r\n(Excluding Taxes)"] || 0) - parseFloat(a["Maximum Retail Price (MRP) \r\n\r\n(Excluding Taxes)"] || 0) ); } 
    return sorted; }, [high,filteredData]);
  const [Packname,Setpackname]=useState('');
  const Filterdata = useMemo(() => pack.filter((item) => { return item["Pack name"].toLowerCase().includes(Packname.toLowerCase());}), [Packname]);
  return (
    <div className='relative'>
    <div className="fixed top-16 mt-1 z-10 left-0 right-0 flex items-center justify-between md:space-x-4 p-1 bg-blue-200 text-white">
    <div
        className="relative"
        onMouseEnter={() => setishovered(true)}
        onMouseLeave={() => setishovered(false)}
      >
    {!isphone &&(  
      <img
        src={`threeline.jpg`}
        alt="Three Line"
        className="w-8 h-8 rotate-on-hover"
      />
    )}
    </div>
      {isphone && 
      (<>
      <div
        onClick={togglechannel}
        onTouchStart={togglechannel}
        className='flex items-center space-x-1 rounded-lg hover:underline hover:bg-blue-300 cursor-pointer p-1'>
        <img src={`channel.png`} alt="not" className='w-8 h-8 rounded-full'></img>
        <span>
          CHANNELS
        </span>
        </div>
      <div
        onClick={togglepack}
        onTouchStart={togglepack}
        className='flex items-center space-x-1 rounded-lg hover:underline hover:bg-blue-300 cursor-pointer p-1'>
        <img src={`pack.jpg`} alt="not" className='w-8 h-8 rounded-full'></img>
        <span>
          PACKS
        </span>
      </div>
      <div
        onClick={toggledashboard}
        onTouchStart={toggledashboard}
        className='flex items-center space-x-1 rounded-lg hover:underline hover:bg-blue-300 cursor-pointer p-1'>
        <img src={`cart.png`} alt="not" className='w-8 h-8 rounded-full'></img>
        <span>CART</span>
      </div>
      </>
      )
    }
      <img src={`search.jpg`} alt="not" className='w-8 h-8 rounded-full'></img>
      <input className="text-black p-1 flex-grow" type="text" placeholder="search your channels or packs"></input>
    </div>
    {ishovered && (
      <div
      className="absolute top-7 left-1 w-44 bg-blue-800 text-white p-2 rounded-lg shadow-lg z-20"
    >
        <div className='flex flex-col space-y-2 ml-2'>
          <div
            onClick={togglechannel}
            onTouchStart={togglechannel}
            className='flex items-center space-x-1 rounded-lg hover:underline hover:bg-blue-300 cursor-pointer p-1'>
            <img src={`channel.png`} alt="not" className='w-8 h-8 rounded-full'></img>
            <span>
              CHANNELS
            </span>
          </div>
          <div
            onClick={togglepack}
            onTouchStart={togglepack}
            className='flex items-center space-x-1 rounded-lg hover:underline hover:bg-blue-300 cursor-pointer p-1'>
            <img src={`pack.jpg`} alt="not" className='w-8 h-8 rounded-full'></img>
          <span>
            PACKS
          </span>
          </div>
          <div
            onClick={toggledashboard}
            onTouchStart={toggledashboard}
            className='flex items-center space-x-1 rounded-lg hover:underline hover:bg-blue-300 cursor-pointer p-1'>
            <img src={`cart.png`} alt="not" className='w-8 h-8 rounded-full'></img>
            <span>CART</span>
          </div>
        </div>
      </div>
    )}
      {Channel && (<div className="mt-16">
        <div className="p-2">
     <div className="fixed z-10 top-24 mt-3 lg:top-28 lg:mt-0 left-0 right-0 grid grid-cols-2 sm:grid-cols-5 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md shadow-lg">
  <select
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
    className="col-span-1 sm:col-span-1 px-2 py-1 text-sm border rounded-md shadow-sm focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
  >
    <option value="">All Languages</option>
    <option value="tamil">Tamil</option>
    <option value="telugu">Telugu</option>
    <option value="kannada">Kannada</option>
    <option value="english">English</option>
    <option value="hindi">Hindi</option>
    <option value="marathi">Marathi</option>
    <option value="bengali">Bengali</option>
  </select>
  <select
    value={genre}
    onChange={(e) => setGenre(e.target.value)}
    className="col-span-1 sm:col-span-1 px-2 py-1 text-sm border rounded-md shadow-sm focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
  >
    <option value="">All Genres</option>
    <option value="comedy">Comedy</option>
    <option value="movies">Movies</option>
    <option value="news">News</option>
    <option value="kids">Kids</option>
    <option value="infotainment">Infotainment</option>
    <option value="sports">Sports</option>
    <option value="music">Music</option>
    <option value="devotional">Devotional</option>
    <option value="miscellaneous">Miscellaneous</option>
  </select>
  <select
    value={hd}
    onChange={(e) => setHd(e.target.value)}
    className="col-span-1 sm:col-span-1 px-2 py-1 text-sm border rounded-md shadow-sm focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
  >
    <option value="">All</option>
    <option value="hd">HD</option>
    <option value="sd">SD</option>
  </select>
  <select
    value={high}
    onChange={(e) => sethigh(e.target.value)}
    className="col-span-1 sm:col-span-1 px-2 py-1 text-sm border rounded-md shadow-sm focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
  >
    <option value="">General Price</option>
    <option value="higher">High To Low</option>
    <option value="lower">Low To High</option>
  </select>
  <input
    type="text"
    placeholder="Search channels..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="col-span-2 sm:col-span-1 px-2 py-1 border rounded-md shadow-sm focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
  />
</div>
      <div className="mt-28 sm:mt-14 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
            {sortedChannelData.map((item, index) => (
                <div 
                    key={index} 
                    className="relative p-3 border rounded-lg shadow-md bg-white dark:bg-gray-950 flex flex-col space-y-1 items-center"
                >
                    <div className="absolute top-2 right-2">
                        <span 
                            className={`px-2 py-1 text-xs font-bold rounded ${
                                item["Declared as SD or HD "] === 'HD' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-400 text-white'
                            }`}
                        >
                            {item["Declared as SD or HD "]}
                        </span>
                    </div>
                    <img 
                        src={`${item["Name of the channel"]}.png`} 
                        className="w-12 h-12 rounded-full object-cover mb-2" 
                        alt={`${item["Name of the channel"]} logo`} 
                    />
                    <h3 className="text-base text-center font-semibold text-gray-800 dark:text-white">
                        {item["Name of the channel"]}
                    </h3>
                    <p className="text-xs text-center text-gray-600 dark:text-gray-300">
                        <strong>Language:</strong> {item["Repoarted  Language"]}
                    </p>
                    <p className="text-xs text-center text-gray-600 dark:text-gray-300">
                        <strong>Genre:</strong> {item[" Reported Genre as per Regulatory framework "]}
                    </p>
                    <p className="text-xs text-center text-gray-600 dark:text-gray-300">
                        <strong>Price:</strong> Rs.{item["Maximum Retail Price (MRP) \r\n\r\n(Excluding Taxes)"]}
                    </p>
                    <button 
                        className="w-full px-3 py-1 bg-green-500 dark:bg-green-700 text-black text-xs rounded-md hover:bg-green-600 dark:hover:bg-green-600 transition-all"
                        onClick={()=>{onaddchannel(item)}}
                    >
                        <div className='flex items-center justify-center space-x-2'>
                            <p>Add to the cart</p>
                            <img src={`cart.png`} alt="not" className='w-8 h-8 rounded-full' />
                        </div>
                    </button>
                </div>
            ))}
        </div>
      </div>
    </div>
      </div>)}
      {Pack && <div className='mt-3 lg:mt-5 p-4'>
            <div className='fixed z-10 mt-0 left-0 right-0 flex p-2 bg-gray-50 dark:bg-gray-800 rounded-md shadow-md'>
                <input
                type="text"
                placeholder="Search the packs"
                value={Packname}
                onChange={(e)=>Setpackname(e.target.value)}
                className='p-2 border rounded dark:bg-gray-400 dark:placeholder-gray-700 flex-grow'></input>
            </div>
            <div className='container mt-2 mx-auto p-4'>
            <div className='mt-11 flex flex-col items-center bg-gray-100 min-h-screen'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2'>
                {Filterdata.map((item, index) => (
                    <div key={index} className='relative bg-white border shadow-md rounded-md p-2 flex flex-col items-center'>
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
                            {((item['Total Sum of MRP'] - item['Cost of the pack']) / item['Total Sum of MRP'] * 100).toFixed(2)}% OFF
                        </div>
                        <div className="font-bold text-md mt-4 mb-1 text-center text-blue-600">{item['Pack name']}</div>
                        <div className="text-gray-700 mb-2 p-1 border rounded w-full flex-grow">
                            <strong>Channels:</strong>
                            <ul className="list-none text-center mt-1 text-sm">
                                {item['Channels in Bouquet'].map((l, idx) => (
                                    <li key={idx} className="mb-0.5">
                                        <span className="font-semibold">{l['Channel']}</span>: Rs.{l['MRP of Channel']}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="text-center text-gray-700 mb-1 text-sm">
                            <strong>Original Rate: </strong>Rs.{item['Total Sum of MRP']}
                        </div>
                        <div className="text-center text-green-700 mb-1 text-sm">
                            <strong>Discounted Rate: </strong>Rs.{item['Cost of the pack']}
                        </div>
                        <button 
                            className="w-full px-1 py-0.5 bg-green-500 dark:bg-green-700 text-white text-xs rounded-md hover:bg-green-600 dark:hover:bg-green-600 transition-all mt-auto"
                            onClick={()=>{onaddpack(item)}}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
            </div>
        </div>}
        {Dashboard && (<div className="min-h-screen flex flex-col mt-7 sm:mt-9 items-center bg-gray-100 dark:bg-gray-950">
      <div className="flex flex-col sm:flex-row w-full justify-center mt-16 sm:mt-0 space-y-4 sm:space-x-8 sm:space-y-0 p-4">
        <div className="w-full sm:w-1/2 p-4 bg-white rounded-lg shadow-md dark:bg-gray-950">
          <div>
            <h3 className="text-lg font-medium">Channels</h3>
            <ul>
              {(Array.isArray(channels) && channels.length === 0) ? (
                <p>No channels added</p>
              ) : (
                channels.map((channel, index) => (
                  <li key={index} className="flex justify-between items-center py-2">
                    {channel['Name of the channel']}
                    <button
                      onClick={() => removechannel(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))
              )}
            </ul>
            <hr className="my-4" />
            <h3 className="text-lg font-medium">Packs</h3>
            <ul>
              {(Array.isArray(packs) && packs.length === 0) ? (
                <p>No packs added</p>
              ) : (
                packs.map((pack, index) => (
                  <li key={index} className="flex justify-between items-center py-2">
                    {pack['Pack name']}
                    <button
                      onClick={() => removepack(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-4 bg-white rounded-lg shadow-md dark:bg-gray-950">
          <h2 className="text-xl font-semibold mb-4">Total Cost</h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium">Channels</h3>
            <ul>
              {(Array.isArray(channels) && channels.length === 0) ? (
                <p>No channels added</p>
              ) : (
                channels.map((channel, index) => (
                  <li key={index} className="flex justify-between items-center py-2">
                    {channel['Name of the channel']} - ${channel['Maximum Retail Price (MRP) \r\n\r\n(Excluding Taxes)']}
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="mb-4 mt-16 sm:mt-24">
            <h3 className="text-lg font-medium">Packs</h3>
            <ul>
              {(Array.isArray(packs) && packs.length === 0) ? (
                <p>No packs added</p>
              ) : (
                packs.map((pack, index) => (
                  <li key={index} className="flex justify-between items-center py-2">
                    {pack['Pack name']} - ${pack['Cost of the pack']}
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="text-lg font-semibold">
            Total: ${calculateTotalCost()}
          </div>
          <button className="mt-4 w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Pay Now
          </button>
        </div>
      </div>
    </div>)}
    </div>
  )
}
export default Recharge;

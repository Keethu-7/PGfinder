import React,{ useContext} from 'react';
import logo from '../../images/logo.png';
import girl from '../../images/dashgirl.jpg';
import houseimg from '../../images/houseimg.jpg';
import './dashboard.css';
import { app, database, storage } from "../../firebase";
import { collection, addDoc, getDocs  } from "firebase/firestore";

import { AuthContext } from '../../context';
import { useState } from "react";

import { uploadBytes, getDownloadURL } from "firebase/storage";
import { ref } from "firebase/storage";

import { useEffect } from 'react';

export default function Dashboard() {


  const [data,setData] = useState([]);

  const fetchPost = async () => {
    const db = database;
    await getDocs(collection(db, "pg")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(newData, "newData");
      setData(newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);


  const { user } = useContext(AuthContext);

  const initialvalue = {
    pg_name:"",
    owner_name:"",
    address:"",
    facilities:"",
    rent:"",
    phone:"",
    photo_url:"",

  };
  
  const [pg,setPg] = useState(initialvalue);
  const [urlkey,seturlkey] = useState("");


  const handleChange = (e) => {
    const{name,value} = e.target;
    setPg({...pg,[name]:value});
    console.log(pg);
  };


// handle file input changes
  const [file,setFile] = useState(null);

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
    
  };


  const handleform = () => {
    const PGImageRef = ref(storage, `images/${file.name}`);
    console.log("uploading:");

    console.log(file);
    uploadBytes(PGImageRef, file).then((snapshot) => {
      
      
      
      getDownloadURL(PGImageRef)
        .then((url) => {  
          seturlkey(url);
          setPg({ ...pg, photo: url });
          console.log(url);
          
        })
        .catch((error) => {
          console.log(error);
        });
    });


  };

  const handleAddDoc = () => {
    const dbInstance = collection(database, "pg");
  
            addDoc(dbInstance, {
              ...pg,
            });

  };



  if(user) 
  return (
    <div className='dashboard'>
      <div className='nav'>
        <div className='nav-left'>
        <img src={logo} alt=""></img>
        </div>
        <div className='nav-right'>
          <div className='nav-name'>
            <p>{user.displayName}</p>
          </div>
          <img src={user.photoURL} alt=""></img>
        </div>
      </div>
    
      <div className='dash-cont'>
        <div className='dash-left'>
        <a href="/">Home<br></br></a>
        <a href="/dashboard">Dashboard</a>
        <button className='logout'>Logout</button>
        </div>
        <div className='dash-middle'>
          <h1>DASHBOARD</h1>



          {data.map((data, index) => (
        <div className="pg-box" key={index}>
          <div className="left-section">
            <img src={data.photo} alt="" />
          </div>
          <div className="right-section">
            <div className="pg-details">
              <h1>{data.pg_name}</h1>
              <p>{data.address}</p>
              <p>{data.phone}</p>
              <p>{data.facilities}</p>
              <h2>{data.rent}</h2>
            </div>
            <div className="circle-image">
              <img src={user.photoURL} alt="" />
              <p>{user.displayName}</p>
            </div>
          </div>
        </div>
      ))}


        </div>
        <div className='dash-right'>
          <h1>Add New PG</h1>
          <div className="information">
            <div>
              <div className="form-group">
                <label>PG Name:</label>
                <input type="text" value={pg.pg_name} onChange={handleChange} id="name" name="pg_name" 
                placeholder="Enter pg name"></input>
              </div>
              <div className="form-group">
                <label>Rent:</label>
                <input type="number" id="rent" name="rent" value={pg.rent} onChange={handleChange} 
                placeholder="Enter rent for your pg"></input>
              </div>
              <div className="form-group">
                <label>Photo</label>
                <input type="file" onChange={(event) => handleFileInputChange(event)} accept="image/*" ></input>
                <button onClick={handleform} type="button">Upload</button>
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input type="tel" id="phone" name="phone" value={pg.phone} onChange={handleChange} 
                placeholder="Enter your phone number"></input>
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea id="address" name="address" value={pg.address} onChange={handleChange} 
                placeholder="Enter address"></textarea>
              </div>
              <div className="form-group">
                <label>Facilities:</label>
                <input type="text" value={pg.facilities} onChange={handleChange} id="facilities" name="facilities" 
                placeholder="Enter facilities"></input>
              </div>
              <button onClick={handleAddDoc} type="submit">Submit</button>
            </div>
          </div>
        </div>
          
        
      </div>
    </div>
  );
}
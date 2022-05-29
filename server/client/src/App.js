import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

function App() {
  const [url,setUrl]=useState("");
  const [short,setShort]=useState("");

  const   HandleSubmit=async (e)=>{
      e.preventDefault();
      const resp= await fetch("/",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          longUrl:url
        })
      });
      const data=await resp.json();
      //console.log(data);
      setShort(data.url);

  }

  return (
    <div className="App">
    <form  onSubmit={HandleSubmit}>
        <label>Url: </label>
        <input type="text" onChange={(e)=>setUrl(e.target.value)}></input>
        <input type="submit"></input>
    </form>
    <div className="shorten-class">
        {short ? (
          <div>{`${short}`}</div>) : null}
      </div>
    </div>
  );
}

export default App;

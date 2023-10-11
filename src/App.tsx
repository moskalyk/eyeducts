import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

const Eyezz = () => {
  const [left, setLeft] = useState(false)
  const [right, setRight] = useState(false)
  const [measurement, setMeasurement] = useState(0)
  React.useEffect(() => {
    let interval = setInterval(() => {
      window.dispatchEvent(new Event("storage"))
      console.log(measurement)
      if(measurement != 0){
        if(localStorage.getItem('nonce:log')=== null) localStorage.setItem('nonce:log', String(1))
        else localStorage.setItem('nonce:log', String(Number(localStorage.getItem('nonce:log'))+1))
        localStorage.setItem(`list:${localStorage.getItem('nonce:log')}`, JSON.stringify({measurement: measurement, left: left }))
      }
      setMeasurement(0)
      setLeft(false)
      setRight(false)
    }, 7000)

    return () => clearInterval(interval)
  }, [measurement])

  return (
    <div className="center-container">
      <div className="svg-container">
        <div className="svg" onClick={() => setLeft(true)}>
          <svg style={{ fill: left ? 'black' : 'grey' }}  xmlns="http://www.w3.org/2000/svg" width="244" height="244" viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/></svg>
        </div>
        <div className="svg" onClick={() => setRight(true)}>
          <svg style={{ fill:  right ? 'black' : 'grey' }} xmlns="http://www.w3.org/2000/svg" width="244" height="244" viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/></svg>
        </div>
      </div>
      <div className="input-container">
        <input  value={measurement}type="text" placeholder="1-100" onChange={(evt: any) => setMeasurement(evt.target.value)} />
      </div>
    </div>
  );
}

const Shelf = () => {

  const [logList, setLogList] = useState([])

  React.useEffect(() => {
    const listener = () => {

      const nonceCID = localStorage.getItem("nonce:log") ? localStorage.getItem("nonce:log")! : 0
      const listNames: any = []
      console.log(nonceCID)
      // iterate over localstorage cids
      for(let i = 0; i < Number(nonceCID); i++){
        listNames.push(<li style={{cursor: 'pointer', margin: '10px'}}>{JSON.parse(localStorage.getItem(`list:${i+1}`)!).left ? 'L' : 'R'} {JSON.parse(localStorage.getItem(`list:${i+1}`)!).measurement}</li>)
      }

      // set cids
      setLogList(listNames)
    };
    window.addEventListener("storage", listener);
    return () => {
      window.removeEventListener("storage", listener);
    };
  }, [])

  return(
    <>
      <div style={{textAlign: 'center'}}>
        {logList}
      </div>
    </>
  )
}

function App() {
  return (
    <>
      <Eyezz/>
      <Shelf/>
    </>
  );
}

export default App;

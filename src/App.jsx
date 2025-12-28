
import {useState, useCallback, useEffect, useRef} from 'react'

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //function to generate password -> length inc krne pr bhi
  //  , numbers allowed krne pr bhi and characters allowed 
  // krne pr bhi ye function psw generate krega 
  // const password = () => {};

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(
    ()=>{
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if(numberAllowed) str += "0123456789";
      if(charAllowed) str += "!@#$%~^&*_-+=`";

      for(let i = 1; i <= length; i++){
        let idx  = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(idx);
      }

      setPassword(pass);

    }, 
    [length, numberAllowed, charAllowed, setPassword]

  )

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)
  }, 
  [password])

  useEffect(() => {passwordGenerator()},
  [length, numberAllowed, charAllowed, passwordGenerator])


  return (
  

<div className="w-full max-w-md mx-auto mt-20 p-6 bg-gray-800 rounded-xl shadow-lg">
  <h1 className="text-white text-center text-lg font-medium mb-4">
    Password Generator
  </h1>

  <div className="flex w-full ">

    <input
      type="text"
      value={password}
      placeholder="Password"
      readOnly
      ref = {passwordRef}
      className="w-full py-2 px-3 rounded-md focus:outline-none"
    />
    <button 
    onClick={copyPasswordToClipboard}
    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md">
    copy
    </button>

  </div>

  <div className='flex text-sm gap-x-2 text-orange-500'>
    <div className='flex items-center gap-x-1'>
      <input
       type="range"
       min = {8}
       max = {100}
       value = {length}
       className='cursor-pointer'
       onChange={(e) => {setLength(e.target.value)}}
      />
      <label>Length:{length}</label>
    </div>

    <div className='flex items-center gap-x-1'>
      <input
        type="checkbox"
        defaultChecked = {numberAllowed}
        id = "numberInput"
        className='cursor-pointer'
        onChange={() => {setNumberAllowed((prev) => !prev)}}
        />
        <label htmlFor="numberInput">Numbers</label>
    </div>

    <div className='flex items-center gap-x-1'>
      <input 
        type="checkbox"
        defaultChecked = {charAllowed}
        id = "characterInput"

        className='cursor-pointer'
        onChange={() => {setCharAllowed((prev) => !prev)}}
        />
        <label htmlFor="characterInput">Characters</label>
    </div>
    
  </div>
</div>


    
    
  )
}

export default App

import React ,{ useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './styles.css';
import './queries.css';

export default function App()
{
    const Numbers='0123456789'
    const Uppercase='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const Lowercase='abcdefghijklmnopqrstuvwxyz'
    const Symbols='!@#$%^&*'

    const COPY_Fail='Password copy failed'
    const COPY_SUCCESS='Password copied Successfully'

    const [passwordLength,setLength]=useState(0);
    const [strength,setstrength]=useState("");
    const [password,setPassword]=useState("");
    const [IncludeNumbers,setNumbers]=useState(false);
    const [IncludeUppercase,setUppercase]=useState(false);
    const [IncludeSymbols,setSymbols]=useState(false);
    const [IncludeLowercase,setLowercase]=useState(false);

    const handleUppercaseChange = (e) => {
      const isChecked = e.target.checked;
      setUppercase(isChecked);
      updateStrength(isChecked, IncludeNumbers, IncludeSymbols, IncludeLowercase);
    };
  
    const handleLowercaseChange = (e) => {
      const isChecked = e.target.checked;
      setLowercase(isChecked);
      updateStrength(IncludeUppercase, IncludeNumbers, IncludeSymbols, isChecked);
    };
  
    const handleNumberChange = (e) => {
      const isChecked = e.target.checked;
      setNumbers(isChecked);
      updateStrength(IncludeUppercase, isChecked, IncludeSymbols, IncludeLowercase);
    };
  
    const handleSymbolsChange = (e) => {
      const isChecked = e.target.checked;
      setSymbols(isChecked);
      updateStrength(IncludeUppercase, IncludeNumbers, isChecked, IncludeLowercase);
    };

    const handleLengthChange = (e) => {
      const num = Number(e.target.value);
      setLength(num);
      updateStrength(IncludeUppercase, IncludeNumbers, IncludeSymbols, IncludeLowercase);
    };
  
    
    const generate_password=(e)=>
    {
      e.preventDefault()
      let characters=''

      if(!IncludeLowercase && !IncludeNumbers && !IncludeSymbols && !IncludeUppercase)
        notify("Select atleast one checkbox to generate password", true)
      else
      {
        if(IncludeLowercase)
          characters+=Lowercase
        if(IncludeUppercase)
          characters+=Uppercase
        if(IncludeNumbers)
          characters+=Numbers
        if(IncludeSymbols)
          characters+=Symbols

        setPassword(create_password(characters))
        updateStrength(IncludeUppercase, IncludeNumbers, IncludeSymbols, IncludeLowercase);

        notify("Password is generated successfully", false)
      }
    }

    function create_password(characters)
    {
      const length = characters.length;
      let password = '';
      for (let i = 0; i < passwordLength; i++) {
        const index = Math.floor(Math.random() * length);
        password += characters.charAt(index);
      }
      return password;
    }

    const notify = (message, hasError = false) => {
      if (hasError) {
        toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else {
        toast(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }

    const handleCopyPassword = (e) => {
      e.preventDefault()
      if (password === "") {
        notify(COPY_Fail, true)
      }
      else {
        navigator.clipboard.writeText(password);
        notify(COPY_SUCCESS,false)
      }
    }
  
    function updateStrength(IncludeUppercase, IncludeNumbers, IncludeSymbols, IncludeLowercase)
    {
      const typesIncluded = [IncludeUppercase, IncludeNumbers, IncludeSymbols, IncludeLowercase].filter(Boolean).length;

      if (typesIncluded >3 && passwordLength>15) 
        setstrength("Very Strong");
      else if (typesIncluded >3 && passwordLength<15) 
        setstrength("Strong");
      else if (typesIncluded>1)
        setstrength("Medium");
      else if (typesIncluded===1 && passwordLength>15)
        setstrength("Weak");
      else if (typesIncluded===1 && passwordLength<15)
        setstrength("Very Weak");
    }

    const getBarClass = (barIndex) => {
      if (strength === "Strong" || strength === "Very Strong") return "bar strong";
      if (strength === "Medium" && barIndex < 2) return "bar medium";
      if ((strength === "Weak" || strength === "Very Weak") && barIndex < 1) return "bar weak";
      return "bar";
    };

return(
  <main class="container">
      <h1>Password Generator</h1>
      
      <form class="password-settings">

      <div class="password-field">
        <span class="password-display">
          <div class="box"><span class="password-placeholder">{password}</span></div>
        </span>

        <div class="copy-wrapper">
          <span class="copied-text"></span>
          <button class="copy-btn button1" onClick={handleCopyPassword}>Copy</button>
        </div>

      </div>
        <div class="char-length">
          <p>Character Length</p>
          <span class="char-count">{passwordLength}</span>
        </div>
        <input 
          class="char-length-slider" 
          aria-label="Password length" 
          type="range" 
          min="1" 
          max="20" 
          value={passwordLength} 
          autocomplete="off"
          onChange={handleLengthChange}
        />
        
        <div class="char-include-group">
          <label>
            <input type="checkbox" id="uppercase" value="uppercase" checked={IncludeUppercase} onChange={handleUppercaseChange}/>
            <span class="custom-checkbox"></span>
            <p>Include Uppercase Letters</p>
          </label>
          <label>
            <input type="checkbox" id="lowercase" value="lowercase" checked={IncludeLowercase} onChange={handleLowercaseChange}/>
            <span class="custom-checkbox"></span>
            <p>Include Lowercase Letters</p>
          </label>
          <label>
            <input type="checkbox" id="numbers" value="numbers" checked={IncludeNumbers} onChange={handleNumberChange}/>
            <span class="custom-checkbox"></span>
            <p>Include Numbers</p>
          </label>
          <label>
            <input type="checkbox" id="symbols" value="symbols" checked={IncludeSymbols} onChange={handleSymbolsChange}/>
            <span class="custom-checkbox"></span>
            <p>Include Symbols</p>
          </label>
        </div>

        <div class="strength-box">
          <span class="strength-label">Strength</span>
          <div class="strength-rating">
            <span class="strength-rating-text">{strength}</span>
            <div class="strength-rating-bars">
              <div className={getBarClass(0)}></div>
              <div className={getBarClass(1)}></div>
              <div className={getBarClass(2)}></div>
            </div>
          </div>
        </div>

        {/* <div className="strength-box">
          <span className="strength-label">Strength</span>
          <div className="strength-rating">
            <span className="strength-rating-text">{strength}</span>
            <div className="strength-rating-bars">
              <div className={getBarClass(0)}></div>
              <div className={getBarClass(1)}></div>
              <div className={getBarClass(2)}></div>
            </div>
          </div>
        </div> */}

        <button class="generate-btn" type="submit" onClick={generate_password}>
          <span>Generate</span>
          <svg 
            width="12" 
            height="12" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path 
              fill="#24232C" 
              d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"/>
          </svg>
        </button>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </form>
  </main>

    )}

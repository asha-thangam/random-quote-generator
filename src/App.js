import "./Quote.css";
import img from './image/bg.jpg';
import axios from "axios";
import {useState, useEffect } from "react";
const App = () =>{
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  
  const quoteAPI = async() =>{
    let arrayOfQuotes = [];
    try{
        const data = await axios.get("https://api.quotable.io/random");
        console.log(data);
        arrayOfQuotes = data.data;
    }
    catch(error){

    }
    try{
      setQuote(arrayOfQuotes.content);
      setAuthor(arrayOfQuotes.author);
    }catch(error){
      console.log(error);
    }
  }

  const soundgen = () =>{
    console.log("called");
    //SpeechSynthesisUtterance is a web speech api that represents a speech request
    let utterance =  new SpeechSynthesisUtterance(`${quote} by ${author}`);
    speechSynthesis.speak(utterance);
  }

  const cpy = () =>{
    //writeText() property writes the specified text string to the system clipboard.
    navigator.clipboard.writeText(quote);
  }

  const tweet = () =>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quote}`;
    //opening a new twitter tab with passing quote in the url
    window.open(tweetUrl,"_blank");
  }
  useEffect(()=>{
    quoteAPI();
  },[])

  return <div className='body'>
    <div className='wrapper'>

      <h1>Quote of the day</h1>

      <div className="content">
      <div className='quote-area'>
        <i className='fas fa-quote-left'></i>
        <p className="quote">{quote}</p>
        <i className='fas fa-quote-right'></i>
      </div>

      <div className='author'>
        <span>__</span>
        <span className='name'>{author}</span>
      </div>
        <div className='buttons'>
          <div className='features'>
            <ul>
              <li className='sound' ><i className='fas fa-volume-up' onClick={soundgen}></i></li>
              <li className='copy'><i className='fas fa-copy' onClick={cpy}></i></li>
              <li className='twitter'><i className='fab fa-twitter' onClick={tweet}></i></li>
            </ul>
            <button onClick={quoteAPI}>NEW QUOTE</button>
          </div>
        </div>
    </div>
    </div>
  </div>;
}


export default App;

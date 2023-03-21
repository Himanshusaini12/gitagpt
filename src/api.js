import React, { useState ,useRef} from 'react';
import song from './song.mp3';
import './gita.css'
function GitaQuery() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const audio = new Audio(song);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setResponse('');
   

    audio.play();
    const url = `https://nod.himasaini6.repl.co/gita?q=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();
    setResponse(data.response.replace(/GitaGpt\.org/g, 'Gita AI'));
    console.log(data.response);


  };

  return (
    <div>
      <form className='con' onSubmit={handleSubmit}>
        <label className='label'>
           Ask Krishna:
          <input className='count-input ' type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <button className='submit-button' type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Solution:</h2>
          <p className='count-input '>{response}</p>
        </div>
      )}
    </div>
  );
}

export default GitaQuery;

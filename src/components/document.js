import PDFUploader from './pdfuploader';
import { useState } from 'react';
import '../css/centre.css'

function Document(props) {
   const [exists, setExists] = useState(true)
   const checkExists = () => {
     // checks DB if this form has been uploaded before
   }

  return (
    <div className='centre'>
      <h1>{props.selected}</h1>
      <PDFUploader />

      {exists &&

      <h1>asdsa</h1>

      }
    </div>
  );
}

export default Document;

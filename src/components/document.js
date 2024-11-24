import PDFUploader from './pdfuploader';
import { useState } from 'react';

function Document(props) {

  return (
    <div>
      <h1>{props.selected} im going to kms</h1>

      <PDFUploader />
    </div>
  );
}

export default Document;

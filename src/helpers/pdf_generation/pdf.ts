import * as pdf from "html-pdf";
import { Readable } from 'stream';
import fs from "fs";
import path from "path";
import Process from "../../modules/process/process.model";
import { createHTML } from "./pdf_html";
// Define el HTML que quieres convertir a PDF

// Configura las opciones de PDF
const options: pdf.CreateOptions = {
  format: 'Letter',
  border: {
    top: '0.5in',
    right: '0.5in',
    bottom: '0.5in',
    left: '0.5in',
  },
};

export const create = (data: Process) => {
  const html: string = createHTML(data);
  pdf.create(html, options).toStream((err, stream) => {
    if (err) {
      console.error(err);
      return;
    }
    
    const carpeta = path.join(__dirname,'../../../uploads/pdfs');
    
    if (!fs.existsSync(carpeta)) {
      fs.mkdirSync(carpeta);
    }
    

    // Haz algo con el stream de salida, por ejemplo, guardarlo en un archivo
    const writeStream = fs.createWriteStream(path.join(__dirname,'../../../uploads/pdfs/',name + '.pdf'));
    stream.pipe(writeStream);
  });
  const name = data.name.replace(' ','');

  const url = `pdfs/${name}.pdf`
  return url;
}
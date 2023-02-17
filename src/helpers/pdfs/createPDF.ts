const PDFDocument = require('pdfkit');


const createPDF = (
  name: any,
  object: any,
  identifier: any,
  indicators: any,
  flujo_digramS: any,
  flujo_digramI: any,
  responsable: any,
  participantes: any,
  evidencia_entradaS: any,
  evidencia_entradaI: any,
  evidencia_salidaS: any,
  evidencia_salidaI: any,
  frecuencia: any,
  fase: any,
  last_edited: any
) => {
  
    const doc = new PDFDocument();

    doc.fontSize(25).text(name);

    return doc;
};

export default createPDF;

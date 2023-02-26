import Process from "../../modules/process/process.model";

export const createHTML = (data: Process): string => {
    return `<html>
                <body>
                    <h1>Procesos de ${data.fase.nombre}</h1>
                    <div>
                        <p><span>Nombre: </span>${data.name}</p>
                        <p><span>Objetivo: </span>${data.object ? data.object : 'S/objetivo'}</p>
                        <p><span>Inidicadores y métricas: </span>${data.indicators ? data.indicators : 'S/indicators'}</p>
                    </div>
                    <div>
                        <span>Descripción de actividades</span>
                        <br>
                        <p>${data.description ? data.description : "S/Descripción"}</p>
                    </div>
                    <div>
                        <span>Diagrama de Flujo: </span>
                        <p><span>Responsable: </span>${data.responsable.name.toLocaleUpperCase()}</p>
                        <p><span>Url: </span><a href="${data.flujo_digram}">${data.flujo_digram ? data.flujo_digram : "S/Diagrama"}</a></p>
                    </div>
                    <div>
                        <p><span>Responsable: </span>${data.responsable.name.toLocaleUpperCase()}</p>
                        <p><span>Participantes: </span>
                        
                        </p>
                        <p><span>Proceso Relacionado: </span>Ninguno</p>
                    </div>
                    <div>
                    <p><span>Evidencias de entrada</span>
                    ${
                        data.evidencia_entrada.length > 0 ?
                            data.evidencia_entrada.map((e, i) => 
                            `<p><span>Evidencia de entrada${i + 1}: </span><a href="${e.url}">${e.url}</a></p>`
                            ).join('') : 'S/Evidencias'
                    }
                    </p>
                    <p><span>Evidencias de salida</span>
                    ${
                        data.evidencia_salida.length > 0 ?
                        data.evidencia_entrada.map((e, i) => 
                        `<p><span>Evidencia de entrada${i + 1}: </span><a href="${e.url}">${e.url}</a></p>`
                        ).join('') : 'S/Evidencias'
                    }
                    </p>
                    </div>
                    <p><span>Frecuencia: </span> Cada vez que se desee iniciar la fase</p>
                    
                </body>
            </html>`;
}
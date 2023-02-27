import Process from "../../modules/process/process.model";

export const createHTML = (data: Process): string => {
    return `<html>
                <body>
                    <h1>Procesos de ${data.fase.nombre}</h1>
                    <hr>
                    <div>
                        <p id="nombre"><span>Nombre: </span>${data.name}</p>
                        <p><span>Objetivo: </span>${data.object ? data.object : 'S/objetivo'}</p>
                        <p><span>Inidicadores y métricas: </span>${data.indicators ? data.indicators : 'S/indicators'}</p>
                    </div>
                    <div>
                        <span>Descripción de actividades</span>
                        <br>
                        <p>${data.description ? data.description : "S/Descripción"}</p>
                    </div>
                    <div id="tituloD">
                        <span id="DF">Diagrama de Flujo: </span>
                        <p><span>Responsable: </span>${data.responsable.name.toLocaleUpperCase()}</p>
                        <p><span>Url: </span><a href="${data.flujo_digram}">${data.flujo_digram ? data.flujo_digram : "S/Diagrama"}</a></p>
                    </div>
                    <div>
                        <p><span>Responsable: </span>${data.responsable.name.toLocaleUpperCase()}</p>
                        
                        
                        </p>
                        <p><span>Proceso Relacionado: </span>Ninguno</p>
                    </div>
                    <div>
                    <p id="tituloEv"><span >Evidencias de entrada</span>
                    ${
                        data.evidencia_entrada.length > 0 ?
                            data.evidencia_entrada.map((e, i) => 
                            `<p><span>Evidencia de entrada${i + 1}: </span><a href="${e.url}">${e.url}</a></p>`
                            ).join('') : 'S/Evidencias'
                    }
                    </p>
                    <p id="tituloEv"><span >Evidencias de salida</span>
                    ${
                        data.evidencia_salida.length > 0 ?
                        data.evidencia_salida.map((e, i) => 
                        `<p><span>Evidencia de salida${i + 1}: </span><a href="${e.url}">${e.url}</a></p>`
                        ).join('') : 'S/Evidencias'
                    }
                    </p>
                    </div>
                    <p><span>Frecuencia: </span> Cada vez que se desee iniciar la fase</p>
                    <style>
                        html {
                            font-family: sans-serif;
                            color: #3E3E3E
                        }
                        h1 {
                            font-size: 2.5em;
                            font-weight: 900;
                        }
                        hr {
                            border: none;
                            background: #3E3E3E;
                            height: 0.35em;
                            margin-bottom: 2em;
                        }
                        span {
                            font-weight: 700;
                            font-size: 1.2em;
                        }
                        #nombre {
                            font-weight: 700;
                            font-size: 1.4em;
                            margin-bottom: 1.5em;
                        }
                        p {
                            font-size: 1.1em;
                        }
                        #tituloEv{
                            margin-top: 2.5em;
                        }
                        #tituloEv span{
                            font-size: 1.4em;
                        }
                        #tituloD{
                            margin-top: 2.25em;
                        }
                        #tituloD #DF{
                            font-size: 1.4em;
                        }
                    </style>
                </body>
            </html>`;
}
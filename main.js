function init(){

    document.getElementById("nombre").addEventListener("keyup", function () {
        enviarBusqueda(document.getElementById("nombre").value);
    });

}


function enviarBusqueda(text) { //Enviar busqueda para guardarla vía AJAX con método POST
 
    if(!(text=="")){
         // creo el objeto que realizara la llamada
    let llamada = new XMLHttpRequest();
 
    // url del php a llamar
    let url = "buscanombres.php";
 
    // Indico los parametros que voy a mandar
    let params = "busqueda=" + text; //Le estoy diciendo que lo que le voy a enviar vía POST va a ser un texto, el que escribe el usuario
 
    // Funcion que se ejecutara al recibir la respuesta
    llamada.onreadystatechange = function () {
        // si todo esta bien
        if (this.readyState === 4 && this.status === 200) {
 
            let busquedaRecibida = JSON.parse(this.responseText);
            console.log("Se ha insertado correctamente: " , busquedaRecibida);
            crearLista(busquedaRecibida); 
 
        }
    }
 
    // Indico que es una peticion POST
    llamada.open("POST", url, true);
    // Esta linea es necesaria en una peticion POST
    llamada.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    llamada.send(params); // Le paso los parametros

    } else {
        let divresultados=document.getElementById("resultados"); 
        divresultados.innerHTML = "";
    } 
}

function crearLista(busquedaRecibida){

    if(busquedaRecibida!=null){

        let divresultados=document.getElementById("resultados"); 
        divresultados.innerHTML = "";

        let mainul=document.createElement("ul");

      

        for (let i = 0; i < busquedaRecibida.length; i++) {

            let li=document.createElement("li");
            let livalor=document.createTextNode(busquedaRecibida[i]);
    
            li.appendChild(livalor);
            mainul.appendChild(li);
            
        }
        divresultados.appendChild(mainul); 

    }
}


window.onload = init
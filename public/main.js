let socket = io.connect("http://localhost:3000", { "forceNew": true });
var oferta = 150000000
var entro = 0;
var rs = "";
var pb = 0;
var po = 0;
var estadoOferta = "[Oferta no aceptada]"
var gano = false;

socket.on("messages", data => {
    console.log("DATA: ", data);
    console.log("DATANUM: ", data[data.length-1].ofertanum);
    this.oferta = data[data.length-1].ofertanum;
    this.gano = data[data.length-1].gano;
    if(this.gano){
    document.getElementById("oferta").disabled = true;
    }
    render(data);
    entro++;
});

function render(data) {
    let html = data.map((e) => {
        return (`
            <div>
                ${e.razonsocial}
                ${e.oferta}
            </div>
        `);
    }).join(" ");

    document.getElementById("messages").innerHTML = html;
}

function enableButton(){
    this.rs = document.getElementById("razonsocial").value
    document.getElementById("oferta").disabled = false;
    document.getElementById("registro").disabled = true;
}

function setDisabled() {
    document.getElementById('oferta').disabled = false;
}

function addMessage() {
    if(this.entro!=0){
        this.oferta = this.oferta + Math.round(Math.random()*5000000) + 5000000;
    }
    this.po = Math.round(Math.random()* 0.5*10)/10 +0.3
    this.pb = Math.round(Math.random()* 0.5*10)/10 +0.3
    document.getElementById('oferta').disabled = true;
    if(po>pb){
        estadoOferta = "[Oferta aceptada. Valor: $"+this.oferta+"]" 
        this.gano = true;
    }
    else{
    window.setTimeout(setDisabled, 30000);
    }
    console.log("pb", pb, "  po", po)
    let message = {
        razonsocial: rs,
        oferta: this.estadoOferta,
        ofertanum: this.oferta,
        gano: this.gano
    };
    console.log("Emitting new message");
    socket.emit("new-message", message);
    document.getElementById("nit").value = "";    
    
    return false;
}

// Funzione per creare numeri random
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Funzione per prendere i numeri pari e dispari
function isEven(num){
    if(num % 2 === 0){
        return true;
    } else {
        return false;
    }
}

// Funzione per far apparire messaggi di errore
function notificationError(msgError){
    const alerta = document.createElement('div');
    alerta.className='alert alert-danger';
    alerta.innerHTML = msgError;
    return alerta;
}
function removeFirstNotification(){
    const alertToRemove = document.querySelector('.alert');
    console.log(alertToRemove);
   if(alertToRemove) alertToRemove.remove();
}
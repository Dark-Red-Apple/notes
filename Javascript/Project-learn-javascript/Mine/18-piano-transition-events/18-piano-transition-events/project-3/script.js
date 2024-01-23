const note = document.querySelector('.nowplaying');
const keys = document.querySelectorAll('.key');

window.addEventListener('keydown' , function(e) {
    console.log(e.key)
    const key = document.querySelector(`.key[data-key="${e.key}"]`)
 
    if(! key) return;

    const keyNote = key.getAttribute('data-note');
 
    key.classList.add('playing');
    note.innerHTML = keyNote;
    
    audioObj = new Audio(getAudio(keyNote));
    audioObj.play()

});

function removeTransition() {
    this.classList.remove('playing')
}

keys.forEach(key => key.addEventListener('transitionend' , removeTransition))


function getAudio(note){

    switch(note){
        case 'C':
            return './static/040.wav'
        case 'C#':
            return './static/041.wav'
        case 'D':
            return './static/042.wav'
        case 'D#':
            return './static/043.wav'
        case 'E':
            return './static/044.wav'
        case 'F':
            return './static/045.wav'            
        case 'F#':
            return './static/046.wav'            
        case 'G':
            return './static/047.wav'
        case 'G#':
            return './static/048.wav'
        case 'A':
            return './static/049.wav'
        case 'A#':
            return './static/050.wav'
        case 'B':
            return './static/051.wav'
        case 'C':
            return './static/052.wav'
        case 'C#':
            return './static/053.wav'
        case 'D':
            return './static/054.wav'
        case 'D#':
            return './static/055.wav'
        case 'E':
            return './static/056.wav'

    }

}
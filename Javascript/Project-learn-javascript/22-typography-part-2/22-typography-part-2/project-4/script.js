const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 500; // 500 px

hero.addEventListener('mousemove' , function(event) {
    const { offsetWidth : width , offsetHeight : height } = hero; 
    let { offsetX : x , offsetY : y } = event;
	
	console.log(' *******************  ' )
	console.log('width:' + width , 'height:' + height )
	console.log('event x:' + x, 'event y:' +  y )
	console.log('event target left:' + event.target.offsetLeft, 'event target top:' +  event.target.offsetTop )
    x += event.target.offsetLeft;
    y += event.target.offsetTop;

    const xWalk = Math.round((x / width * walk) - (walk / 2))
    const yWalk =  Math.round((y / height * walk) - (walk / 2))
	
	console.log('x:' + x , 'y:' + y )
	console.log('x / width:' +  x / width , 'y / width:' +  y / height )
	console.log('walk x:' + x / width * walk , 'walk y:' + y / height * walk )
		
    console.log('xWalk:' + xWalk , 'yWalk:' + yWalk);

    text.style.textShadow = `
        ${xWalk}px ${yWalk}px 0 rgba(238 ,82,83,.7),
        ${xWalk * -1}px ${yWalk}px 0 rgba(52 ,31,151,.7),
        ${yWalk}px ${xWalk * -1}px 0 rgba(243 ,104,224,.7),
        ${yWalk * -1}px ${xWalk}px 0 rgba(254 ,202,87,.7)
    `
})
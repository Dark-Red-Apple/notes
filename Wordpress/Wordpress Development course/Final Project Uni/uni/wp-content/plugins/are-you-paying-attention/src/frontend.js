
import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import "./frontend.scss"

document.addEventListener("DOMContentLoaded", function(){
    
// select all instances of that block type. don't forget the dot!
const divsToUpdate = document.querySelectorAll(".paying-attention-update-me")

//foreach create a component
divsToUpdate.forEach(function(div){
// get attributes from index.php
    const data = JSON.parse(div.querySelector("pre").innerHTML)
    ReactDOM.render(<Quiz {...data} />, div)
    //to run the code on the fly, if new posts are added by lazy loading, what elements have already been hydrated with javascript
    // so we don't update them again if new ones are added
    div.classList.remove("paying-attention-update-me")
})

// JSX component
function Quiz(props){

    //react useState() will return an array, the first easy access to state, second to change it. 
    // undefined default value
    const [isCorrect, setIsCorrect] = useState(undefined)
    const [isCorrectDelayed, setIsCorrectDelayed] = useState(undefined)

    function handleAnswer(index){
        if(props.correctAnswer == index){            
            setIsCorrect(true)
            // you can't use selectors with react
            // document.querySelector('.correct-message').classList.add('correct-message__visible')
        }else{
            setIsCorrect(false)
        }
    }

    // to allow multiple click on wrong answers
    React.useEffect(() => {
        // alert(isCorrect) // order of alert: undefined - true/false - undefined
        if(isCorrect === false){
            setTimeout(() => {
                setIsCorrect(undefined)
            }, 1400);
        }
        // to animate the final change on answers
        if(isCorrect === true){
            setTimeout(() => {
                // use another state for this
                setIsCorrectDelayed(true)
            }, 600);
        }
      }, [isCorrect]);

    return (
        <div className="paying-attention-frontend" style={{backgroundColor: props.bgColor, textAlign: props.theAlignment}} >
            <p >
                {props.question}                
            </p>
            <ul>
                {props.answers.map(function(answer, index){
                    return (
                        // the parenthesis in className is required
                    <li className = {(isCorrectDelayed === true && index == props.correctAnswer ? "no-click" : "") + (isCorrectDelayed === true && index != props.correctAnswer ? "fade-incorrect" : "")} onClick={isCorrect === true ? '' : () => handleAnswer(index) }>
                        {/* the && says only before is true include it since we can't set if in jsx */}
                        {isCorrectDelayed === true && index == props.correctAnswer && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" stroke="black" stroke-width="1" className="bi bi-check paying-attention-frontend--icon-correct" viewBox="0 0 16 16" >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                            </svg>
                        )}
                        {isCorrectDelayed === true && index != props.correctAnswer && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" stroke="black" stroke-width="1" className="bi bi-x paying-attention-frontend--icon-wrong" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        )}
                        
                        {answer}
                    </li>)
                })} 
            </ul>
            <div className={"correct-message " + ( isCorrect === true ? "correct-message--visible" : "" )} >
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="bi bi-emoji-smile" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                    </svg>
                    &nbsp;
                    That is correct!
                    </p>
            </div>
            <div className={"incorrect-message " + ( isCorrect === false ? "incorrect-message--visible" : "" )} >
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="bi bi-emoji-frown" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                    </svg>
                    &nbsp;
                    Sorry!
                </p>
            </div>
            
        </div>
    )
}


})
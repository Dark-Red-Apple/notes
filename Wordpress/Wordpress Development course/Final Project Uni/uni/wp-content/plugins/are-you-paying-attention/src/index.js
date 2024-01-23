// usually you need to install with npm but, npm start run the automated solution that we wrote
// handles it and it sees it can find it within the global scope of wordpress
// when they created this package the made sure when certain names show it converts is to
// a reference that looks in the browser global scope
// also with import react and reactDOM, it won't bundle up of another copy of duplicate react
// wordpress loads a copy of react for us. So the visitors don't need to download our copy

//destructuring 
import {TextControl, Flex, FlexBlock, FlexItem, Button, Icon, PanelBody, PanelRow, ColorPicker} from "@wordpress/components"
import "./index.scss"
import {InspectorControls, BlockControls, AlignmentToolbar, useBlockProps} from "@wordpress/block-editor"
import {ChromePicker} from "react-color"

// immediately invoked function expression(IIFE), to avoid unique names
// variables scope only limited to the function
//this function will lock the save button if we don't chose a correct answer
(function (){
    let locked = false;

    wp.data.subscribe(function(){
        //check all the instances of block
        const results = wp.data.select("core/block-editor").getBlocks().filter(function(block){
            return block.name == "ourplugin/are-you-paying-attention" && block.attributes.correctAnswer == undefined
        })
        
        if(results.length && locked == false){
            locked = true
            wp.data.dispatch("core/editor").lockPostSaving("noanswer")
        }
        if(!results.length && locked ){
            locked = false
            wp.data.dispatch("core/editor").unlockPostSaving("noanswer")
        }
    })
})()


wp.blocks.registerBlockType('ourplugin/are-you-paying-attention', {
    title: "Are You Paying Attention",
    icon: "smiley",
    category: "common",
    attributes: {
        // multiple choice block
        question: {type: "string"},
        //array because of multiple answers, that we can loop through, default we want at least one to appear in admin
        answers: {type: "array", default: [""]},
        correctAnswer: {type: "number", default: undefined},
        bgColor: {type: "string", default: "#EBEBEB"},
        theAlignment:{type:"string", default: "left"}

    },
    description: 'This is a quiz block',
    example: {
        attributes: {        // multiple choice block
            question: "What is my name",
            answers: ['Meowsalot', 'Barksalot', 'Purrsalot'],
            correctAnswer: 3,
            bgColor: 'center',
            theAlignment:'#9ED3C8'
        }
    },
    //admin screen
    edit: EditComponent,
    //public sees
    // this is what we see
    save: function(props){
        return null  
    },
}); 

// in react uppercase component, write a function for edit here, it's better
function EditComponent (props){

    const blockProps = useBlockProps({
        className: "paying-attention-edit-block",
        style: {backgroundColor: props.attributes.bgColor}
    });

    function updateQuestion(value){
        // update the js attribute in memory, it merges with it, the things we update
        props.setAttributes({question: value})
    }

    function deleteAnswer(indexToDelete){
        const newAnswers = props.attributes.answers.filter((item, index)=>{
            return index != indexToDelete
        })
        props.setAttributes({answers: newAnswers })

        if(indexToDelete == props.attributes.correctAnswer){
            props.setAttributes({correctAnswer: undefined })
        }
        
    }

    function markAsCorrect(index){
        if(props.attributes.correctAnswer == index){
            props.setAttributes({correctAnswer: undefined })
        }else{
            props.setAttributes({correctAnswer: index })
        }
    }

    return (
        <div {...blockProps} >
            <BlockControls>
                <AlignmentToolbar value={props.attributes.theAlignment} onChange={x => props.setAttributes({theAlignment:x})} />
            </BlockControls>
            <InspectorControls> 
                <PanelBody title="Background Color">
                    <PanelRow>
                        <ChromePicker color={props.attributes.bgColor} onChangeComplete ={x => props.setAttributes({bgColor: x.hex})} />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>

             {/* the second {} is for the object with different properties */}
            <TextControl label="Question:" value = {props.attributes.question} onChange = {updateQuestion}  style={{fontSize: '20px'}} />
            <p style={{ fontSize: '13px', margin: "20px 0 8px 0"}}>Answers:</p>
            {/* map for array js runs the function once fo each array */}
            {props.attributes.answers.map((answer, index)=>{
                // in JSX return () for multiple lines.
                return (
                <Flex>
                    <FlexBlock>
                        <TextControl value ={ answer } onChange = { (newValue) => {
                            const newAnswers = props.attributes.answers.concat([])
                            newAnswers[index] = newValue
                            props.setAttributes({answers: newAnswers })
                        }} />
                    </FlexBlock>
                    <FlexItem>
                        <Button onClick = {() => markAsCorrect(index)}> 
                            <Icon className ="mark-as-correct" icon={(props.attributes.correctAnswer == index ) ? "star-filled" : "star-empty"} />
                        </Button>
                    </FlexItem>
                    <FlexItem>
                        <Button isLink className ="attention-delete" onClick={() => deleteAnswer(index)} >
                            Delete
                        </Button>
                    </FlexItem>
                </Flex>
                )
            })}
            <Button isPrimary onClick={()=>{
                props.setAttributes({answers: props.attributes.answers.concat([""]) })
            }}>Add another answer</Button>
        </div>
    )
}


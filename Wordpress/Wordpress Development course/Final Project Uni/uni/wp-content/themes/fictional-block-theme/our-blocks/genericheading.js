//this is optional: not to use wp.blocks.registerBlockType
import {registerBlockType} from "@wordpress/blocks"
import {RichText, BlockControls} from "@wordpress/block-editor"
import {ToolbarGroup, ToolbarButton}  from "@wordpress/components"

registerBlockType("ourblocktheme/genericheading", {
    title: "Generic Heading",
    attributes: {
        text: {type: "string"},
        size: {type: "string", default: "large"}
    },
    edit: EditComponent,
    save: SaveComponent
} )



function EditComponent(props){
    function handleTextChange(x){
        //s is needed attributes
        props.setAttributes({text: x})
    }

    return(
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton isPressed={props.attributes.size === "large"} onClick={()=> props.setAttributes({size: "large"})}>Large</ToolbarButton>
                    <ToolbarButton isPressed={props.attributes.size === "medium"} onClick={()=> props.setAttributes({size: "medium"})}>Medium</ToolbarButton>
                    <ToolbarButton isPressed={props.attributes.size === "small"} onClick={()=> props.setAttributes({size: "small"})}>Small</ToolbarButton>
                </ToolbarGroup>
            </BlockControls>
            <RichText allowedFormats={["core/bold", "core/italic"]} tagName="h1" className={`headline headline--${props.attributes.size}`} value={props.attributes.text} onChange={handleTextChange} />
        </>
    )
}

function SaveComponent(props){
    function createTagName(){
        switch(props.attributes.size){
            case "large":
                return "h1"
            case "medium":
                return "h2"
            case "small":
                return "h3"
        }
    }
    //  richtext not needed if we wont have nested inner elements like strong, italic
    return (
        <RichText.Content value={props.attributes.text} tagName={createTagName()} className={`headline headline--${props.attributes.size}`}  />
    )
}
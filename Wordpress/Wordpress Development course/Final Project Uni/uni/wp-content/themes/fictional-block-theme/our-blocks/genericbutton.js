//this is optional: not to use wp.blocks.registerBlockType
import {registerBlockType} from "@wordpress/blocks"
import {RichText, InspectorControls, BlockControls, __experimentalLinkControl as LinkControl, getColorObjectByColorValue} from "@wordpress/block-editor"
import {ToolbarGroup, ToolbarButton, Popover, Button, PanelBody, PanelRow, ColorPalette}  from "@wordpress/components"
// import link icon
import {link } from "@wordpress/icons"
// element is an alias react here but for abstraction layer if they want to use another library in the future 
import {useState} from "@wordpress/element"
import ourColors from '../inc/ourColors'

registerBlockType("ourblocktheme/genericbutton", {
    title: "Generic Button",
    attributes: {
        text: {type: "string"},
        size: {type: "string", default: "large"},
        // multiple pieces as object is stored via linkControl, like id, url, if you don't add default it will not work
        linkObject: {type: "object", default: {url: ""}},
        colorName: {type: "string", default: "blue"}
    },
    edit: EditComponent,
    save: SaveComponent
})

function EditComponent(props){
    // we don't want to store it in db, use state    
    const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false)

    function handleTextChange(x){
        //s is needed attributes
        props.setAttributes({text: x})
    }

    function buttonHandler(){
        // the opposite of previous value to toggle
        setIsLinkPickerVisible(prev => !prev)
        
    }

    function handleLinkChange(newLink){
        props.setAttributes({linkObject: newLink})
    }

    function handleColorChange(colorCode){
        // from the hex value that the color palette gives us, we need to find its color name
        const {name} = getColorObjectByColorValue(ourColors, colorCode)
        console.log(name)
        props.setAttributes({colorName: name})
    }

    const currentColorValue = ourColors.filter(color => {
        return color.name == props.attributes.colorName
    })[0].color

    return(
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton onClick={buttonHandler} icon={link} />
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarButton isPressed={props.attributes.size === "large"} onClick={()=> props.setAttributes({size: "large"})}>Large</ToolbarButton>
                    <ToolbarButton isPressed={props.attributes.size === "medium"} onClick={()=> props.setAttributes({size: "medium"})}>Medium</ToolbarButton>
                    <ToolbarButton isPressed={props.attributes.size === "small"} onClick={()=> props.setAttributes({size: "small"})}>Small</ToolbarButton>
                </ToolbarGroup>
            </BlockControls>
            <InspectorControls>
                <PanelBody title="Color" initialOpen={true}>
                    <PanelRow>
                        <ColorPalette disableCustomColors = {true} clearable = {false} colors={ourColors} value={currentColorValue} onChange={handleColorChange} />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <RichText allowedFormats={[]} tagName="a" className={`btn btn--${props.attributes.colorName} btn--${props.attributes.size}`} value={props.attributes.text} onChange={handleTextChange} />
            {isLinkPickerVisible && (
                <Popover position="middle center">
                    <LinkControl settings={[]} value={props.attributes.linkObject} onChange={handleLinkChange} />
                    <Button variant="primary" onClick={()=> setIsLinkPickerVisible(false)} style={{display: "block", width: "100%"}}>Confirm Link</Button>
                </Popover>
            )

            }
        </>
    )
}

function SaveComponent(props){
    //richtext not needed if we wont have nested inner elements like strong, italic
    return(
        <a href={props.attributes.linkObject.url} className={`btn btn--${props.attributes.size} btn--${props.attributes.colorName}`} >
        {props.attributes.text}
        </a>
    )
}

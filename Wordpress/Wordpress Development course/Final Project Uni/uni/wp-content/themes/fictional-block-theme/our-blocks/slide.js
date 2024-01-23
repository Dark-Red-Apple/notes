import apiFetch from "@wordpress/api-fetch"
import {useEffect} from "@wordpress/element"
import { Button, PanelBody, PanelRow } from "@wordpress/components"
import {InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck} from "@wordpress/block-editor"
//this is optional: not to use wp.blocks.registerBlockType
import {registerBlockType} from "@wordpress/blocks"

registerBlockType("ourblocktheme/slide", {
    title: "Slide",
    supports: {
        align: ["full"]
    },
    attributes: {
        themeimage: {type: "string"},
        align: {type: "string", default: "full"},
        imgID: {type: "number"},
        imgURL: {type: "string", default: window.banner.fallbackimage}
    },
    edit: EditComponent,
    save: SaveComponent
} )



function EditComponent(props){

    // [] means only initial load
    useEffect(function(){
        if( props.attributes.themeimage){
            console.log(`${slide.themeimagepath}${props.attributes.themeimage}`)
            // it should be saved to get affected
            props.setAttributes({imgURL: `${slide.themeimagepath}${props.attributes.themeimage}`})

        }
    },[])
    
    if(props.attributes.imgID){
        useEffect(function(){
        
            async function go(){
                // console.log('this is done')
                const response = await apiFetch({
                    path: `/wp/v2/media/${props.attributes.imgID}`,
                    method: "GET"
                })
                // not to look up again in php render, store it in an attribute
                // console.log(`/wp/v2/media/${props.attributes.imgID}`)
                props.setAttributes({themeimage: "", imgURL: response.media_details.sizes.pageBanner.source_url})
            }
            // You have to call it!!!
            go()
        },[props.attributes.imgID])
    }

    function onFileSelect(x){
        // console.log(x.id)
        props.setAttributes({imgID: x.id})
    }
    return(
        <>
        <InspectorControls>
            <PanelBody title="Background" initailOpen={true}>
                <PanelRow>
                    <MediaUploadCheck>
                        <MediaUpload onSelect={onFileSelect} value={props.attributes.imgID} render={({open})=>{
                            return <Button onClick={open}>Choose Image</Button>
                        }} />
                    </MediaUploadCheck>
                </PanelRow>
            </PanelBody>
        </InspectorControls>
        
            <div className="hero-slider__slide" style={{backgroundImage: `url('${props.attributes.imgURL}')`}}>
                <div className="hero-slider__interior container">
                    <div className="hero-slider__overlay t-center">
                        <InnerBlocks allowedBlocks = {["ourblocktheme/genericheading", "ourblocktheme/genericbutton"]} />
                    </div>
                </div>
            </div>
   
        </>
    )
}

function SaveComponent(){
    return (<InnerBlocks.Content />)
}


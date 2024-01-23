import apiFetch from "@wordpress/api-fetch"
import {useEffect} from "@wordpress/element"
import { Button, PanelBody, PanelRow } from "@wordpress/components"
import {InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck} from "@wordpress/block-editor"
//this is optional: not to use wp.blocks.registerBlockType
import {registerBlockType} from "@wordpress/blocks"

registerBlockType("ourblocktheme/banner", {
    title: "Banner",
    supports: {
        align: ["full"]
    },
    attributes: {
        align: {type: "string", default: "full"},
        imgID: {type: "number"},
        imgURL: {type: "string", default: window.banner.fallbackimage}
    },
    edit: EditComponent,
    save: SaveComponent
} )



function EditComponent(props){
    
    if(props.attributes.imgID){
        useEffect(function(){
        
            async function go(){
                // console.log('this is done')
                const response = await apiFetch({
                    path: `/wp/v2/media/${props.attributes.imgID}`,
                    method: "GET"
                })
                // not to look up again in php render, store it in an attribute
                console.log(response.media_details.sizes.pageBanner.source_url)
                // console.log(`/wp/v2/media/${props.attributes.imgID}`)
                props.setAttributes({imgURL: response.media_details.sizes.pageBanner.source_url})
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
        <div className="page-banner">
            <div className="page-banner__bg-image" style={{backgroundImage: `url('${props.attributes.imgURL}')`}}></div>
            <div className="page-banner__content container t-center c-white">
                <InnerBlocks allowedBlocks = {["ourblocktheme/genericheading", "ourblocktheme/genericbutton"]} />
            </div>
        </div>
        </>
    )
}

function SaveComponent(){
    return (<InnerBlocks.Content />)
}


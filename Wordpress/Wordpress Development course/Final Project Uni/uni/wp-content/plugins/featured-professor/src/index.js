// wordpress package will extract it into its own file. 
// we need to include it in the file tree within our javascript here.
import "./index.scss"
import {useSelect} from "@wordpress/data"
import {useState, useEffect} from "react"
import apiFetch from "@wordpress/api-fetch"
//shortcut from global scope of wordpress instead of importing since it may have some issues, instead of typing wp.i18n.__ typ __
const __ = wp.i18n.__

// register block type on the javascript side
wp.blocks.registerBlockType("ourplugin/featured-professor", {
  title: "professor Callout",
  description: "Include a short description and link to a professor ",
  icon: "welcome-learn-more",
  category: "common",
  attributes: {
    // better to define it as string
    profId: {type: "string"}
  },
  edit: EditComponent,
  save: function(){
    return null
  }  
    
})


function EditComponent(props){

    const[thePreview, setThePreview] = useState("")

    useEffect(()=>{
        // with this if it won't show the last professor added when select is undefined
        if(props.attributes.profId){
            updateTheMeta()

            // fetch the new version of 
            // no need to use fetch manually, it will parse the json itself too
            // since it returns a promise you can use await, 
            // useEffect can't accept an async function directly (before () of the callback arrow function), but defining an async function inside it and then call it is okay. 
            // set the preview
            async function go(){
                const response = await apiFetch(({
                    // does not need the rest of address. 
                    path: `/featuredProfessor/v1/getHTML?profId=${props.attributes.profId}`,
                    method: "GET"
                }))
                console.log(response)
                setThePreview(response)

            }
    
            go()
        }

}, [props.attributes.profId])

useEffect(()=>{
    // cleaner function, fresh copy of eMeta
    return () => { updateTheMeta() }
}, [])

function updateTheMeta(){
    // select all block types and filter for our block type
    // filter(x => x.name == 'ourplugin/featured-professor') returns all sort of property of that blocktype
    // map is used when we want to do something for each value of array and return an array, like only ids
    // filter again no need to store the same id twice if we have the same featured block on a blog post!! 
    const profsForMeta =wp.data.select("core/block-editor")
        .getBlocks()
        .filter(x => x.name == 'ourplugin/featured-professor')
        .map(x=>x.attributes.profId)
        .filter((x, index, arr) =>{
            // indexOf will return the first one. If we have it a second time the index don't match
            return arr.indexOf(x) == index
        })
    
    console.log(profsForMeta)
    wp.data.dispatch("core/editor").editPost({meta: {featuredprofessor: profsForMeta }})
}

    const allProfs = useSelect(select=>{
        //select is the tool
        return select("core").getEntityRecords("postType","professor",{per_page: -1})
    })  

    if(allProfs == undefined) return <p>Loading...</p>

    return(
        <div className="featured-professor-wrapper">
            <div className="professor-select-container">
                <select onChange={(e)=>props.setAttributes({profId: e.target.value})}>
                    <option value="">{__("Select a professor", "featured-professor")}</option>
                    {/* map should have return */}
                    {allProfs.map( prof => 
                    {
                        return (
                            <option value={prof.id} selected={props.attributes.profId == prof.id}>
                                {prof.title.rendered}
                            </option>
                        )
                    }
                    )}
                </select>
            </div>
            {/* show the preview */}
            <div dangerouslySetInnerHTML ={{__html: thePreview}}></div>
        </div>
    )
}


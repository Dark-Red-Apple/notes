wp.blocks.registerBlockType("ourblocktheme/header", {
    title: "Fictional Header",
    edit: function(){
        return wp.element.createElement("div", {className: "our-placeholder-block"}, "Header Placeholder")
    },
    save: function(){
        return null
    }
})
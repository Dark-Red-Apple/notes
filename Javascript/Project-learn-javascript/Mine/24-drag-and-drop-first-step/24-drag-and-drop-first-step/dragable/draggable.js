class draggable{
    constructor(data){
        this.el = data.el
        this.list = data.list
        this.template = data.template
        this.update = data.update
        this.showList()
    }

    showList(){
        
        this.list.forEach(item => {
            this.el.innerHTML  += this.template(item)
        })  

        this.el.querySelectorAll('.list-item').forEach(item=>{
            item.addEventListener("dragstart", this.dragstart_handler.bind(this));
            item.addEventListener("dragover", this.dragover_handler.bind(this).bind(this));
            item.addEventListener("drop", this.drop_handler.bind(this));
            item.addEventListener("dragend", this.dragend_handler.bind(this));
            item.addEventListener("dragleave", this.dragleave_handler.bind(this));
        })

    }

    dragstart_handler(ev) {
        if(ev.target.id == undefined || ev.target.id == null || ev.target.id == 'undefined'){
            ev.target.id = 'drag-' + (new Date()).getTime();
        }
        ev.dataTransfer.setData("text/html", ev.target.id);
        ev.dataTransfer.effectAllowed = "move";
        ev.target.classList.add('dragElem')
    }

    dragover_handler(ev) {
        if (ev.preventDefault()) ev.preventDefault();
        ev.dataTransfer.dropEffect = "move"
        ev.target.classList.add('over')
    }

    dragleave_handler(ev) {
        ev.target.classList.remove('over')
    }

    drop_handler(ev){
        const id = ev.dataTransfer.getData("text/html");
        const liDragged = ev.target.closest(".list-item")

        liDragged.after(document.getElementById(id))
        ev.target.classList.remove('over')
    }

    dragend_handler(ev){
        ev.target.classList.remove('dragElem')
        this.sortList()
    }

    sortList(){
        const newList = []
        this.el.querySelectorAll('.list-item').forEach((htmlItem)=>{
            newList.push(this.list.find((object) => object.id == htmlItem.id)) 
        })
        this.update(newList)    
    }
}

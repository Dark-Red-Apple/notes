
import $ from 'jquery' // jquery must be in ''

class MyNotes {
    constructor(){
        this.event()
        console.log('this is the message')
    }

    event(){
        $('#my-notes').on("click", ".delete-note", this.deleteNote)
        $('#my-notes').on("click",  ".edit-note", this.editNote.bind(this))
        $('#my-notes').on("click", ".update-note", this.updateNote.bind(this))
        $('.submit-note').on("click",  this.createNote.bind(this))
    }
    

    //methods will go here
    deleteNote(e){
        let thisNote = $(e.target).parents('li')
        // for other https requests
        $.ajax({
            beforeSend: (xhr)=>{
                //modify the request
                xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
            },
            url: universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'), //doesn't work with .dataset['id']
            type: 'DELETE', 
            // if the request is sucessful
            success: (response)=>{
                thisNote.slideUp();
                if(response.userNoteCount < 5){
                    $('.not-limit-message').removeClass('active');
                }
            },
            error: (response)=>{
                console.log("Sorry")
                console.log(response)
            }
        });
    }
    updateNote(e){
        let thisNote = $(e.target).parents('li')
        var ourUpdatedPost ={
            'title': thisNote.find('.note-title-field').val(),
            'content': thisNote.find('.note-body-field').val()
        }
        // for other https requests
        $.ajax({
            beforeSend: (xhr)=>{
                //modify the request
                xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
            },
            url: universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'), //doesn't work with .dataset['id']
            type: 'POST', 
            data: ourUpdatedPost,
            // if the request is sucessful
            success: (response)=>{
                this.makeNoteReadOnly(thisNote);
            },
            error: (response)=>{
                console.log("Sorry")
                console.log(response)
            }
        });
    }
    createNote(e){
        var ourNewPost ={
            'title': $('.new-note-title').val(),
            'content': $('.new-note-body').val(),
            'status': 'private'
        }
        $.ajax({
            beforeSend: (xhr)=>{
                xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
            },
            url: universityData.root_url + '/wp-json/wp/v2/note/', 
            type: 'POST', 
            data: ourNewPost,
            success: (response)=>{
                $('.new-note-title, .new-note-body').val('')
                // $('<li></li>').prependTo('#my-notes')
                // response return the post informaiton
                $('#my-notes').prepend( `
                    <li data-id="${response.id}">
                        <input readonly class="note-title-field"  value="${response.title.raw}">
                        <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>
                        <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span>
                        <textarea readonly class="note-body-field" >${response.content.raw}</textarea>
                        <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right" aria-hidden="true"></i> Save</span>
                    </li> 
                    `
                ).hide().slideDown();
                console.log("congrats")
                console.log(response)
            },
            error: (response)=>{
                if(response.responseText == "You have reached your note limit!"){
                    $('.note-limit-message').addClass('active');
                }
                console.log(universityData.root_url + '/wp-json/wp/v2/note/')
                console.log("Sorry")
                console.log(response.responseText)
            }
        });
    }

    editNote(e){
        let thisNote = $(e.target).parents('li')
        if(thisNote.data("state") == 'editable'){
            //don't forget bind
            this.makeNoteReadOnly(thisNote)
        } else{
            this.makeNoteEditable(thisNote)
        }
    }
    makeNoteEditable(thisNote){
        thisNote.find(".edit-note").html('<i class="fa fa-times" aria-hidden="true"></i> Cancel')
        thisNote.find('.note-title-field, .note-body-field')
        .removeAttr("readonly")
        .addClass("note-active-field");
        thisNote.data("state", "editable")
        thisNote.find('.update-note').addClass("update-note--visible");
    }

    makeNoteReadOnly(thisNote){
        thisNote.find(".edit-note").html('<i class="fa fa-pencil" aria-hidden="true"></i> Edit')
        thisNote.find('.note-title-field, .note-body-field')
        .attr("readonly", "readonly") //name and value
        .removeClass("note-active-field");
        thisNote.data("state", "cancel");
        thisNote.find('.update-note').removeClass("update-note--visible");
    }

    
}


export default MyNotes;
import $ from 'jquery'


//Don't forget the jquery!
class Like{
    constructor(){
        this.events();
    }

    events(){
        $(".like-box").on('click', this.ourClickDispatcher.bind(this) );
    }

    //methods
    ourClickDispatcher(e){
        //make it flexible look for the event element
        //closest ancestor
        let currentLikeBox = $(e.target).closest('.like-box')
        //use attr instead of data
        if(currentLikeBox.attr('data-exists') == 'yes'){
            //pass the value to get the correct data value
            this.deleteLike(currentLikeBox);
        }else{
            this.createLike(currentLikeBox);
        }
    }

    createLike(currentLikeBox){
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', universityData.nonce)
            },
            url: universityData.root_url + '/wp-json/university/v1/manageLike',
            type:'POST',
            data: {
                'professorId': currentLikeBox.data('professor')
            },
            success: (response) => {
                // data does not update you should use attr
                currentLikeBox.attr('data-exists','yes');
                //base 10
                let likeCount = parseInt(currentLikeBox.find('.like-count').html(), 10)
                likeCount++
                currentLikeBox.find('.like-count').html(likeCount);
                // only response since it returns only the id                
                currentLikeBox.attr('data-like', response);                
                //Only logged in users can create a like
                console.log(response);
            },
            error: (response) => {
                if(response['responseText'] == 'Invalid Professor id'){
                    
                    // $('.like-count').html(int($('.like-count').html) + 1)
                }
                console.log(response)
            }
        });
    }

    deleteLike(currentLikeBox){
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', universityData.nonce)
            },
            url: universityData.root_url + '/wp-json/university/v1/manageLike',
            type:'DELETE',
            data: {
                'like': currentLikeBox.attr('data-like')
            },
            success: (response) => {
                currentLikeBox.attr('data-exists','no');
                let likeCount = parseInt(currentLikeBox.find('.like-count').html(), 10)
                likeCount--
                currentLikeBox.find('.like-count').html(likeCount);
                currentLikeBox.attr('data-like', '');                
                console.log(response);
            },
            error: (response) => {
                alert('ha')
                console.log(response)
            }
        });
    }
}

export default Like;
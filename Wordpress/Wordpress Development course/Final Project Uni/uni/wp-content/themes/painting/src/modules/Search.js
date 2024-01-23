import $ from 'jquery';

class Search {

    // section 1. describe and create/initiate our object
    constructor(){
        this.addSearchHTML();
        this.resultsDiv = $("#search-overlay__result")
        this.openButton =  $(".js-search-trigger"); // the icon button
        this.closeButton = $(".search-overlay__close")
        this.searchOverlay = $(".search-overlay")
        // it's better to create a var instead of calling them from dom
        this.searchField = $('#search-term')
        // let the browser know as soon as the object is born
        
        this.isOverlayOpen = false;
        this.isSpinnerVisible = false;
        this.typingTimer;
        this.previousValue;
        this.events();
        

    }

    // 2. events => connect methods with object
    // on this.head feels cold, wearsHat
    // on thi.brain feels hot, goingSwimming

    events(){
        // On method changes this towards the html element that got clicked on, remember use bind
        this.openButton.on('click', this.openOverlay.bind(this))
        this.closeButton.on('click', this.closeOverlay.bind(this))
        // all browser knows by s. Keyup: release the key
        // when you release the key, only once
        // keydown as long as you hold keep firing
        // this is not a costly event but it's still bad habit so add those ifs to make it better.
        $(document).on("keydown", this.keyPressDispatcher.bind(this))
        this.searchField.on("keyup", this.typingLogic.bind(this))
    }
    // 3. methods (function, action...)
    typingLogic(){
        // we want to send request only after a specific time
        //above the setTimeout so if a new key is hit, it is reset to 2000, 2000 gap between key strokes are needed
        // .value returns undefined should be val()
        if(this.previousValue != this.searchField.val()){
            clearTimeout(this.typingTimer)
            //if it was not empty
            if(this.searchField.val()){
                if(!this.isSpinnerVisible){
                    this.resultsDiv.html('<div class="spinner-loader"></div> ')
                    this.isSpinnerVisible = true
                }
                this.typingTimer = setTimeout(this.getResults.bind(this), 750) 
            }else{
                this.resultsDiv.html('');
                // since html is empty
                this.isSpinnerVisible = false
            }
                        }
        this.previousValue = this.searchField.val(); 

    }

    getResults(){

        $.getJSON(universityData['root_url']+'/wp-json/university/v1/search?term='+this.searchField.val(), (results) => {
            this.resultsDiv.html(`
            <div class="row">
                <div class="one-third">
                    <h2 class="search-overlay__section-title">General Information</h1>
                    ${results['generalInfo'].length ? `<ul class="min-list link-list">` : '<p>No general information that matches that search.</p>'}                
                    ${results['generalInfo'].map( item => `<li><a href=${item['permalink']}>${item['title']}</a> ${item['postType'] == 'post'? `by ${item['authorName']}`: ''} </li>`).join('')}
                    ${results['generalInfo'].length ? '</ul>' : '' }  
                </div> 
                <div class="one-third">
                    <h2 class="search-overlay__section-title">Programs</h1>
                    ${results['programs'].length ? `<ul class="min-list link-list">` : `<p>No programs match that search. <a href = "${universityData['root_rul']}/programs">View all programs</a></p>`}                
                    ${results['programs'].map( item => `<li><a href=${item['permalink']}>${item['title']}</a></li>`).join('')}
                    ${results['programs'].length ? '</ul>' : '' } 
                    <h2 class="search-overlay__section-title">Professors</h1>
                    ${results['professors'].length ? `<ul class="professor-cards">` : `<p>No professors match that search.</p>`}                
                    ${results['professors'].map( item => `<li class="professor-card__list-item">
                    <a class="professor-card" href=${item['permalink']}><img class="professor-card__image" src="${item['postThumbnail']}" ><span class="professor-card__name">${item['title']}</span></a>
                    </li>`).join('')}
                    ${results['professors'].length ? '</ul>' : '' } 
                </div> 
                <div class="one-third">
                    <h2 class="search-overlay__section-title">Campuses</h1>
                    ${results['campuses'].length ? `<ul class="min-list link-list">` : `<p>No campuses match that search. <a href = "${universityData['root_rul']}/campuses">View all campuses</a></p>`}                
                    ${results['campuses'].map( item => `<li><a href=${item['permalink']}>${item['title']}</a></li>`).join('')}
                    ${results['campuses'].length ? '</ul>' : '' } 
                    <h2 class="search-overlay__section-title">Events</h1>
                    ${results['events'].length ? '' : `<p>No events match that search. <a href = "${universityData['root_rul']}/events">View all events</a></p>`}                
                    ${results['events'].map( item => `                    
                    <div class="event-summary">
                    <a class="event-summary__date t-center" href="${item['permalink']}">
                        <span class="event-summary__month">${item['month']}</span>
                        <span class="event-summary__day">${item['day']}</span>
                    </a>
                    <div class="event-summary__content">
                        <h5 class="event-summary__title headline headline--tiny"><a href="${item['permalink']}">${item['title']}</a></h5>
                        <p>${item['description']}<a href="${item['permalink']}" class="nu gray">Learn more</a></p>
                    </div>
                    </div>
                    `).join('')}
                </div> 
            </div>
            `);
            this.isSpinnerVisible = false;
        });



        // if function is used 'this' is going to refer to getJSON because it calls the anonymous function but arrow is okay
        // if you do posts.length != 0, it doesn't work.
        // some sites are not installed at the root of the domain using '/wreact/wp-json/wp/v2/posts?search='


        // $.when(
        //     //since when is babysitting the getJSON we don't need the callback function but the data returned is not actual wanted json data, but with additional information about the request, the first element is the data
        //     $.getJSON(universityData['root_url']+'/wp-json/wp/v2/posts?search='+this.searchField.val()), 
        //     $.getJSON(universityData['root_url']+'/wp-json/wp/v2/pages?search='+this.searchField.val())
        //     ).then((posts, pages) => {
        //     let combinedREsults = posts[0].concat(pages[0])
        //     this.resultsDiv.html(`
        //     <h2 class="search-overlay__section-title">General Information:</h2>
        //         ${combinedREsults.length ? `<ul class="min-list link-list">` : '<p>No general information that matches that search</p>'}                
        //         ${combinedREsults.map( post => `<li><a href=${post['link']}>${post['title']['rendered']}</a></li>`).join('')}
        //         </ul>   
        //         ${combinedREsults.length ? '</ul>' : '' }         
        //     `);
        //     this.isSpinnerVisible = false;
        // }, ()=>{
        //     this.resultsDiv.html('<p>Unexpected error; Please try again</p>')
        // })

    }
    keyPressDispatcher(e){
        // numerical key code check this to find e.keyCode for the key 
        // we can use !this.searchOverlay.hasClass('search-overlay--active') but reading from dom is slower than reading from js var
        if(e.keyCode == 83 && !this.isOverlayOpen && !$("input, textarea").is(':focus')){
            this.openOverlay();
        }
        //esc key
        if(e.keyCode == 27 && this.isOverlayOpen){
            this.closeOverlay();
        }
    }

    openOverlay(){
        this.searchOverlay.addClass('search-overlay--active')
        //  overflow hidden
        $('body').addClass("body-no-scroll")
        // to clear the search input after closing
        this.searchField.val('') 
        //make the input be focused when overlay is open timeout is because there is a hover effect
        setTimeout(() => {
            this.searchField.trigger('focus')
        }, 301);        
        this.isOverlayOpen = true
        // this will prevent the default behavior of link element, we need it for fall back, if javascript was not available.
        return false;
    }

    closeOverlay(){
        this.searchOverlay.removeClass('search-overlay--active')
        $('body').removeClass('body-no-scroll')
        this.isOverlayOpen = false        
    }
    addSearchHTML(){
        $('footer').after(`
        <div class="search-overlay">
        <div class="search-overlay__top">
          <div class="container">
            <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i> <!-- aria-hidden is for when someone doesn't have good vision comes to our website, screen reader won't read the element -->
            <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term" >
            <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
          </div>
        </div>
        <div class="container">
          <div id="search-overlay__result"></div>
        </div>
      </div>
        `)
        //this also works.
        // $('body').append(``)
    }
}

export default Search
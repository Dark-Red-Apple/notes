
<div class="generic-content">
<form class="search-form" method="get" action="<?php echo esc_url(site_url('/')) ?>">
    <!--  to help with accessibility we add the label, if it is clicked the input will be focused, for is for id -->
    <label class="headline headline--medium" for="s">Perform a new search:</label>
    <div class="search-form-row">
        <input class="s" type="search" name="s" id="s" placeholder="What are you looking for?">
        <input class="search-submit" type="submit" value="Search">
    </div>
</form>
</div>
$(document).ready(function() {
    /* @todo get the number of slides */
    var numberOfFeaturedProjects = 4;
    if($('#projects').length){
        $('#projects').fullpage({
            anchors: ['project-1', 'project-2', 'project-3', 'project-4', 'employees'],
            navigationTooltips: ['project-1', 'project-2', 'project-3', 'project-4', 'employees'],
            menu: '#menu',
            scrollingSpeed: 1000,
            navigationPosition: 'right',
            slidesNavigation: true,
            afterLoad  : function( anchorLink, index){
                var loadedSlide = $(this);
                if(index <= numberOfFeaturedProjects){
                    $('.slide-navigation').fadeIn(500);
                } else{
                     $('.slide-navigation').fadeOut(500);
                }
            },
            onLeave: function(index, nextIndex, direction){
                var leavingSection = $(this);
                if(index >= numberOfFeaturedProjects){
                    $('.slide-navigation').fadeOut(500);
                } else {
                      $('.slide-navigation').fadeIn(500);
                }
            }
        });
    }
});
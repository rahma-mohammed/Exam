import {SearchBox} from './effct.js'
$(document).ready(function () {
    $(".loading-screen").fadeOut(500,function(){
        $("body").css("overflow","auto")
    })
})
new SearchBox()

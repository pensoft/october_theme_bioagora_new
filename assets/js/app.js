var viewed = false;

var width = window.innerWidth;

var documentHasScroll = function() {
    return window.innerHeight <= document.body.offsetHeight;
};

window.addEventListener('scroll', function (e) {
    var headernavbar = document.getElementById("headernavbar");
    if (window.scrollY > headernavbar.offsetHeight){
        var headerNavbarNav = document.querySelector('#headerNavbarNav')
        headernavbar.classList.add('scrolled');
    }else{
        headernavbar.classList.remove('scrolled');
    }
});



$(document).ready(function() {
    // $("nav").removeClass("no-transition");
	/* MENU */
	$('.navbar-nav').attr('id', 'menu'); // please don't remove this line
	$( '<div class="calendar-top"></div>' ).insertBefore( "#calendar" );
	$( '<div class="card-profile-top"></div>' ).insertBefore( ".card.profile.card-profile" );
	var divs = $(".card-profiles > div");
	for(var i = 0; i < divs.length; i+=2) {
		divs.slice(i, i+2).wrapAll( '<div class="col-xs" />');
	}

	var headerNavbar = $('#headerNavbar');
	var width100 = $('.width100');
	var innerWidth = $('body').innerWidth();
	headerNavbar.width(innerWidth);
	width100.width(innerWidth);

    $('.nav-item').children("a").each(function(){
        if($(this).attr('data-toggle') == 'dropdown'){
            $(this).removeAttr('data-toggle')
        }
    });

    $("nav").removeClass("no-transition");

    // Menu toggle functionality
    $('#desktopMenuToggle').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Open the menu
        $('#headerNavbarNav').addClass('show').css({
            'right': '0',
            'opacity': '1',
            'visibility': 'visible'
        });

        // Hide the toggle button
        $(this).hide();

        $('body').addClass('menu-open');
    });

    // Close menu button functionality
    $('#closeMenuBtn').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Close the menu
        $('#headerNavbarNav').removeClass('show').css({
            'right': '-300px',
            'opacity': '0',
            'visibility': 'hidden'
        });

        // Show the toggle button again
        $('#desktopMenuToggle').show();

        $('body').removeClass('menu-open');
    });

    // Close menu when clicking outside
    $(document).click(function(event) {
        var $navbarNav = $('#headerNavbarNav');
        var $desktopToggle = $('#desktopMenuToggle');
        var $closeBtn = $('#closeMenuBtn');

        // If navbar is visible and click is outside navbar and toggle buttons
        if ($navbarNav.hasClass('show') &&
            !$navbarNav.is(event.target) &&
            $navbarNav.has(event.target).length === 0 &&
            !$desktopToggle.is(event.target) &&
            $desktopToggle.has(event.target).length === 0 &&
            !$closeBtn.is(event.target) &&
            $closeBtn.has(event.target).length === 0) {

            $navbarNav.removeClass('show').css({
                'right': '-300px',
                'opacity': '0',
                'visibility': 'hidden'
            });

            // Show the toggle button again
            $('#desktopMenuToggle').show();

            $('body').removeClass('menu-open');
        }
    });

    // Prevent clicks on the menu from closing it
    $('#headerNavbarNav').on('click', function(e) {
        e.stopPropagation();
    });

    // $('.carousel-caption p').append('<a href="/news/bioagora-featured-horizon-europe-2025-work-programme-heres-how-engage" class="btn btn-primary learn-more">Learn more</a>');

    $('.explore_join_container .item1 div').addClass('active_slide');

    $('.carousel').on('slide.bs.carousel', function onSlide (ev) {
        $('.explore_join_container div').removeClass('active_slide');
        var id = ev.relatedTarget.id;
        $('.explore_join_container .item'+ id +' div').addClass('active_slide');
    })

    // Close dropdown menus when parent menu item is clicked again
    $('.nav-item.dropdown > a').on('click', function(e) {
        e.preventDefault();
        var $dropdownMenu = $(this).siblings('.dropdown-menu');

        if ($dropdownMenu.hasClass('show')) {
            $dropdownMenu.removeClass('show');
        } else {
            // Close all other open dropdowns first
            $('.dropdown-menu.show').removeClass('show');
            $dropdownMenu.addClass('show');
        }
    });

    if (width < 992) { // mobile
        $('#menuToggle input[type="checkbox"]').change(function(){
            var checked = $(this).is(":checked");
            if(checked){
                $('#menu').show("slide", { direction: "right" }, 400);
                $('#search').hide();
                $('#menu, #menu *').css({
                    'visibility': 'visible'
                });
                $('body', 'html').css({
                    'overflow': 'hidden'
                });
            }else{
                $('#menu').hide("slide", { direction: "right" }, 400);
                $('#search').hide();
                $('body', 'html').css({
                    'overflow': 'auto'
                });
            }
        });
    }

    // Toggle for events
    $('.entry_item').on('click', function() {
        $(this).next('.body-content').slideToggle();
    });

    $('body').on('click', '.work_packages .accordion-toggle, .faqs .accordion-toggle, .funding-calls .accordion-toggle, .financial-support-third-parties .accordion-toggle, .services_accordion_item .accordion-toggle', function () {
        if ($(this).next(".accordion-content").is(':visible')) {
            $(this).next(".accordion-content").slideUp(300);
            $(this).children().find(".plusminus").text('+');
            $(this).children(".green_bullet").removeClass('expaned');
            $(this).children(".plusminus").html('<span class="plus"></span>');
            $(this).parent().addClass('expanded');
        } else {
            $(this).next(".accordion-content").slideDown(300);
            $(this).children().find(".plusminus").text('-');
            $(this).children(".green_bullet").addClass('expaned');
            $(this).children(".plusminus").html('<span class="minus"></span>');
            $(this).parent().removeClass('expanded');
        }
    });

    $('.work_packages .accordion-content, .faqs .accordion-content, .messages .accordion-toggle, .funding-calls .accordion-toggle').each(function (index, value) {
        $(value).find('a').attr("onclick", "window.open(this.href, '_blank');")
    });

    if (window.location.hash &&
        window.location.hash != '#openFundingCalls' &&
        window.location.hash != '#listView' &&
        window.location.hash != '#calendarView' &&
        window.location.hash != '#mapView' &&
        window.location.hash != '#events' &&
        window.location.hash != '#news-events'
    ) {
        var link = window.location.hash;
        var anchorId = link.substr(link.indexOf("#") + 1);
        if($("#"+anchorId).offset()){
            var toggler = $("#"+anchorId).find(".accordion-toggle");
            if ( !toggler.next(".accordion-content").is(':visible')){
                $('html, body').animate({
                    scrollTop: toggler.parent().offset().top - 70
                }, 500);
                toggler.trigger( "click" );
                toggler.next(".accordion-content").slideDown(300);
            }
        }
    }

    $('.nav-item').children("a").each(function(){
        if($(this).attr('data-toggle') == 'dropdown'){
            $(this).removeAttr('data-toggle')
        }
    });

    $("nav").removeClass("no-transition");



    $('.dropdown a').click(function(event) {

        if (location.href.indexOf("#") != -1) {
            var link = $(this).attr('href');
            var anchorId = link.substr(link.indexOf("#") + 1);
            if($("#"+anchorId).length>0){
                $('html, body').animate({
                    scrollTop: $("#"+anchorId).offset().top - 150
                }, 500);
            }else{
                // event.preventDefault();
                $("path[title='"+anchorId.toUpperCase()+"']").addClass('active_path');

                $('.accordion-border').each(function(){
                    var title = $(this).find(".accordion-toggle .col-xs.start-xs").text().toUpperCase();
                    var toggler = $(this).find(".accordion-toggle");
                    if ( title.indexOf(anchorId.toUpperCase()) >= 0 && !toggler.next(".accordion-content").is(':visible') ){
                        $('html, body').animate({
                            scrollTop: toggler.parent().offset().top - 150
                        }, 500);
                        toggler.trigger( "click" );
                        event.preventDefault();
                    }
                });
            }
        }
    });


    $('.work_packages .accordion-content, .funding-calls .accordion-content, .services_accordion_item .accordion-content').each(function( index, value ) {
        $(value).find('a').attr( "onclick", "window.open(this.href, '_blank');" )
    });


	onHashChange();
	$(window).on("hashchange", function() {
		onHashChange();
	});
    //
	// $('.subscribe-items a').attr('data-aos', 'fade-up');
	// // $('.icons a').attr('data-aos', 'fade-up');
	// $('h2.underline').attr('data-aos', 'fade-up');
	// // $('.btn.btn-primary').attr('data-aos', 'zoom-in');
	// $('.library-item').attr('data-aos', 'fade-up');
	$('h1.display-1').attr('data-aos', 'fade-right');
	$('.home img, svg, iframe, video').attr('data-aos', 'fade-zoom-in');
	$('.network, .subscribe, .num_item, .objective_item').attr('data-aos', 'fade-zoom-in');
    $('.green-header, .blue-header, .blue-text').attr('data-aos', 'fade-up');
    $('.eu-funded-community .col-md-6').attr('data-aos', 'fade-right');
    // $('.timeline-content').attr('data-aos', 'fade-up');
    /* News highlights carousel **/
    $('.news-carousel').slick({
        autoplay: false,
        // autoplaySpeed: 2000,
        draggable: true,
        // pauseOnHover: true,
        centerMode: false,
        variableWidth: true,
        infinite: true,
        slidesToShow: 3,
        speed: 1000,
        centerPadding: '4%',
        slidesToScroll: 1,
        // centerPadding: '40px',
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true,
                    centerMode: true,
                    centerPadding: '2%',
                    slidesToShow: 1
                }
            }
        ]
    });



    $('.timeline-carousel').slick({
        autoplay: false,
        // autoplaySpeed: 2000,
        draggable: true,
        // pauseOnHover: true,
        centerMode: false,
        variableWidth: true,
        infinite: false,
        slidesToShow: 2,
        speed: 1000,
        centerPadding: '4%',
        slidesToScroll: 1,
        // centerPadding: '40px',
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true,
                    centerMode: true,
                    centerPadding: '2%',
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.news-container').click(function() {
        var link = $(this).find('a').attr('href');
        if(link) {
            window.location.href = link;
        }
    });

    $('.events .tabs, .partners .tabs').each(function(){
        // For each set of tabs, we want to keep track of
        // which tab is active and its associated content
        var $active, $content, $links = $(this).find('a');
        var speed = "fast";
        var activeTab = $(location.hash);
        // If the location.hash matches one of the links, use that as the active tab.
        // If no match is found, use the first link as the initial active tab.
        $active = $($links.filter("[href=\'"+location.hash+"\']")[0] || $links[0]);

        if($(this).parent().parent().hasClass('videos')){
            $active.addClass('active');
        }

        if($(this).parent().parent().hasClass('events')){
            $active.addClass('active');
        }

        if($(this).parent().hasClass('partners')){
            $active.addClass('active');
        }

        $content = $($active[0].hash);

        // Hide the remaining content
        $links.not($active).each(function () {
            $(this.hash).hide();
        });

        if(activeTab.length){
            $content.slideDown(speed);
            //scroll to element
            $('html, body').animate({
                scrollTop:  activeTab.offset().top - $('header').height()
            }, speed);
        }

        // Bind the click event handler
        $(this).find("a").click(function (e) {
            if($(this).hasClass('active')) {
                $content.slideDown({
                    scrollTop: $content.offset().top - $('header').height()
                }, speed);
                var screenSize = getScreenSize();
                if (screenSize.width < 800) {
                    // scroll to element
                    $('html, body').animate({
                        scrollTop: $content.offset().top - $('header').height() + 300  // mobile
                    }, speed);
                }else{
                    //scroll to element icons top
                    $('html, body').animate({
                        scrollTop:  $content.offset().top - $('header').height() + 300
                    }, speed);
                }
                e.preventDefault();
                return false;
            }
            // Make the old tab inactive.
            $active.removeClass('active');
            $content.hide();

            // Update the variables with the new link and content
            $active = $(this);
            $content = $(this.hash);

            location.hash = $active[0].hash;

            // Make the tab active.
            $active.addClass('active');
            $content.slideDown({
                scrollTop: $content.offset().top - $('header').height()
            }, speed);

            // Prevent the anchor\'s default click action
            e.preventDefault();
        });
    });

    $( ".subtabs_events" ).tabs();
    openParentTab();

    $(".readmore-link").click( function(e) {
        // record if our text is expanded
        var isExpanded =  $(e.target).hasClass("expand");

        //close all open paragraphs
        $(".readmore.expand").removeClass("expand");
        $(".readmore-link.expand").removeClass("expand");

        // if target wasn't expand, then expand it
        if (!isExpanded){
            $( e.target ).parent( ".readmore" ).addClass( "expand" );
            $(e.target).addClass("expand");
        }
    });

    // var hedingsArray = [
    //     'BioAgora',
    //     'Partners',
    //     'Team',
    //     'Science Service',
    //     'Cases',
    //     'EU Biodiversity Platform',
    //     'Biodiversity Knowledge Agora',
    //     'The Financial Support',
    //     'News',
    //     'Networks',
    //     'Events',
    //     'Newsletters',
    //     'Open',
    //     'Publications',
    //     'Deliverables',
    //     'Links',
    //     'Materials',
    //     'Press',
    //     'Contact',
    //     'privacy',
    //     'notice',
    //     'FAQ',
    //     'Financial Support',
    //     'knowledge and expertise',
    //     'policy requests',
    //     'policy dialogues',
    //     'Knowledge Exchange Network',
    // ];
    //
    // $.each(hedingsArray, function (index, value) {
    //     $("h1.underline:contains(" + value + ")").html(function (_, html) {
    //         var regex = new RegExp(value, 'g');
    //         return html.replace(regex, '<b>' + value + '</b>');
    //     });
    // });

    if (width >= 1024) {
        $('.work_packages .key_0, .work_packages .key_1, .work_packages .key_2, .work_packages .key_3').wrapAll('<div class="col-md-6 col-xs-12" />');
        $('.work_packages .key_4, .work_packages .key_5, .work_packages .key_6, .work_packages .key_7').wrapAll('<div class="col-md-6 col-xs-12" />');
    }


    $('.dorsal').click(function () {
        var link = $(this);
        var parag = link.parent().parent().find('p').first();
        var partner_desc = link.parent().parent().find('.partner_description').first();
        parag.toggleClass('expand', function() {
            if (parag.hasClass('expand')) {
                link.text('Read less');
                parag.slideDown(300);
            } else {
                link.text('Read more');
            }
        });
        if(partner_desc){
            partner_desc.toggleClass('expand', function() {
                if (parag.hasClass('expand')) {
                    link.text('Read less');
                    parag.slideDown(300);
                } else {
                    link.text('Read more');
                }
            });
        }
    });

});


function triggerSlideClick(id){
    $('.carousel .carousel-indicators li[data-slide-to="' + id + '"]').trigger('click');
}


// Initialize nectar scrolling tabs with hidden inactive tabs
function initNectarScrollingTabs() {
    const $nav = $('.nectar-scrolling-tabs');
    const $navItems = $nav.find('li');
    const $links = $nav.find('a');
    const sections = [];

    // Collect all sections
    $links.each(function() {
        const target = $(this).attr('href');
        if ($(target).length) {
            sections.push(target);
        }
    });

    // Smooth scroll on click
    $links.on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');

        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 600);
    });

    // Update active link on scroll - hide inactive tabs
    function updateActiveLink() {
        const scrollPos = $(window).scrollTop() + 100;

        // Find current section
        let currentSection = '';

        sections.forEach(function(section) {
            const $section = $(section);
            const sectionTop = $section.offset().top - 150;
            const sectionBottom = sectionTop + $section.outerHeight();

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                currentSection = section;
            }
        });

        // Update active class - hide inactive tabs
        $navItems.removeClass('active');
        if (currentSection) {
            const $activeItem = $links.filter('[href="' + currentSection + '"]').parent();
            $activeItem.addClass('active');
        }
    }

    // Listen to scroll
    let scrollTimeout;
    $(window).on('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveLink, 10);
    });

    // Initial check
    updateActiveLink();
}



function openParentTab() {
    locationHash = location.hash.substring( 1 );
    // Check if we have an location Hash
    if (locationHash) {
        // Check if the location hash exsist.
        var hash = jQuery('#'+locationHash);
        if (hash.length) {
            // Check of the location Hash is inside a tab.
            if (hash.closest(".tabContent").length) {
                // Grab the index number of the parent tab so we can activate it
                var tabNumber = hash.closest(".tabContent").index();
                jQuery(".tabs.fix").tabs({ active: tabNumber });
                // Not need but this puts the focus on the selected hash
                hash.get(0).scrollIntoView();
                setTimeout(function() {
                    hash.get(0).scrollIntoView();
                }, 1000);
            }
        }
    }
}

function expandReadMore(el){
    var $el, $ps, $up, totalHeight;

    totalHeight = 115;

    $el = $(el) // read-more link

    $up  = $el.parent(); // coordinator_info

    if ($el.text() == "Read more") {

        $ps = $up.find("p:not('.read-more')");

        // measure how tall inside should be by adding together heights of all inside paragraphs (except read-more paragraph)
        $ps.each(function() {
            totalHeight += $(this).outerHeight();
        });

        $up.addClass('changed');

        $el.css({
            top: totalHeight - 120
        });
        // $el.html('<a class="revert" href="" onclick="revertChanges(this);">Read less</a>');

        $up.css({
            // Set height to prevent instant jumpdown when max height is removed
            "height": $up.height(),
            "max-height": 9999,
        })
            .animate({
                "height": totalHeight
            });

        //Stuff to do when btn is in the read more state
        $el.html("Read less");
        // $up.slideDown();
    } else {

        $up.removeClass('changed');

        $el.css({
            top: 53
        });
        // $el.html('<a class="revert" href="" onclick="revertChanges(this);">Read less</a>');

        $up.css({
            // Set height to prevent instant jumpdown when max height is removed
            "height": $up.height(),
            "max-height": 460,
        })
            .animate({
                "height": totalHeight
            });
        //Stuff to do when btn is in the read less state
        $el.html("Read more");

        $('html, body').animate({
            scrollTop:  $up.offset().top - $('header').height() - 300
        });
    }
    return false;
}

function onHashChange(){
	$("path").removeClass('active_path');
	$(".accordion-content").hide();
	var caseStudiesHashTitle = location.hash;

	if(caseStudiesHashTitle){
		var caseStudiesTitle = caseStudiesHashTitle.substring(1, caseStudiesHashTitle.length);
		$("path[title='"+caseStudiesTitle.toUpperCase()+"']").addClass('active_path');


	}
}

function onMapCustomPartners(pCode) {
    $.request('onPartners', {
        update: { 'components/partners_list': '#mycomponentpartners',
        },
        data: {
            code: pCode
        },
    }).then(response => {
        $('html, body').animate({
            scrollTop: $("#mycomponentpartners").offset().top - 200
        }, 1000);
        var tooltip = document.getElementById("tooltip");
        tooltip.classList.remove("active");

    });

}


function handleCustomSVGMapMouseMove(event) {
    var countryCode = $(event.target).attr('country_code');
    var tooltip = document.getElementById("tooltip");
    if (!countryCode) {
        countryCode = $(event.target).parent().attr('country_code');
        tooltip.innerHTML = $(event.target).parent().attr('title');
    }else{
        tooltip.innerHTML = $(event.target).attr('title');
    }

    switch (countryCode) {
        case "AF":
        case "AX":
        case "AL":
        case "DZ":
        case "AS":
        case "AD":
        case "AO":
        case "AI":
        case "AQ":
        case "AG":
        case "AR":
        case "AM":
        case "AW":
        case "AT":
        case "AZ":
        case "BS":
        case "BH":
        case "BD":
        case "BB":
        case "BY":
        case "BE":
        case "BZ":
        case "BJ":
        case "BM":
        case "BT":
        case "BO":
        case "BQ":
        case "BA":
        case "BW":
        case "BV":
        case "BR":
        case "IO":
        case "BN":
        case "BG":
        case "BF":
        case "BI":
        case "KH":
        case "CM":
        case "CV":
        case "KY":
        case "CF":
        case "TD":
        case "CL":
        case "CN":
        case "CX":
        case "CC":
        case "CO":
        case "KM":
        case "CG":
        case "CD":
        case "CK":
        case "CR":
        case "CI":
        case "HR":
        case "CU":
        case "CW":
        case "CY":
        case "CZ":
        case "DK":
        case "DJ":
        case "DM":
        case "DO":
        case "EC":
        case "EG":
        case "SV":
        case "GQ":
        case "ER":
        case "EE":
        case "ET":
        case "FK":
        case "FO":
        case "FI":
        case "FJ":
        case "GF":
        case "PF":
        case "TF":
        case "GA":
        case "GM":
        case "GE":
        case "GH":
        case "GI":
        case "GR":
        case "GL":
        case "GD":
        case "GP":
        case "GU":
        case "GT":
        case "GG":
        case "GN":
        case "GW":
        case "GY":
        case "HT":
        case "HM":
        case "VA":
        case "HN":
        case "HK":
        case "IS":
        case "ID":
        case "IR":
        case "IQ":
        case "IM":
        case "IL":
        case "IT":
        case "JM":
        case "JP":
        case "JE":
        case "JO":
        case "KZ":
        case "KE":
        case "KI":
        case "KP":
        case "KR":
        case "KW":
        case "KG":
        case "LA":
        case "LV":
        case "LB":
        case "LS":
        case "LR":
        case "LY":
        case "LI":
        case "LT":
        case "LU":
        case "MO":
        case "MK":
        case "MG":
        case "MW":
        case "MY":
        case "MV":
        case "ML":
        case "MT":
        case "MH":
        case "MQ":
        case "MR":
        case "MU":
        case "YT":
        case "MX":
        case "FM":
        case "MD":
        case "MC":
        case "MN":
        case "ME":
        case "MS":
        case "MA":
        case "MZ":
        case "MM":
        case "NA":
        case "NR":
        case "NP":
        case "NC":
        case "FR":
        case "IN":
        case "NL":
        case "HU":
        case "IE":
        case "CA":
        case "NZ":
        case "DE":
        case "NI":
        case "NE":
        case "NG":
        case "NU":
        case "NF":
        case "MP":
        case "NO":
        case "OM":
        case "PK":
        case "PW":
        case "PS":
        case "PA":
        case "PG":
        case "PY":
        case "PE":
        case "PH":
        case "PN":
        case "PT":
        case "PR":
        case "QA":
        case "RE":
        case "RU":
        case "RW":
        case "BL":
        case "SH":
        case "KN":
        case "LC":
        case "MF":
        case "PM":
        case "VC":
        case "WS":
        case "SM":
        case "ST":
        case "SA":
        case "SN":
        case "RS":
        case "SC":
        case "SL":
        case "SG":
        case "SX":
        case "SK":
        case "SI":
        case "SB":
        case "SO":
        case "ZA":
        case "GS":
        case "LK":
        case "SD":
        case "SR":
        case "SJ":
        case "SZ":
        case "SE":
        case "SY":
        case "TW":
        case "TJ":
        case "TZ":
        case "TH":
        case "TL":
        case "TG":
        case "TK":
        case "TO":
        case "TT":
        case "TN":
        case "TR":
        case "TM":
        case "TC":
        case "TV":
        case "UG":
        case "UA":
        case "AE":
        case "UM":
        case "UY":
        case "UZ":
        case "VU":
        case "VE":
        case "VN":
        case "VG":
        case "VI":
        case "WF":
        case "EH":
        case "YE":
        case "ZM":
        case "ZW":
        case "US":
        case "GB":
        case "ES":
        case "AU":
        case "RO":
        case "CH":
        case "PL":
            break;
        default:
            return tooltip.classList.remove("active");
    }

    var x = event.clientX;
    var y = event.clientY;

    tooltip.style.left = (x - 100) + "px";
    tooltip.style.top = (y - 150) + "px";

    //find rect in group
    if($(event.target).is('rect') && width > 1024){
        $(event.target).parent().removeAttr('country_code');
        $(event.target).parent().removeAttr('title');
        $(event.target).parent().removeAttr('onclick');

    }

    tooltip.classList.add("active");

}

function encodeURIObject(data){
    return Object.keys(data).map(function (i) {
        return encodeURIComponent(i) + '=' + encodeURIComponent(data[i])
    }).join('&');
}

function appendProfile() {
    $(document).on('profile', function (e) {
        var headerNavbarNav = $('#headerNavbarNav');
        var li = '<li class="nav-item"><a href="/profile" target = "_self">Profile</a></li >';
        headerNavbarNav.find('>ul').append(li);
    });
}
function appendSignIn(){
    $(document).on('signin', function (e) {
        var headerNavbarLogin = $('#headerNavbarNav');
        var li = '<li class="nav-item sign-in"><a href="/login" target = "_self">Login</a></li >';
		headerNavbarLogin.find('>ul').append(li);
		var menu = $('#menuToggle');
		menu.find('>ul').append(li);
    });
}

function appendSignOut() {
    $(document).on('signout', function (e) {
        var headerNavbarNav = $('#headerNavbarNav');
        var li = '<li class="nav-item  sign-in"><a data-request="onLogout" data-request-data="redirect: \'/\'">Logout</a></li >';
        headerNavbarNav.find('>ul').append(li);
		var menu = $('#menuToggle');
		menu.find('>ul').append(li);
    });
}


function redirectAndRefresh(url){
	$(".tabs a").each(function() {
		this.href = window.location.hash;
	});
	window.open(url, '_blank');
	location.reload();
}

function isBreakpointLarge() {
    return window.innerWidth <= 991;
}

function showSearchForm(){
	$('#layout-header').toggleClass('full-width');
	$('#search').toggle();
	$('.navbar a.p-search').css('visibility', 'hidden');
	// $('#menu li').hide();
	// $('nav a:not(.navbar-brand)').hide();
}

function hideSearchForm(){
	$('#layout-header').toggleClass('full-width');
	$('#search').hide();
    $('.navbar a.p-search').css('visibility', 'visible');
	// $('#menu li').show();
    // $('nav a').show();
}

function requestFormLibrary() {
	$('#mylibraryForm').on('click', 'a', function () {
		var $form = $(this).closest('form');
		$form.request();
	})
}

function requestFormPartners() {
	$('#myPartnersForm').on('click', 'a', function () {
		var $form = $(this).closest('form');
		$form.request();
	})
}

function isScrolledIntoView(elem) {
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();

	if($(elem).height()){
		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();

		return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}
	return;

}
//
//
// function expandBiography(el){
//     $el = $(el) // read-more link
//     $body  = $el.parent().parent().find('.body');
//     console.log($el);
//     if($body.is(':visible')){
//         $body.slideUp(300);
//         $el.addClass('expanded');
//     }else{
//         $body.slideDown(300);
//         $el.removeClass('expanded');
//     }
// }



function scrollDown(){
	var element = $('#layout-content');
	$("html, body").animate({ scrollTop: element.offset().top - 190 }, 500);
}


function hideMe(elem){
    $(elem).parent().hide();
}


function getScreenSize() {
    var myHeight = 0;
    var myWidth = 0;
    if (window.innerWidth && window.innerHeight) {
        // Netscape & Mozilla
        myHeight = window.innerHeight;
        myWidth = window.innerWidth;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        // IE > 6
        myHeight = document.documentElement.clientHeight;
        myWidth = document.documentElement.clientWidth;
    } else if (document.body.offsetWidth && document.body.offsetHeight) {
        // IE = 6
        myHeight = document.body.offsetHeight;
        myWidth = document.body.offsetWidth;
    } else if (document.body.clientWidth && document.body.clientHeight) {
        // IE < 6
        myHeight = document.body.clientHeight;
        myWidth = document.body.clientWidth;
    }

    return {'width': myWidth, 'height': myHeight};
}

function init() {
    window.addEventListener('resize', function () {
        if (isBreakpointLarge()) {
            $('#card-carousel').slick('unslick');
        } else {
            if (typeof cardCarousel === 'function') {
                cardCarousel({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    prevArrow: '<i class="slick-prev"/>',
                    nextArrow: '<i class="slick-next"/>',
                });
             }
        }
        // keepFooter(documentHasScroll());

    });
    document.addEventListener('DOMContentLoaded', function () {
        if (!isBreakpointLarge()) {
            if (typeof cardCarousel === 'function') {
                cardCarousel({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    prevArrow: '<i class="slick-prev"/>',
                    nextArrow: '<i class="slick-next"/>',
                });
            }
        }
		requestFormLibrary();

		// requestFormPartners()
        // keepFooter(documentHasScroll());

    });
    // appendProfile()
    // appendSignIn()
    // appendSignOut()
}

function scrollToField(errors){
    $(".get_involved_form input, .get_involved_form select, .get_involved_form .row").removeClass('red_err_field');
    $.each(errors.scroll_to_field, function(key,valueObj){
        $("#"+key).addClass('red_err_field');
        $('html, body').animate({
            scrollTop: $("#"+key).offset().top - 200
        }, 1000);
        return false; // breaks
    });
}

function scrollToTheTop(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
}

function openFundingCallModalBtn(){
    setTimeout(function() {
        $(".openFundingCallModalBtn").trigger("click");
    },10);
}

function expandBiography(el){
    $el = $(el) // read-more link
    $body  = $el.parent().parent().find('.body');
    if($body.is(':visible')){
        $body.slideUp(300);
        $el.addClass('expanded');
    }else{
        $body.slideDown(300);
        $el.removeClass('expanded');
    }
}

init()

$(document).ready(function () {
  // Function to update the active button, title, and content dynamically
  function updateContent(button, title, content, researchNotes) {
    // Remove active class from all buttons
    $('button').removeClass('active');
    // Add active class to the clicked button
    button.addClass('active');
    // Update the title text
    $('#definitionTitle').text(title);
    // Update the content text with both description and research notes
    $('#definitionContent').html(content + "<br><br><strong>Research Notes/GIS Spatial Analysis:</strong><br>" + researchNotes);
  }

  // Event handler for the "Climate Gentrification" button
  $('#btnHazard').click(function () {
    updateContent(
      $(this),
      'What is the Hazard?',
      'The hazard associated with climate gentrification involves the socio-economic and environmental shifts that make certain areas more desirable due to their perceived resilience to climate change impacts. This desirability leads to increased property values and investment, which can displace lower-income residents.',
      'Identify and map areas within New York City that are less prone to climate change impacts, such as flooding and heatwaves. Analyze historical data on property values, development projects, and demographic changes in these areas over the past decade.'
    );
  });

  // Event handler for the "What is the Risk?" button
  $('#btnRisk').click(function () {
    updateContent(
      $(this),
      'What is the Risk?',
      'The risk lies in the exacerbation of social inequality and the loss of community cohesion. As lower-income residents are displaced, there\'s a risk of losing the cultural and social fabric that defines many of New York City\'s neighborhoods.',
      'Conduct socio-economic impact assessments to understand the effects of rising property values on different income groups. Evaluate the correlation between climate gentrification and changes in local businesses, schools, and community services.'
    );
  });

  // Event handler for the "How to Manage the Risk?" button
  $('#btnRiskManagement').click(function () {
    updateContent(
      $(this),
      'How to Manage the Risk?',
      'Managing the risk requires implementing policies that ensure equitable development and protect vulnerable populations. This could include affordable housing mandates, community land trusts, and inclusive zoning laws.',
      'Review case studies of cities that have successfully implemented policies to combat climate gentrification. Map potential areas for affordable housing projects and community centers that cater to displaced populations.'
    );
  });

  // Smooth scrolling for anchor links
  $('a[href^="#"]').on('click', function (event) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top
      }, 1000);
    }
  });

  // Toggle mobile menu
  $('.hamburger-icon').click(function () {
    $('#nav-menu').toggle(); // Use jQuery's toggle function to show/hide the nav menu
  });

  // Mapbox on Climate Gentrification (Class 3)

  $(document).ready(function () {
    // Existing button setup and functions

    // Mapbox setup
    mapboxgl.accessToken = 'pk.eyJ1IjoiajAwYnkiLCJhIjoiY2x1bHUzbXZnMGhuczJxcG83YXY4czJ3ayJ9.S5PZpU9VDwLMjoX_0x5FDQ';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-0.15591514, 51.51830379], // starting position [lng, lat]
        zoom: 15.5, // starting zoom
        bearing: 27, // bearing in degrees
        pitch: 45 // pitch in degrees
    });

    // Chapters and interaction logic
    const chapters = {
        'baker': {
            bearing: 27,
            center: [-0.15591514, 51.51830379],
            zoom: 15.5,
            pitch: 20
        },
        'aldgate': {
            duration: 6000,
            center: [-0.07571203, 51.51424049],
            bearing: 150,
            zoom: 15,
            pitch: 0
        },
        // Additional chapters...
    };

    // Function to set active chapter
    function setActiveChapter(chapterName) {
        if (chapterName === activeChapterName) return;
        map.flyTo(chapters[chapterName]);
        document.getElementById(chapterName).classList.add('active');
        document.getElementById(activeChapterName).classList.remove('active');
        activeChapterName = chapterName;
    }

    // Scroll event listener
    window.onscroll = () => {
        for (const chapterName in chapters) {
            if (isElementOnScreen(chapterName)) {
                setActiveChapter(chapterName);
                break;
            }
        }
    };

    // Helper function to check if element is on screen
    function isElementOnScreen(id) {
        const element = document.getElementById(id);
        const bounds = element.getBoundingClientRect();
        return bounds.top < window.innerHeight && bounds.bottom > 0;
    }
});

});

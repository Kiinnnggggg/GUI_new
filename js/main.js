$(document).ready(function () {
  $(".popup_box").hide();

  $("button").mouseover(function () {
    $(this).css("cursor", "pointer");
  });

  $("td").mouseover(function () {
    $(this).css("cursor", "pointer");
  });

  $(".sn-filter").hover(function () {
    $(this).append('<img src="images/tick.png" height="10px;" name="tick">');
    $(".sn-filter").mouseleave(function () {
      $(".sn-filter img:last-child").remove();
    });
  });

  // permission function link hover effect
  $(".permission_function a").hover(function () {
    $(this).append('<img src="images/tick.png" height="10px;" name="tick">');
    $(".permission_function a").mouseleave(function () {
      $(".permission_function a img:last-child").remove();
    });
  });

  $("#logo").click(function () {
    location.href = "main.html";
  });

  //For Reload page & view all
  showBook(1, 2000);
  $("#view_book").click(function () {
    showBook(1, 2000);
  });
  $("#view_software").click(function () {
    showSoftware();
  });
  $("#view_magazine").click(function () {
    showMagazine();
  });

  //For keywords Searching
  $("#go").click(function () {
    function goClick(typeOfItem, second) {
      let keywords = $("#search_bar").val();
      let i = 1;
      $(".items-table").empty();
      $(".loading-animation").show();
      setTimeout(
        function () {
          $(".loading-animation").hide();
          $.getJSON("books.json", function (result) {
            $(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>\"" + $("#search_bar").val() + "\" \\Result<h2>" +
              "<button class='btn' id='showList'><img src='images/list.png' style='height:20px; width:20px;'></button>" +
              "<button id='showMany'><img src='images/many.png' style='height:20px; width:20px;'></button></div>");
            if (typeOfItem == 1) {
              $.each(result, function (index, value) {
                if (value.title.indexOf(keywords) != -1) {
                  createItems(i++, value.title, value.country, value.language, value.imageLink, value.author);
                }
              });
            } else {
              $.each(result, function (index, value) {
                if (value.title.indexOf(keywords) != -1) {
                  createItemsAsPhoto(i++, value.title, value.country, value.language, value.imageLink, value.author);
                }
              });
            }
            $('.reserve').click(function () {
              showNotice();
              $(this).attr("disabled", "disabled");
            });
            $('.preview').click(function () {
              previewBook($(this).attr('form'), $(this).attr('name'), $(this).attr('value'));
            });
            $('#popup_close').click(function () {
              $('.popup_box').fadeOut();
              $('.items-table').css('opacity', '1');
            });
            $('#showList').click(function () {
              goClick(1, 0);
            });
            $('#showMany').click(function () {
              goClick(4, 0);
            });
          });
        }, second);
    }
    goClick(1, 2000);
  });

  //For keywords Searching
  $("#search_bar").change(function () {
    function searchClick(typeOfItem, second) {
      let keywords = $("#search_bar").val();
      let i = 1;
      $(".items-table").empty();
      $(".loading-animation").show();
      setTimeout(
        function () {
          $(".loading-animation").hide();
          $.getJSON("books.json", function (result) {
            $(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>\"" + $("#search_bar").val() + "\" \\Result<h2>" +
              "<button class='btn' id='showList'><img src='images/list.png' style='height:20px; width:20px;'></button>" +
              "<button id='showMany'><img src='images/many.png' style='height:20px; width:20px;'></button></div>");
            if (typeOfItem == 1) {
              $.each(result, function (index, value) {
                if (value.title.indexOf(keywords) != -1) {
                  createItems(i++, value.title, value.country, value.language, value.imageLink, value.author);
                }
              });
            } else {
              $.each(result, function (index, value) {
                if (value.title.indexOf(keywords) != -1) {
                  createItemsAsPhoto(i++, value.title, value.country, value.language, value.imageLink, value.author);
                }
              });
            }
            $('.reserve').click(function () {
              showNotice();
              $(this).attr("disabled", "disabled");
            });
            $('.preview').click(function () {
              previewBook($(this).attr('form'), $(this).attr('name'), $(this).attr('value'));
            });
            $('#popup_close').click(function () {
              $('.popup_box').fadeOut();
              $('.items-table').css('opacity', '1');
            });
            $('#showList').click(function () {
              searchClick(1, 0);
            });
            $('#showMany').click(function () {
              searchClick(4, 0);
            });
          });
        }, second);
    }
    searchClick(1, 2000);
  });

  //For Category & Language Searching
  $(".sn-filter").click(function () {
    let header = $(this).attr("headers");
    let selected_type = $(this).attr("id");

    function typeClick(typeOfItem, second) {
      let isType = true;
      if (selected_type == "view_book" || selected_type == "view_magazine" || selected_type == "view_software") {
        isType = false;
      }
      let i = 1;
      $(".items-table").empty();
      $(".loading-animation").show();
      if (isType) {
        setTimeout(
          function () {
            $(".loading-animation").hide();
            $.getJSON("books.json", function (result) {
              $(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>" + header + " \\ " + selected_type + "<h2>" +
                "<button class='btn' id='showList'><img src='images/list.png' style='height:20px; width:20px;'></button>" +
                "<button id='showMany'><img src='images/many.png' style='height:20px; width:20px;'></button></div>");
              $.each(result, function (index, value) {
                if (selected_type == value.language || selected_type == value.category) {
                  if (typeOfItem == 1) {
                    createItems(i++, value.title, value.country, value.language, value.imageLink, value.author);
                  } else {
                    createItemsAsPhoto(i++, value.title, value.country, value.language, value.imageLink, value.author);
                  }
                  $('.preview').click(function () {
                    previewBook($(this).attr('form'), $(this).attr('name'), $(this).attr('value'));
                  });
                  $('#popup_close').click(function () {
                    $('.popup_box').fadeOut();
                    $('.items-table').css('opacity', '1');
                  });
                }
              });
              $('.reserve').click(function () {
                showNotice();
                $(this).attr("disabled", "disabled");
              });
              $('.preview').click(function () {
                previewBook($(this).attr('form'), $(this).attr('name'), $(this).attr('value'));
              });
              $('#popup_close').click(function () {
                $('.popup_box').fadeOut();
                $('.items-table').css('opacity', '1');
              });
              $('#showList').click(function () {
                typeClick(1, 0);
              });
              $('#showMany').click(function () {
                typeClick(4, 0);
              });
            });
          }, second);
      }
    }
    typeClick(1, 2000)
  });

  //For PUBLICATION DATE Searching
  $("#from").on("change", function () {
    publicationDate();
  });
  $("#to").on("change", function () {
    publicationDate();
  });

  //FOR NOTICE
  var numOfNotice = 0;
  $('.badge').hide();
  $('#notice').click(function () {
    numOfNotice = 0;
    $('.badge').hide();
  });

  //function for show all items
  function showBook(typeOfItem, second) {
    $(".items-table").empty();
    $(".loading-animation").delay(second).show(function () {
      $(".loading-animation").hide();
      $.getJSON("books.json", function (result) {
        $(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>All \\ Book</h2>" +
          "<button class='btn' id='showList'><img src='images/list.png' style='height:20px; width:20px;'></button>" +
          "<button id='showMany'><img src='images/many.png' style='height:20px; width:20px;'></button></div>");
        if (typeOfItem == 1) {
          $.each(result, function (index, value) {
            createItems((index + 1), value.title, value.country, value.language, value.imageLink, value.author);
          });
        } else {
          $.each(result, function (index, value) {
            createItemsAsPhoto((index + 1), value.title, value.country, value.language, value.imageLink, value.author);
          });
        }
        $('.reserve').click(function () {
          showNotice();
          $(this).attr("disabled", "disabled");
        });
        $('.preview').click(function () {
          previewBook($(this).attr('form'), $(this).attr('name'), $(this).attr('value'));
        });
        $('#popup_close').click(function () {
          $('.popup_box').fadeOut();
          $('.items-table').css('opacity', '1');
        });
        $('#showList').click(function () {
          showBook(1, 0);
        });
        $('#showMany').click(function () {
          showBook(4, 0);
        });
      });
    });
  }

  //function for show all items for software
  function showSoftware() {
    $(".items-table").empty();
    $(".loading-animation").delay(2000).show(function () {
      $(".loading-animation").hide();
      $.getJSON("software.json", function (result) {
        $(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>All \\ Software<h2></div>");
        $.each(result, function (index, value) {
          let str = '<div class="items">' +
            '<div><b style="margin: 10px">' + (index + 1) + '</b></div>' +
            '<div class="bookName" style="margin-left: 150px;"><b>Software Name: ' + value.name + '</b></div>' +
            '<img src = "' + value.image + '" height="100px" style="margin: -10px 20px 10px 40px">' +
            '</div>';
          $(".items-table").append(str);
        });
      });
    });
  }

  //function for show all items for magazine
  function showMagazine() {
    $(".items-table").empty();
    $(".loading-animation").delay(2000).show(function () {
      $(".loading-animation").hide();
      $.getJSON("magazine.json", function (result) {
        $(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>All \\ Magazine<h2></div>");
        $.each(result, function (index, value) {
          let str = '<div class="items">' +
            '<div><b style="margin: 10px">' + (index + 1) + '</b></div>' +
            '<div class="bookName" style="margin-left: 150px;"><b>Magazine Title: ' + value.name + '</b></div>' +
            '<img src = "' + value.image + '" height="120px" style="margin: -10px 20px 10px 40px">' +
            '</div>';
          $(".items-table").append(str);
        });
      });
    });
  }

  //function for date searching
  function publicationDate() {
    let from = $("#from").val();
    let to = $("#to").val();
    let i = 1;
    $(".items-table").empty();
    $(".loading-animation").show();
    console.log("called");

    function dateClick(typeOfItem, second) {
      setTimeout(
        function () {
          $(".loading-animation").hide();
          $.getJSON("books.json", function (result) {
            console.log("success");
            $(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>From " + from + " To " + to + " Year \\   Result: <h2>" + "<button class='btn' id='showList'><img src='images/list.png' style='height:20px; width:20px;'></button>" +
              "<button id='showMany'><img src='images/many.png' style='height:20px; width:20px;'></button></div>");
            $.each(result, function (index, value) {
              if (value.year >= from && value.year <= to) {
                if (typeOfItem == 1) {
                  createItems(i++, value.title, value.country, value.language, value.imageLink, value.author);
                } else {
                  createItemsAsPhoto(i++, value.title, value.country, value.language, value.imageLink, value.author);
                }
              }
            });
            $('.reserve').click(function () {
              showNotice();
            });
            $('.preview').click(function () {
              previewBook($(this).attr('form'), $(this).attr('name'), $(this).attr('value'));
            });
            $('#popup_close').click(function () {
              $('.popup_box').fadeOut();
              $('.items-table').css('opacity', '1');
            });
            $('#showList').click(function () {
              dateClick(1, 0);
            });
            $('#showMany').click(function () {
              dateClick(4, 0);
            });
          });
        }, second);
    }
    dateClick(1, 2000);
  }

  //Hover effect
  $("#go").hover(function () {
    $("#go").css("background-color", "blue");
    $("#go").mouseleave(function () {
      $("#go").css("background-color", "midnightblue");
    });
  });

  $("#search_bar").mouseover(function () {
    $("#search_bar").css("background-color", "#fffaf0");
    $("#search_bar").mouseleave(function () {
      $("#search_bar").css("background-color", "white");
    });
  });

  $(".headText").hover(function () {
    $(this).animate({
      fontSize: "16px"
    }, 300);
  });
  $(".headText").mouseleave(function () {
    $(this).animate({
      fontSize: "12px"
    }, 300);
  });

  //for advance searching
  $(".advance_search_bar").slideUp().hide();
  var as_count = 0;
  $("#advance_search").click(function () {
    if (as_count++ % 2 == 0) {
      $(".advance_search_bar").slideDown().show();
    } else {
      $(".advance_search_bar").slideUp();
    }
  });

  //For Advice Searching
  $("#m12").click(function(){
    $("#as_from").val("2017");
    $("#as_to").val("2018");
  });
  $("#y3").click(function(){
    $("#as_from").val("2015");
    $("#as_to").val("2018");
  });
  $("#y5").click(function(){
    $("#as_from").val("2013");
    $("#as_to").val("2018");
  });
  $("#as_btn").click(function () {
    let category = $("#as_category").val();
    let language = $("#as_language").val();
    let pages = $("#as_page").val();
    let i = 1;
    $(".items-table").empty();
    $(".loading-animation").show();
    $(".advance_search_bar").slideUp();
    as_count++;
    setTimeout(
      function () {
        $(".loading-animation").hide();
        $.getJSON("books.json", function (result) {
          console.log("success");
          $(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>advance_search \\ Result: <h2></div>");
          $.each(result, function (index, value) {
            if (language == "others") {
              if (value.category == category &&
                value.language != "English" &&
                value.language != "French" &&
                value.language != "Italian" &&
                value.pages <= pages) {
                createItems(i++, value.title, value.country, value.language, value.imageLink, value.author);
              }
            } else if (language == "all" || category == "all") {
              if (language == "all" && category == value.category && pages >= value.pages) {
                createItems(i++, value.title, value.country, value.language, value.imageLink, value.author);
              } else if (language == value.language && category == "all" && pages >= value.pages) {
                createItems(i++, value.title, value.country, value.language, value.imageLink, value.author);
              } else if (language == "all" && category == "all" && pages >= value.pages) {
                createItems(i++, value.title, value.country, value.language, value.imageLink, value.author);
              }
            } else if (value.category == category && value.language == language && value.pages <= pages) {
              createItems(i++, value.title, value.country, value.language, value.imageLink, value.author);
            }
          });
          $('.reserve').click(function () {
            showNotice();
          });
          $('.preview').click(function () {
            previewBook($(this).attr('form'), $(this).attr('name'), $(this).attr('value'));
          });
          $('#popup_close').click(function () {
            $('.popup_box').fadeOut();
            $('.items-table').css('opacity', '1');
          });
        });
      }, 2000);
  });

  //for top right user infomation
  var userInfoCount = 0;
  $(".user_info_container").hide();
  $("#myAccount").click(function () {
    if (userInfoCount++ % 2 == 0)
      $(".user_info_container").fadeIn();
    else
      $(".user_info_container").hide();
  });

  //for top right user Notice
  var userNoticeCount = 0;
  var reseved_count = 0;
  if ($('#charaters').text() === "student") {
    reseved_count = 5;
  } else if ($('#charaters').text() === "alumni") {
    reseved_count = 3;
  } else {
    reseved_count = 10;
  }
  var now_reserved = 0;
  $(".user_notice_container").hide();
  $(".popup_box_reserved").hide();
  $("#notice").click(function () {
    $(".popup_box_reserved").fadeIn();
    $('.items-table').css('opacity', '0.1');
  });
  $('#popup_close_reserved').click(function () {
    $(".popup_box_reserved").hide();
    $('.items-table').css('opacity', '1');
  });

  var bookNameCount = 0;
  $('.dialogBox').hide();

  function showNotice() {
    let i = 0;
    let d = new Date();
    let count = 0;
    let bookName = ["Things_Fall_Apart", "Fairy_tales", "The_Divine_Comedy", "The_Epic_Of_Gilgamesh", "The_Book_Of_Job",
						"One_Thousand_and_One_Nights", "Njals_Saga", "Pride_and_Prejudice", "Le_Pere_Goriot", "Molloy_Malone_Dies_The_Unnamable_the_trilogy", ];
    let bookImg = ["images/things-fall-apart.jpg", "images/fairy-tales.jpg", "images/the-divine-comedy.jpg", "images/the-epic-of-gilgamesh.jpg",
                   "images/the-book-of-job.jpg", "images/one-thousand-and-one-nights.jpg", "images/njals-saga.jpg", "images/pride-and-prejudice.jpg", "images/le-pere-goriot.jpg", "images/molloy-malone-dies-the-unnamable.jpg"];
    if (now_reserved++ < reseved_count) {
      $(this).attr("disabled", "disabled");
      let reserved_str = "<div style='height: 150px; width: auto; border: 1px solid black; margin:50px; padding: 5px;' class='reservedItem'>Title: " +
        "<a id='booknameRemove'>" + bookName[bookNameCount % 10] + "</a><br/>" +
        "<br/>Reserved Date: " + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + "<br/>" +
        "<img class='reservedImage' src='" + bookImg[bookNameCount % 10] + "'>" +
        "<button class='undo' style='margin-left: 800px; top: -100px; visibility:hidden;'>Undo Cancel</button>" +
        "<button style='margin-left: 10px;' class='cancelReserve' id='" + bookName[bookNameCount % 10] +
        "'>Cancel</button><button class='deletebook'style='margin-left: 10px; visibility:hidden;' >Delete</button></div>";
      $('.dialogBox').fadeIn('slow').delay(2000).fadeOut('slow');
      $('.badge').show();
      $('.badge').html(++numOfNotice);
      $("#reserved_content").append(reserved_str);
      bookNameCount++;
    } else {
      alert("You have limited to resere the book.");
      $(this).parent.prop("disabled", false);
    }
    $('.cancelReserve').click(function () {
      now_reserved = $('.account_notice_content').children().length;
      $('.reserve').removeAttr("disabled");
      $(this).css("visibility", "hidden"); //cancel
      $(this).prev().css("visibility", "visible"); //undo cancel
      $(this).prev().css("margin-left", "900px"); //undo cancel
      $(this).next().css("visibility", "visible"); //delete
      $(this).next().css("margin-left", "-60px"); //delete
      $(this).parent().addClass("forCancelReserve");
      $('.undo').click(function () {
        $(this).css("visibility", "hidden"); //undo cancel
        $(this).css("margin-left", "800px"); //undo cancel
        $(this).next().css("visibility", "visible"); //cancel
        $(this).next().next().css("visibility", "hidden"); //delete
        $(this).next().next().css("margin-left", "10px"); //delete
        $(this).parent().removeClass("forCancelReserve");
        $(this).css("visibility", "hidden");
      });
    });
    $('.deletebook').click(function () {
      $(this).parent().remove();
    })
  }

  //for logout
  $(".logout_btn").click(function () {
    location.href = "login.html";
  });

  // student room booking function
  $("#room_booking").click(function () {
    $(".items-table").empty();
    $(".loading-animation").show();
    setTimeout(
      function () {
        $(".loading-animation").hide();
        $(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>Room Booking<h2></div>");

        // load all the elements from booking_room.html
        $.ajax({
          url: 'booking_room.html',
          success: function (page_elements) {
            $(".items-table").append(page_elements);
          },
          dataType: 'html'
        })
      }, 2000);
  });

  // teach_staff test paper function
  $("#test_paper").click(function () {
    let i = 1;
    $(".items-table").empty();
    $(".loading-animation").show();
    setTimeout(
      function () {
        $(".loading-animation").hide();
        $.getJSON("test_paper.json", function (result) {
          console.log("success");
          $(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>Test Paper<h2></div>");
          $.each(result, function (index, value) {
            let str = '<div class="items">' +
              '<div><b style="margin: 10px">' + (i++) + '</b></div>' +
              '<div class="pageName" style="margin-left: 150px;"><b>Page Title: ' + value.title + '</b></div>' +
              '<img src = "' + value.imageLink + '" height="120px" style="margin: -10px 20px 10px 40px">' +
              '</div>';
            $(".items-table").append(str);
          });
        });
      }, 2000);
  });

  // non teach staff and alumni place booking function
  $("#place_booking").click(function () {
    $(".items-table").empty();
    $(".loading-animation").show();
    setTimeout(
      function () {
        $(".loading-animation").hide();
        $(".items-table").append("<div class='items' style='height: 35px;'><h2 style='margin-left:20px;'>Place Booking<h2></div>");

        // load all the elements from booking_room.html
        $.ajax({
          url: 'booking_place.html',
          success: function (page_elements) {
            $(".items-table").append(page_elements);
          },
          dataType: 'html'
        })
      }, 2000);
  });

  //function for preview
  function previewBook(img, title, author) {
    $('#preview_content').empty();
    let country = ["France", "Belgium", "United Kingdom", "United States", "India", "Roman Empire"];
    let lang = ["French", "Greek", "English", "English", "Sanskrit", "Classical Latin"];
    let random = Math.floor(Math.random() * 6);
    let year = Math.floor(Math.random() * 2019);
    let page = Math.floor(Math.random() * 1000);
    let content = "<img src='" + img + "' id='preview_img' height='250px;'>" +
      "<p id='preview_content'>Title: " + title + "</p>" +
      "<p id='preview_content'>Author: " + author + "</p>" +
      "<p id='preview_content'>Country: " + country[random] + "</p>" +
      "<p id='preview_content'>Language: " + lang[random] + "</p>" +
      "<p id='preview_content'>Year: " + year + "</p>" +
      "<p id='preview_content'>Page: " + page + "</p>" +
      "<p style='margin:-400px 300px 0px 300px;'>Author Notes: <br/><br/>As multimedia applications are used increasingly in many embedded systems, power efficient design for the applications becomes more important than ever. This paper proposes a simple dynamic voltage scheduling technique, which suits the multimedia applications well. The proposed technique fully utilizes the idle intervals with buffers in a variable speed processor. The main theme of this paper is to determine the minimum buffer size to achieve the maximum energy saving in three cases: single-task, multiple subtasks, and multi-task. Experimental results show that the proposed technique is expected to obtain significant power reduction for several real-world multimedia applications.</p>" +
      "<img src='images/arrowRight.png' id='arrowRight'>" +
      "<div class='messagebox'>click to view chapter</div>";
    $('#preview_content').append(content);
    $('.messagebox').hide();
    $('.popup_box').fadeIn();
    $('.items-table').css('opacity', '0.1');
    $('#arrowRight').hover(function () {
      $('.messagebox').fadeIn();
    }, function () {
      $('.messagebox').fadeOut();
    });
    $('#arrowRight').click(function () {
      viewChapter(img, title, author);
    });
  }

  //function for creating items
  function createItems(index, title, country, language, imageLink, author) {
    let str = '<div class="items">' +
      '<div><b style="margin: 10px">' + index + '</b></div>' +
      '<div class="bookName" style="margin-left: 150px; width: 400px;"><b>Book Title: ' + title + '</b><br/><br>' +
      '<b>Country: ' + country + '</b><br/><br/>' +
      '<b>Language: ' + language + '</b></div>' +
      '<img src = "' + imageLink + '" height="120px" style="margin: -80px 20px 10px 40px;">' +
      '<button class="preview" form="' +
      imageLink + '" name="' +
      title + '" value="' +
      author + '" style="margin-bottom: 20px;">Preview</button>' +
      '<button class="reserve" style="margin-left: 5px;">Reserve</button>' +
      '</div>';
    $(".items-table").append(str);
  }

  var c = 0;

  function createItemsAsPhoto(index, title, country, language, imageLink, author) {
    let str = '<div class="items">' +
      '<b style="margin: 10px">' + index + '</b>' +
      '<div class="bookName" style="margin-left: 150px; width: 600px;"><b>Book Title: ' + title + '</b><br/><br>' +
      '<b>Country: ' + country + '</b><br/><br/>' +
      '<b>Language: ' + language + '</b></div>' +
      '<img src = "' + imageLink + '" height="120px" style="margin: -80px 20px 10px 40px;">' +
      '<button class="preview" form="' +
      imageLink + '" name="' +
      title + '" value="' +
      author + '" style="margin-bottom: 20px;">Preview</button>' +
      '<button class="reserve" style="margin-left: 5px;">Reserve</button>' +
      '</div>';
    let str2 = '<div class="items" style="margin-left: 600px; margin-top: -184px; width: 600px;">' +
      '<b style="margin: 10px">' + index + '</b>' +
      '<div class="bookName" style="margin-left: 150px; width: 600px;"><b>Book Title: ' + title + '</b><br/><br>' +
      '<b>Country: ' + country + '</b><br/><br/>' +
      '<b>Language: ' + language + '</b></div>' +
      '<img src = "' + imageLink + '" height="120px" style="margin: -80px 20px 10px 40px;">' +
      '<button class="preview" form="' +
      imageLink + '" name="' +
      title + '" value="' +
      author + '" style="margin-bottom: 20px;">Preview</button>' +
      '<button class="reserve" style="margin-left: 5px;">Reserve</button>' +
      '</div>';
    if (c++ % 2 == 0)
      $(".items-table").append(str);
    else
      $(".items-table").append(str2);
  }

  //for view chapter
  function viewChapter(img, title, author) {
    $('#preview_content').fadeOut(function () {
      $('#preview_content').empty();
    });
    $('#preview_content').fadeIn(function () {
      $('#preview_content').append(content);
      $('#preview_content').append("<button id='backTobookDetails' style='margin-top:-50px;'>Back</button>");
      $('#backTobookDetails').click(function () {
        previewBook(img, title, author);
      });
      var numPanels = $('.panel').length;
      // if a panel is open, lower its z-idx
      // otherwise, set zIdx back to original
      function checkZ($aPanel) {
        if ($aPanel.hasClass('open')) {
          $aPanel.css('z-index', '1');
        } else {
          // set z-index back to original stored in data
          zIdx = $aPanel.data('zIdx');
          $aPanel.css('z-index', zIdx);
        }
      }
      // loop through all panels and reverse sort via zIdx
      for (i = 0; i < (numPanels); i++) {
        var zIdx = numPanels - i;
        $('.panel').eq(i).css('z-index', zIdx).data('zIdx', zIdx);
      }
      // when clicking the front panel add class 'open' to panel
      // if clicking bacl panel, remove 'open' from panel
      $('.panel').on('click', '.front, .back', function () {
        $(this).parent('.panel').toggleClass('open');
        checkZ($(this).parent('.panel'));
      });
    });
    var content = '<div class="flip-panel" style="margin-top: -50px;">' +
      '<div class="panel">' +
      '<div class="front">' +
      '<div class="content">' +
      '<img src="' + img + '" style="height: 550px; width: 400px; margin-top: -12px; margin-left: -12px;">' +
      '</div>' +
      '</div>' +
      '<div class="back">' +
      '<div class="content">' +
      '<h2>Chapter 1</h2>' +
      '<p>Mr. and Mrs. Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much. They were the last people you\'d expect to be involved in anything strange or mysterious, because they just didn\'t hold with such nonsense. </p>' +
      '<p>Mr. Dursley was the director of a firm called Grunnings, which made drills. He was a big, beefy man with hardly any neck, although he did have a very large mustache. Mrs. Dursley was thin and blonde and had nearly twice the usual amount of neck, which came in very useful as she spent so much of her time craning over garden fences, spying on the neighbors. The Dursleys had a small son called Dudley and in their opinion there was no finer boy anywhere. </p><p>He found it a lot harder to concentrate on drills that afternoon and when he left the building at five o\'clock, he was still so worried that he walked straight into someone just outside the door. "Sorry," he grunted, as the tiny old man stumbled and almost fell. It was a few seconds before Mr. Dursley realized that the man was wearing a violet cloak. </p>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="panel">' +
      '<div class="front">' +
      '<div class="content">' +
      '<p>He didn\'t seem at all upset at being almost knocked to the ground. On the contrary, his face split into a wide smile and he said in a squeaky voice that made passersby stare, "Don\'t be sorry, my dear sir, for nothing could upset me today! Rejoice, for You-Know-Who has gone at last!Even Muggles like yourself should be celebrating, this happy, happy day!"</p><p>The Dursleys had everything they wanted, but they also had a secret, and their greatest fear was that somebody would discover it. They didn\'t think they could bear it if anyone found out about the Potters. Mrs. Potter was Mrs. Dursley\'s sister, but they hadn\'t met for several years; in fact, Mrs. Dursley pretended she didn\'t have a sister, because her sister and her good-for-nothing husband were as unDursleyish as it was possible to be. The Dursleys shuddered to think what the neighbors would say if the Potters arrived in the street. The Dursleys knew that the Potters had a small son, too, but they had never even seen him. This boy was another good reason for keeping the Potters away; they didn\'t want Dudley mixing with a child like that. </p><p>As he pulled into the driveway of number four, the first thing he saw — and it didn\'t improve his mood — was the tabby cat he\'d spotted that morning. It was now sitting on his garden wall.</p><a class="book_hits_text_n" style="margin-left: 200px;">click to view next page<a>' +
      '</div>' +
      '</div>' +
      '<div class="back">' +
      '<div class="content">' +
      '<p>When Mr. and Mrs. Dursley woke up on the dull, gray Tuesday our story starts, there was nothing about the cloudy sky outside to suggest that strange and mysterious things would soon be happening all over the country. Mr. Dursley hummed as he picked out his most boring tie for work, and Mrs. Dursley gossiped away happily as she wrestled a screaming Dudley into his high chair. </p>' +
      '<p>None of them noticed a large, tawny owl flutter past the window. At half past eight, Mr. Dursley picked up his briefcase, pecked Mrs. Dursley on the cheek, and tried to kiss Dudley good-bye but missed, because Dudley was now having a tantrum and throwing his cereal at the walls. "Little tyke," chortled Mr. Dursley as he left the house. He got into his car and backed out of number four\'s drive. </p><p>And the old man hugged Mr. Dursley around the middle and walked off. Mr. Dursley stood rooted to the spot. He had been hugged by a complete stranger. He also thought he had been called a Muggle, whatever that was. He was rattled. He hurried to his car and set off for home, hoping he was imagining things, which he had never hoped before, because he didn\'t approve of imagination. </p><p>"Shoo!" said Mr. Dursley loudly. The cat didn\'t move. It just gave him a stern look. Was this normal cat behavior? </p><a class="book_hits_text_f">click to view front page<a>' +
      '</div>' +
      '</div>' +
      '</div>  ' +
      '<div class="panel">' +
      '<div class="front">' +
      '<div class="content">' +
      '<p>It was on the corner of the street that he noticed the first sign of something peculiar — a cat reading a map. For a second, Mr. Dursley didn\'t realize what he had seen — then he jerked his head around to look again. There was a tabby cat standing on the corner of Privet Drive, but there wasn\'t a map in sight. What could he have been thinking of? It must have been a trick of the light. </p>' +
      '<p>Mr. Dursley blinked and stared at the cat. It stared back. As Mr. Dursley drove around the corner and up the road, he watched the cat in his mirror. It was now reading the sign that said Privet Drive — no, looking at the sign; cats couldn\'t read maps or signs. Mr. Dursley gave himself a little shake and put the cat out of his mind. </p><p>As he had expected, Mrs. Dursley looked shocked and angry. After all, they normally pretended she didn\'t have a sister. "No," she said sharply. "Why?" "Funny stuff on the news," Mr. Dursley mumbled. "Owls... shooting stars... and there were a lot of funny-looking people in town today..." "So?" snapped Mrs. Dursley. "Well, I just thought... maybe... it was something to do with... you know... her crowd." </p>' +
      '</div>' +
      '</div>' +
      '<div class="back">' +
      '<div class="content" style="text-align: center; margin: auto;">' +
      '<h1 style="margin-top: 200px;">The End</h1>' +
      '</div>' +
      '</div>' +
      '</div>  ' +
      '</div>';
  }
});
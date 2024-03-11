function addCompare(id) {
  $.ajax({
    url: "/include/add_compare.php", // URL
    type: "GET",
    dataType: "html",
    data: { id_item: id },
    success: function (response) {
      var result = $.parseJSON(response);
      //somealert(result+' <br>добавлен в корзину');
      $(".comparison-views").addClass("active");
      refresh_compare();
      refresh_cnt();
      $(".comparison__link").each(function (indx, element) {
        if ($(element).data("id") == id) {
          $(element).addClass("active");
        }
      });
      //console.log(result);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error: " + errorThrown);
    },
  });
}
function delCompare(id) {
  var param = "del=" + id;
  $.ajax({
    url: "/include/add_compare.php", // URL
    type: "GET",
    dataType: "html",
    data: param,
    success: function (response) {
      //
      $(".item_" + id).remove();
      refresh_compare();
      refresh_cnt();
      refresh_compare_full();
      $(".comparison__link").each(function (indx, element) {
        if ($(element).data("id") == id) {
          $(element).removeClass("active");
        }
      });
      //console.log(response);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error: " + errorThrown);
    },
  });
}
function refresh_compare() {
  var param = "items=1";
  $.ajax({
    url: "/include/refresh.php", // URL
    type: "GET",
    dataType: "html",
    data: param,
    success: function (response) {
      //
      //var result = $.parseJSON(response);
      $(".comparison-views__body").empty();
      $(".comparison-views__body").append(response);
      //append();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error: " + errorThrown);
    },
  });
}
function refresh_compare_full() {
  var param = "items=1";
  $.ajax({
    url: "/include/refresh_full.php", // URL
    type: "GET",
    dataType: "html",
    data: param,
    success: function (response) {
      //
      //var result = $.parseJSON(response);
      $(".refresh_full").empty();
      $(".refresh_full").append(response);
      //append();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error: " + errorThrown);
    },
  });
}
function refresh_cnt() {
  var param = "cnt=1";
  $.ajax({
    url: "/include/refresh.php", // URL
    type: "GET",
    dataType: "html",
    data: param,
    success: function (response) {
      //
      //var result = $.parseJSON(response);
      if (response != 0) {
        $(".comparison-views__block--numb span").empty();
        $(".comparison-views__block--numb span").append(response);
      } else {
        $(".comparison-views").removeClass("active");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error: " + errorThrown);
    },
  });
}

$(function () {
  wow = new WOW({
    boxClass: "wow",
    animateClass: "animated",
    offset: 10,
    mobile: true,
    live: true,
  });
  wow.init();

  setTimeout(function () {
    $("body").removeClass("loader");
  }, 2100);

  if ($(".header__preloader").is("div")) {
    $(".header__preloader").addClass("load");

    if ($(".header__preloader").hasClass("load")) {
      $(".header").attr("style", "padding-top: .625em");
      $(".header > .page__wrap").attr("style", "opacity: 1");
      // console.log($(this).attr("style", "transform: translateY(-167vh)"));
      $(".header__preloader").attr("style", "transform: translateY(-167vh)");
    }
  }

  $(".share__link").click(function () {
    $(".ya-share2").toggle();
  });
  $(".show_filter").click(function () {
    $(".left").toggle();
  });
  $(".comparison-views__close").click(function () {
    Cookies.set("hidecompare", "hide", { expires: 7 });
    $(".comparison-views__container").addClass("hide");
  });
  if (Cookies.get("hidecompare") == "hide") {
    $(".comparison-views__container").addClass("hide");
  }
  $(".comparison-views__block--indent").click(function () {
    Cookies.remove("hidecompare");
    $(".comparison-views__container").removeClass("hide");
  });
  if ($("js-matchHeight").is("div")) {
    $(".js-matchHeight").matchHeight({
      byRow: true,
      property: "height",
      target: null,
      remove: false,
    });
  }
  $(".popup__close, .popup__overflow").click(function () {
    $(".popup").removeClass("active");
  });

  var hh = $("header").height();
  var fh = $("footer").height();
  var wh = $(window).height();
  var сh = wh - hh - fh;
  $("main").css("min-height", сh);

  $(".js-burger").click(function (e) {
    e.preventDefault();
    $("body, .header").addClass("active");
  });

  // var addEvent = function(object, type, callback) {
  //    	if (object == null || typeof(object) == 'undefined') return;
  //    		if (object.addEventListener) {
  //        		object.addEventListener(type, callback, false);
  //    		} else if (object.attachEvent) {
  //        		object.attachEvent("on" + type, callback);
  //    		} else {
  //        		object["on"+type] = callback;
  //   	 		}
  // };

  // addEvent(window, "resize", function(event) {
  //   console.log('resized');
  // });

  $(".js-main__banner").each(function () {
    $(this).length;
    var banImg = $(this).find("img").attr("src");

    $(this).attr("style", "background-image: url(" + banImg + ")");
  });

  $(".js-slider-current").on(`init reInit`, function (event, slick) {
    $(".count__numb").text(1 + " | " + slick.slideCount);
  });
  $(".js-slider-current").on(`afterChange`, function (event, slick, currentSlide, nextSlide) {
    $(".count__numb").text(currentSlide + 1 + " | " + slick.slideCount);
  });
  var counter = $(".count");

  $(".js-slider-current").slick({
    arrows: false,
    rows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    asNavFor: ".js-slider-nav",
  });

  $(".js-slider-nav").slick({
    slidesToShow: 3.5,
    slidesToScroll: 1,
    dots: false,
    rows: false,
    arrows: false,
    focusOnSelect: true,
    vertical: true,
    verticalSwiping: true,
    asNavFor: ".js-slider-current",
  });

  var $slider = $(".js-slider-nav");

  $(".js-next__div").click(function () {
    $slider.slick("slickNext");
  });

  var time = 2;
  var $slick,
    isPause,
    tick,
    percentTime = 0;

  if ($(".js-slider").length) {
    $(".js-slider").each(function () {
      // var time = 2;
      // var isPause, tick, percentTime = 0;

      // $slick = $(this);
      // var $status = $(this).closest('.section').find('.slider-num'),
      //  	$current = $status.find('strong'),
      //  	$length = $status.find('i');

      // $slick.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {

      //  		var i = (currentSlide ? currentSlide : 0) + 1;
      //  		$current.html((((i) < 10) ? "0" + (i) : i));
      //  		$length.html('/' + (((slick.slideCount) < 10) ? "0" + (slick.slideCount) : slick.slideCount));
      //  		$status.html( '<strong>' + (((i)<10) ? "0"+(i) : i) +'</strong>'+ '<small>/' + (((slick.slideCount)<10) ? "0"+(slick.slideCount) : slick.slideCount)  + '</<small>');
      // });

      $(".js-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        infinite: true,
        touchMove: true,
        draggable: true,
        rows: false,
        fade: true,
        pauseOnHover: true,
        lazyLoad: "ondemand",
        prevArrow:
          '<a href="javascript: void(0);" class="page__link arrow arrow__prev"><span><img class="page__img" src="/local/templates/zilant/img/icon/back-black.svg"></span></a>',
        nextArrow:
          '<a href="javascript: void(0);" class="page__link arrow arrow__next"><span><img class="page__img" src="/local/templates/zilant/img/icon/next-black.svg"></span><svg preserveAspectRatio="none" class="progress" viewBox="0 0 110 110"><circle class="circle-bg" r="50" cx="55" cy="55"/><circle class="circle-go" r="50" cx="55" cy="55"/></svg></a>',
        autoplay: true,
        autoplaySpeed: 9000,
        cssEase: "ease-in-out",
        touchThreshold: 100,
        // useTransform: true,
        appendArrows: ".block__box--arrow",
      });

      $(".js-slider").on({
        mouseenter: function () {
          isPause = true;

          console.log((isPause = true));
        },
        mouseleave: function () {
          isPause = false;
          startProgressbar();
        },
        mousedown: function () {
          $rbar.fadeOut("slow");
          percentTime = 0;
        },
        beforeChange: function (event, slick, currentSlide, nextSlide) {
          percentTime = 0;
        },
        afterChange: function (event, slick, currentSlide, nextSlide) {
          if (currentSlide === slick.slideCount - 1) {
            $(".js-slider").find(".slick-prev").removeClass("slick-disabled");
            $(".js-slider").find(".slick-next").addClass("slick-disabled");
          }
          // console.log(currentSlide + '_' + slick.slideCount);
        },
      });
    });
  }

  function startProgressbar() {
    clearTimeout(tick);
    isPause = false;
    tick = setInterval(interval, 22);
    $rbar.fadeIn("slow");
  }

  var $rbar = $(".circle-go");
  var rlen = 2 * Math.PI * $rbar.attr("r");

  function interval() {
    if (isPause === false) {
      percentTime += 1 / (time + 0.1);

      $rbar.css({
        strokeDasharray: rlen,
        strokeDashoffset: rlen * (1 - percentTime / 100),
      });
      if (percentTime >= 100) {
        $(".js-slider").slick("slickNext");
        percentTime = 0;
        startProgressbar();
      }

      // console.log('S>>>' + percentTime);
    }
  }

  startProgressbar();

  var windowsize = $(window).width();

  $(window).resize(function () {
    var windowsize = $(window).width();
    $(".list-item__thumbnail__brazzers").css("height", $(".brazzers__image").height());
  });
  setTimeout(function () {
    $(".list-item__thumbnail__brazzers").css("height", $(".brazzers__image").height());
  }, 1000);

  if (windowsize > 1024) {
    $(".js-sentence").on("init", function (slick) {
      var lClient = $(".slick-dots > li", slick.target).length;
      $(".slick-dots > li", slick.target).each(function () {
        $(this).css({ width: 100 / lClient + "%" });
      });
    });
    $(".js-sentence").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      rows: false,
      dots: true,
    });
  }

  if (windowsize < 1024) {
    $(".js-sentence__block--slider").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      rows: false,

      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },

        {
          breakpoint: 510,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }

  if (windowsize < 680) {
    $(".js-main__news--desc").slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      rows: false,
      responsive: [
        {
          breakpoint: 510,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });

    $(".card-product__right--slider-desc").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      rows: false,
      dots: true,
    });
  }

  $(".js-slider__min, .js-slider__max, .js-slider-run__min, .js-slider-run__max")
    .find("input")
    .keypress(function (e) {
      var key, keyChar;
      if (!e) var e = window.e;
      if (e.keyCode) key = e.keyCode;
      else if (e.which) key = e.which;
      if (
        key == null ||
        key == 0 ||
        key == 8 ||
        key == 13 ||
        key == 9 ||
        key == 46 ||
        key == 37 ||
        key == 39
      )
        return true;
      keyChar = String.fromCharCode(key);
      if (!/\d/.test(keyChar)) return false;
    });

  $("#slider-run").slider({
    animate: "slow",
    range: true,
    step: 1,
    min: 0,
    max: 470000,
    values: [0, 470000],

    slide: function (event, ui) {
      $(".js-slider-run__min").find("input").val(ui.values[0]);
      $(".js-slider-run__max").find("input").val(ui.values[1]);
    },
  });
  $(".js-slider-run__min").find("input").val($("#slider-run").slider("values", 0));
  $(".js-slider-run__max").find("input").val($("#slider-run").slider("values", 1));

  $(".js-slider-run__min")
    .find("input")
    .change(function () {
      var value1 = $(".js-slider-run__min").find("input").val();
      var value2 = $(".js-slider-run__max").find("input").val();
      if (parseInt(value1) > parseInt(value2)) {
        value1 = value2;
        $(".js-slider-run__min").find("input").val(value1);
      }
      $("#slider-run").slider("values", 0, value1);
    });
  $(".js-slider-run__max")
    .find("input")
    .change(function () {
      var value1 = $(".js-slider-run__min").find("input").val();
      var value2 = $(".js-slider-run__max").find("input").val();
      if (parseInt(value1) > parseInt(value2)) {
        value2 = value1;
        $(".js-slider-run__max").find("input").val(value2);
      }
      $("#slider-run").slider("values", 1, value2);
    });

  $(".js-rent__how-work").each(function () {
    $(this).length;

    $(this).on("mouseover", function () {
      $(this).addClass("active").siblings().removeClass("active");
    });
  });

  $("#calc_ui").slider({
    range: "min",
    value: 250000,
    min: 250000,
    max: 15000000,
    step: 5000,
    animate: "slow",
    slide: function (event, ui) {
      $("#amount_slide").val(ui.value);
    },
    change: function (event, ui) {
      $("#amount_slide").attr("value", ui.value);

      var tallageAvans = parseInt($("#amount1_slide").val());
      var avans = (parseInt($("#amount_slide").val()) / 100) * tallageAvans; //вычисление процентов
      var price = parseInt($("#amount_slide").val()) - avans;

      var dolg = price;
      var srok = parseInt($("#amount3_slide").val());

      var avans_rub = ($("#amount_slide").val() / 100) * tallageAvans;

      var percents = [
        [0.2, 0.21, 0.22, 0.23, 0.24],
        [0.19, 0.2, 0.21, 0.22, 0.23],
        [0.18, 0.19, 0.2, 0.21, 0.22],
        [0.175, 0.185, 0.195, 0.205, 0.215],
        [0.17, 0.18, 0.19, 0.2, 0.21],
      ];
      var percents_bu = [
        [0.24, 0.25, 0.26, 0.27, 0.28],
        [0.23, 0.24, 0.25, 0.26, 0.27],
        [0.22, 0.23, 0.24, 0.25, 0.26],
        [0.215, 0.225, 0.235, 0.245, 0.255],
        [0.21, 0.22, 0.23, 0.24, 0.25],
      ];
      var check_form;
      check_form = percents;
      //console.log("new");
      if (avans > 0) {
        var line1 = tallageAvans / 10 - 1;
      } else {
        var line1 = 0;
      }
      console.log(line1);
      var line2 = srok / 12 - 1;
      //console.log(check_form[line1][line2]);

      //var procentgod = check_form[line1][line2];
      var procentgod = 0.15;

      var procentmounth = procentgod / 12;
      var stepen = Math.pow(1 + procentmounth, -srok);
      var plata = (dolg * procentmounth) / (1 - stepen);

      var obsh = plata * srok;

      $(".inrub_sum").html(
        String(avans_rub.toFixed()).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 "),
      );
      $(".price_res").html(String(plata.toFixed()).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 "));
      $(".calculate__result--summ").html(
        String(obsh.toFixed()).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 "),
      );

      //console.log(plata);
      //console.log(obsh);
    },
  });
  $("#calc_slide").slider({
    range: "min",
    value: 1,
    min: 1,
    max: 99,
    step: 1,
    animate: "slow",
    slide: function (event, ui) {
      $("#amount1_slide").val(ui.value);
    },
    change: function (event, ui) {
      $("#amount_slide").attr("value", ui.value);

      var tallageAvans = parseInt($("#amount1_slide").val());
      var avans = (parseInt($("#amount_slide").val()) / 100) * tallageAvans; //вычисление процентов
      var price = parseInt($("#amount_slide").val()) - avans;

      var dolg = price;
      var srok = parseInt($("#amount3_slide").val());

      var avans_rub = ($("#amount_slide").val() / 100) * tallageAvans;

      var percents = [
        [0.2, 0.21, 0.22, 0.23, 0.24],
        [0.19, 0.2, 0.21, 0.22, 0.23],
        [0.18, 0.19, 0.2, 0.21, 0.22],
        [0.175, 0.185, 0.195, 0.205, 0.215],
        [0.17, 0.18, 0.19, 0.2, 0.21],
      ];
      var percents_bu = [
        [0.24, 0.25, 0.26, 0.27, 0.28],
        [0.23, 0.24, 0.25, 0.26, 0.27],
        [0.22, 0.23, 0.24, 0.25, 0.26],
        [0.215, 0.225, 0.235, 0.245, 0.255],
        [0.21, 0.22, 0.23, 0.24, 0.25],
      ];
      var check_form;
      check_form = percents;
      //console.log("new");
      if (avans > 0) {
        var line1 = tallageAvans / 10 - 1;
      } else {
        var line1 = 0;
      }
      console.log(line1);
      var line2 = srok / 12 - 1;
      //console.log(check_form[line1][line2]);

      //var procentgod = check_form[line1][line2];
      var procentgod = 0.15;

      var procentmounth = procentgod / 12;
      var stepen = Math.pow(1 + procentmounth, -srok);
      var plata = (dolg * procentmounth) / (1 - stepen);

      var obsh = plata * srok;

      $(".inrub_sum").html(
        String(avans_rub.toFixed()).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 "),
      );
      $(".price_res").html(String(plata.toFixed()).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 "));
      $(".calculate__result--summ").html(
        String(obsh.toFixed()).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 "),
      );
    },
  });
  $("#calc_ui2").slider({
    range: "min",
    value: 12,
    min: 12,
    max: 60,
    step: 12,
    animate: "slow",
    slide: function (event, ui) {
      $("#amount3_slide").val(ui.value);
    },
    change: function (event, ui) {
      $("#amount_slide").attr("value", ui.value);

      var tallageAvans = parseInt($("#amount1_slide").val());
      var avans = (parseInt($("#amount_slide").val()) / 100) * tallageAvans; //вычисление процентов
      var price = parseInt($("#amount_slide").val()) - avans;

      var dolg = price;
      var srok = parseInt($("#amount3_slide").val());

      var avans_rub = ($("#amount_slide").val() / 100) * tallageAvans;

      var percents = [
        [0.2, 0.21, 0.22, 0.23, 0.24],
        [0.19, 0.2, 0.21, 0.22, 0.23],
        [0.18, 0.19, 0.2, 0.21, 0.22],
        [0.175, 0.185, 0.195, 0.205, 0.215],
        [0.17, 0.18, 0.19, 0.2, 0.21],
      ];
      var percents_bu = [
        [0.24, 0.25, 0.26, 0.27, 0.28],
        [0.23, 0.24, 0.25, 0.26, 0.27],
        [0.22, 0.23, 0.24, 0.25, 0.26],
        [0.215, 0.225, 0.235, 0.245, 0.255],
        [0.21, 0.22, 0.23, 0.24, 0.25],
      ];
      var check_form;
      check_form = percents;
      //console.log("new");
      if (avans > 0) {
        var line1 = tallageAvans / 10 - 1;
      } else {
        var line1 = 0;
      }
      console.log(line1);
      var line2 = srok / 12 - 1;
      //console.log(check_form[line1][line2]);

      //var procentgod = check_form[line1][line2];
      var procentgod = 0.15;

      var procentmounth = procentgod / 12;
      var stepen = Math.pow(1 + procentmounth, -srok);
      var plata = (dolg * procentmounth) / (1 - stepen);

      var obsh = plata * srok;

      $(".inrub_sum").html(
        String(avans_rub.toFixed()).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 "),
      );
      $(".price_res").html(String(plata.toFixed()).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 "));
      $(".calculate__result--summ").html(
        String(obsh.toFixed()).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 "),
      );
      //console.log(obsh);
    },
  });
  $(".show_menu").click(function () {
    $(".menu_show").toggleClass("active");
  });
  if ($(".menu_show").is(":visible")) {
    $(".main").click(function () {
      $(".menu_show").removeClass("active");
    });
  }

  $(".header__burger").click(function () {
    $(".menu").addClass("active");
  });
  $(".menu__close").click(function () {
    $(".menu").removeClass("active");
  });

  //    $(".js-next__div").click(function(){
  // 	// if(animating) return false;
  // 	animating = true;

  // 	current_fs = $(this).parents('.leasing__work--div');
  // 	next_fs = $(this).parents('.leasing__work--div').next();

  // 	next_fs.show();
  // 	current_fs.animate({opacity: 0}, {
  // 		step: function(now, mx) {
  // 			scale = 1 - (1 - now) * 0.2;
  // 			left = (now * 50)+"%";
  // 			opacity = 1 - now;
  // 			current_fs.css({
  //        			'transform': 'scale('+scale+')',
  //        			'position': 'absolute'
  //      			});
  // 			next_fs.css({'left': left, 'opacity': opacity});
  // 		},
  // 		duration: 800,
  // 		complete: function(){
  // 			current_fs.hide();
  // 			animating = false;
  // 		},
  // 		easing: 'easeInOutBack'
  // 	});
  // });

  $("#amount1, #amount, #amount3").change(function () {
    var tallageAvans = parseInt($("#amount1").val()); //аванс

    var avans = (parseInt($("#amount").val()) / 100) * tallageAvans; //вычисление процентов
    var price = parseInt($("#amount").val()) - avans;

    var dolg = price;
    var srok = parseInt($("#amount3").val());

    var avans_rub = ($("#amount").val() / 100) * tallageAvans;

    var percents_new = [
      [0.2, 0.21, 0.22, 0.23, 0.24],
      [0.19, 0.2, 0.21, 0.22, 0.23],
      [0.18, 0.19, 0.2, 0.21, 0.22],
      [0.175, 0.185, 0.195, 0.205, 0.215],
      [0.17, 0.18, 0.19, 0.2, 0.21],
    ];
    var percents_bu = [
      [0.24, 0.25, 0.26, 0.27, 0.28],
      [0.23, 0.24, 0.25, 0.26, 0.27],
      [0.22, 0.23, 0.24, 0.25, 0.26],
      [0.215, 0.225, 0.235, 0.245, 0.255],
      [0.21, 0.22, 0.23, 0.24, 0.25],
    ];
    var check_form;

    check_form = percents_new;
    //console.log("new");
    //console.log(tallageAvans);
    if (avans > 0) {
      var line1 = tallageAvans / 10 - 1;
    } else {
      var line1 = 0;
    }
    var line2 = srok / 12 - 1;
    // console.log(line1);
    // console.log(line2);
    //console.log(check_form[line1][line2]);

    //var procentgod = check_form[line1][line2];
    var procentgod = 0.18;
    var procentmounth = procentgod / 12;
    var stepen = Math.pow(1 + procentmounth, -srok);
    var plata = (dolg * procentmounth) / (1 - stepen);

    var obsh = plata * srok;
    //console.log(plata);
    //console.log(obsh);
    $(".avans_total").show();
    $(".calculate__result--summ_avans").html(
      String(avans_rub.toFixed()).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 "),
    );
    $(".price_res").html(String(plata.toFixed()).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 "));
    $(".calculate__result--summ").html(
      String(obsh.toFixed()).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 "),
    );
  });

  $("a.liz_anchor").click(function () {
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top + "px",
      },
      {
        duration: 500,
        easing: "swing",
      },
    );
    return false;
  });

  $(".make_offer").click(function (event) {
    event.preventDefault();
    $(".popup_dest").load("/include/form.php", function () {
      //$.getScript("/include/form1_scripts.js");
      //$.getScript("/bitrix/templates/mineev/js/jquery.mask.js");
    });
    $(".popup").addClass("active");
  });
  $(".make_zvonok").click(function (event) {
    event.preventDefault();
    $(".popup_dest").load("/include/form_zvon.php", function () {
      //$.getScript("/include/form1_scripts.js");
      //$.getScript("/bitrix/templates/mineev/js/jquery.mask.js");
    });
    $(".popup").addClass("active");
  });
  $(".make_consult").click(function (event) {
    event.preventDefault();
    $(".popup_dest").load("/include/form_cons.php", function () {
      //$.getScript("/include/form1_scripts.js");
      //$.getScript("/bitrix/templates/mineev/js/jquery.mask.js");
    });
    $(".popup").addClass("active");
  });
  $(".make_servis").click(function (event) {
    event.preventDefault();
    $(".popup_dest").load("/include/form2.php", function () {
      //$.getScript("/include/form1_scripts.js");
      //$.getScript("/bitrix/templates/mineev/js/jquery.mask.js");
    });
    $(".popup").addClass("active");
  });
  //заявка с калькулятора товара
  $(".popup__form input, .popup__form textarea").click(function () {
    $(this).parent().removeClass("has-error");
  });
  $(".send_calc").click(function (event) {
    event.preventDefault();
    var res = true;
    $('.payment-leasing__form [data-check="Y"]').each(function (index, element) {
      if ($(this).val() == "") {
        $(this).parent().addClass("has-error");
        res = false;
      }
    });
    if (res) {
      var form = $(".payment-leasing__form");
      var s = form.serialize();
      //parent.yaC(cid);
      $.ajax({
        type: "POST",
        url: "/include/form_handler_cat.php",
        data: form.serialize(),
        datatype: "html",
        cache: false,
        success: function (answer) {
          //$(".answer_ajax").html(answer)
          somealert(answer, "");
          form.trigger("reset");
        },
        error: function (xhr, textStatus) {
          somealert([xhr.status, textStatus], "");
        },
      });
      //parent.jQuery.fancybox.close();
    } else {
      //$(".answer_ajax").html("<p class='fail'>Заполните все поля формы!</p>")
      somealert("Заполните все поля формы!", "error");
      return false;
    }
  });

  $(".send_calc1").click(function (event) {
    event.preventDefault();
    var res = true;
    $('.calculation__form [data-check="Y"]').each(function (index, element) {
      if ($(this).val() == "") {
        $(this).parent().addClass("has-error");
        res = false;
      }
    });
    if (res) {
      var form = $(".calculation__form");
      var s = form.serialize();
      //parent.yaC(cid);
      $.ajax({
        type: "POST",
        url: "/include/form_handler_cat.php",
        data: form.serialize(),
        datatype: "html",
        cache: false,
        success: function (answer) {
          //$(".answer_ajax").html(answer)
          somealert(answer, "");
          form.trigger("reset");
        },
        error: function (xhr, textStatus) {
          somealert([xhr.status, textStatus], "");
        },
      });
      //parent.jQuery.fancybox.close();
    } else {
      //$(".answer_ajax").html("<p class='fail'>Заполните все поля формы!</p>")
      somealert("Заполните все поля формы!", "error");
      return false;
    }
  });

  $(".send_calc_arenda").click(function (event) {
    event.preventDefault();
    var res = true;
    $('.arenda_form [data-check="Y"]').each(function (index, element) {
      if ($(this).val() == "") {
        $(this).parent().addClass("has-error");
        res = false;
      }
    });
    if (res) {
      var form = $(".arenda_form");
      var s = form.serialize();
      //parent.yaC(cid);
      $.ajax({
        type: "POST",
        url: "/include/form_handler_cat.php",
        data: form.serialize(),
        datatype: "html",
        cache: false,
        success: function (answer) {
          //$(".answer_ajax").html(answer)
          somealert(answer, "");
          form.trigger("reset");
        },
        error: function (xhr, textStatus) {
          somealert([xhr.status, textStatus], "");
        },
      });
      //parent.jQuery.fancybox.close();
    } else {
      //$(".answer_ajax").html("<p class='fail'>Заполните все поля формы!</p>")
      somealert("Заполните все поля формы!", "error");
      return false;
    }
  });

  $(".get_subs").click(function (event) {
    event.preventDefault();
    var res = true;
    var mail = true;
    $('.subs_form [data-check="Y"]').each(function (index, element) {
      if ($(this).val() == "") {
        $(this).parent().addClass("has-error");
        res = false;
      }
    });
    $(".subs_form input[type=text]").each(function (index, element) {
      let email = $(this).val();

      if (email.length > 0 && (email.match(/.+?\@.+/g) || []).length !== 1) {
        console.log("invalid");
        mail = false;
        //somealert('Вы ввели некорректный e-mail!');
      }
    });

    if (res && mail) {
      var form = $(".subs_form");
      var s = form.serialize();
      //parent.yaC(cid);
      $.ajax({
        type: "POST",
        url: "/include/subscribe.php",
        data: form.serialize(),
        datatype: "html",
        cache: false,
        success: function (answer) {
          //$(".answer_ajax").html(answer)
          somealert(answer, "");
          form.trigger("reset");
        },
        error: function (xhr, textStatus) {
          somealert([xhr.status, textStatus], "");
        },
      });
      //parent.jQuery.fancybox.close();
    } else {
      //$(".answer_ajax").html("<p class='fail'>Заполните все поля формы!</p>")
      if (!mail) {
        somealert("Вы ввели некорректный e-mail!", "error");
        return false;
      } else {
        somealert("Заполните все поля формы!", "error");
        return false;
      }
    }
  });
});

function somealert(mess, cls) {
  if (!cls) cls = "mess";
  alertify.alert('<span class="' + cls + '">' + mess + "</span>");
}

(function ($) {
  $.fn.restrict = function () {
    return this.each(function () {
      if (this.type && "number" === this.type.toLowerCase()) {
        $(this).on("change", function () {
          var _self = this,
            v = parseFloat(_self.value),
            min = parseFloat(_self.min),
            max = parseFloat(_self.max);
          if (v >= min && v <= max) {
            _self.value = v;
          } else {
            _self.value = v < min ? min : max;
          }
        });
      }
    });
  };

  window.setTimeout(() => {
    $("#modef_num").text("537");
  }, 1000);
})(jQuery);

$(".test").restrict();

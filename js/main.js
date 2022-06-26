// БУРГЕР МЕНЮ
$(document).ready(function () {
  setTimeout(() => {
    $(".icons-fixed").addClass("show");
  }, 150);

  let burgerOpen = false;
  function openBurger() {
    $(".main-background-blur").addClass("open");
    $(".mobile-menu-wrapper").addClass("open");
    burgerOpen = true;
  }
  function closeBurger() {
    $(".main-background-blur").removeClass("open");
    $(".mobile-menu-wrapper").removeClass("open");
    burgerOpen = false;
  }

  $("#openMenu").click(function () {
    openBurger();
  });
  $("#closeMenu").click(function () {
    closeBurger();
  });
  $(".main-background-blur").click(function () {
    closeBurger();
    $(".modal-window-container").removeClass("show");
    $(".modal-window-wrapper").removeClass("rev-over");
  });

  // ПОЗВОНИТЬ

  // $(".page").scroll(function(){
  //     $(".phone-call__btn-sec_mobile").addClass("close");
  // })
  $(".page").scroll(function () {
    clearTimeout($.data(this, "scrollTimer"));
    $(".phone-call__btn-sec_mobile").removeClass("open");
    $(".phone-call__btn-sec_mobile").addClass("close");
    $.data(
      this,
      "scrollTimer",
      setTimeout(function () {
        $(".phone-call__btn-sec_mobile").removeClass("close");
        $(".phone-call__btn-sec_mobile").addClass("open");
      }, 250)
    );
  });

  // SCROLL

  let scrollDistance = $(".page").scrollTop();
  $(".page").scroll(() => {
    scrollDistance = $(".page").scrollTop();
  });

  $("nav.menu a, a.to-auto, .feedBut, .phone-call__btn").click(function (
    event
  ) {
    if (burgerOpen) {
      closeBurger();
    }
    $(".page").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top + scrollDistance + "px",
      },
      {
        duration: 1000,
        easing: "swing",
      }
    );
    return false;
  });

  // FAQ

  $(".answer__head").click(function () {
    let currentAnswer = $(this).parent();
    if (currentAnswer.hasClass("active")) {
      currentAnswer.removeClass("active");
    } else {
      currentAnswer.addClass("active");
    }
  });

  // MODAL

  const modalCall = $("[data-modal]");
  var carName;
  var carColor;
  var dayNumb;
  modalCall.on("click", function () {
    let $this = $(this);
    let modalId = $this.data("modal");

    $(modalId).addClass("show");
    $(".main-background-blur").addClass("open");

    function getIndex(el) {
      for (let i = 0; i < modalCall.length; i++) {
        if (modalCall[i] === el) {
          return i;
        }
      }
    }
    let curI = getIndex(this);

    carName = $(".car-name")[curI].textContent.trim();

    carColor = $(".color__car")[curI].textContent.trim();
    dayNumb = $(this).siblings(".reserv-day-numb").val();
  });

  function closeModalWindow() {
    $(".modal-window-container").removeClass("show");
    $(".modal-window-wrapper").removeClass("rev-over");
    $(".main-background-blur").removeClass("open");
  }

  $(".closeModal").on("click", function () {
    closeModalWindow();
  });

  $("#mailSubmit").on("click", function () {
    $("#modalForm").submit(function (event) {
      if (
        $("#modalUserName").val() == "" ||
        $("#modalCustomerNumber").val() == ""
      ) {
        return false;
      } else {
        event.preventDefault();
        $.ajax({
          type: "POST",

          url: "php/mailCarForm.php",
          data: $(this).serialize(),
        }).done(function () {
          $(this).find("input").val("");
          $(".modal-window-wrapper").addClass("rev-over");
          $("#modalForm").trigger("reset");
        });
        return false;
      }
    });
  });

  $("#feedSumb").on("click", function () {
    $("#feedForm").submit(function (event) {
      if ($("#feedUserName").val() == "" || $("#feedUserPhoner").val() == "") {
        return false;
      } else {
        event.preventDefault();
        $.ajax({
          type: "POST",

          url: "php/mailFeedbackForm.php",
          data: $(this).serialize(),
        }).done(function () {
          $(this).find("input").val("");
          $(".main-background-blur").addClass("open");
          $(".modal-window-container").addClass("show");
          $(".modal-window-wrapper").addClass("rev-over");
          $("#feedForm").trigger("reset");
          setTimeout(function () {
            closeModalWindow();
          }, 2000);
        });
        return false;
      }
    });
  });

  // WHATSAPP
  $("#whatsUppSubmit").on("click", function () {
    const form = document.querySelector("#modalForm");
    const number = "79087370007";
    function sendToWhatsapp(text, phone) {
      text = encodeURIComponent(text);

      let url = `https://api.whatsapp.com/send/?phone=79087370007&text=${text}&app_absent=0`;

      window.open(url);
    }

    form.addEventListener("submit", (e) => {
      if (
        $("#modalUserName").val() == "" ||
        $("#modalCustomerNumber").val() == ""
      ) {
        return false;
      } else {
        e.preventDefault();
        const userName = e.currentTarget.querySelector("#modalUserName").value;
        const dateStart = e.currentTarget.querySelector("#start-date").value;
        const dateEnd = e.currentTarget.querySelector("#end-date").value;

        if ($("#start-date").val() == "" && $("#end-date").val() == "") {
          var text =
            "Добрый день! Меня зовут " +
            userName +
            ", я хочу забронировать " +
            carName +
            "(" +
            carColor +
            ").";
        } else {
          var text =
            "Добрый день! Меня зовут " +
            userName +
            ", я хочу забронировать " +
            carName +
            "(" +
            carColor +
            ")" +
            " с " +
            dateStart +
            " по " +
            dateEnd +
            ".";
        }

        if (dayNumb == "") {
          sendToWhatsapp(text, number);
        } else {
          text = text + " На " + dayNumb + " дней";
          sendToWhatsapp(text, number);
        }
      }
    });
  });

  // ВАЛИДАЦИЯ

  $(".customerPhoneNumber").mask("+7(999) 999 99 99", {
    placeholder: "+7(---) --- -- --",
  });

  $(function () {
    $("#start-date").datepicker({
      minDate: new Date(),
    });
    $("#end-date").datepicker({
      minDate: new Date(),
    });
  });

  // Проверка браузера
  var userAgent = navigator.userAgent.toLowerCase();

  var Mozila = /firefox/.test(userAgent);
  var Chrome = /chrome/.test(userAgent);
  var Safari = /safari/.test(userAgent);
  var Opera = /opera/.test(userAgent);

  var InternetExplorer = false;
  if (
    (/mozilla/.test(userAgent) &&
      !/firefox/.test(userAgent) &&
      !/chrome/.test(userAgent) &&
      !/safari/.test(userAgent) &&
      !/opera/.test(userAgent)) ||
    /msie/.test(userAgent)
  )
    InternetExplorer = true;

  // REVIEW SLIDER

  if (!Mozila) {
    new Swiper(".review-slider", {
      loop: true,
      speed: 1000,
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: -52,
        depth: 250,
        modifier: 1,
        slideShadows: false,
      },
      spaceBetween: 60,
      navigation: {
        nextEl: ".review-next",
        prevEl: ".review-prev",
      },
      pagination: {
        el: ".review-pagination",
        clickable: true,
        // dynamicBullets: true,
      },
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      speed: 1000,
      slideToClickedSlide: true,
    });
  } else {
    new Swiper(".review-slider", {
      loop: true,
      speed: 1000,
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 0,
        modifier: 1,
        slideShadows: false,
      },
      spaceBetween: 60,
      navigation: {
        nextEl: ".review-next",
        prevEl: ".review-prev",
      },
      pagination: {
        el: ".review-pagination",
        clickable: true,
        // dynamicBullets: true,
      },
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      speed: 1000,
      slideToClickedSlide: true,
    });
  }

  // FORM
  $(".reserv").submit(function () {
    $(this).serialize();
    return false;
  });

  // CAR SLIDERS

  new Swiper(".porche__boxter-slider-container", {
    navigation: {
      nextEl: ".porche__boxter-next",
      prevEl: ".porche__boxter-prev",
    },
    pagination: {
      el: ".porche__boxter-pagination",
      clickable: true,
    },
    grabCursor: true,
    spaceBetween: 30,
    thumbs: {
      swiper: {
        el: ".porche-boxter-mini",
        slidesPerView: 5,
        freemode: true,
        spaceBetween: 8,
      },
    },
  });

  new Swiper(".bmw__x5m-slider-container", {
    navigation: {
      nextEl: ".bmw__x5m-slider-next",
      prevEl: ".bmw__x5m-slider-prev",
    },
    pagination: {
      el: ".bmw__x5m-slider-pagination",
      clickable: true,
    },
    grabCursor: true,
    spaceBetween: 30,
    thumbs: {
      swiper: {
        el: ".bmw-mini",
        slidesPerView: 5,
        freemode: true,
        spaceBetween: 8,
      },
    },
  });
  new Swiper(".mustang__green-container", {
    navigation: {
      nextEl: ".mustang__green-next",
      prevEl: ".mustang__green-prev",
    },
    pagination: {
      el: ".mustang__green-pagination",
      clickable: true,
    },
    grabCursor: true,
    spaceBetween: 30,
    thumbs: {
      swiper: {
        el: ".mustang-green-mini",
        slidesPerView: 5,
        freemode: true,
        spaceBetween: 8,
      },
    },
  });
  new Swiper(".comaro-container", {
    navigation: {
      nextEl: ".comaro-next",
      prevEl: ".comaro-prev",
    },
    pagination: {
      el: ".comaro-pagination",
      clickable: true,
    },
    grabCursor: true,
    spaceBetween: 30,
    thumbs: {
      swiper: {
        el: ".comaro-mini",
        slidesPerView: 5,
        freemode: true,
        spaceBetween: 8,
      },
    },
  });
  new Swiper(".mustang__blue-container", {
    navigation: {
      nextEl: ".mustang__blue-next",
      prevEl: ".mustang__blue-prev",
    },
    pagination: {
      el: ".mustang__blue-pagination",
      clickable: true,
    },
    grabCursor: true,
    spaceBetween: 30,
    thumbs: {
      swiper: {
        el: ".mustang-blue-mini",
        slidesPerView: 5,
        freemode: true,
        spaceBetween: 8,
      },
    },
  });
  new Swiper(".mustang__red-container", {
    navigation: {
      nextEl: ".mustang__red-next",
      prevEl: ".mustang__red-prev",
    },
    pagination: {
      el: ".mustang__red-pagination",
      clickable: true,
    },
    grabCursor: true,
    spaceBetween: 30,
    thumbs: {
      swiper: {
        el: ".mustang-red-mini",
        slidesPerView: 5,
        freemode: true,
        spaceBetween: 8,
      },
    },
  });


  new Swiper(".porche__boxter__brown-slider-container", {
    navigation: {
      nextEl: ".porche__boxter__brown-next",
      prevEl: ".porche__boxter__brown-prev",
    },
    pagination: {
      el: ".porche__boxter__brown-pagination",
      clickable: true,
    },
    grabCursor: true,
    spaceBetween: 30,

    thumbs: {
      swiper: {
        el: ".porche-brown-mini",
        slidesPerView: 5,
        freemode: true,
        spaceBetween: 8,
      },
    },
  });
  new Swiper(".porche__boxter__green-slider-container", {
    navigation: {
      nextEl: ".porche__boxter__green-next",
      prevEl: ".porche__boxter__green-prev",
    },
    pagination: {
      el: ".porche__boxter__green-pagination",
      clickable: true,
    },
    grabCursor: true,
    spaceBetween: 30,
    thumbs: {
      swiper: {
        el: ".porche-green-mini",
        slidesPerView: 6,
        freemode: true,
        spaceBetween: 10,
      },
    },
  });
  new Swiper(".porche__boxter__red-slider-container", {
    navigation: {
      nextEl: ".porche__boxter__red-next",
      prevEl: ".porche__boxter__red-prev",
    },
    pagination: {
      el: ".porche__boxter__red-pagination",
      clickable: true,
    },
    grabCursor: true,
    spaceBetween: 30,
    thumbs: {
      swiper: {
        el: ".porche-red-mini",
        slidesPerView: 5,
        spaceBetween: 5,
      },
    },
  });
  
  new Swiper(".fordBord-slider-container", {
    navigation: {
      nextEl: ".fordBord-next",
      prevEl: ".fordBord-prev",
    },
    pagination: {
      el: ".fordBord-pagination",
      clickable: true,
    },
    grabCursor: true,
    spaceBetween: 30,
    thumbs: {
      swiper: {
        el: ".fordBord-mini",
        slidesPerView: 5,
        spaceBetween: 5,
      },
    },
  });

  new Swiper(".jaguar-slider-container", {
    navigation: {
      nextEl: ".jaguar-next",
      prevEl: ".jaguar-prev",
    },
    pagination: {
      el: ".jaguar-pagination",
      clickable: true,
    },
    grabCursor: true,
    spaceBetween: 30,
    thumbs: {
      swiper: {
        el: ".swiper-jaguar-mini",
        slidesPerView: 5,
        freemode: true,
        spaceBetween: 8,
      },
    },
  });
  new Swiper(".fordRedThred-slider-container", {
    navigation: {
      nextEl: ".fordRedThred-next",
      prevEl: ".fordRedThred-prev",
    },
    pagination: {
      el: ".fordRedThred-pagination",
      clickable: true,
    },
    grabCursor: true,
    spaceBetween: 30,
    thumbs: {
      swiper: {
        el: ".swiper-fordRedThred-mini",
        slidesPerView: 5,
        freemode: true,
        spaceBetween: 8,
      },
    },
  });
  new Swiper(".mercedes-slider-container", {
    navigation: {
      nextEl: ".mercedes-next",
      prevEl: ".mercedes-prev",
    },
    pagination: {
      el: ".mercedes-pagination",
      clickable: true,
    },
    grabCursor: true,
    spaceBetween: 30,
    thumbs: {
      swiper: {
        el: ".mercedes-mini",
        slidesPerView: 5,
        freemode: true,

        spaceBetween: 8,
      },
    },
  });
});

// АНИМАЦИЯ

$(document).ready(function () {
  let options = { threshold: [0.1] };
  let osberverAnimTop = new IntersectionObserver(onEntry, options);
  let elementsAnimTop = $(".element-animation-fade-top");
  elementsAnimTop.each((i, el) => {
    osberverAnimTop.observe(el);
  });
  elementsAnimTop.each((i, el) => {
    osberverAnimTop.observe(el);
  });

  let osberverAnimLeft = new IntersectionObserver(onEntryLeft, options);
  let elementsAnimLeft = $(".element-animation-fade-left");
  elementsAnimLeft.each((i, el) => {
    osberverAnimLeft.observe(el);
  });
  elementsAnimLeft.each((i, el) => {
    osberverAnimLeft.observe(el);
  });

  let osberverAnimRight = new IntersectionObserver(onEntryRight, options);
  let elementsAnimRight = $(".element-animation-fade-right");
  elementsAnimRight.each((i, el) => {
    osberverAnimRight.observe(el);
  });
  elementsAnimRight.each((i, el) => {
    osberverAnimRight.observe(el);
  });

  function onEntry(entry) {
    entry.forEach((change) => {
      if (change.isIntersecting) {
        change.target.classList.add("animate__fadeInDown");
      }
    });
  }
  function onEntryLeft(entry) {
    entry.forEach((change) => {
      if (change.isIntersecting) {
        change.target.classList.add("animate__fadeInLeft");
      }
    });
  }
  function onEntryRight(entry) {
    entry.forEach((change) => {
      if (change.isIntersecting) {
        change.target.classList.add("animate__fadeInRight");
      }
    });
  }
});

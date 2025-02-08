import $ from "jquery";
import Swiper from "swiper/bundle";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

$(function () {
  /*************************
   * ハンバーガーメニュー
   **************************/
  $(function () {
    // メニューをクリックした際にメニューを変形するとともに背景を固定
    let scrollPosition = 0;
    $(".js-hamburger").on("click", function () {
      $(this).toggleClass("--active");
      $(".p-header-sp").toggleClass("--active");

      if ($(this).hasClass("--active")) {
        scrollPosition = $(window).scrollTop();
        $("body").css("overflow", "hidden");
      } else {
        $("body").css("overflow", "auto");
        $(window).scrollTop(scrollPosition);
      }
    });
  });

  // aタグをクリックしたらメニューを閉じる
  $(".p-header-sp-nav__link").on("click", function () {
    $(".js-hamburger").removeClass("--active");
    $(".p-header-sp").removeClass("--active");
    $("body").css({ overflow: "auto" });
  });

  /*************************
   * スライダー機能実装
   **************************/
  //トップページのFVスライド
  // const topFvSlider = new Swiper("#js-swiper-fv", {
  //   loop: true,
  //   effect: "fade",
  //   autoplay: {
  //     delay: 4000,
  //     disableOnInteraction: false,
  //   },
  //   speed: 2000,
  //   pagination: {
  //     el: ".swiper-pagination",
  //     clickable: true,
  //   },
  // });

  // Informationのスライダー
  const infoSlider = new Swiper("#js-swiper-info", {
    loop: true, //繰り返し指定
    spaceBetween: 24, //スライド感の余白
    slidesPerView: 1, //一度に表示するスライド枚数
    breakpoints: {
      768: {
        slidesPerView: 4.2,
      },
    },
    centeredSlides: true, //スライダーの最初と最後に余白を追加せずスライドが真ん中に配置される
    // 前後の矢印
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  /*************************
   * スムーススクロール
   **************************/
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();

    var target = $(this.hash);
    var speed = 500;
    var windowWidth = $(window).width(); // 画面幅を取得

    if (windowWidth >= 768) {
      // 768px以上の場合（PC表示とみなす）
      var headerHeight = $("#js-fixed-header").outerHeight(); // ヘッダーの高さを取得
      var adjust = headerHeight;
    } else {
      var adjust = 0;
    }

    $("html, body").animate(
      {
        scrollTop: target.offset().top - adjust, // ヘッダーの高さ分、スクロール位置を調整
      },
      speed,
      "swing"
    );
  });

  // スクロールしたらヘッダーを上から出す
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();

    if (scroll > 1200) {
      $("#js-fixed-header").addClass("--active");
    } else {
      $("#js-fixed-header").removeClass("--active");
    }
  });

  /***********************
   * fadeUpアニメーション
   ***********************/

  // 単独でのfadeupアニメーション
  gsap.utils.toArray(".js-fadeUpSingle").forEach((target) => {
    gsap.from(target, {
      y:20,
      autoAlpha:0,
      stagger:0.2,
      ease:'power2.out',
      duration:1,
      scrollTrigger:{
        trigger:target,
        start: "top 80%",
        markers:true,
      }
    })
  });

  let mm = gsap.matchMedia();
  // PC表示
  mm.add("(min-width: 768px)", () => {
    gsap.utils.toArray(".js-fadeUpTrigger").forEach((trigger) => {
      let target = trigger.querySelectorAll(":scope .js-fadeUpItem");
      gsap.from(target, {
        y: 20,
        autoAlpha: 0,
        stagger: 0.2,
        ease: "power2.out",
        duration: 1,
        scrollTrigger: {
          trigger: target,
          start: "top 80%",
          markers:true,
        },
      });
    });
  });
  // SP表示
  mm.add("(max-width: 767px)", () => {
    let targets = document.querySelectorAll(".js-fadeUpItem");
    targets.forEach((target) => {
      gsap.from(target, {
        y: 20,
        autoAlpha: 0,
        stagger: 0.2,
        ease: "power2.out",
        duration: 1,
        scrollTrigger: {
          trigger: target,
          start: "top 80%",
        },
      });
    });
  });






});

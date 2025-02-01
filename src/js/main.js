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
  const topFvSlider = new Swiper("#js-swiper-fv", {
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    speed: 2000,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

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
    e.preventDefault(); // ページ遷移をキャンセル

    var target = $(this.hash); // 移動先要素を取得
    var speed = 500; // スクロール速度（ミリ秒）

    $("html, body").animate(
      {
        scrollTop: target.offset().top,
      },
      speed,
      "swing"
    ); // スムーズスクロールを実行
  });

  // スマホメニューでaタグをクリックしたらメニューを閉じる
  $(".header__nav-sp a").on("click", function () {
    $(".js-hamburger").removeClass("active");
    $(".header__nav-sp").removeClass("active");
    $("body").css({ overflow: "auto" });
  });

  gsap.utils.toArray(".fade-in-item").forEach((item) => {
    gsap.fromTo(
      item,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: item,
          start: "top center",
          end: "bottom center",
          markers: true,
        },
      }
    );
  });
});

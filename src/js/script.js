jQuery(function ($) {
  // ハンバーガーメニューの開閉処理
  $(".js-hamburger").click(function () {
    $(this).toggleClass("is-active");
    $(".js-drawer").fadeToggle();
  });

  // ドロワー内のリンククリックでメニューを閉じる
  $(".js-drawer a").click(function () {
    $(".js-hamburger").removeClass("is-active");
    $(".js-drawer").fadeOut();
  });

  // スクロールでヘッダーにクラスを付ける
  $(window).on("scroll", function () {
    const scrollTop = $(this).scrollTop();
    const triggerHeight = $(".first-view").outerHeight();

    if (scrollTop > triggerHeight) {
      $(".header").addClass("header--scrolled");
    } else {
      $(".header").removeClass("header--scrolled");
    }
  });

  // mainコンテンツをヘッダーの高さ分だけ下げる
  const headerHeight = $(".js-header").outerHeight();
  $("main").css("margin-top", headerHeight);

  // ページ内スクロール処理（リンククリック）
  $('a[href^="#"]').on("click", function (e) {
    const speed = 600;
    const href = $(this).attr("href");
    const target = $(href === "#" || href === "" ? "html" : href);

    if (target.length) {
      const position = target.offset().top - headerHeight;
      $("html, body").animate({ scrollTop: position }, speed, "swing");
    }
    e.preventDefault();
  });

  // ページトップボタンの表示・非表示
  const pageTop = $(".js-page-top");
  pageTop.hide();

  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      pageTop.fadeIn();
    } else {
      pageTop.fadeOut();
    }
  });

  // ページトップボタンクリック時のスクロール
  pageTop.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 300);
    return false;
  });
});

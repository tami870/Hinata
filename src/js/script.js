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

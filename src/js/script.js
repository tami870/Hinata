jQuery(function ($) {
  // ===============================
  // 1) ヘッダー高さ → CSS変数へ同期
  // ===============================
  const headerEl = document.querySelector(".js-header");
  const setHeaderVar = () => {
    const h = headerEl ? headerEl.offsetHeight : 0;
    document.documentElement.style.setProperty("--header-height", `${h}px`);
  };
  setHeaderVar();

  if (window.ResizeObserver && headerEl) {
    const ro = new ResizeObserver(setHeaderVar);
    ro.observe(headerEl);
  } else {
    $(window).on("resize", setHeaderVar);
  }

  // ===============================
  // 2) ハンバーガー開閉 & ドロワー
  // ===============================
  $(".js-hamburger").on("click", function () {
    $(this).toggleClass("is-active");
    $(".js-drawer").fadeToggle();
  });

  $('.js-drawer a[href^="#"]').on("click", function () {
    $(".js-hamburger").removeClass("is-active");
    $(".js-drawer").fadeOut();
  });

  // ===============================
  // 3) 直リンク(#hash)・履歴移動にも確実に効かせる保険
  // ===============================
  const scrollToHash = () => {
    if (!location.hash) return;
    const t = document.querySelector(decodeURIComponent(location.hash));
    if (t) t.scrollIntoView({ block: "start" });
  };
  $(window).on("load", () => {
    setHeaderVar();
    scrollToHash();
  });
  $(window).on("hashchange", scrollToHash);

  // ===============================
  // 4) ページトップボタン
  // ===============================
  const $pageTop = $(".js-page-top");
  $pageTop.hide();

  $(window).on("scroll", function () {
    $(this).scrollTop() > 50 ? $pageTop.fadeIn() : $pageTop.fadeOut();
  });

  $pageTop.on("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return false;
  });

  // ===============================
  // 5) GSAPアニメーション
  // ===============================
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".first-view__catchphrase-part",
    { opacity: 0, y: 20 },
    {
      scrollTrigger: { trigger: ".first-view__catchphrase", start: "top 80%" },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.3,
    }
  );

  gsap.utils.toArray(".manga__item").forEach((item, index) => {
    gsap.fromTo(
      item,
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: index * 0.2,
      }
    );
  });

  gsap.fromTo(
    ".plan-card, .plan-card--large", // ← 両方対象
    { opacity: 0, y: 30 },
    {
      scrollTrigger: {
        trigger: ".plan__items, .plan__items--large", // ← 親要素も両方指定
        start: "top 90%",
        toggleActions: "play none none none",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.5, // 順に出したいなら数値指定 / 同時なら 0
    }
  );

  gsap.fromTo(
    ".plan__cta-bubble",
    { scale: 0.8, opacity: 0 },
    {
      scrollTrigger: { trigger: ".plan__cta-bubble", start: "top 85%" },
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "back.out(2.0)",
      delay: 0.5,
    }
  );

  // 導入ボタン：ふわっと
  gsap.fromTo(
    ".introduction__button",
    { autoAlpha: 0, y: 14 },
    {
      scrollTrigger: {
        trigger: ".introduction__button",
        start: "top 85%",
        once: true,
      },
      autoAlpha: 1,
      y: 0,
      duration: 0.55,
      ease: "power2.out",
      onComplete: () =>
        gsap.set(".introduction__button", { clearProps: "transform" }),
    }
  );

  // CTAボタン：吹き出しの後ろに少し遅れて
  gsap.fromTo(
    ".plan__cta-action .button",
    { autoAlpha: 0, y: 16 },
    {
      scrollTrigger: { trigger: ".plan__cta", start: "top 80%", once: true },
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.35,
      onComplete: () =>
        gsap.set(".plan__cta-action .button", { clearProps: "transform" }),
    }
  );

  gsap.utils.toArray(".faq__list").forEach((item, i) => {
    const q = item.querySelector(".faq-list__question");
    const a = item.querySelector(".faq-list__answer");

    // アイテムごとに発火（自然に追従）
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        once: true,
      },
    });

    // Qを先に、Aを少し遅れて
    tl.fromTo(
      q,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
    ).fromTo(
      a,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
      "-=0.20"
    );
  });
});

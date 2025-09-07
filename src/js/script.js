gsap.registerPlugin(ScrollTrigger);

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

  gsap.fromTo(
    ".first-view__catchphrase-part",
    { opacity: 0, y: 20 },
    {
      scrollTrigger: { trigger: ".first-view__catchphrase", start: "top 80%" },
      opacity: 1,
      y: 0,
      duration: 1, // カードのアニメーション時間
      ease: "power2.out",
      stagger: 0.3, // カードのアニメーションスピード
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
        duration: 0.8, // カードのアニメーション時間
        ease: "power2.out",
        delay: index * 0.2, // カードのアニメーションスピード
      }
    );
  });

  const planTrigger = document.querySelector(
    ".plan__items, .plan__items--large"
  );
  if (planTrigger) {
    gsap.fromTo(
      ".plan-card, .plan-card--large",
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: planTrigger,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.3,
      }
    );
  }

  gsap.fromTo(
    ".plan__cta-bubble",
    { scale: 0.8, opacity: 0 },
    {
      scrollTrigger: { trigger: ".plan__cta-bubble", start: "top 85%" },
      scale: 1,
      opacity: 1,
      duration: 0.8, // 吹き出しのアニメーション時間
      ease: "back.out(2.0)",
      delay: 0.4, // 吹き出しのアニメーションスピード
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

  gsap.fromTo(
    ".faq__list",
    { opacity: 0, y: 20 },
    {
      scrollTrigger: {
        trigger: ".faq__lists",
        start: "top 80%",
        once: true,
      },
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.4,
      ease: "power2.out",
    }
  );

  gsap.to(".contact__content", {
    boxShadow: "0 20px 48px rgba(0, 0, 0, 0.3)",
    duration: 1,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".contact__content",
      start: "top 90%",
      toggleActions: "play none none none",
    },
  });

  // ===============================
  // 6) バリデーション
  // ===============================

  // 送信時に未入力を目立たせる
  document
    .querySelector(".contact__form")
    .addEventListener("submit", function (e) {
      const invalidEl = this.querySelector(":invalid");
      if (invalidEl) {
        e.preventDefault();
        invalidEl.focus();
        invalidEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });

  // フィールドを触ったら data-touched を付ける
  document
    .querySelectorAll(".form__input-text, .form__select")
    .forEach((el) => {
      el.addEventListener("blur", () => {
        el.setAttribute("data-touched", "true");
      });
    });

  const form = document.querySelector(".contact__form");
  const requiredFields = form.querySelectorAll(
    ".form__input-text[required], .form__select[required]"
  );
  const submitButton = form.querySelector(".form__button");

  // バリデーションチェック関数
  const checkFormValidity = () => {
    const allValid = Array.from(requiredFields).every((el) => {
      return el.dataset.touched && el.checkValidity();
    });
    submitButton.disabled = !allValid;
  };

  // 各フィールドに blur イベント追加
  requiredFields.forEach((el) => {
    el.addEventListener("blur", checkFormValidity);
    el.addEventListener("input", checkFormValidity); // 入力途中でも反応させる
  });

  // メールアドレスの形式バリデーションを強化
  const emailInput = form.querySelector('input[type="email"]');

  emailInput.addEventListener("blur", function () {
    const email = emailInput.value.trim();
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      emailInput.setCustomValidity("メールアドレスを入力してください");
    } else if (!emailFormat.test(email)) {
      emailInput.setCustomValidity("メールアドレスの形式が正しくありません");
    } else {
      emailInput.setCustomValidity("");
    }

    // エラーメッセージ表示のために再バリデーション
    checkFormValidity();
  });
});

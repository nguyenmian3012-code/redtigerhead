(() => {
  const root = document.documentElement;
  const assets = window.RTH_ASSETS || {};

  document.querySelectorAll("[data-logo]").forEach((image) => {
    if (assets.logo) image.src = assets.logo;
  });
  document.querySelectorAll("[data-hero]").forEach((element) => {
    if (assets.hero) element.style.backgroundImage = "url(\"" + assets.hero + "\")";
  });

  const menuButton = document.querySelector(".menu-btn");
  const nav = document.querySelector(".main-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  const languageButtons = [...document.querySelectorAll("[data-lang]")];
  const availableLanguages = languageButtons.map((button) => button.dataset.lang).filter(Boolean);
  const applyLanguage = (language) => {
    const requested = ["vi", "en", "zh"].includes(language) ? language : "vi";
    const safeLanguage = availableLanguages.includes(requested) ? requested : "vi";
    root.lang = safeLanguage === "zh" ? "zh-CN" : safeLanguage;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = element.dataset[safeLanguage];
      if (typeof value === "string") element.textContent = value;
    });
    document.querySelectorAll("[data-alt-vi]").forEach((image) => image.alt = image.getAttribute(`data-alt-${safeLanguage}`) || "");
    languageButtons.forEach((button) => {
      const active = button.dataset.lang === safeLanguage;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    localStorage.setItem("rth-language", safeLanguage);
  };

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.lang));
  });
  applyLanguage(localStorage.getItem("rth-language") || "vi");

  const themeButton = document.querySelector(".theme-toggle");
  const applyTheme = (theme) => {
    root.dataset.theme = theme === "dark" ? "dark" : "light";
    if (themeButton) themeButton.setAttribute("aria-pressed", String(root.dataset.theme === "dark"));
  };
  applyTheme(localStorage.getItem("rth-theme") || "light");
  themeButton?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("rth-theme", next);
  });

  document.querySelectorAll("[data-product-slider]").forEach((slider) => {
    const tabs = [...slider.querySelectorAll("[data-product-tab]")];
    const panels = [...slider.querySelectorAll("[data-product-panel]")];
    let active = 0;
    let timer;

    const show = (index, focus = false) => {
      active = (index + tabs.length) % tabs.length;
      tabs.forEach((tab, itemIndex) => {
        const selected = itemIndex === active;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panels[itemIndex].hidden = !selected;
      });
      if (focus) tabs[active].focus();
    };

    const pause = () => {
      if (timer) window.clearInterval(timer);
      timer = undefined;
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        pause();
        show(index);
      });
      tab.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        pause();
        show(index + (event.key === "ArrowRight" ? 1 : -1), true);
      });
    });

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = window.setInterval(() => show(active + 1), 5000);
    }
  });

})();

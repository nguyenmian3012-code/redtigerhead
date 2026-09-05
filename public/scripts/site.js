(() => {
  const root = document.documentElement;
  const assets = window.RTH_ASSETS || {};

  document.querySelectorAll("[data-logo]").forEach((image) => {
    if (assets.logo) image.src = assets.logo;
  });
  document.querySelectorAll("[data-hero]").forEach((element) => {
    if (assets.hero) element.style.backgroundImage = "url(\"" + assets.hero + "\")";
  });
  document.querySelectorAll("[data-qr]").forEach((image) => {
    if (assets.careersQr) image.src = assets.careersQr;
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

  document.querySelectorAll("[data-dialog-close]").forEach((button) => {
    button.addEventListener("click", () => button.closest("dialog")?.close());
  });

  const form = document.querySelector("#application-form");
  const reviewDialog = document.querySelector("#application-review");
  const formStatus = document.querySelector("#application-status");
  const confirmButton = document.querySelector("#confirm-application");
  if (form && reviewDialog && formStatus && confirmButton) {
    const startedAt = Date.now();
    const cvInput = form.querySelector('input[name="cv"]');
    cvInput?.addEventListener("change", () => {
      const file = cvInput.files?.[0];
      cvInput.setCustomValidity("");
      if (!file) return;
      const allowed = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
      if (!allowed.includes(file.type) || file.size > 5 * 1024 * 1024) {
        cvInput.setCustomValidity("CV phải là PDF/DOC/DOCX và không vượt quá 5 MB.");
        cvInput.reportValidity();
      }
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      if (data.get("company")) return;
      if (Date.now() - startedAt < 3000) {
        formStatus.textContent = "Vui lòng kiểm tra lại thông tin trước khi tiếp tục.";
        return;
      }
      const fields = ["name", "phone", "email", "position", "experience"];
      fields.forEach((field) => {
        const target = reviewDialog.querySelector('[data-review="' + field + '"]');
        if (target) target.textContent = String(data.get(field) || "—");
      });
      const fileTarget = reviewDialog.querySelector('[data-review="cv"]');
      if (fileTarget) fileTarget.textContent = cvInput?.files?.[0]?.name || "Chưa đính kèm";
      reviewDialog.showModal();
    });

    confirmButton.addEventListener("click", () => {
      const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
      const code = "DEMO-RTH-" + stamp + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
      reviewDialog.close();
      formStatus.textContent = "Mô phỏng hoàn tất — mã thử nghiệm: " + code + ". Hồ sơ chưa được gửi hoặc lưu.";
      form.reset();
    });
  }
})();

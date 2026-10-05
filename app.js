/* Progressive enhancement: all primary content is pre-rendered into real HTML pages. */
(() => {
  const saved = (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };
  const save = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {}
  };
  function boot() {
    state.lang = document.documentElement.lang === "en" ? "en" : "mk";
    bind();
  }
  function bind() {
    const toggle = document.querySelector(".theme-toggle");
    const syncTheme = () => {
      toggle?.setAttribute(
        "aria-pressed",
        String(document.documentElement.dataset.theme === "dark"),
      );
      toggle?.setAttribute(
        "aria-label",
        state.lang === "mk"
          ? "Промени на " +
              (document.documentElement.dataset.theme === "dark"
                ? "светла"
                : "темна") +
              " тема"
          : "Switch to " +
              (document.documentElement.dataset.theme === "dark"
                ? "light"
                : "dark") +
              " theme",
      );
    };
    syncTheme();
    toggle?.addEventListener("click", () => {
      const theme =
        document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = theme;
      save("hmel-theme", theme);
      syncTheme();
    });
    const menu = document.querySelector(".menu-toggle"),
      nav = document.querySelector("#mobile-nav");
    const close = () => {
      menu.setAttribute("aria-expanded", "false");
      nav.hidden = true;
      document.body.classList.remove("menu-open");
      document.querySelector("main").inert = false;
      document.querySelector("footer").inert = false;
    };
    menu?.addEventListener("click", () => {
      const open = menu.getAttribute("aria-expanded") !== "true";
      menu.setAttribute("aria-expanded", String(open));
      nav.hidden = !open;
      document.body.classList.toggle("menu-open", open);
      document.querySelector("main").inert = open;
      document.querySelector("footer").inert = open;
      if (open) nav.querySelector("a").focus();
    });
    const key = (event) => {
      if (event.key === "Escape" && !nav.hidden) {
        close();
        menu.focus();
      }
    };
    document.addEventListener("keydown", key);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let observer;
    if (!reduce.matches && saved("hmel-motion") !== "paused" && window.gsap) {
      gsap.from(".hero-title>span,.page-intro h1", {
        y: 65,
        opacity: 0,
        duration: 1.15,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all",
      });
      gsap.from(".hero-topline,.hero-description,.hero-feature", {
        y: 20,
        opacity: 0,
        duration: 0.9,
        delay: 0.35,
        stagger: 0.1,
        clearProps: "all",
      });
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              if (document.documentElement.dataset.motion === "paused") {
                observer.unobserve(e.target);
                return;
              }
              gsap.fromTo(
                e.target,
                { y: 35, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.9,
                  ease: "power2.out",
                  clearProps: "all",
                },
              );
              observer.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 },
      );
      document
        .querySelectorAll(".reveal")
        .forEach((el) => observer.observe(el));
    }
    const progress = document.querySelector(".scroll-progress");
    const scroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    const menuBreakpoint = matchMedia("(max-width: 760px)");
    menuBreakpoint.addEventListener("change", () => {
      if (!menuBreakpoint.matches) close();
    });
    document.querySelector(".cookie-accept")?.addEventListener("click", () => {
      document.cookie =
        "hmel-consent=1; Max-Age=31536000; Path=/; SameSite=Lax" +
        (location.protocol === "https:" ? "; Secure" : "");
      document.documentElement.dataset.consent = "1";
    });
    const motionButton = document.querySelector(".motion-toggle");
    const syncMotion = () => {
      const stopped = reduce.matches || saved("hmel-motion") === "paused";
      document.documentElement.dataset.motion = stopped ? "paused" : "on";
      motionButton.setAttribute("aria-pressed", String(stopped));
      motionButton.textContent =
        state.lang === "mk"
          ? stopped
            ? "Продолжи движење"
            : "Паузирај движење"
          : stopped
            ? "Resume motion"
            : "Pause motion";
      if (reduce.matches) {
        motionButton.disabled = true;
        motionButton.textContent =
          state.lang === "mk" ? "Намалено движење" : "Reduced motion";
      } else motionButton.disabled = false;
      if (stopped && window.gsap)
        gsap.globalTimeline.getChildren().forEach((tween) => tween.progress(1));
      document.dispatchEvent(new Event("hmel-motion"));
    };
    syncMotion();
    motionButton.addEventListener("click", () => {
      save(
        "hmel-motion",
        document.documentElement.dataset.motion === "paused" ? "on" : "paused",
      );
      syncMotion();
    });
    reduce.addEventListener("change", syncMotion);
    document.querySelectorAll(".bottle-canvas").forEach((canvas) => {
      const b = beers.find((b) => b.slug === canvas.dataset.bottle);
      if (b && typeof createHmelBottle === "function")
        createHmelBottle(canvas, b, reduce);
    });
    const readout = document.querySelector(".brew-readout");
    if (readout) {
      const recipe = beers[0],
        stages = brewStages(recipe);
      let active = -1;
      const update = (i) => {
        if (active === i) return;
        active = i;
        const st = stages[i];
        readout.querySelector(".liquid").style.height = st.fill * 100 + "%";
        readout.querySelector(".liquid").style.background = st.color;
        readout.querySelector(".readout-stage").textContent = String(
          i + 1,
        ).padStart(2, "0");
        readout.querySelector(".readout-name").textContent =
          recipe.brewing[i].title[state.lang];
        for (const key of ["temp", "gravity", "clock"])
          readout.querySelector(`[data-reading="${key}"]`).textContent =
            st[key] + (key === "temp" ? "°C" : "");
        readout.querySelector(".readout-detail").textContent = st.detail;
      };
      const chapters = [...document.querySelectorAll(".process-chapter")];
      let queued = false;
      const updateChapter = () => {
        queued = false;
        const threshold =
          innerWidth <= 760 ? innerHeight * 0.65 : innerHeight * 0.45;
        let next = 0;
        chapters.forEach((el, i) => {
          if (el.getBoundingClientRect().top <= threshold) next = i;
        });
        update(next);
      };
      const trackChapter = () => {
        if (!queued) {
          queued = true;
          requestAnimationFrame(updateChapter);
        }
      };
      window.addEventListener("scroll", trackChapter, { passive: true });
      window.addEventListener("resize", trackChapter);
      updateChapter();
    }
    const recipeSection = document.querySelector("[data-recipe]");
    if (recipeSection) {
      const b = beers.find((b) => b.slug === recipeSection.dataset.recipe),
        stages = brewStages(b),
        tabs = [...recipeSection.querySelectorAll("[role=tab]")];
      const select = (i, focus = false) => {
        tabs.forEach((tab, j) => {
          tab.setAttribute("aria-selected", String(i === j));
          tab.tabIndex = i === j ? 0 : -1;
        });
        if (focus) tabs[i].focus();
        const step = b.brewing[i];
        recipeSection
          .querySelector("[role=tabpanel]")
          .setAttribute("aria-labelledby", tabs[i].id);
        const img = recipeSection.querySelector(".recipe-image img");
        img.src = "../" + step.img;
        img.alt = step.title[state.lang];
        recipeSection.querySelector("[data-recipe-count]").textContent =
          `0${i + 1} / 05`;
        recipeSection.querySelector("[data-recipe-title]").textContent =
          step.title[state.lang];
        recipeSection.querySelector("[data-recipe-body]").textContent =
          step.body[state.lang];
        recipeSection.querySelector("[data-recipe-temp]").textContent =
          stages[i].temp + "°C";
        recipeSection.querySelector("[data-recipe-gravity]").textContent =
          stages[i].gravity;
        if (
          !reduce.matches &&
          document.documentElement.dataset.motion !== "paused" &&
          window.gsap
        )
          gsap.fromTo(
            ".recipe-panel",
            { opacity: 0.4, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, clearProps: "all" },
          );
      };
      tabs.forEach((tab, i) => {
        tab.addEventListener("click", () => select(i));
        tab.addEventListener("keydown", (e) => {
          let next;
          if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
          if (e.key === "ArrowLeft") next = (i + tabs.length - 1) % tabs.length;
          if (e.key === "Home") next = 0;
          if (e.key === "End") next = tabs.length - 1;
          if (next !== undefined) {
            e.preventDefault();
            select(next, true);
          }
        });
      });
    }
    const form = document.querySelector("#booking-form");
    if (form) {
      const date = form.elements.date,
        now = new Date();
      now.setHours(12, 0, 0, 0);
      now.setDate(now.getDate() + 3);
      const minDate =
        now.getFullYear() +
        "-" +
        String(now.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(now.getDate()).padStart(2, "0");
      date.min = minDate;
      const group = form.elements.guests;
      const syncGroup = () => {
        group.min = form.elements.experience.value === "2" ? "10" : "1";
        if (Number(group.value) < Number(group.min)) group.value = group.min;
      };
      form.elements.experience.addEventListener("change", syncGroup);
      document.querySelectorAll("[data-experience]").forEach((a) =>
        a.addEventListener("click", () => {
          form.elements.experience.value = a.dataset.experience;
          syncGroup();
        }),
      );
      const requested = new URLSearchParams(location.search).get("beer");
      const requestedBeer = beers.find((b) => b.slug === requested);
      if (requestedBeer)
        form.elements.message.value =
          (state.lang === "mk"
            ? "Би сакал/а да го пробам "
            : "I would like to taste ") +
          requestedBeer.name[state.lang] +
          ".";
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const f = new FormData(form),
          mk = state.lang === "mk";
        const message =
          (mk ? "Барање за посета на Хмел" : "Hmel visit request") +
          "\n\n" +
          [
            (mk ? "Име: " : "Name: ") + f.get("name"),
            (mk ? "Е-пошта: " : "Email: ") + f.get("email"),
            (mk ? "Искуство: " : "Experience: ") +
              services[Number(f.get("experience"))].title[state.lang],
            (mk ? "Датум: " : "Date: ") + f.get("date"),
            (mk ? "Гости: " : "Guests: ") + f.get("guests"),
            "\n" + f.get("message"),
          ].join("\n");
        const status = document.querySelector("#form-status");
        status.replaceChildren();
        const heading = document.createElement("p");
        heading.textContent = mk
          ? "Твоето барање е подготвено. Не е испратена порака."
          : "Your request is ready. No message has been sent.";
        const body = document.createElement("p");
        body.textContent = message;
        body.style.marginTop = "15px";
        const a = document.createElement("a");
        a.className = "text-link";
        a.textContent = mk ? "Отвори во е-пошта ↗" : "Open in email app ↗";
        a.href =
          "mailto:tastings@pivarahmel.mk?subject=" +
          encodeURIComponent(mk ? "Барање за посета" : "Visit request") +
          "&body=" +
          encodeURIComponent(message);
        status.append(heading, body, a);
        status.hidden = false;
        status.scrollIntoView({
          behavior: reduce.matches ? "instant" : "smooth",
          block: "nearest",
        });
      });
    }
  }
  document.addEventListener("DOMContentLoaded", boot);
})();

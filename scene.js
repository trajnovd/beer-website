/* Interactive, locally rendered product photography using the vendored Three.js. */
function createHmelBottle(canvas, beer, motionQuery) {
  if (!window.THREE) return () => {};
  const T = window.THREE;
  // Vendored Three.js r150 uses encoding (not the later colorSpace API).
  // Interpret CSS/hex colours as sRGB before lighting them in linear space.
  T.ColorManagement.enabled = true;
  let renderer;
  try {
    renderer = new T.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
  } catch {
    return () => {};
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.outputEncoding = T.sRGBEncoding;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  const scene = new T.Scene(),
    camera = new T.PerspectiveCamera(32, 1, 0.1, 60);
  camera.position.set(0, 0.2, 10);
  const bottle = new T.Group();
  scene.add(bottle);
  // Large studio softboxes in an equirectangular environment yield real material reflections.
  const envCanvas = document.createElement("canvas");
  envCanvas.width = 1024;
  envCanvas.height = 512;
  const ec = envCanvas.getContext("2d");
  ec.fillStyle = "#30382b";
  ec.fillRect(0, 0, 1024, 512);
  const grad = ec.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, "#85907b");
  grad.addColorStop(0.5, "#22271e");
  grad.addColorStop(1, "#10130d");
  ec.fillStyle = grad;
  ec.fillRect(0, 0, 1024, 512);
  ec.fillStyle = "#ffffff";
  ec.fillRect(60, 50, 90, 330);
  ec.fillStyle = "#e4f7b3";
  ec.fillRect(480, 60, 65, 350);
  ec.fillStyle = "#a9b78d";
  ec.fillRect(800, 130, 180, 190);
  const envTexture = new T.CanvasTexture(envCanvas);
  envTexture.mapping = T.EquirectangularReflectionMapping;
  envTexture.encoding = T.sRGBEncoding;
  const pmrem = new T.PMREMGenerator(renderer),
    envTarget = pmrem.fromEquirectangular(envTexture);
  scene.environment = envTarget.texture;
  envTexture.dispose();
  pmrem.dispose();
  // Keep the softbox highlights, with less fill to reveal the glass curvature.
  scene.add(new T.HemisphereLight(0xffffff, 0x40371f, 0.45));
  const key = new T.DirectionalLight(0xfff1d8, 2);
  key.position.set(-3, 5, 5);
  scene.add(key);
  const rim = new T.DirectionalLight(0xc2f550, 1.5);
  rim.position.set(3, 3, -2);
  scene.add(rim);
  const front = new T.DirectionalLight(0xffffff, 0.35);
  front.position.set(0, 1, 5);
  scene.add(front);
  const glass = new T.MeshPhysicalMaterial({
    color: beer.srm > 15 ? 0x271005 : 0x965019,
    metalness: 0.24,
    roughness: 0.17,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    envMapIntensity: 0.85,
  });
  const points = [
    [0.02, -2.15],
    [0.34, -2.15],
    [0.45, -2.1],
    [0.48, -2.03],
    [0.49, -1.92],
    [0.49, 0.35],
    [0.48, 0.56],
    [0.43, 0.73],
    [0.34, 0.87],
    [0.25, 1.01],
    [0.205, 1.15],
    [0.195, 1.73],
    [0.215, 1.76],
    [0.22, 1.86],
    [0.21, 1.92],
    [0.02, 1.92],
  ].map((p) => new T.Vector2(...p));
  const body = new T.Mesh(new T.LatheGeometry(points, 80), glass);
  bottle.add(body);
  const capMaterial = new T.MeshStandardMaterial({
    color: 0xb9c397,
    metalness: 0.8,
    roughness: 0.25,
  });
  const cap = new T.Mesh(
    new T.CylinderGeometry(0.238, 0.238, 0.11, 48),
    capMaterial,
  );
  cap.position.y = 1.94;
  bottle.add(cap);
  const toothGeometry = new T.BoxGeometry(0.026, 0.1, 0.027);
  for (let i = 0; i < 26; i++) {
    const a = (i / 26) * Math.PI * 2,
      m = new T.Mesh(toothGeometry, capMaterial);
    m.position.set(Math.sin(a) * 0.235, 1.91, Math.cos(a) * 0.235);
    m.rotation.y = a;
    bottle.add(m);
  }
  const labelCanvas = document.createElement("canvas");
  labelCanvas.width = 1536;
  labelCanvas.height = 1024;
  const lc = labelCanvas.getContext("2d");
  function drawLabel() {
    lc.fillStyle = "#e9e9d9";
    lc.fillRect(0, 0, 1536, 1024);
    lc.fillStyle = "#c2f550";
    lc.fillRect(0, 0, 1536, 140);
    lc.fillRect(0, 920, 1536, 104);
    lc.fillStyle = "#1c281c";
    lc.textAlign = "center";
    lc.font = "700 38px Arial";
    lc.fillText("INDEPENDENT BREWERY", 768, 88);
    lc.font = '800 124px "Barlow Condensed", Arial';
    lc.fillText("hmel®", 768, 307);
    lc.fillRect(570, 350, 396, 3);
    lc.font =
      "800 " +
      (beer.slug === "kaluger" ? 145 : 190) +
      'px "Barlow Condensed", Arial';
    lc.fillText(beer.name.en.toUpperCase(), 768, 580);
    lc.font = '600 48px "Barlow Condensed", Arial';
    lc.fillText(beer.style.en.toUpperCase(), 768, 675);
    lc.font = "700 35px Arial";
    lc.fillText(`${beer.abv} ALC. / ${beer.ibu} IBU`, 768, 778);
    lc.font = "24px Arial";
    lc.fillText("SKOPJE, MACEDONIA", 768, 850);
    lc.font = "700 28px Arial";
    lc.fillText("SMALL BATCH. BIG CHARACTER.", 768, 985);
    // A small back label completes the wrap when the user turns the bottle.
    lc.save();
    lc.translate(160, 500);
    lc.rotate(-Math.PI / 2);
    lc.font = "24px Arial";
    lc.fillText("PIVARA HMEL  •  330 ML  •  ENJOY RESPONSIBLY", 0, 0);
    lc.restore();
  }
  drawLabel();
  const labelTexture = new T.CanvasTexture(labelCanvas);
  labelTexture.encoding = T.sRGBEncoding;
  labelTexture.anisotropy = Math.min(
    renderer.capabilities.getMaxAnisotropy(),
    8,
  );
  const labelMat = new T.MeshStandardMaterial({
    map: labelTexture,
    // Matte paper receives scene lighting without a broad reflective veil.
    roughness: 0.95,
    metalness: 0,
    envMapIntensity: 0.25,
  });
  const label = new T.Mesh(
    new T.CylinderGeometry(0.498, 0.498, 1.56, 80, 1, true),
    labelMat,
  );
  label.position.y = -0.8;
  label.rotation.y = Math.PI;
  bottle.add(label);
  const neckMat = new T.MeshStandardMaterial({
    color: 0xc2f550,
    roughness: 0.5,
    metalness: 0.05,
  });
  const neck = new T.Mesh(
    new T.CylinderGeometry(0.207, 0.21, 0.23, 64, 1, true),
    neckMat,
  );
  neck.position.y = 1.47;
  bottle.add(neck);
  const stripe = new T.Mesh(
    new T.CylinderGeometry(0.212, 0.212, 0.025, 64, 1, true),
    new T.MeshStandardMaterial({ color: 0x243020, roughness: 0.4 }),
  );
  stripe.position.y = 1.43;
  bottle.add(stripe);
  // Condensation catches the studio lights without an external texture request.
  const dropGeometry = new T.SphereGeometry(1, 6, 6),
    dropMaterial = new T.MeshPhysicalMaterial({
      color: 0xc5b895,
      transparent: true,
      opacity: 0.4,
      roughness: 0.08,
      metalness: 0.15,
      clearcoat: 1,
    });
  const droplets = new T.InstancedMesh(dropGeometry, dropMaterial, 90),
    dummy = new T.Object3D();
  let seed = 17;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = 0; i < 90; i++) {
    const a = random() * Math.PI * 2,
      y = random() * 2.5 - 1.9,
      r = 0.5,
      size = 0.008 + random() * 0.012;
    dummy.position.set(Math.sin(a) * r, y, Math.cos(a) * r);
    dummy.scale.set(size, size * 1.5, size * 0.65);
    dummy.updateMatrix();
    droplets.setMatrixAt(i, dummy.matrix);
  }
  bottle.add(droplets);
  // Soft elliptical shadow is a geometry/material effect, not a page decoration.
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = 128;
  shadowCanvas.height = 128;
  const sc = shadowCanvas.getContext("2d");
  const sg = sc.createRadialGradient(64, 64, 0, 64, 64, 64);
  sg.addColorStop(0, "rgba(0,0,0,.23)");
  sg.addColorStop(1, "rgba(0,0,0,0)");
  sc.fillStyle = sg;
  sc.fillRect(0, 0, 128, 128);
  const shadowTexture = new T.CanvasTexture(shadowCanvas),
    shadow = new T.Mesh(
      new T.PlaneGeometry(3.1, 0.55),
      new T.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        depthWrite: false,
      }),
    );
  shadow.position.set(0.15, -2.48, -0.2);
  scene.add(shadow);
  bottle.rotation.set(0.04, 0.14, -0.18);
  let frame = 0,
    visible = true,
    disposed = false,
    dragging = false,
    lastX = 0,
    targetY = 0.14,
    targetX = 0,
    currentY = 0.14,
    hasDragged = false;
  let width = 0,
    height = 0;
  const paused = () =>
    motionQuery.matches || document.documentElement.dataset.motion === "paused";
  function resize() {
    if (disposed) return;
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.z = canvas.closest(".detail-product") ? 9.6 : 9.5;
    camera.updateProjectionMatrix();
    render(performance.now());
  }
  function render(t) {
    if (disposed || !width || !height) return;
    currentY += (targetY - currentY) * 0.065;
    bottle.rotation.y = currentY;
    bottle.rotation.x += (targetX - bottle.rotation.x) * 0.045;
    const drift = paused() ? 0 : Math.sin(t * 0.0008) * 0.09;
    bottle.position.y = drift;
    bottle.rotation.z = -0.18 + (paused() ? 0 : Math.sin(t * 0.00055) * 0.026);
    shadow.material.opacity = 1 - drift * 0.7;
    renderer.render(scene, camera);
    canvas.parentElement.classList.add("scene-ready");
  }
  function animate(t) {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    render(t);
    if (!paused() || dragging || Math.abs(targetY - currentY) > 0.001)
      frame = requestAnimationFrame(animate);
  }
  function wake() {
    if (!frame && !disposed && visible && !document.hidden)
      frame = requestAnimationFrame(animate);
  }
  const down = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragging = true;
    hasDragged = true;
    lastX = e.clientX;
    canvas.setPointerCapture(e.pointerId);
    wake();
  };
  const move = (e) => {
    if (dragging) {
      targetY += (e.clientX - lastX) * 0.012;
      lastX = e.clientX;
      wake();
    } else if (e.pointerType === "mouse" && !paused()) {
      const rect = canvas.getBoundingClientRect();
      targetX = ((e.clientY - rect.top - height / 2) / height) * 0.12;
      if (!hasDragged)
        targetY = ((e.clientX - rect.left - width / 2) / width) * 0.35;
      wake();
    }
  };
  const up = () => {
    dragging = false;
    wake();
  };
  const leave = () => {
    targetX = 0;
    if (!hasDragged) targetY = 0.14;
  };
  canvas.addEventListener("pointerdown", down);
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerup", up);
  canvas.addEventListener("pointercancel", up);
  canvas.addEventListener("pointerleave", leave);
  canvas.tabIndex = 0;
  canvas.setAttribute("role", "img");
  canvas.setAttribute(
    "aria-description",
    state.lang === "mk"
      ? "Повлечи или користи ги стрелките за да го завртиш шишето."
      : "Drag or use the left and right arrow keys to rotate the bottle.",
  );
  const keys = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      targetY += e.key === "ArrowLeft" ? -0.3 : 0.3;
      wake();
    }
  };
  canvas.addEventListener("keydown", keys);
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  const io = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible) wake();
    else {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  });
  io.observe(canvas);
  const visibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else wake();
  };
  document.addEventListener("visibilitychange", visibility);
  document.addEventListener("hmel-motion", wake);
  motionQuery.addEventListener("change", wake);
  const contextLost = (e) => {
    e.preventDefault();
    canvas.parentElement.classList.remove("scene-ready");
    cancelAnimationFrame(frame);
    frame = 0;
  };
  canvas.addEventListener("webglcontextlost", contextLost);
  document.fonts.ready.then(() => {
    if (disposed) return;
    drawLabel();
    labelTexture.needsUpdate = true;
    wake();
  });
  resize();
  wake();
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    ro.disconnect();
    io.disconnect();
    document.removeEventListener("visibilitychange", visibility);
    document.removeEventListener("hmel-motion", wake);
    motionQuery.removeEventListener("change", wake);
    canvas.removeEventListener("pointerdown", down);
    canvas.removeEventListener("pointermove", move);
    canvas.removeEventListener("pointerup", up);
    canvas.removeEventListener("pointercancel", up);
    canvas.removeEventListener("pointerleave", leave);
    canvas.removeEventListener("keydown", keys);
    canvas.removeEventListener("webglcontextlost", contextLost);
    const geometries = new Set(),
      materials = new Set();
    scene.traverse((o) => {
      if (o.geometry) geometries.add(o.geometry);
      if (o.material)
        (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) =>
          materials.add(m),
        );
    });
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    labelTexture.dispose();
    shadowTexture.dispose();
    envTarget.dispose();
    renderer.dispose();
  };
}

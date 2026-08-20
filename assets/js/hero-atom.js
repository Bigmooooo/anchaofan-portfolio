/* ===== 原子核风格头图（Three.js） ===== */
(function () {
  const hero = document.getElementById("hero");
  const canvas = document.getElementById("heroAtom");
  if (!hero || !canvas) return;

  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const isMobile = window.innerWidth < 768 || isTouch;

  const width = hero.clientWidth;
  const height = hero.clientHeight;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0a0c, 0.035);

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = isMobile ? 9 : 8;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: false,
    antialias: !isMobile,
    powerPreference: "high-performance"
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
  renderer.setClearColor(0x0a0a0c, 1);

  const atom = new THREE.Group();
  scene.add(atom);

  // 专门照亮四芒星的灯（位于相机前方，制造明暗面；不影响其它 Basic/Shader 材质）
  const starLight = new THREE.PointLight(0xc8ff4d, 2.6, 80, 0);
  starLight.position.set(0, 1.5, 7);
  scene.add(starLight);

  /* ---- 原子核核心 ---- */
  const nucleusDetail = isMobile ? 30 : 50;
  const nucleusGeo = new THREE.IcosahedronGeometry(1.1, nucleusDetail);
  const posAttr = nucleusGeo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < posAttr.count; i++) {
    v.fromBufferAttribute(posAttr, i);
    const n =
      Math.sin(v.x * 4.2 + Math.cos(v.y * 3.1 + v.z)) *
      Math.cos(v.z * 2.7 + Math.sin(v.x * 1.4));
    const displacement = 0.08 + n * 0.06;
    v.multiplyScalar(1 + displacement * 0.14);
    posAttr.setXYZ(i, v.x, v.y, v.z);
  }
  nucleusGeo.computeVertexNormals();

  const nucleusMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0x0a0a0e) }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;

      void main() {
        vec3 viewDir = normalize(cameraPosition - vPosition);

        // RGB-split fresnel for chromatic aberration look
        vec3 nr = normalize(vNormal + vec3(0.028, 0.0, 0.0));
        vec3 ng = normalize(vNormal + vec3(0.0, 0.028, 0.0));
        vec3 nb = normalize(vNormal - vec3(0.028, 0.0, 0.0));

        float fr = pow(1.0 - abs(dot(viewDir, nr)), 3.0);
        float fg = pow(1.0 - abs(dot(viewDir, ng)), 3.0);
        float fb = pow(1.0 - abs(dot(viewDir, nb)), 3.0);
        vec3 edge = vec3(fr * 0.9, fg * 0.65, fb * 1.05);

        vec3 color = uColor;

        // subtle surface scan
        float scan = sin(vPosition.y * 28.0 + uTime * 0.6) * 0.5 + 0.5;
        color += vec3(scan) * 0.012;

        // 边缘最亮，向内部衰减（暗核 + 明亮发光边缘）
        color += edge * 0.85;
        color += vec3(0.006, 0.008, 0.014);

        gl_FragColor = vec4(color, 1.0);
      }
    `
  });

  const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
  atom.add(nucleus);

  // 外层淡淡发光大气
  const auraGeo = new THREE.IcosahedronGeometry(1.32, 12);
  const auraMat = new THREE.MeshBasicMaterial({
    color: 0x223344,
    transparent: true,
    opacity: 0.08,
    blending: THREE.AdditiveBlending
  });
  const aura = new THREE.Mesh(auraGeo, auraMat);
  atom.add(aura);

  // 内核线框
  const wireGeo = new THREE.IcosahedronGeometry(1.18, isMobile ? 8 : 12);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x667788,
    wireframe: true,
    transparent: true,
    opacity: 0.09
  });
  const wireframe = new THREE.Mesh(wireGeo, wireMat);
  atom.add(wireframe);

  /* ---- 内部漂浮粒子 ---- */
  const glowCount = isMobile ? 30 : 50;
  const glowGeo = new THREE.BufferGeometry();
  const glowPos = [];
  for (let i = 0; i < glowCount; i++) {
    const r = 1.1 + Math.random() * 0.7;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    glowPos.push(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
  }
  glowGeo.setAttribute("position", new THREE.Float32BufferAttribute(glowPos, 3));
  const glowMat = new THREE.PointsMaterial({
    color: 0xeaf0ff,
    size: isMobile ? 0.08 : 0.065,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
  });
  const glowParticles = new THREE.Points(glowGeo, glowMat);
  atom.add(glowParticles);

  /* ---- 轨道环与环绕粒子（每个环：隐约路径线 + 少量明亮粒子） ---- */
  const ringGroup = new THREE.Group();
  atom.add(ringGroup);

  // 立体四芒星：四芒星 Shape 挤出厚度，形成真正的 3D 星
  function makeStarGeometry() {
    const shape = new THREE.Shape();
    const outer = 0.5, inner = 0.20;
    for (let i = 0; i < 8; i++) {
      const ang = (Math.PI / 4) * i - Math.PI / 2;
      const rad = i % 2 === 0 ? outer : inner;
      const x = Math.cos(ang) * rad, y = Math.sin(ang) * rad;
      if (i === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
    }
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.06,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 2,
      steps: 1
    });
    geo.translate(0, 0, -0.03); // 居中
    geo.computeVertexNormals();
    return geo;
  }
  const starGeo = makeStarGeometry();
  const starColor = 0xc8ff4d; // 参考图的黄绿色
  const starMat = new THREE.MeshStandardMaterial({
    color: starColor,
    emissive: starColor,
    emissiveIntensity: 3.2,
    metalness: 0.2,
    roughness: 0.25,
    side: THREE.DoubleSide
  });
  // 黄绿色发光贴图（径向渐变）：core=中心实心亮光，halo=外层柔光晕
  const glowTex = (function () {
    function radial(inner, mid) {
      const s = 128;
      const c = document.createElement("canvas");
      c.width = c.height = s;
      const ctx = c.getContext("2d");
      const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      g.addColorStop(0, inner);
      g.addColorStop(0.4, mid);
      g.addColorStop(1, "rgba(200,255,77,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, s, s);
      return new THREE.CanvasTexture(c);
    }
    return {
      core: radial("rgba(235,255,170,1)", "rgba(200,255,77,0.6)"),
      halo: radial("rgba(200,255,77,0.6)", "rgba(200,255,77,0.2)")
    };
  })();
  // 三轴四芒星 + 多层发光晕，任意轴向看都是四芒星
  function makeStar3D() {
    const g = new THREE.Group();
    const m1 = new THREE.Mesh(starGeo, starMat);            // XY 面
    const m2 = new THREE.Mesh(starGeo, starMat); m2.rotation.y = Math.PI / 2; // YZ 面
    const m3 = new THREE.Mesh(starGeo, starMat); m3.rotation.x = Math.PI / 2; // XZ 面
    g.add(m1, m2, m3);
    // 中心发光核心
    const core = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex.core, color: starColor, transparent: true,
      opacity: 1.0, blending: THREE.AdditiveBlending, depthWrite: false
    }));
    core.scale.setScalar(0.5);
    g.add(core);
    // 外层柔光晕（多层、越大越淡）—— 不依赖外部泛光库也能“发光”
    const halos = [
      { s: 1.1, o: 0.55 },
      { s: 2.0, o: 0.3 },
      { s: 3.4, o: 0.14 }
    ];
    halos.forEach((h) => {
      const halo = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowTex.halo, color: starColor, transparent: true,
        opacity: h.o, blending: THREE.AdditiveBlending, depthWrite: false
      }));
      halo.scale.setScalar(h.s);
      g.add(halo);
    });
    return g;
  }

  const ringCount = isMobile ? 4 : 6;
  const ringData = [];
  for (let i = 0; i < ringCount; i++) {
    const radius = 2.3 + i * 0.55;

    // 每个环用一个子组，统一旋转，保证路径线与粒子始终对齐
    const ring = new THREE.Group();
    ring.rotation.x = Math.random() * Math.PI;
    ring.rotation.y = Math.random() * Math.PI;
    ring.userData = {
      rotX: (Math.random() - 0.5) * 0.0012,
      rotY: (Math.random() - 0.5) * 0.0012
    };

    // 隐约的路径线
    const tube = 0.004 + (i % 2) * 0.003;
    const ringGeo = new THREE.TorusGeometry(radius, tube, 12, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc2ccdc,
      transparent: true,
      opacity: isMobile ? 0.14 : 0.2 - i * 0.012,
      side: THREE.DoubleSide
    });
    const ringLine = new THREE.Mesh(ringGeo, ringMat);
    ring.add(ringLine);

    // 粒子（数量减少、更亮）
    const particleCount = isMobile ? 4 : 4 + i * 2;
    const pGeo = new THREE.BufferGeometry();
    const pPos = [];
    const pSpeed = [];
    for (let j = 0; j < particleCount; j++) {
      const angle = (j / particleCount) * Math.PI * 2 + Math.random() * 0.3;
      pPos.push(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 0.12
      );
      pSpeed.push((0.0015 + Math.random() * 0.003) * (Math.random() < 0.5 ? 1 : -1));
    }
    pGeo.setAttribute("position", new THREE.Float32BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: isMobile ? 0.09 : 0.07,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });
    const pSystem = new THREE.Points(pGeo, pMat);
    ring.add(pSystem);

    ringGroup.add(ring);
    ringData.push({ group: ring, system: pSystem, speeds: pSpeed, radius });
  }

  /* ---- 背景远距尘埃 ---- */
  const dustCount = isMobile ? 70 : 140;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = [];
  for (let i = 0; i < dustCount; i++) {
    const r = 6 + Math.random() * 10;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    dustPos.push(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
  }
  dustGeo.setAttribute("position", new THREE.Float32BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({
    color: 0x556677,
    size: 0.04,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  /* ---- 三轴四芒星（独立于原子核：悬停头图时跟随鼠标） ---- */
  const starHolder = new THREE.Group();
  scene.add(starHolder);
  const starMesh = makeStar3D();
  const starScale = isMobile ? 0.28 : 0.36;
  starMesh.scale.setScalar(starScale);
  starHolder.add(starMesh);
  const starOrbitRadius = 2.3;
  let starAngle = Math.PI * 0.5;
  const starSpeed = 0.0022;
  // 计算 z=0 平面上的可视范围，用于把鼠标坐标映射到世界坐标
  const viewH = 2 * Math.tan((camera.fov * Math.PI / 180) / 2) * camera.position.z;
  const viewW = viewH * camera.aspect;

  /* ---- 鼠标/触摸跟随 ---- */
  let targetRotX = 0;
  let targetRotY = 0;
  let pointerX = 0;
  let pointerY = 0;
  let isHovering = false;

  function onPointerMove(x, y) {
    const rect = hero.getBoundingClientRect();
    const mx = ((x - rect.left) / rect.width) * 2 - 1;
    const my = -((y - rect.top) / rect.height) * 2 + 1;
    targetRotY = mx * 0.5;
    targetRotX = my * 0.35;
    pointerX = mx;
    pointerY = my;
    isHovering = true;
  }

  hero.addEventListener("mousemove", (e) => onPointerMove(e.clientX, e.clientY));
  hero.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length) onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    },
    { passive: true }
  );
  hero.addEventListener("mouseleave", () => {
    isHovering = false;
  });

  /* ---- 窗口自适应 ---- */
  window.addEventListener("resize", () => {
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  /* ---- 可见性暂停 ---- */
  let visible = true;
  try {
    const obs = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    obs.observe(hero);
  } catch (e) {
    visible = true;
  }

  /* ---- 动画循环 ---- */
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    if (!visible) return;

    const t = clock.getElapsedTime();
    nucleusMat.uniforms.uTime.value = t;

    // 平滑跟随鼠标，离开则慢慢回到原位
    const k = isHovering ? 0.06 : 0.02;
    atom.rotation.x += (targetRotX - atom.rotation.x) * k;
    atom.rotation.y += (targetRotY - atom.rotation.y) * k;

    // 缓慢自转
    atom.rotation.y += 0.0003;
    atom.rotation.z += 0.00012;

    // 核脉冲
    const pulse = 1 + Math.sin(t * 0.7) * 0.012;
    nucleus.scale.set(pulse, pulse, pulse);
    wireframe.scale.set(pulse, pulse, pulse);
    aura.scale.set(1 + Math.sin(t * 0.5 + 1) * 0.02, 1 + Math.sin(t * 0.5 + 1) * 0.02, 1 + Math.sin(t * 0.5 + 1) * 0.02);

    // 轨道环（路径线 + 粒子）整体缓慢自转，保持对齐
    ringData.forEach((ring) => {
      ring.group.rotation.x += ring.group.userData.rotX;
      ring.group.rotation.y += ring.group.userData.rotY;

      // 环绕粒子沿路径线运动
      const positions = ring.system.geometry.attributes.position.array;
      for (let i = 0; i < ring.speeds.length; i++) {
        const x = positions[i * 3];
        const y = positions[i * 3 + 1];
        const angle = Math.atan2(y, x) + ring.speeds[i];
        positions[i * 3] = Math.cos(angle) * ring.radius;
        positions[i * 3 + 1] = Math.sin(angle) * ring.radius;
      }
      ring.system.geometry.attributes.position.needsUpdate = true;
    });

    // 四芒星：悬停头图时跟随鼠标；否则回到轨道上缓慢绕行
    if (isHovering) {
      const tx = Math.max(-viewW * 0.48, Math.min(viewW * 0.48, pointerX * viewW * 0.46));
      const ty = Math.max(-viewH * 0.48, Math.min(viewH * 0.48, pointerY * viewH * 0.46));
      starHolder.position.x += (tx - starHolder.position.x) * 0.09;
      starHolder.position.y += (ty - starHolder.position.y) * 0.09;
    } else {
      starAngle += starSpeed;
      const bx = Math.cos(starAngle) * starOrbitRadius;
      const by = Math.sin(starAngle) * starOrbitRadius;
      starHolder.position.x += (bx - starHolder.position.x) * 0.05;
      starHolder.position.y += (by - starHolder.position.y) * 0.05;
    }
    // 自身多轴自转，展示立体
    starMesh.rotation.x += 0.012;
    starMesh.rotation.y += 0.016;

    glowParticles.rotation.y -= 0.0006;
    dust.rotation.y += 0.00006;

    renderer.render(scene, camera);
  }
  animate();
})();

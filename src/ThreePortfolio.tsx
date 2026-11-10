/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  ExternalLink,
  Github,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  Share2,
  Check,
  Maximize2,
  Minimize2,
  Box,
  Compass,
  Zap,
} from 'lucide-react';

interface ProjectHologram {
  id: string;
  title: string;
  subtitle: string;
  metrics: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  accentColor: string;
  glowHex: number;
  position: [number, number, number];
  rotationY: number;
}

const PROJECTS_DATA: ProjectHologram[] = [
  {
    id: 'productiq',
    title: 'ProductIQ',
    subtitle: 'Feedback Intelligence Platform',
    metrics: 'Llama 3.1 · Structured Validation',
    description:
      'LLM-powered system using Llama 3.1 to classify customer feedback, prioritize issues, and automate roadmap generation.',
    techStack: ['Python', 'FastAPI', 'Llama 3.1', 'PostgreSQL', 'React'],
    liveUrl: 'https://productiq-frontend-2x15.onrender.com/dashboard',
    githubUrl: 'https://github.com/Anuvid17',
    accentColor: '#60A5FA',
    glowHex: 0x60a5fa,
    position: [-2.6, 0.2, 0.4],
    rotationY: 0.35,
  },
  {
    id: 'adaptive-rl',
    title: 'Adaptive RL Prioritization',
    subtitle: 'Decision Intelligence System',
    metrics: '50.93% Accuracy · 0.4735 F1',
    description:
      'Transformer embeddings combined with Deep Q-Network reinforcement learning. Evaluated on 1,500 software issues.',
    techStack: ['Python', 'PyTorch', 'Transformers', 'DQN'],
    liveUrl: 'https://rl-prioritization-frontend.onrender.com/',
    githubUrl: 'https://github.com/Anuvid17',
    accentColor: '#F59E0B',
    glowHex: 0xd4af37,
    position: [0, 0.4, 1.2],
    rotationY: 0,
  },
  {
    id: 'grammar-ai',
    title: 'AI Grammar Correction',
    subtitle: 'Fine-Tuned FLAN-T5 Model',
    metrics: '0.6869 BLEU · 0.8748 ROUGE-L',
    description:
      'Fine-tuned FLAN-T5-base on 100,000 sentence pairs. Developed a full FastAPI and React production web application.',
    techStack: ['FLAN-T5', 'Hugging Face', 'FastAPI', 'React'],
    liveUrl: 'https://huggingface.co/spaces/anuvid/ai-grammar-correction',
    githubUrl: 'https://github.com/Anuvid17',
    accentColor: '#34D399',
    glowHex: 0x34d399,
    position: [2.6, 0.2, 0.4],
    rotationY: -0.35,
  },
];

// Procedural Canvas Texture Generator for Holographic Slabs (Zero 404s)
function createHologramTexture(project: ProjectHologram): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d')!;

  // Warm obsidian-amber glass gradient backing matching the site theme
  const grad = ctx.createLinearGradient(0, 0, 1024, 640);
  grad.addColorStop(0, '#2b2118');
  grad.addColorStop(0.5, '#201812');
  grad.addColorStop(1, '#17120d');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 640);

  // High-tech cybernetic border
  ctx.strokeStyle = project.accentColor;
  ctx.lineWidth = 8;
  ctx.strokeRect(20, 20, 984, 600);

  // Subtle interior corner brackets
  ctx.fillStyle = project.accentColor;
  const bracketSize = 36;
  ctx.fillRect(20, 20, bracketSize, 12);
  ctx.fillRect(20, 20, 12, bracketSize);
  ctx.fillRect(1004 - bracketSize, 20, bracketSize, 12);
  ctx.fillRect(992, 20, 12, bracketSize);
  ctx.fillRect(20, 608, bracketSize, 12);
  ctx.fillRect(20, 620 - bracketSize, 12, bracketSize);
  ctx.fillRect(1004 - bracketSize, 608, bracketSize, 12);
  ctx.fillRect(992, 620 - bracketSize, 12, bracketSize);

  // Header pill badge
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.beginPath();
  ctx.roundRect(60, 60, 260, 48, 24);
  ctx.fill();
  ctx.font = 'bold 22px monospace';
  ctx.fillStyle = project.accentColor;
  ctx.fillText('FEATURED SYSTEM', 85, 92);

  // Title
  ctx.font = 'bold 52px sans-serif';
  ctx.fillStyle = '#F5F0E6';
  ctx.fillText(project.title, 60, 180);

  // Subtitle
  ctx.font = '30px sans-serif';
  ctx.fillStyle = '#E5D8C5';
  ctx.fillText(project.subtitle, 60, 230);

  // Divider
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(60, 270);
  ctx.lineTo(964, 270);
  ctx.stroke();

  // Metrics Box
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.roundRect(60, 305, 904, 80, 16);
  ctx.fill();
  ctx.strokeStyle = project.accentColor;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.font = 'bold 30px monospace';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(project.metrics, 90, 355);

  // Tech stack chips
  let xOffset = 60;
  project.techStack.forEach((tech) => {
    ctx.font = 'bold 24px monospace';
    const textWidth = ctx.measureText(tech).width;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.roundRect(xOffset, 420, textWidth + 36, 52, 12);
    ctx.fill();
    ctx.fillStyle = '#F5F0E6';
    ctx.fillText(tech, xOffset + 18, 455);
    xOffset += textWidth + 56;
  });

  // Footer status indicator
  ctx.font = '22px monospace';
  ctx.fillStyle = '#6B5D4B';
  ctx.fillText('3D SPATIAL HOLOGRAM · CLICK TO INSPECT & LAUNCH', 60, 560);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function ThreePortfolio({
  className = '',
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectHologram>(PROJECTS_DATA[1]);
  const [viewPreset, setViewPreset] = useState<'carousel' | 'core' | 'free'>('carousel');
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1.6); // Default brisk speed (1.6x)
  const [copiedLink, setCopiedLink] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsCollapsed, setControlsCollapsed] = useState(false);

  // Dynamic animation and speed refs (prevents canvas re-initialization on speed/toggle changes)
  const autoRotateRef = useRef(true);
  const speedRef = useRef(1.6);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    speedRef.current = rotationSpeed;
  }, [rotationSpeed]);

  // Camera lerp targets
  const targetCamPos = useRef(new THREE.Vector3(0, 1.2, 5.8));
  const targetLookAt = useRef(new THREE.Vector3(0, 0.3, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0.3, 0));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect software WebGL guard
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 1. Scene (Transparent without pitch-black fog so theme background shines through)
    const scene = new THREE.Scene();

    // 2. Camera
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;
    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.8);

    // 3. Renderer with transparent clear color
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 4. Lighting Rig (Warm champagne, soft white & amber accents)
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf5f0e6, 2.5);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const warmAmberLight = new THREE.DirectionalLight(0xd4af37, 1.5);
    warmAmberLight.position.set(-6, 3, 4);
    scene.add(warmAmberLight);

    const rimLight = new THREE.DirectionalLight(0x60a5fa, 0.8);
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);

    // 5. Procedural Cybernetic Floor Grid / Platform
    const gridGroup = new THREE.Group();
    gridGroup.position.y = -1.2;

    // Glowing base pedestal in warm bronze/amber matching theme
    const pedestalGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.15, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x3d3023,
      roughness: 0.35,
      metalness: 0.85,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    gridGroup.add(pedestal);

    // Concentric holographic rings
    const ringGeo1 = new THREE.TorusGeometry(3.2, 0.02, 16, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xd4af37, wireframe: true });
    const floorRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    floorRing1.rotation.x = Math.PI / 2;
    floorRing1.position.y = 0.09;
    gridGroup.add(floorRing1);

    const ringGeo2 = new THREE.TorusGeometry(2.2, 0.015, 16, 48);
    const floorRing2 = new THREE.Mesh(ringGeo2, ringMat1);
    floorRing2.rotation.x = Math.PI / 2;
    floorRing2.position.y = 0.09;
    gridGroup.add(floorRing2);

    scene.add(gridGroup);

    // 6. Central Quantum Tensor Accelerator (3D Subject)
    const tensorCoreGroup = new THREE.Group();
    tensorCoreGroup.position.set(0, -0.15, -0.6);

    // Silicon Processor Core Die
    const dieGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const dieMat = new THREE.MeshStandardMaterial({
      color: 0x1f1a14,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0x3d2810,
      emissiveIntensity: 0.4,
    });
    const dieMesh = new THREE.Mesh(dieGeo, dieMat);
    tensorCoreGroup.add(dieMesh);

    // Floating Gimbal Rings
    const gimbalGeo1 = new THREE.TorusGeometry(1.2, 0.025, 16, 64);
    const gimbalMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.15,
    });
    const gimbal1 = new THREE.Mesh(gimbalGeo1, gimbalMat);
    gimbal1.rotation.x = Math.PI / 3;
    tensorCoreGroup.add(gimbal1);

    const gimbalGeo2 = new THREE.TorusGeometry(1.4, 0.02, 16, 64);
    const gimbal2 = new THREE.Mesh(gimbalGeo2, gimbalMat);
    gimbal2.rotation.y = Math.PI / 4;
    tensorCoreGroup.add(gimbal2);

    scene.add(tensorCoreGroup);

    // 7. Interactive 3D Holographic Project Slabs
    const slabsGroup = new THREE.Group();
    scene.add(slabsGroup);

    const raycastTargets: THREE.Mesh[] = [];
    const slabMeshes: { mesh: THREE.Mesh; id: string; targetY: number }[] = [];

    PROJECTS_DATA.forEach((proj) => {
      const slabGroup = new THREE.Group();
      slabGroup.position.set(...proj.position);
      slabGroup.rotation.y = proj.rotationY;

      // Slab Geometry: High-fidelity glass slab
      const slabGeo = new THREE.BoxGeometry(2.3, 1.45, 0.06);
      const texture = createHologramTexture(proj);

      const slabMaterials = [
        new THREE.MeshStandardMaterial({ color: 0x1a1612, metalness: 0.8, roughness: 0.2 }), // right
        new THREE.MeshStandardMaterial({ color: 0x1a1612, metalness: 0.8, roughness: 0.2 }), // left
        new THREE.MeshStandardMaterial({ color: 0x1a1612, metalness: 0.8, roughness: 0.2 }), // top
        new THREE.MeshStandardMaterial({ color: 0x1a1612, metalness: 0.8, roughness: 0.2 }), // bottom
        new THREE.MeshStandardMaterial({
          map: texture,
          metalness: 0.3,
          roughness: 0.15,
          emissive: proj.glowHex,
          emissiveIntensity: 0.15,
        }), // front
        new THREE.MeshStandardMaterial({ color: 0x14100c, metalness: 0.8, roughness: 0.3 }), // back
      ];

      const slabMesh = new THREE.Mesh(slabGeo, slabMaterials);
      slabMesh.userData = { projectId: proj.id };
      slabGroup.add(slabMesh);
      raycastTargets.push(slabMesh);
      slabMeshes.push({ mesh: slabMesh, id: proj.id, targetY: proj.position[1] });

      // Holographic pedestal beam below slab
      const beamGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.8, 12);
      const beamMat = new THREE.MeshBasicMaterial({
        color: proj.glowHex,
        transparent: true,
        opacity: 0.25,
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.y = -0.95;
      slabGroup.add(beam);

      slabsGroup.add(slabGroup);
    });

    // 8. Floating Tech Tokens (PyTorch, Transformers, LLMs, FastAPI)
    const tokenSymbols = ['PyTorch', 'Transformers', 'FastAPI', 'Llama 3.1'];
    const tokensGroup = new THREE.Group();
    tokenSymbols.forEach((sym, idx) => {
      const angle = (idx / tokenSymbols.length) * Math.PI * 2;
      const radius = 2.4;
      const tokenGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.05, 24);
      const tokenMat = new THREE.MeshStandardMaterial({
        color: 0x221c15,
        emissive: 0xd4af37,
        emissiveIntensity: 0.2,
        metalness: 0.85,
        roughness: 0.2,
      });
      const tokenMesh = new THREE.Mesh(tokenGeo, tokenMat);
      tokenMesh.position.set(Math.cos(angle) * radius, 1.6 + Math.sin(angle * 2) * 0.2, Math.sin(angle) * radius);
      tokensGroup.add(tokenMesh);
    });
    scene.add(tokensGroup);

    // 9. Raycasting and Click Inspection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(raycastTargets, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData?.projectId) {
          const found = PROJECTS_DATA.find((p) => p.id === hit.userData.projectId);
          if (found) {
            selectProject(found);
          }
        }
      }
    };

    container.addEventListener('pointerdown', handlePointerDown);

    // 10. Mouse Drag Orbit & Zoom
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMousePos.x;
      const dy = e.clientY - prevMousePos.y;

      slabsGroup.rotation.y += dx * 0.009;
      gridGroup.rotation.y += dx * 0.004;
      targetCamPos.current.y = THREE.MathUtils.clamp(targetCamPos.current.y - dy * 0.012, 0.2, 3.5);

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoom = e.deltaY * 0.005;
      targetCamPos.current.z = THREE.MathUtils.clamp(targetCamPos.current.z + zoom, 3.2, 9.5);
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('wheel', handleWheel, { passive: false });

    // 11. Window Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 12. Animation Loop with Exponential Damping and Speed Control
    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const spd = speedRef.current;

      // Dynamic Idle Rotation (Fast & responsive)
      if (autoRotateRef.current && !isDragging) {
        slabsGroup.rotation.y += delta * 0.28 * spd;
        tokensGroup.rotation.y += delta * 0.42 * spd;
        floorRing1.rotation.z += delta * 0.22 * spd;
        floorRing2.rotation.z -= delta * 0.18 * spd;
      }

      // Rotate Tensor Processor Gimbals and Core
      gimbal1.rotation.z += delta * 1.15 * spd;
      gimbal2.rotation.z -= delta * 0.95 * spd;
      dieMesh.rotation.y += delta * 0.7 * spd;

      // Dynamic Bobbing on Slabs
      const time = clock.getElapsedTime() * spd;
      slabMeshes.forEach((item, index) => {
        item.mesh.position.y = item.targetY + Math.sin(time * 2.4 + index * 1.2) * 0.045;
      });

      // Snappy Camera Lerp
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamPos.current.x, 5.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamPos.current.y, 5.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamPos.current.z, 5.5, delta);

      currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, targetLookAt.current.x, 5.5, delta);
      currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, targetLookAt.current.y, 5.5, delta);
      currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, targetLookAt.current.z, 5.5, delta);
      camera.lookAt(currentLookAt.current);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('wheel', handleWheel);

      pedestalGeo.dispose();
      pedestalMat.dispose();
      dieGeo.dispose();
      dieMat.dispose();
      gimbalGeo1.dispose();
      gimbalGeo2.dispose();
      gimbalMat.dispose();

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const selectProject = (proj: ProjectHologram) => {
    setSelectedProject(proj);
    // Smooth camera focus towards selected 3D slab
    const [px, py, pz] = proj.position;
    targetCamPos.current.set(px * 0.7, py + 0.35, pz + 3.2);
    targetLookAt.current.set(px * 0.8, py + 0.1, pz);
  };

  const setPreset = (preset: 'carousel' | 'core' | 'free') => {
    setViewPreset(preset);
    if (preset === 'carousel') {
      targetCamPos.current.set(0, 1.2, 5.8);
      targetLookAt.current.set(0, 0.3, 0);
    } else if (preset === 'core') {
      targetCamPos.current.set(0, 0.4, 2.6);
      targetLookAt.current.set(0, -0.1, -0.6);
    } else if (preset === 'free') {
      targetCamPos.current.set(2.8, 2.2, 5.2);
      targetLookAt.current.set(0, 0, 0);
    }
  };

  const copy3DLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#3d-portfolio`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div
      className={`relative w-full rounded-3xl bg-white/30 backdrop-blur-2xl text-[#24211C] overflow-hidden border border-white/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen bg-[#1c1712]/95 text-[#F5F0E6]' : 'h-[580px] sm:h-[640px]'
      } ${className}`}
    >
      {/* 3D WebGL Canvas (Transparent background lets video & frosted glass shine through) */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0"
      />

      {/* Top Glass Control Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 bg-white/65 backdrop-blur-xl border-b border-white/50 text-[#24211C]">
        <div className="flex items-center gap-2">
          <Box className="w-4 h-4 text-amber-700" />
          <span className="font-bold text-xs sm:text-sm tracking-tight text-[#24211C]">
            3D Spatial Holographic Deck
          </span>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-white/80 text-[#6B5D4B] border border-black/10">
            Interactive PBR
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Preset Buttons */}
          <div className="hidden sm:flex items-center gap-1 bg-black/5 rounded-full p-0.5 border border-black/10">
            <button
              onClick={() => setPreset('carousel')}
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                viewPreset === 'carousel' ? 'bg-[#171717] text-[#FFFFFF] font-bold shadow-sm' : 'text-[#6B5D4B] hover:text-[#24211C]'
              }`}
            >
              Hologram Arc
            </button>
            <button
              onClick={() => setPreset('core')}
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                viewPreset === 'core' ? 'bg-[#171717] text-[#FFFFFF] font-bold shadow-sm' : 'text-[#6B5D4B] hover:text-[#24211C]'
              }`}
            >
              Tensor Core
            </button>
            <button
              onClick={() => setPreset('free')}
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                viewPreset === 'free' ? 'bg-[#171717] text-[#FFFFFF] font-bold shadow-sm' : 'text-[#6B5D4B] hover:text-[#24211C]'
              }`}
            >
              Orbit 360°
            </button>
          </div>

          {/* Copy Shareable 3D Link */}
          <button
            onClick={copy3DLink}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/80 hover:bg-white text-[#171717] border border-black/10 transition-all cursor-pointer shadow-sm"
            title="Copy shareable link to this 3D spatial deck"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-[#171717]" />}
            <span className="hidden sm:inline">{copiedLink ? 'Link Copied!' : 'Copy 3D Link'}</span>
          </button>

          {/* Reset Camera */}
          <button
            onClick={() => setPreset('carousel')}
            className="p-1.5 rounded-full bg-white/80 hover:bg-white text-[#171717] border border-black/10 transition-all cursor-pointer shadow-sm"
            title="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-full bg-white/80 hover:bg-white text-[#171717] border border-black/10 transition-all cursor-pointer shadow-sm"
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Floating 3D Node Detail Panel (Top-Left) */}
      {selectedProject && (
        <aside className="absolute top-14 left-3 sm:left-6 z-20 w-[88vw] sm:w-80 rounded-2xl bg-white/90 backdrop-blur-2xl border border-white/80 p-4 shadow-2xl text-[#24211C] animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#171717] text-[#FFFFFF] font-bold shadow-sm">
              Interactive 3D Slab
            </span>
            <span className="text-[10px] font-mono text-[#6B5D4B] font-bold">{selectedProject.subtitle}</span>
          </div>

          <h2 className="text-base font-bold text-[#24211C] leading-tight mb-1">
            {selectedProject.title}
          </h2>

          <p className="text-xs text-[#24211C]/90 leading-relaxed mb-2.5 font-medium">
            {selectedProject.description}
          </p>

          <div className="mb-2.5 px-2.5 py-1.5 rounded-lg bg-[#171717] text-[#FFFFFF] text-[11px] font-mono font-bold shadow-sm">
            {selectedProject.metrics}
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {selectedProject.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/5 text-[#24211C] border border-black/10 font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-black/10">
            <a
              href={selectedProject.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-1.5 px-3 rounded-full text-xs font-bold text-center bg-[#171717] text-[#FFFFFF] hover:bg-black flex items-center justify-center gap-1 transition-all shadow-sm"
            >
              <span>Launch Live</span>
              <ExternalLink className="w-3 h-3 text-[#FFFFFF]" />
            </a>
            <a
              href={selectedProject.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="py-1.5 px-3 rounded-full text-xs font-semibold bg-white/80 hover:bg-white text-[#24211C] border border-black/15 flex items-center gap-1 transition-all shadow-sm"
            >
              <Github className="w-3 h-3 text-[#24211C]" />
              <span>Repo</span>
            </a>
          </div>
        </aside>
      )}

      {/* Ergonomic Bottom Selector Dock */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[95vw] max-w-xl flex flex-col items-center">
        {/* Toggle Collapse */}
        <button
          onClick={() => setControlsCollapsed(!controlsCollapsed)}
          className="mb-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/80 backdrop-blur-md border border-white/60 text-[#24211C] hover:bg-white transition-all flex items-center gap-1 cursor-pointer shadow-sm"
        >
          <span>{controlsCollapsed ? 'Show 3D Slabs' : 'Hide Controls'}</span>
          {controlsCollapsed ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        <div
          className={`w-full rounded-2xl bg-white/85 backdrop-blur-xl border border-white/70 p-2 sm:p-2.5 shadow-xl transition-all duration-300 ${
            controlsCollapsed ? 'opacity-0 translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            {/* Quick Project Selectors */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-0.5 scrollbar-none">
              {PROJECTS_DATA.map((proj) => {
                const isSelected = selectedProject?.id === proj.id;
                return (
                  <button
                    key={proj.id}
                    onClick={() => selectProject(proj)}
                    className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#171717] text-[#FFFFFF] font-bold shadow-md scale-105'
                        : 'bg-white/80 hover:bg-white text-[#24211C] border border-black/10'
                    }`}
                  >
                    {proj.title}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Speed Multiplier Toggle */}
              <button
                onClick={() => {
                  setRotationSpeed((prev) => (prev === 1.0 ? 1.6 : prev === 1.6 ? 2.5 : 1.0));
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/80 hover:bg-white text-[#24211C] border border-black/10 transition-all cursor-pointer shadow-sm"
                title="Adjust 3D rotation and animation speed (1x / 1.6x / 2.5x)"
              >
                <Zap className="w-3 h-3 text-amber-600" />
                <span>{rotationSpeed === 1.0 ? '1x' : rotationSpeed === 1.6 ? '1.6x Fast' : '2.5x Turbo'}</span>
              </button>

              {/* Orbit Rotation Toggle */}
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer shadow-sm ${
                  autoRotate
                    ? 'bg-[#171717] text-[#FFFFFF] border-black font-bold'
                    : 'bg-white/80 text-[#6B5D4B] border-black/10 hover:text-black'
                }`}
              >
                Auto-Rotate: {autoRotate ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating 3D Interaction Tip */}
      <div className="absolute top-14 right-4 z-10 pointer-events-none hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/60 text-[10px] text-[#6B5D4B] font-mono shadow-sm">
        <Compass className="w-3 h-3 text-amber-700" />
        <span>Click 3D Slab to Focus · Drag to Orbit · Scroll to Zoom</span>
      </div>
    </div>
  );
}

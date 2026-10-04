import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import {
  ArrowUpRight,
  BrainCircuit,
  Database,
  Languages,
  Mail,
  Network,
  Orbit,
  Sigma,
  Sparkles,
} from 'lucide-react';
import './index.css';

type Lang = 'en' | 'zh';
type Copy = {
  nav: { about: string; expertise: string; projects: string; contact: string };
  hero: { title: string; subtitle: string; role: string; contact: string };
  about: { heading: string; body: string; badge: string };
  expertise: { heading: string; items: { name: string; description: string }[] };
  projects: {
    heading: string;
    live: string;
    items: { category: string; name: string; description: string; metrics: string[] }[];
  };
  footer: { title: string; note: string };
};

const copy: Record<Lang, Copy> = {
  en: {
    nav: { about: 'About', expertise: 'Expertise', projects: 'Projects', contact: 'Contact' },
    hero: {
      title: "Hi, I'm Leo",
      subtitle: 'DATA & AI',
      role: 'A data scientist turning complex scientific systems into measurable models, scalable pipelines and intelligent decisions.',
      contact: 'Contact Me',
    },
    about: {
      heading: 'About me',
      badge: 'Zhejiang University · Direct PhD · Materials Science',
      body:
        'I combine mathematical modeling, machine learning and experimental science. My work spans nonlinear surrogate modeling, genetic-algorithm optimization, multimodal image and time-series pipelines, computer vision and scientific simulation. I enjoy finding the governing structure inside noisy data and turning it into decisions that can be tested, reproduced and improved.',
    },
    expertise: {
      heading: 'Expertise',
      items: [
        {
          name: 'Statistical Modeling',
          description: 'Hypothesis testing, ANOVA, experimental design, causal-inference fundamentals and quantitative attribution for scientific and business questions.',
        },
        {
          name: 'Machine Learning',
          description: 'Feature engineering and classical ML across regression, classification and clustering, including LASSO, Random Forest, LightGBM, SVR and neural networks.',
        },
        {
          name: 'Optimization',
          description: 'Neural surrogate models combined with genetic algorithms and heuristic search for high-dimensional parameter optimization and decision support.',
        },
        {
          name: 'Data Engineering',
          description: 'Python/SQL pipelines for large-scale multimodal data: image streams, sensor signals, automated cleaning, feature extraction and batch processing.',
        },
        {
          name: 'Scientific Computing',
          description: 'Computer vision, molecular dynamics, finite-element simulation and physics-informed reasoning for cross-scale scientific analysis.',
        },
      ],
    },
    projects: {
      heading: 'Project',
      live: 'View Detail',
      items: [
        {
          category: 'ML + Optimization',
          name: 'Functional-material performance prediction & multi-parameter optimization',
          description: 'Built a nonlinear modeling workflow covering feature analysis, regression model benchmarking, neural surrogate modeling and GA-based search, then closed the loop with targeted experiments.',
          metrics: ['15.3 GHz optimum', '9.0 W input', '15.2 mV stable output'],
        },
        {
          category: 'Multimodal Data',
          name: 'China Space Station multimodal data automation pipeline',
          description: 'Built a pipeline aligning high-frequency temperature signals and large-scale image streams by timestamp, extracting image features and converting unstructured experimental data into structured high-dimensional datasets.',
          metrics: ['Million-scale images', 'Time-series + vision', 'Ground-space experiment workflow'],
        },
        {
          category: 'Computer Vision',
          name: 'Microstructure-to-loss modeling for soft magnetic materials',
          description: 'Used image segmentation, structural descriptors, regression and feature-importance analysis to quantify microstructure effects on electromagnetic loss and guide high-frequency low-loss material iteration.',
          metrics: ['SEM/TEM/EBSD inputs', 'CV + statistics', 'Physics + data fusion'],
        },
      ],
    },
    footer: {
      title: 'Build with data. Validate with evidence.',
      note: 'Portfolio adapted from the supplied visual brief. Replace template project imagery with original research visuals before public launch.',
    },
  },
  zh: {
    nav: { about: '关于', expertise: '能力', projects: '项目', contact: '联系' },
    hero: {
      title: '你好，我是刘幻',
      subtitle: '数据与AI',
      role: '数学建模\n多目标优化\n多模态数据分析 Pipeline\n机器学习与人工智能',
      contact: '联系我',
    },
    about: {
      heading: '关于我',
      badge: '浙江大学 · 直博 · 材料科学与工程',
      body:
        '我将数学建模、机器学习与实验科学结合，项目覆盖强非线性代理模型、遗传算法参数寻优、大规模多模态图像与时序数据处理、计算机视觉和科学计算。我擅长从噪声与异常数据中识别底层结构，并把洞察转化为可实验验证、可复现、可持续迭代的模型与流程。',
    },
    expertise: {
      heading: '核心能力',
      items: [
        {
          name: '数理统计与实验设计',
          description: '概率统计、假设检验、方差分析、DOE/控制变量分析与因果推断基础，强调指标归因与置信区间。',
        },
        {
          name: '机器学习与特征工程',
          description: '高维特征筛选、连续变量分箱、相关性与共线性分析，以及 LASSO、随机森林、LightGBM、SVR、神经网络等模型。',
        },
        {
          name: '多目标优化',
          description: '将神经网络代理模型与遗传算法、启发式搜索结合，用于高维复杂空间的参数寻优与智能决策。',
        },
        {
          name: '多模态数据处理',
          description: '使用 Python / SQL 构建端到端数据清洗、特征提取与批处理 Pipeline，覆盖图像、传感器和高频时序数据。',
        },
        {
          name: '数理计算',
          description: '计算机视觉、分子动力学、有限元仿真与物理机理分析，实现跨尺度数据与理论的交叉验证。',
        },
      ],
    },
    projects: {
      heading: '项目',
      live: '查看详情',
      items: [
        {
          category: '机器学习 + 优化',
          name: '功能材料性能预测与多参数优化',
          description: '完成特征相关性分析、回归模型对比、神经网络代理建模与遗传算法寻优，并通过靶向实验形成“数据挖掘—代理模型—决策寻优—实验验证”的闭环。',
          metrics: ['15.3 GHz 最优频段', '9.0 W 输入', '15.2 mV 稳定输出'],
        },
        {
          category: '多模态数据',
          name: '中国空间站大规模多模态数据自动化处理 Pipeline',
          description: '将高频温度时序与大规模图像流按时间戳严格对应，自动提取图像特征，把非结构化实验数据转化为结构化高维特征数据库。',
          metrics: ['百万级图像', '时序 + 图像', '地面—空间实验流程'],
        },
        {
          category: '计算机视觉',
          name: '软磁材料多维指标调控模型',
          description: '利用图像分割、结构描述符、多元回归、特征重要性和损耗分离算法，量化微观结构对多频段电磁损耗的边际影响。',
          metrics: ['SEM/TEM/EBSD', '视觉 + 统计学习', '物理 + 数据融合'],
        },
      ],
    },
    footer: {
      title: '用数据建模，用证据验证。',
      note: '页面依据你提供的视觉规范改造。正式公开前，建议将模板项目图片替换为你自己的科研图片或可公开成果。',
    },
  },
};

const marqueeImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

const projectImages = [
  [
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  ],
  [
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  ],
  [
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  ],
];

const ease = [0.25, 0.1, 0.25, 1] as const;

function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function Magnet({
  children,
  padding = 150,
  strength = 3,
}: {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [xy, setXY] = useState({ x: 0, y: 0 });

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = event.clientX - cx;
    const dy = event.clientY - cy;
    const within =
      event.clientX >= rect.left - padding &&
      event.clientX <= rect.right + padding &&
      event.clientY >= rect.top - padding &&
      event.clientY <= rect.bottom + padding;
    setActive(within);
    if (within) setXY({ x: dx / strength, y: dy / strength });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        setActive(false);
        setXY({ x: 0, y: 0 });
      }}
      style={{
        transform: `translate3d(${active ? xy.x : 0}px, ${active ? xy.y : 0}px, 0)`,
        transition: active ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

function ContactButton({ label }: { label: string }) {
  return (
    <a
      href="mailto:fancy_leo19@163.com"
      className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white outline outline-2 outline-offset-[-3px] outline-white transition-transform duration-200 hover:scale-[1.03] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0 4px 4px rgba(181,1,167,.25), 4px 4px 12px #7721B1 inset',
      }}
    >
      <Mail size={18} />
      {label}
    </a>
  );
}

function LanguageButton({ lang, setLang }: { lang: Lang; setLang: (v: Lang) => void }) {
  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
      className="inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/30 px-3 py-2 text-xs font-medium uppercase tracking-wider text-[#D7E2EA] transition hover:bg-[#D7E2EA]/10 sm:px-4 sm:text-sm"
      aria-label="Switch language"
    >
      <Languages size={17} />
      {lang === 'en' ? '中文' : 'EN'}
    </button>
  );
}

function HeroSection({ lang, setLang, t }: { lang: Lang; setLang: (v: Lang) => void; t: Copy }) {
  return (
    <section className="relative flex min-h-screen flex-col overflow-x-clip bg-[#070B14] px-6 md:px-10">
      {/* 深色宇宙渐变 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 18% 22%, rgba(56, 189, 248, 0.16), transparent 30%),
            radial-gradient(circle at 78% 30%, rgba(99, 102, 241, 0.18), transparent 32%),
            radial-gradient(circle at 52% 78%, rgba(168, 85, 247, 0.12), transparent 30%),
            linear-gradient(180deg, #070B14 0%, #090D18 48%, #0C0C0C 100%)
          `,
        }}
      />

      {/* 数据网格 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.20]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.35) 70%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.35) 70%, transparent)',
        }}
      />

      {/* 中央发光光晕 */}
      <div className="pointer-events-none absolute left-1/2 top-[42%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[110px]" />

      {/* 左侧蓝色光晕 */}
      <div className="pointer-events-none absolute -left-32 top-24 h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-[100px]" />

      {/* 右侧紫色光晕 */}
      <div className="pointer-events-none absolute -right-28 top-32 h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-[120px]" />

      {/* 导航栏 */}
      <FadeIn y={-20}>
        <nav className="relative z-20 flex items-center justify-between pt-6 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] md:pt-8 md:text-lg lg:text-[1.4rem]">
          <div className="flex flex-1 items-center justify-between gap-3 pr-4 md:gap-7 md:pr-8">
            <a className="transition-opacity duration-200 hover:opacity-70" href="#about">{t.nav.about}</a>
            <a className="transition-opacity duration-200 hover:opacity-70" href="#expertise">{t.nav.expertise}</a>
            <a className="transition-opacity duration-200 hover:opacity-70" href="#projects">{t.nav.projects}</a>
            <a className="transition-opacity duration-200 hover:opacity-70" href="#contact">{t.nav.contact}</a>
          </div>
          <LanguageButton lang={lang} setLang={setLang} />
        </nav>
      </FadeIn>

      {/* Hero 大标题 */}
      <div className="relative z-20 overflow-hidden">
        <FadeIn delay={0.15} y={40}>
          <h1
            className="
              hero-heading
              mt-5
              w-full
              whitespace-nowrap
              text-center
              text-[10vw]
              font-black
              uppercase
              leading-none
              tracking-tight
              sm:text-[12vw]
              md:mt-2
              md:text-[11vw]
              lg:text-[10.5vw]
            "
          >
            {lang === 'en' ? "HI, I'M LEO" : '你好，我是刘幻'}
          </h1>
        </FadeIn>
      </div>

      {/* 标题下方：左侧介绍 + 右侧人物 */}
      <div
        className="
          relative
          z-20
          mt-6
          grid
          flex-1
          grid-cols-1
          items-center
          gap-10
          pb-8
          md:mt-4
          md:grid-cols-[0.9fr_1.1fr]
          md:gap-14
          md:pb-10
          lg:grid-cols-[0.85fr_1.15fr]
          lg:gap-20
        "
      >
        {/* 左侧：AI & DATA SCIENCE + 简介 */}
        <FadeIn delay={0.35} y={20}>
          <div
            className="
              flex
              max-w-[520px]
              flex-col
              justify-center
              text-[#D7E2EA]
            "
          >
            <p
              className="
                mb-5
                text-xs
                font-semibold
                uppercase
                tracking-[0.30em]
                text-cyan-200/60
                sm:text-sm
                md:text-base
              "
            >
              {t.hero.subtitle}
            </p>

            <p
              className="
                text-[clamp(1rem,1.65vw,1.55rem)]
                font-light
                uppercase
                leading-[1.5]
                tracking-wide
                text-[#D7E2EA]
              "
            >
              {t.hero.role}
            </p>
          </div>
        </FadeIn>

        {/* 右侧：个人照片 */}
<FadeIn delay={0.55} y={30}>
  <div className="flex justify-center md:justify-end">
    <Magnet>
      <div
        className="
          relative
          w-[220px]
          sm:w-[260px]
          md:w-[300px]
          lg:w-[330px]
          xl:w-[360px]
        "
      >
        {/* 背后柔和光晕，让人物更融入背景 */}
        <div className="pointer-events-none absolute inset-[-8%] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-[-12%] rounded-full bg-violet-500/10 blur-3xl" />

        <img
          src={`${import.meta.env.BASE_URL}profile.png`}
          alt="Fancy Leo portrait"
          className="
            relative
            z-10
            block
            h-auto
            w-full
            object-cover
            object-top
            opacity-95
          "
          style={{
            WebkitMaskImage:
              'radial-gradient(circle at 50% 38%, rgba(0,0,0,1) 46%, rgba(0,0,0,0.96) 58%, rgba(0,0,0,0.72) 74%, rgba(0,0,0,0.28) 86%, transparent 96%)',
            maskImage:
              'radial-gradient(circle at 50% 38%, rgba(0,0,0,1) 46%, rgba(0,0,0,0.96) 58%, rgba(0,0,0,0.72) 74%, rgba(0,0,0,0.28) 86%, transparent 96%)',
            filter: 'drop-shadow(0 18px 36px rgba(0,0,0,0.28))',
          }}
        />
      </div>
    </Magnet>
  </div>
</FadeIn>
      </div>
    </section>
  );
}

function MarqueeRow({ images, direction, offset }: { images: string[]; direction: 'left' | 'right'; offset: number }) {
  const tripled = useMemo(() => [...images, ...images, ...images], [images]);
  const x = direction === 'right' ? offset - 200 : -(offset - 200);
  return (
    <div className="w-max" style={{ transform: `translate3d(${x}px,0,0)`, willChange: 'transform' }}>
      <div className="flex gap-3">
        {tripled.map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt="Animated visual reference"
            loading="lazy"
            className="h-[180px] w-[280px] rounded-2xl object-cover opacity-80 sm:h-[220px] sm:w-[340px] md:h-[270px] md:w-[420px]"
          />
        ))}
      </div>
    </div>
  );
}

function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const sectionTop = ref.current.offsetTop;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <section ref={ref} className="overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40" aria-label="Motion visual strip">
      <div className="flex flex-col gap-3">
        <MarqueeRow images={marqueeImages.slice(0, 11)} direction="right" offset={offset} />
        <MarqueeRow images={marqueeImages.slice(11)} direction="left" offset={offset} />
      </div>
    </section>
  );
}

function AnimatedChar({ char, progress, start, end }: { char: string; progress: MotionValue<number>; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span className="invisible">{char === ' ' ? '\u00A0' : char}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
}

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  const chars = Array.from(text);
  return (
    <p ref={ref} className="max-w-[660px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]">
      {chars.map((char, i) => {
        const start = i / Math.max(1, chars.length);
        const end = Math.min(1, start + 0.12);
        return <AnimatedChar key={`${char}-${i}`} char={char} progress={scrollYProgress} start={start} end={end} />;
      })}
    </p>
  );
}

function AboutSection({ t }: { t: Copy }) {
  return (
    <section id="about" className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-20 sm:px-8 md:px-10">
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="" className="w-full" />
      </FadeIn>
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="" className="w-full" />
      </FadeIn>
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="" className="w-full" />
      </FadeIn>
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="" className="w-full" />
      </FadeIn>

      <div className="relative z-10 flex max-w-4xl flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn y={40}>
          <h2 className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">{t.about.heading}</h2>
        </FadeIn>
        <div className="flex flex-col items-center gap-5">
          <div className="rounded-full border border-[#D7E2EA]/15 bg-[#D7E2EA]/[.04] px-4 py-2 text-center text-xs uppercase tracking-[.18em] text-[#D7E2EA]/70 sm:text-sm">
            {t.about.badge}
          </div>
          <AnimatedText text={t.about.body} />
        </div>
        <div className="mt-0 sm:mt-2 md:mt-4">
          <ContactButton label={t.hero.contact} />
        </div>
      </div>
    </section>
  );
}

const expertiseIcons = [Sigma, BrainCircuit, Orbit, Database, Network];

function ServicesSection({ t }: { t: Copy }) {
  return (
    <section id="expertise" className="rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <FadeIn>
        <h2 className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none sm:mb-20 md:mb-28">{t.expertise.heading}</h2>
      </FadeIn>
      <div className="mx-auto max-w-5xl border-t border-black/15">
        {t.expertise.items.map((item, i) => {
          const Icon = expertiseIcons[i];
          return (
            <FadeIn key={item.name} delay={i * 0.1}>
              <div className="grid grid-cols-[90px_1fr] gap-5 border-b border-black/15 py-8 sm:grid-cols-[150px_1fr] sm:gap-8 sm:py-10 md:grid-cols-[220px_1fr] md:gap-10 md:py-12">
                <div className="flex items-start gap-2">
                  <span className="text-[clamp(3rem,10vw,140px)] font-black leading-[.8]">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <Icon className="shrink-0" size={26} strokeWidth={1.7} />
                    <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase">{item.name}</h3>
                  </div>
                  <p className="max-w-2xl text-[clamp(.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60">{item.description}</p>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

function ProjectCard({
  index,
  total,
  item,
  images,
  live,
}: {
  index: number;
  total: number;
  item: Copy['projects']['items'][number];
  images: string[];
  live: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={ref} className="relative h-[85vh] min-h-[680px]">
      <motion.article
        style={{ scale, top: `${index * 28}px` }}
        className="sticky top-24 overflow-hidden rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:top-28 sm:rounded-[50px] sm:p-6 md:top-32 md:rounded-[60px] md:p-8"
      >
        <div className="mb-5 grid gap-4 border-b border-[#D7E2EA]/15 pb-5 md:grid-cols-[120px_1fr_auto] md:items-end md:gap-8 md:pb-7">
          <span className="hero-heading text-[clamp(4rem,8vw,120px)] font-black leading-none">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <div className="mb-2 text-xs font-medium uppercase tracking-[.22em] text-[#D7E2EA]/45 sm:text-sm">{item.category}</div>
            <h3 className="max-w-3xl text-2xl font-semibold uppercase leading-tight text-[#D7E2EA] sm:text-3xl md:text-[clamp(2rem,4vw,3.8rem)]">{item.name}</h3>
          </div>
          <a href="#contact" className="inline-flex h-fit items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA] px-6 py-3 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition hover:bg-[#D7E2EA]/10 sm:px-8 sm:text-sm">
            {live}<ArrowUpRight size={16} />
          </a>
        </div>

        <div className="mb-5 grid gap-3 md:grid-cols-[40%_60%]">
          <div className="grid gap-3">
            <img src={images[0]} alt="Template visual" loading="lazy" className="h-[clamp(130px,16vw,230px)] w-full rounded-[30px] object-cover sm:rounded-[40px] md:rounded-[50px]" />
            <img src={images[1]} alt="Template visual" loading="lazy" className="h-[clamp(160px,22vw,340px)] w-full rounded-[30px] object-cover sm:rounded-[40px] md:rounded-[50px]" />
          </div>
          <div className="relative overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[50px]">
            <img src={images[2]} alt="Template visual" loading="lazy" className="h-full min-h-[320px] w-full object-cover md:min-h-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 grid gap-2 sm:grid-cols-3">
              {item.metrics.map((metric) => (
                <div key={metric} className="rounded-full border border-white/20 bg-black/40 px-3 py-2 text-center text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-md sm:text-xs">
                  {metric}
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="max-w-4xl text-sm font-light leading-relaxed text-[#D7E2EA]/70 sm:text-base md:text-lg">{item.description}</p>
      </motion.article>
    </div>
  );
}

function ProjectsSection({ t }: { t: Copy }) {
  return (
    <section id="projects" className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-20 pt-24 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-28 md:pt-32">
      <FadeIn>
        <h2 className="hero-heading mb-14 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20">{t.projects.heading}</h2>
      </FadeIn>
      <div className="mx-auto max-w-7xl">
        {t.projects.items.map((item, index) => (
          <ProjectCard key={item.name} index={index} total={t.projects.items.length} item={item} images={projectImages[index]} live={t.projects.live} />
        ))}
      </div>
    </section>
  );
}

function Footer({ t }: { t: Copy }) {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-[#D7E2EA]/10 bg-[#0C0C0C] px-5 py-24 sm:px-8 md:px-10 md:py-32">
      <div className="absolute inset-0 grid-glow opacity-50" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
        <Sparkles className="mb-6" size={34} />
        <h2 className="hero-heading max-w-5xl text-[clamp(3rem,9vw,120px)] font-black uppercase leading-[.9] tracking-tight">{t.footer.title}</h2>
        <div className="mt-10"><ContactButton label={t.hero.contact} /></div>
        <p className="mt-10 max-w-2xl text-xs font-light leading-relaxed text-[#D7E2EA]/45 sm:text-sm">{t.footer.note}</p>
        <p className="mt-8 text-xs uppercase tracking-[.2em] text-[#D7E2EA]/35">© 2026 Fancy Leo</p>
      </div>
    </footer>
  );
}

function App() {
  const [lang, setLang] = useState<Lang>('en');
  const t = copy[lang];
  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = lang === 'zh' ? '刘幻｜AI 与数据科学' : 'Fancy Leo — AI & Data Science';
  }, [lang]);

  return (
    <main className="overflow-x-clip bg-[#0C0C0C]">
      <HeroSection lang={lang} setLang={setLang} t={t} />
      <MarqueeSection />
      <AboutSection t={t} />
      <ServicesSection t={t} />
      <ProjectsSection t={t} />
      <Footer t={t} />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

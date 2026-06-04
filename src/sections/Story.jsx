import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { config } from '../data/config';
import { storyMoments } from '../data/story';
import SectionHeader from '../components/SectionHeader';
import { EASE } from '../animations/variants';

function StoryItem({ moment, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax multicapa: la foto y el texto se mueven a distinto ritmo
  const photoY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const photoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);

  const flip = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-8 md:gap-16 ${
        flip ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      {/* Foto flotante */}
      <motion.div
        className="relative w-full md:w-1/2"
        style={{ y: photoY }}
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl glass">
          <motion.img
            src={moment.photo}
            alt={moment.title}
            loading="lazy"
            style={{ scale: photoScale }}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent" />
          <div className="absolute left-5 top-5 rounded-full glass px-4 py-1.5">
            <span className="font-sans text-xs tracking-widest text-rose-soft">{moment.date}</span>
          </div>
        </div>
        {/* Halo flotante detras */}
        <div className="absolute -inset-4 -z-10 rounded-full bg-rose-glow/20 blur-3xl" />
      </motion.div>

      {/* Texto */}
      <motion.div
        className="w-full md:w-1/2"
        style={{ y: textY }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: EASE, delay: 0.15 }}
      >
        <span className="font-script text-3xl text-gold">0{index + 1}</span>
        <h3 className="mt-2 font-display text-3xl text-white md:text-4xl">{moment.title}</h3>
        <p className="mt-4 max-w-md font-sans text-base font-light leading-relaxed text-white/65">
          {moment.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function Story() {
  const { eyebrow, title, subtitle } = config.sections.story;

  return (
    <section id="story" className="relative w-full px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} className="mb-20 md:mb-32" />

        <div className="relative flex flex-col gap-28 md:gap-48">
          {/* Linea central decorativa (solo desktop) */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/15 to-transparent md:block" />
          {storyMoments.map((m, i) => (
            <StoryItem key={m.id} moment={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type RevealConfig = {
  trigger: Element | null;
  target: gsap.TweenTarget;
  start: string;
  from: gsap.TweenVars;
  to: gsap.TweenVars;
};

export const createRevealTrigger = ({
  trigger,
  target,
  start,
  from,
  to,
}: RevealConfig) => {
  if (!trigger) {
    return null;
  }

  return ScrollTrigger.create({
    trigger,
    start,
    onEnter: () => {
      gsap.fromTo(target, from, to);
    },
    once: true,
  });
};

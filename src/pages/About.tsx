import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedPage, StaggerContainer, StaggerItem } from '../components/AnimatedPage';

export const About: React.FC = () => {
  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto">
          {/* 
            PLACEHOLDER: Replace the content below with your actual About content.
            Preserve the structure and animation components.
          */}
          
          <StaggerContainer delay={0.15}>
            {/* Main Heading */}
            <StaggerItem>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-4xl sm:text-5xl lg:text-6xl font-heading font-light text-neutral mb-8 sm:mb-12 leading-tight"
              >
                About Shishu Shakti
              </motion.h1>
            </StaggerItem>

            {/* Opening Story */}
            <StaggerItem>
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="mb-12 sm:mb-16"
              >
                <p className="text-lg sm:text-xl text-neutral opacity-80 leading-relaxed font-body mb-6">
                  Shishu Shakti did not begin in a boardroom or during a perfectly planned moment. It began in the late midnights of motherhood — when the house was silent, the baby finally asleep, and a mother was left alone with her thoughts. Those hours where exhaustion feels heavier than the body, where questions echo louder than answers, and where emotions surface without filters.
                </p>
                <p className="text-lg sm:text-xl text-neutral opacity-80 leading-relaxed font-body">
                  It began in moments of holding a baby with one hand and holding oneself together with the other. Shishu Shakti was born from lived motherhood — from becoming a mother and realising that while a child is nurtured loudly, a mother often grows quietly.
                </p>
              </motion.section>
            </StaggerItem>

            {/* The Heart Behind Shishu Shakti */}
            <StaggerItem>
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="mb-12 sm:mb-16"
              >
                <h2 className="text-2xl sm:text-3xl font-heading font-light text-neutral mb-6">
                  The Heart Behind Shishu Shakti
                </h2>
                <p className="text-lg sm:text-xl text-neutral opacity-80 leading-relaxed font-body mb-6">
                  Motherhood changes everything — identity, pace, priorities, emotions. Yet, much of what a mother goes through is invisible. The strength, the confusion, the love, the fear, the self-doubt, the pride — all coexist, often unspoken.
                </p>
                <p className="text-lg sm:text-xl text-neutral opacity-80 leading-relaxed font-body">
                  Shishu Shakti exists to say what many mothers feel but rarely hear out loud: You are not alone. What you are feeling is real. And you matter. This space was created not to teach motherhood, but to hold space for it.
                </p>
              </motion.section>
            </StaggerItem>

            {/* What Shishu Shakti Truly Is */}
            <StaggerItem>
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="mb-12 sm:mb-16"
              >
                <h2 className="text-2xl sm:text-3xl font-heading font-light text-neutral mb-6">
                  What Shishu Shakti Truly Is
                </h2>
                <p className="text-lg sm:text-xl text-neutral opacity-80 leading-relaxed font-body mb-6">
                  Shishu Shakti is a gentle emotional ecosystem for mothers — especially those navigating early motherhood, multiple roles, and quiet overwhelm. It is:
                </p>
                <ul className="text-lg sm:text-xl text-neutral opacity-80 leading-relaxed font-body space-y-4 mb-6 list-none pl-0">
                  <li className="flex items-center">
                    <span className="mr-3">•</span>
                    <span>A place where emotional truth is honoured, not brushed aside.</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">•</span>
                    <span>A reminder that perfection is not the goal — presence is.</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">•</span>
                    <span>A space that centres the mother, not just the role she plays.</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">•</span>
                    <span>A pause in a fast-moving world that constantly asks mothers to do more.</span>
                  </li>
                </ul>
                <p className="text-lg sm:text-xl text-neutral opacity-80 leading-relaxed font-body">
                  Here, motherhood is not measured by productivity or comparison. It is respected as a deeply human journey.
                </p>
              </motion.section>
            </StaggerItem>

            {/* Why This Space Was Needed */}
            <StaggerItem>
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="mb-12 sm:mb-16"
              >
                <h2 className="text-2xl sm:text-3xl font-heading font-light text-neutral mb-6">
                  Why This Space Was Needed
                </h2>
                <p className="text-lg sm:text-xl text-neutral opacity-80 leading-relaxed font-body mb-6">
                  Because motherhood doesn't come with enough emotional holding. Because mothers are expected to adapt overnight and stay strong silently. Because love can be overwhelming and lonely at the same time. Because some nights, all a mother needs is reassurance — not advice.
                </p>
                <p className="text-lg sm:text-xl text-neutral opacity-80 leading-relaxed font-body">
                  Shishu Shakti was created to meet mothers where they are, not where they are expected to be.
                </p>
              </motion.section>
            </StaggerItem>

            {/* The Vision Moving Forward */}
            <StaggerItem>
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="mb-12 sm:mb-16"
              >
                <h2 className="text-2xl sm:text-3xl font-heading font-light text-neutral mb-6">
                  The Vision Moving Forward
                </h2>
                <p className="text-lg sm:text-xl text-neutral opacity-80 leading-relaxed font-body mb-6">
                  The vision of Shishu Shakti is simple and deeply intentional: To create a world where mothers are emotionally supported, seen, and softened — without guilt. When a mother feels grounded, heard, and validated, she raises not just a child, but a healthier emotional environment around her.
                </p>
                <p className="text-lg sm:text-xl text-neutral opacity-80 leading-relaxed font-body mb-6">
                  Shishu Shakti stands for softer conversations, stronger inner worlds, and motherhood that is allowed to be real.
                </p>
                <div className="my-12 sm:my-16 p-8 sm:p-12 bg-base-200/30 rounded-2xl border-l-4 border-primary/50">
                  <p className="text-lg sm:text-xl lg:text-2xl text-neutral leading-relaxed font-body italic">
                    This is not just a platform. It is a quiet promise made in the middle of the night — that no mother should feel unseen in her journey.
                  </p>
                </div>
              </motion.section>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </AnimatedPage>
  );
};


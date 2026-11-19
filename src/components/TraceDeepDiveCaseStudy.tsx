import React from 'react'

export const TraceDeepDiveCaseStudy: React.FC = () => {
  return (
    <div className="space-y-10 pt-2 text-[#0E2233] dark:text-[#EAF1F8] max-w-3xl">
      {/* ROLE & TEAM META */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl border-2.5 border-[#0E2233] dark:border-[#2D6A4F] bg-white dark:bg-[#122436] shadow-[4px_4px_0_#0E2233] dark:shadow-[4px_4px_0_#143829]">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-[#1B4332] dark:text-[#52B788] block mb-0.5">
            ROLE
          </span>
          <p className="text-sm font-bold text-[#0E2233] dark:text-white">
            Junior Product Manager
          </p>
        </div>
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-[#1B4332] dark:text-[#52B788] block mb-0.5">
            TEAM
          </span>
          <p className="text-sm font-bold text-[#0E2233] dark:text-white">
            Product, Design, Engineering &amp; Operations
          </p>
        </div>
      </div>

      {/* CONTINUOUS STORYTELLING TIMELINE (01 to 05) */}
      <div className="relative pl-6 sm:pl-8 border-l-2.5 border-[#1B4332]/25 dark:border-[#52B788]/30 space-y-12">
        {/* ACT 1 · THE CONTEXT */}
        <div className="relative space-y-3">
          {/* Milestone Node */}
          <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-5 h-5 rounded-full bg-[#1B4332] dark:bg-[#52B788] border-4 border-white dark:border-[#091522]" />

          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#1B4332] dark:text-[#52B788]">
              Act 1 · The Context
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0E2233] dark:text-white">
              01. Making Sense of a Complex Industry
            </h2>
          </div>

          <div className="text-sm sm:text-base font-medium text-neutral-800 dark:text-[#CBD5E1] leading-relaxed space-y-3">
            <p>
              Mineral trading involves more than just connecting buyers and sellers. Every transaction passes through several hands, from suppliers listing their minerals to laboratories verifying quality and logistics operators handling delivery, while still being able to track where the products were sourced from.
            </p>
            <p>
              With so many people involved, keeping everyone aligned and maintaining accurate records can become difficult.
            </p>
            <p>
              This was the problem Trace set out to address: bringing these different activities into one platform and making mineral trading easier to coordinate and track.
            </p>
            <p className="font-semibold text-[#0E2233] dark:text-white">
              My role was to help turn these complex operational processes into clear product requirements that the team could build around.
            </p>
          </div>
        </div>

        {/* ACT 2 · UNDERSTANDING THE PEOPLE AND PROCESSES */}
        <div className="relative space-y-3">
          {/* Milestone Node */}
          <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-5 h-5 rounded-full bg-[#1B4332] dark:bg-[#52B788] border-4 border-white dark:border-[#091522]" />

          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#1B4332] dark:text-[#52B788]">
              Act 2 · Understanding the People and Processes
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0E2233] dark:text-white">
              02. First, I Needed to Understand How Things Worked
            </h2>
          </div>

          <div className="text-sm sm:text-base font-medium text-neutral-800 dark:text-[#CBD5E1] leading-relaxed space-y-3">
            <p>
              Before defining what the platform needed to do, I had to understand how mineral trading actually happened.
            </p>
            <p>
              I worked with operations team to learn about their processes, the different people involved, and how information moved from one stage to another.
            </p>
            <p>
              I mapped out user journeys and documented the workflows alongside the senior PMs across the platform. This helped me understand what each user needed, where their responsibilities overlapped, and what the product needed to support.
            </p>
            <p>
              It also gave the team a clearer picture of the problems we were trying to solve.
            </p>
          </div>
        </div>

        {/* ACT 3 · TURNING UNDERSTANDING INTO REQUIREMENTS */}
        <div className="relative space-y-3">
          {/* Milestone Node */}
          <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-5 h-5 rounded-full bg-[#1B4332] dark:bg-[#52B788] border-4 border-white dark:border-[#091522]" />

          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#1B4332] dark:text-[#52B788]">
              Act 3 · Turning Understanding into Requirements
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0E2233] dark:text-white">
              03. Giving the Team Something to Build
            </h2>
          </div>

          <div className="text-sm sm:text-base font-medium text-neutral-800 dark:text-[#CBD5E1] leading-relaxed space-y-3">
            <p>
              Understanding the workflows was only the beginning. The next challenge was translating what I had learned into something the design and engineering teams could work with.
            </p>
            <p>
              I documented feature requirements in PRDs, broke them down into user stories, and defined acceptance criteria to explain how different features should behave.
            </p>
            <p>
              I also worked on mapping permissions across the different user roles, making sure the requirements reflected what each participant should be able to see and do.
            </p>
          </div>
        </div>

        {/* ACT 4 · FROM DOCUMENTATION TO DEVELOPMENT */}
        <div className="relative space-y-3">
          {/* Milestone Node */}
          <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-5 h-5 rounded-full bg-[#1B4332] dark:bg-[#52B788] border-4 border-white dark:border-[#091522]" />

          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#1B4332] dark:text-[#52B788]">
              Act 4 · From Documentation to Development
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0E2233] dark:text-white">
              04. Working Through the Details
            </h2>
          </div>

          <div className="text-sm sm:text-base font-medium text-neutral-800 dark:text-[#CBD5E1] leading-relaxed space-y-3">
            <p>
              Once requirements were ready, the work moved into development.
            </p>
            <p>
              I used ClickUp and Azure DevOps to organize backlogs, break down larger tasks, and coordinate sprint activities with the engineering team.
            </p>
            <p>
              But writing requirements was not a one-time activity. As development progressed, questions came up, reqs needed clarification or changing, and some scenarios required further discussion.
            </p>
            <p>
              I worked with engineers and operations to resolve these questions, fix bugs, and keep development aligned with the original requirements.
            </p>
            <p>
              I also tested completed features against their acceptance criteria, documented issues, and followed up with developers to address them.
            </p>
          </div>
        </div>

        {/* ACT 5 · WHAT CAME OUT OF IT */}
        <div className="relative space-y-3">
          {/* Milestone Node */}
          <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-5 h-5 rounded-full bg-[#1B4332] dark:bg-[#52B788] border-4 border-white dark:border-[#091522]" />

          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#1B4332] dark:text-[#52B788]">
              Act 5 · What Came Out of It
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0E2233] dark:text-white">
              05. Moving Trace Forward
            </h2>
          </div>

          <div className="text-sm sm:text-base font-medium text-neutral-800 dark:text-[#CBD5E1] leading-relaxed space-y-4">
            <p>
              During my time on Trace, I contributed to the product development process across multiple areas, from understanding the ideation and documenting requirements to coordinating development and testing completed features.
            </p>
            <p>
              Several modules were delivered, while other areas were still in progress when I left.
            </p>
            <div className="p-4 sm:p-5 rounded-xl border-2 border-[#1B4332]/20 dark:border-[#52B788]/30 bg-[#F4F9F6] dark:bg-[#0A261D] space-y-2">
              <p>
                More than anything, the experience taught me that product management is often about bringing clarity to situations where different people see the same problem differently.
              </p>
              <p className="font-bold text-[#1B4332] dark:text-[#D8F3DC]">
                I learned to ask better questions, thinking through flows in the POV of the stakeholder, document decisions carefully, and stay involved beyond writing requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

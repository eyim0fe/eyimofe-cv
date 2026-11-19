import React from 'react'

export const TnbcDeepDiveCaseStudy: React.FC = () => {
  return (
    <div className="space-y-10 pt-2 text-[#0E2233] dark:text-[#EAF1F8] max-w-3xl">
      {/* ROLE & PRODUCT META */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl border-2.5 border-[#0E2233] dark:border-[#2D6A4F] bg-white dark:bg-[#122436] shadow-[4px_4px_0_#0E2233] dark:shadow-[4px_4px_0_#143829]">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-[#1B4332] dark:text-[#52B788] block mb-0.5">
            Role
          </span>
          <p className="text-sm font-bold text-[#0E2233] dark:text-white">
            Product Manager, Designer &amp; Engineer
          </p>
        </div>
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-[#1B4332] dark:text-[#52B788] block mb-0.5">
            Product
          </span>
          <p className="text-sm font-bold text-[#0E2233] dark:text-white">
            Church Management / Back Office Platform
          </p>
        </div>
      </div>

      {/* CONTINUOUS STORYTELLING TIMELINE (Acts 1 to 5 + Takeaways) */}
      <div className="relative pl-6 sm:pl-8 border-l-2.5 border-[#1B4332]/25 dark:border-[#52B788]/30 space-y-12">
        
        {/* ACT 1 — UNDERSTANDING THE WORK BEHIND RUNNING A CHURCH */}
        <div className="relative space-y-3">
          <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-5 h-5 rounded-full bg-[#1B4332] dark:bg-[#52B788] border-4 border-white dark:border-[#091522]" />

          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#1B4332] dark:text-[#52B788]">
              Act 1 · Context &amp; Opportunity
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0E2233] dark:text-white">
              Act 1 — Understanding the work behind running a church
            </h2>
          </div>

          <div className="text-sm sm:text-base font-medium text-neutral-800 dark:text-[#CBD5E1] leading-relaxed space-y-3">
            <p>
              Behind every church service is a lot of administrative work.
            </p>
            <p>
              Church administrators, welfare teams, ushers, prayer teams, and pastors all have different responsibilities. Keeping track of members, attendance, giving, prayer requests, and other church activities requires coordination and access to reliable information.
            </p>
            <p>
              The New Breed Church needed a better way to manage these operations. The opportunity was to bring these activities into one digital platform, making information easier to manage and reducing the manual effort involved in running the church.
            </p>
          </div>
        </div>

        {/* ACT 2 — UNDERSTANDING THE PEOPLE AND THEIR WORKFLOWS */}
        <div className="relative space-y-3">
          <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-5 h-5 rounded-full bg-[#1B4332] dark:bg-[#52B788] border-4 border-white dark:border-[#091522]" />

          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#1B4332] dark:text-[#52B788]">
              Act 2 · Discovery &amp; Real Needs
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0E2233] dark:text-white">
              Act 2 — Understanding the people and their workflows
            </h2>
          </div>

          <div className="text-sm sm:text-base font-medium text-neutral-800 dark:text-[#CBD5E1] leading-relaxed space-y-3">
            <p>
              I worked with church stakeholders to understand how different teams operated, what information they needed, and how they carried out their responsibilities.
            </p>
            <p>
              Rather than approaching the project as a list of features to build, I focused on understanding the actual workflows behind them.
            </p>
            <p>
              This helped shape the product around the needs of the people who would use it. The platform needed to support different teams and responsibilities while giving the church a more organised way to manage its operations.
            </p>
          </div>
        </div>

        {/* ACT 3 — MAKING THE RIGHT PRODUCT DECISIONS */}
        <div className="relative space-y-3">
          <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-5 h-5 rounded-full bg-[#1B4332] dark:bg-[#52B788] border-4 border-white dark:border-[#091522]" />

          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#1B4332] dark:text-[#52B788]">
              Act 3 · Trade-offs &amp; Product Judgment
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0E2233] dark:text-white">
              Act 3 — Making the right product decisions
            </h2>
          </div>

          <div className="text-sm sm:text-base font-medium text-neutral-800 dark:text-[#CBD5E1] leading-relaxed space-y-3">
            <p>
              One of the interesting challenges was worker attendance.
            </p>
            <p>
              The church needed a way to record worker attendance, but a traditional biometric system would have introduced additional costs and technical complexity.
            </p>
            <p>
              Attendance was primarily needed on Sundays, so building and maintaining a full biometric authentication system felt excessive for the problem we were trying to solve.
            </p>
            <p>
              I worked through the alternatives and we chose a QR-based approach with location verification. It offered a simpler way to record attendance while helping ensure workers were physically at the church when signing in.
            </p>
            <div className="p-4 rounded-xl border-2 border-[#1B4332]/20 dark:border-[#52B788]/30 bg-[#F4F9F6] dark:bg-[#0A261D] font-bold text-[#1B4332] dark:text-[#D8F3DC]">
              This was an important product decision: instead of building the most sophisticated solution, we chose an approach that made sense for the church's actual needs and resources.
            </div>
          </div>
        </div>

        {/* ACT 4 — TURNING THE IDEA INTO A WORKING PRODUCT */}
        <div className="relative space-y-3">
          <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-5 h-5 rounded-full bg-[#1B4332] dark:bg-[#52B788] border-4 border-white dark:border-[#091522]" />

          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#1B4332] dark:text-[#52B788]">
              Act 4 · Execution &amp; Design
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0E2233] dark:text-white">
              Act 4 — Turning the idea into a working product
            </h2>
          </div>

          <div className="text-sm sm:text-base font-medium text-neutral-800 dark:text-[#CBD5E1] leading-relaxed space-y-3">
            <p>
              The attendance process was designed to require very little manual intervention.
            </p>
            <p>
              Every Saturday, the system automatically generates a QR code for the upcoming Sunday service. During the designated attendance window, workers scan the code. The system then checks whether their location is within the allowed distance of the church before signing them in.
            </p>
            <p>
              I was involved throughout the process, taking on product management, design, and engineering responsibilities over the three-month build.
            </p>
            <p>
              I worked with stakeholders to shape requirements, designed the user experience, and contributed to implementing the platform. This meant connecting the needs of the different church teams to the actual features and workflows we built.
            </p>
            <p>
              Beyond attendance, the platform brought together key administrative functions, including member management, giving, prayer requests, and other church operations.
            </p>
          </div>
        </div>

        {/* ACT 5 — PUTTING THE PRODUCT TO USE */}
        <div className="relative space-y-3">
          <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-5 h-5 rounded-full bg-[#1B4332] dark:bg-[#52B788] border-4 border-white dark:border-[#091522]" />

          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#1B4332] dark:text-[#52B788]">
              Act 5 · Adoption &amp; Outcomes
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0E2233] dark:text-white">
              Act 5 — Putting the product to use
            </h2>
          </div>

          <div className="text-sm sm:text-base font-medium text-neutral-800 dark:text-[#CBD5E1] leading-relaxed space-y-3">
            <p>
              The platform is now being used by the church, with records for <strong className="text-[#0E2233] dark:text-white font-black">964 members and 122 workers</strong>.
            </p>
            <p>
              The QR attendance approach also meant the church did not have to purchase a dedicated physical biometric attendance device. While I don't have an exact figure for the time saved, the platform helped reduce manual administrative work and avoid an additional hardware expense.
            </p>
            <p>
              The church was happy with the product, and seeing a system we built become part of its operations was a meaningful outcome.
            </p>
          </div>
        </div>

        {/* WHAT I TOOK AWAY */}
        <div className="relative space-y-3">
          <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-5 h-5 rounded-full bg-[#1B4332] dark:bg-[#52B788] border-4 border-white dark:border-[#091522]" />

          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#1B4332] dark:text-[#52B788]">
              Reflection · Growth &amp; Perspective
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0E2233] dark:text-white">
              What I took away
            </h2>
          </div>

          <div className="text-sm sm:text-base font-medium text-neutral-800 dark:text-[#CBD5E1] leading-relaxed space-y-3">
            <p>
              Building the TNBC Back Office taught me a lot about taking a product from an operational need to a working solution.
            </p>
            <p>
              It challenged me to understand different users, work with stakeholders, make practical product decisions, and carry those decisions through design and engineering.
            </p>
            <div className="p-4 sm:p-5 rounded-xl border-2 border-[#1B4332]/20 dark:border-[#52B788]/30 bg-[#F4F9F6] dark:bg-[#0A261D] space-y-2">
              <p>
                The attendance feature was a particularly useful lesson: good product thinking isn't always about choosing the most advanced technology. It's about understanding the problem well enough to know what is worth building — and what isn't.
              </p>
              <p className="font-bold text-[#1B4332] dark:text-[#D8F3DC]">
                Over three months, I got to experience that process across the entire product lifecycle, from understanding the problem to building something people could actually use.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

import Navbar from "@/components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 pb-20 pt-12 sm:px-6 lg:pt-16">
        {/* Hero Section */}
        <section className="mb-16 space-y-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
            About Us
          </p>
          <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              The AI Talent Operating System for Africa
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-8 text-slate-600">
            Africa&apos;s AI gap is a proof gap, not a talent gap. We bridge it
            by turning skill into solutions, potential into progress and activity
            into accountability.
          </p>
        </section>

        {/* Vision Section */}
        <section className="mb-20 space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Vision
          </h2>
          <div className="rounded-2xl bg-linear-to-br from-cyan-50 via-blue-50 to-violet-50 p-8">
            <p className="text-lg leading-8 text-slate-700">
              To become the definitive engine of Africa&apos;s AI transformation
              by systematically connecting verified technical talent with
              enterprise grade AI solutions, sector by sector, country by country.
            </p>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="mb-20 space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            The Problem
          </h2>
          <div className="space-y-4">
            <p className="text-lg leading-8 text-slate-700">
              Africa faces a dual crisis. For companies,{" "}
              <span className="font-semibold text-slate-900">73% of African businesses</span>{" "}
              cannot find or afford the AI talent needed to solve critical
              operational challenges. For developers,{" "}
              <span className="font-semibold text-slate-900">over 600,000 technical graduates</span>{" "}
              remain underemployed, lacking a clear pathway to high value, high
              impact work.
            </p>
            <p className="text-xl font-semibold leading-8 text-slate-900">
              The gap is not a skills gap, it is a proof gap.
            </p>
          </div>
        </section>

        {/* Our Solution Section */}
        <section className="mb-20 space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Our Solution
          </h2>
          <div className="space-y-4">
            <p className="text-lg leading-8 text-slate-700">
              Somahorse Nexus is a structured, AI driven pipeline that transforms
              developer potential into deployed enterprise solutions. We are not a
              marketplace, we are a talent operating system.
            </p>
            <p className="text-lg leading-8 text-slate-700">
              Our platform closes the proof gap by certifying developers through
              real AI project work and matching them directly with businesses that
              need ready to deploy AI tools.
            </p>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-20 space-y-8">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="text-lg leading-8 text-slate-700">
            The system is built as three integrated engines.
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            {/* Talent Foundry */}
            <div className="rounded-2xl bg-linear-to-r from-cyan-400 to-violet-500 p-[1.5px] shadow-sm">
              <div className="rounded-2xl bg-white p-6">
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  Talent Foundry
                </h3>
                <p className="text-sm leading-6 text-slate-600">
                  Assesses and certifies developers through real AI challenges,
                  like building a fraud detection model for mobile money.
                </p>
              </div>
            </div>

            {/* Industrial Solutions Hub */}
            <div className="rounded-2xl bg-linear-to-r from-cyan-400 to-violet-500 p-[1.5px] shadow-sm">
              <div className="rounded-2xl bg-white p-6">
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  Industrial Solutions Hub
                </h3>
                <p className="text-sm leading-6 text-slate-600">
                  Connects pre vetted developers with businesses across key
                  sectors, starting with Fintech, then expanding to Agriculture,
                  Health, Education and Manufacturing.
                </p>
              </div>
            </div>

            {/* Capital and Impact Dashboard */}
            <div className="rounded-2xl bg-linear-to-r from-cyan-400 to-violet-500 p-[1.5px] shadow-sm">
              <div className="rounded-2xl bg-white p-6">
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  Capital & Impact Dashboard
                </h3>
                <p className="text-sm leading-6 text-slate-600">
                  Provides live, transparent metrics on developer earnings,
                  client efficiency gains and ecosystem growth, turning social
                  impact into a measurable, reportable asset.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Experience Section */}
        <section className="mb-20 space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            The Experience
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-2xl bg-linear-to-br from-cyan-50 to-blue-50 p-6">
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                For Developers
              </h3>
              <ul className="space-y-2 text-sm leading-6 text-slate-700">
                <li>• Skill validation through real projects</li>
                <li>• Auto generated professional portfolio</li>
                <li>• Direct access to high value enterprise gigs</li>
                <li>• 60% revenue share</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-linear-to-br from-violet-50 to-purple-50 p-6">
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                For Businesses
              </h3>
              <ul className="space-y-2 text-sm leading-6 text-slate-700">
                <li>• Catalogue of predefined AI tools tailored by sector</li>
                <li>• Pre vetted developer teams</li>
                <li>• End to end project management</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-linear-to-br from-blue-50 to-violet-50 p-6 sm:col-span-2">
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                For Investors & Partners
              </h3>
              <p className="text-sm leading-6 text-slate-700">
                Real time dashboard with KPIs across talent, projects and
                financial impact.
              </p>
            </div>
          </div>
        </section>

        {/* The Team Section */}
        <section className="mb-20 space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            The Team
          </h2>
          <p className="text-lg leading-8 text-slate-700">
            We are a distributed, high agency team of Africans building for
            Africa.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Uchenna Ngubane", role: "Founder & CEO" },
              { name: "Sorotiah Mazando", role: "Chief Technology Officer" },
              { name: "Nokwazi Xaba", role: "Chief Product Officer" },
              { name: "Nkululeko Menziwa", role: "Sales & Digital Marketing" },
              { name: "Chizua Akabike", role: "Nigerian Operations" },
              { name: "Nkosinathi Ngwenya", role: "Full Stack Developer" },
              { name: "Salami Abiodun", role: "Full Stack Developer" },
              { name: "Phuti Motimele", role: "Backend Development" },
              { name: "Blessing Adefila", role: "Frontend Development" },
            ].map((member) => (
              <div
                key={member.name}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <h4 className="font-semibold text-slate-900">{member.name}</h4>
                <p className="text-sm text-slate-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Current Status Section */}
        <section className="mb-20 space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Our Current Status
          </h2>
          <div className="rounded-2xl bg-linear-to-br from-slate-50 to-slate-100 p-8">
            <p className="text-lg leading-8 text-slate-700">
              Somahorse Nexus Pty Ltd is legally registered and operational. Our
              core technical and leadership team is in place, and the platform
              architecture is finalised. We are in active development of our
              Fintech first MVP, with launch scheduled for{" "}
              <span className="font-semibold text-slate-900">Q1 2026</span>. We
              are securing initial launch partners and preparing for a pre seed
              funding round with aligned impact investors.
            </p>
          </div>
        </section>

        {/* Why This Matters Section */}
        <section className="mb-20 space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Why This Matters Now
          </h2>
          <div className="space-y-4">
            <p className="text-lg leading-8 text-slate-700">
              This is not just another platform, it is the operating system for
              the next wave of African economic transformation.
            </p>
            <p className="text-xl font-semibold leading-8 text-slate-900">
              Somahorse Nexus, engineering the future of African talent.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-2xl bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 p-8 text-center text-white shadow-lg">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Interested in building with us?
          </h2>
          <p className="mb-6 text-lg">
            Whether you are a developer, an enterprise, an investor or a
            partner, let us connect.
          </p>
          <div className="space-y-2 text-base">
            <p>
              <a
                href="mailto:somahorsenexus@gmail.com"
                className="font-semibold underline hover:no-underline"
              >
                somahorsenexus@gmail.com
              </a>
            </p>
            <p>
              <a
                href="https://somahorsenexus.com"
                className="font-semibold underline hover:no-underline"
              >
                somahorsenexus.com
              </a>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}





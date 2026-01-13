import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 lg:pt-16">
        <section className="max-w-4xl space-y-5 text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
            Somahorse Nexus
          </p>
          <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl">
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Accelerating Africa&apos;s AI Revolution
            </span>
          </h1>
          <p className="text-xl leading-8 text-slate-600">
            We turn emerging technical talent into verified teams that deliver
            AI-powered solutions for Africa&apos;s most critical industries.
            From discovery to deployment, Somahorse Nexus orchestrates talent,
            delivery, and measurable outcomes.
          </p>
        </section>

        <section className="mt-10 flex flex-col gap-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "From Talent to Execution",
                desc: "We identify, verify, and ship with teams proven in delivery.",
                icon: "/icons/talent.png",
              },
              {
                title: "AI Built for Real Industries",
                desc: "Blueprints tailored to critical sectors, ready to deploy.",
                icon: "/icons/ai.png",
              },
              {
                title: "Outcomes You Can Measure",
                desc: "Track efficiency gains, earnings, and impact in real time.",
                icon: "/icons/star.png",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-linear-to-r from-cyan-400 to-violet-500 p-[1.5px] shadow-sm"
              >
                <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-5">
                  <div className="relative h-10 w-10 shrink-0">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      fill
                      sizes="40px"
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-base font-semibold tracking-tight text-[#1d4ed8]">
                      {item.title}
                    </div>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

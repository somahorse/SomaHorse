"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  User,
  MapPin,
  Award,
  Briefcase,
  Star,
  CheckCircle2,
  Clock,
  X,
  Mail,
  Linkedin,
  Globe,
  Users,
  Zap,
  SlidersHorizontal,
  ArrowRight,
} from "lucide-react";

type ExperienceLevel = "junior" | "intermediate" | "senior" | "advanced" | "all";
type Availability = "available" | "busy" | "unavailable" | "all";

interface Talent {
  id: string;
  name: string;
  role: string;
  experience: "junior" | "intermediate" | "senior" | "advanced";
  country: string;
  availability: "Available" | "Busy" | "Unavailable";
  skills: string[];
  certifications: string[];
  rating: number;
  completedProjects: number;
  about: string;
  linkedin?: string;
  portfolio?: string;
  profileCompletion: number;
}

export default function TalentSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [experienceFilter, setExperienceFilter] = useState<ExperienceLevel>("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<Availability>("all");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);

  // Mock data - replace with real data from hooks/API
  const [talents] = useState<Talent[]>([
    {
      id: "1",
      name: "John Doe",
      role: "Full Stack Developer",
      experience: "senior",
      country: "Nigeria",
      availability: "Available",
      skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"],
      certifications: [
        "AWS Certified Solutions Architect",
        "Google Cloud Professional Developer",
      ],
      rating: 4.9,
      completedProjects: 24,
      about:
        "Experienced full-stack developer with a passion for building scalable web applications. Specialized in React, Node.js, and cloud technologies.",
      linkedin: "https://linkedin.com/in/johndoe",
      portfolio: "https://johndoe.dev",
      profileCompletion: 95,
    },
    {
      id: "2",
      name: "Jane Smith",
      role: "AI/ML Engineer",
      experience: "advanced",
      country: "Kenya",
      availability: "Available",
      skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning"],
      certifications: ["TensorFlow Developer Certificate", "AWS ML Specialty"],
      rating: 4.8,
      completedProjects: 18,
      about:
        "AI/ML engineer specializing in deep learning and computer vision. Expert in building production-ready ML models.",
      linkedin: "https://linkedin.com/in/janesmith",
      portfolio: "https://janesmith.dev",
      profileCompletion: 90,
    },
    {
      id: "3",
      name: "Mike Johnson",
      role: "DevOps Engineer",
      experience: "senior",
      country: "South Africa",
      availability: "Busy",
      skills: ["Kubernetes", "Docker", "AWS", "Terraform", "CI/CD", "Linux"],
      certifications: ["AWS Certified DevOps Engineer", "Kubernetes Administrator"],
      rating: 4.7,
      completedProjects: 15,
      about:
        "DevOps specialist focused on infrastructure automation and cloud architecture. Expert in containerization and orchestration.",
      profileCompletion: 88,
    },
    {
      id: "4",
      name: "Sarah Williams",
      role: "Data Scientist",
      experience: "senior",
      country: "Ghana",
      availability: "Available",
      skills: ["Python", "R", "SQL", "Data Analysis", "Machine Learning", "Tableau"],
      certifications: ["Google Data Analytics Certificate"],
      rating: 4.9,
      completedProjects: 20,
      about:
        "Data scientist with expertise in statistical analysis and predictive modeling. Passionate about turning data into actionable insights.",
      linkedin: "https://linkedin.com/in/sarahwilliams",
      profileCompletion: 92,
    },
    {
      id: "5",
      name: "David Brown",
      role: "Frontend Developer",
      experience: "intermediate",
      country: "Nigeria",
      availability: "Available",
      skills: ["React", "Vue.js", "JavaScript", "TypeScript", "CSS", "UI/UX"],
      certifications: [],
      rating: 4.6,
      completedProjects: 12,
      about:
        "Frontend developer passionate about creating beautiful and intuitive user interfaces. Strong focus on user experience.",
      portfolio: "https://davidbrown.dev",
      profileCompletion: 85,
    },
    {
      id: "6",
      name: "Emily Davis",
      role: "Backend Developer",
      experience: "senior",
      country: "Kenya",
      availability: "Available",
      skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
      certifications: ["MongoDB Certified Developer"],
      rating: 4.8,
      completedProjects: 22,
      about:
        "Backend developer specializing in scalable API design and database architecture. Expert in microservices and distributed systems.",
      linkedin: "https://linkedin.com/in/emilydavis",
      profileCompletion: 93,
    },
    {
      id: "7",
      name: "Chris Wilson",
      role: "Mobile Developer",
      experience: "intermediate",
      country: "Tanzania",
      availability: "Available",
      skills: ["React Native", "Flutter", "iOS", "Android", "Swift", "Kotlin"],
      certifications: [],
      rating: 4.5,
      completedProjects: 10,
      about:
        "Mobile developer with experience in cross-platform development. Passionate about creating smooth mobile experiences.",
      profileCompletion: 80,
    },
    {
      id: "8",
      name: "Lisa Anderson",
      role: "UI/UX Designer",
      experience: "senior",
      country: "Nigeria",
      availability: "Busy",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
      certifications: ["Google UX Design Certificate"],
      rating: 4.9,
      completedProjects: 19,
      about:
        "UI/UX designer focused on creating user-centered designs. Expert in design systems and user research methodologies.",
      portfolio: "https://lisanderson.design",
      profileCompletion: 91,
    },
  ]);

  const allSkills = Array.from(
    new Set(talents.flatMap((talent) => talent.skills))
  ).sort();

  const getExperienceConfig = (experience: string) => {
    switch (experience) {
      case "junior":
        return { label: "Junior", color: "bg-blue-100 text-blue-700" };
      case "intermediate":
        return { label: "Intermediate", color: "bg-purple-100 text-purple-700" };
      case "senior":
        return { label: "Senior", color: "bg-emerald-100 text-emerald-700" };
      case "advanced":
        return { label: "Advanced", color: "bg-amber-100 text-amber-700" };
      default:
        return { label: experience, color: "bg-slate-100 text-slate-700" };
    }
  };

  const getAvailabilityConfig = (availability: string) => {
    switch (availability) {
      case "Available":
        return {
          label: "Available",
          color: "bg-emerald-100 text-emerald-700",
          icon: CheckCircle2,
        };
      case "Busy":
        return {
          label: "Busy",
          color: "bg-amber-100 text-amber-700",
          icon: Clock,
        };
      case "Unavailable":
        return {
          label: "Unavailable",
          color: "bg-red-100 text-red-700",
          icon: X,
        };
      default:
        return {
          label: availability,
          color: "bg-slate-100 text-slate-700",
          icon: Clock,
        };
    }
  };

  const filteredTalents = talents.filter((talent) => {
    const matchesSearch =
      talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesExperience =
      experienceFilter === "all" || talent.experience === experienceFilter;
    const matchesAvailability =
      availabilityFilter === "all" ||
      talent.availability.toLowerCase() === availabilityFilter;
    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.every((skill) => talent.skills.includes(skill));

    return matchesSearch && matchesExperience && matchesAvailability && matchesSkills;
  });

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl">
              Find Talent
            </h1>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Search and discover verified talent for your projects
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:px-4 sm:text-sm"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, role, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-3 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
          />
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">Filters</h3>
              <button
                onClick={() => {
                  setExperienceFilter("all");
                  setAvailabilityFilter("all");
                  setSelectedSkills([]);
                }}
                className="text-xs font-semibold text-[#2563EB] hover:text-[#1d4ed8] sm:text-sm"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-6">
              {/* Experience Level */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Experience Level
                </label>
                <div className="flex flex-wrap gap-2">
                  {(["all", "junior", "intermediate", "senior", "advanced"] as ExperienceLevel[]).map(
                    (level) => (
                      <button
                        key={level}
                        onClick={() => setExperienceFilter(level)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors sm:px-4 sm:text-sm ${
                          experienceFilter === level
                            ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {level === "all"
                          ? "All Levels"
                          : level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Availability
                </label>
                <div className="flex flex-wrap gap-2">
                  {(["all", "available", "busy", "unavailable"] as Availability[]).map(
                    (avail) => (
                      <button
                        key={avail}
                        onClick={() => setAvailabilityFilter(avail)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors sm:px-4 sm:text-sm ${
                          availabilityFilter === avail
                            ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {avail === "all"
                          ? "All"
                          : avail.charAt(0).toUpperCase() + avail.slice(1)}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">Skills</label>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                  {allSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors sm:px-4 sm:text-sm ${
                        selectedSkills.includes(skill)
                          ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600 sm:text-base">
            Found <span className="font-semibold text-slate-900">{filteredTalents.length}</span>{" "}
            {filteredTalents.length === 1 ? "talent" : "talents"}
          </p>
        </div>

        {/* Talent Grid */}
        {filteredTalents.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTalents.map((talent) => {
              const experienceConfig = getExperienceConfig(talent.experience);
              const availabilityConfig = getAvailabilityConfig(talent.availability);
              const AvailabilityIcon = availabilityConfig.icon;

              return (
                <div
                  key={talent.id}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
                >
                  {/* Talent Header */}
                  <div className="bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
                            {talent.name}
                          </h3>
                          <p className="mt-0.5 text-xs text-slate-600 sm:text-sm">
                            {talent.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Talent Content */}
                  <div className="p-4 sm:p-6">
                    {/* Rating and Stats */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-bold text-slate-900">{talent.rating}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Briefcase className="h-4 w-4" />
                        <span>{talent.completedProjects} projects</span>
                      </div>
                    </div>

                    {/* Experience and Availability */}
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${experienceConfig.color}`}
                      >
                        {experienceConfig.label}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${availabilityConfig.color}`}
                      >
                        <AvailabilityIcon className="h-3 w-3" />
                        {availabilityConfig.label}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="mb-4 flex items-center gap-2 text-xs text-slate-600 sm:text-sm">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span>{talent.country}</span>
                    </div>

                    {/* Skills Preview */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1.5">
                        {talent.skills.slice(0, 4).map((skill, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700"
                          >
                            {skill}
                          </span>
                        ))}
                        {talent.skills.length > 4 && (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                            +{talent.skills.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* About Preview */}
                    <p className="mb-4 line-clamp-2 text-xs text-slate-600 sm:text-sm">
                      {talent.about}
                    </p>

                    {/* Certifications */}
                    {talent.certifications.length > 0 && (
                      <div className="mb-4 flex items-center gap-1 text-xs text-slate-600">
                        <Award className="h-4 w-4 text-amber-500" />
                        <span>{talent.certifications.length} certifications</span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedTalent(talent)}
                        className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:px-4 sm:text-sm"
                      >
                        View Profile
                      </button>
                      <button className="flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90 sm:px-4 sm:text-sm">
                        <Mail className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <Search className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">No talent found</h3>
            <p className="mt-2 text-sm text-slate-600">
              Try adjusting your search or filters to find more talent
            </p>
          </div>
        )}

        {/* Talent Detail Modal */}
        {selectedTalent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                        {selectedTalent.name}
                      </h2>
                      <p className="mt-1 text-sm text-slate-600">{selectedTalent.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTalent(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 space-y-6">
                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                      <div>
                        <p className="text-xs font-semibold text-slate-600">Rating</p>
                        <p className="text-lg font-extrabold text-slate-900">
                          {selectedTalent.rating}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-slate-600" />
                      <div>
                        <p className="text-xs font-semibold text-slate-600">Projects</p>
                        <p className="text-lg font-extrabold text-slate-900">
                          {selectedTalent.completedProjects}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="text-xs font-semibold text-slate-600">Profile</p>
                        <p className="text-lg font-extrabold text-slate-900">
                          {selectedTalent.profileCompletion}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Experience and Availability */}
                <div className="flex flex-wrap items-center gap-3">
                  {(() => {
                    const experienceConfig = getExperienceConfig(selectedTalent.experience);
                    return (
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-sm font-semibold ${experienceConfig.color}`}
                      >
                        {experienceConfig.label} Level
                      </span>
                    );
                  })()}
                  {(() => {
                    const availabilityConfig = getAvailabilityConfig(selectedTalent.availability);
                    const AvailabilityIcon = availabilityConfig.icon;
                    return (
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${availabilityConfig.color}`}
                      >
                        <AvailabilityIcon className="h-4 w-4" />
                        {availabilityConfig.label}
                      </span>
                    );
                  })()}
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>{selectedTalent.country}</span>
                  </div>
                </div>

                {/* About */}
                <div>
                  <h3 className="mb-2 text-base font-extrabold text-slate-900">About</h3>
                  <p className="text-sm leading-relaxed text-slate-700">{selectedTalent.about}</p>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="mb-3 text-base font-extrabold text-slate-900">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTalent.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 px-3 py-1.5 text-sm font-semibold text-slate-900"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                {selectedTalent.certifications.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-base font-extrabold text-slate-900">
                      Certifications
                    </h3>
                    <div className="space-y-2">
                      {selectedTalent.certifications.map((cert, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3"
                        >
                          <Award className="h-5 w-5 text-amber-500" />
                          <span className="text-sm font-semibold text-slate-900">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links */}
                {(selectedTalent.linkedin || selectedTalent.portfolio) && (
                  <div>
                    <h3 className="mb-3 text-base font-extrabold text-slate-900">Links</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedTalent.linkedin && (
                        <a
                          href={selectedTalent.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                        >
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </a>
                      )}
                      {selectedTalent.portfolio && (
                        <a
                          href={selectedTalent.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                        >
                          <Globe className="h-4 w-4" />
                          Portfolio
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 border-t border-slate-200 bg-slate-50 p-4 sm:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <button
                    onClick={() => setSelectedTalent(null)}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Close
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                    Invite to Project
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


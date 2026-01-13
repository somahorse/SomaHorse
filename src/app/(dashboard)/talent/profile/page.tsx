"use client";

import { useState } from "react";
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  Award,
  Link as LinkIcon,
  Edit2,
  Save,
  X,
  Plus,
  Trash2,
  Globe,
  Linkedin,
  Calendar,
  CheckCircle2,
  Upload,
  Camera,
} from "lucide-react";

export default function TalentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "skills" | "links">("overview");

  // Mock data - replace with real data from hooks/API
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "Full Stack Developer",
    experience: "senior" as "junior" | "intermediate" | "senior" | "advanced",
    country: "Nigeria",
    availability: "Available",
    about: "Experienced full-stack developer with a passion for building scalable web applications. Specialized in React, Node.js, and cloud technologies.",
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"],
    certifications: [
      "AWS Certified Solutions Architect",
      "Google Cloud Professional Developer",
    ],
    linkedin: "https://linkedin.com/in/johndoe",
    portfolio: "https://johndoe.dev",
    profileCompletion: 85,
  });

  const [editData, setEditData] = useState(profileData);
  const [newSkill, setNewSkill] = useState("");
  const [newCertification, setNewCertification] = useState("");

  const handleEdit = () => {
    setEditData(profileData);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !editData.skills.includes(newSkill.trim())) {
      setEditData({
        ...editData,
        skills: [...editData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setEditData({
      ...editData,
      skills: editData.skills.filter((s) => s !== skill),
    });
  };

  const handleAddCertification = () => {
    if (newCertification.trim() && !editData.certifications.includes(newCertification.trim())) {
      setEditData({
        ...editData,
        certifications: [...editData.certifications, newCertification.trim()],
      });
      setNewCertification("");
    }
  };

  const handleRemoveCertification = (cert: string) => {
    setEditData({
      ...editData,
      certifications: editData.certifications.filter((c) => c !== cert),
    });
  };

  const experienceLabels = {
    junior: "Junior",
    intermediate: "Intermediate",
    senior: "Senior",
    advanced: "Advanced",
  };

  const experienceColors = {
    junior: "bg-blue-100 text-blue-700",
    intermediate: "bg-purple-100 text-purple-700",
    senior: "bg-emerald-100 text-emerald-700",
    advanced: "bg-amber-100 text-amber-700",
  };

  const data = isEditing ? editData : profileData;

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl">
              My Profile
            </h1>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Manage your profile information and visibility
            </p>
          </div>
          <div className="flex items-center gap-3">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Completion Card */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
          <div className="bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 p-4 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 sm:h-16 sm:w-16">
                  <CheckCircle2 className="h-6 w-6 text-white sm:h-8 sm:w-8" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 sm:text-sm">
                    Profile Completion
                  </p>
                  <p className="mt-1 text-lg font-extrabold text-slate-900 sm:text-xl">
                    {data.profileCompletion}% Complete
                  </p>
                </div>
              </div>
              <div className="flex-1 sm:ml-8">
                <div className="mb-1 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-slate-600">
                    {data.profileCompletion < 100
                      ? "Complete your profile to get more opportunities"
                      : "Profile is complete!"}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transition-all duration-300"
                    style={{ width: `${data.profileCompletion}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Profile Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
              {/* Profile Picture */}
              <div className="relative bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 p-6">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 sm:h-32 sm:w-32">
                      <User className="h-12 w-12 text-white sm:h-16 sm:w-16" />
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-white shadow-lg transition-opacity hover:opacity-90">
                        <Camera className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
                    {data.firstName} {data.lastName}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-slate-600 sm:text-base">
                    {data.role}
                  </p>
                  <div className="mt-2">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        experienceColors[data.experience]
                      }`}
                    >
                      {experienceLabels[data.experience]} Level
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="divide-y divide-slate-200 p-4 sm:p-6">
                <div className="flex items-center gap-3 py-3">
                  <Mail className="h-5 w-5 text-slate-400" />
                  <span className="text-sm text-slate-600 sm:text-base">{data.email}</span>
                </div>
                <div className="flex items-center gap-3 py-3">
                  <MapPin className="h-5 w-5 text-slate-400" />
                  <span className="text-sm text-slate-600 sm:text-base">{data.country}</span>
                </div>
                <div className="flex items-center gap-3 py-3">
                  <Calendar className="h-5 w-5 text-slate-400" />
                  <span className="text-sm text-slate-600 sm:text-base">{data.availability}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${
                  activeTab === "overview"
                    ? "border-b-2 border-[#2563EB] text-[#2563EB]"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("skills")}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${
                  activeTab === "skills"
                    ? "border-b-2 border-[#2563EB] text-[#2563EB]"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Skills & Certifications
              </button>
              <button
                onClick={() => setActiveTab("links")}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${
                  activeTab === "links"
                    ? "border-b-2 border-[#2563EB] text-[#2563EB]"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Links & Portfolio
              </button>
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
                  <div className="border-b border-slate-200 bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 px-4 py-3 sm:px-6 sm:py-4">
                    <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
                      Personal Information
                    </h3>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-slate-600 sm:text-sm">
                          First Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editData.firstName}
                            onChange={(e) =>
                              setEditData({ ...editData, firstName: e.target.value })
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                          />
                        ) : (
                          <p className="text-sm text-slate-900 sm:text-base">{data.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-slate-600 sm:text-sm">
                          Last Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editData.lastName}
                            onChange={(e) =>
                              setEditData({ ...editData, lastName: e.target.value })
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                          />
                        ) : (
                          <p className="text-sm text-slate-900 sm:text-base">{data.lastName}</p>
                        )}
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-slate-600 sm:text-sm">
                          Email
                        </label>
                        <p className="text-sm text-slate-500 sm:text-base">{data.email}</p>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-slate-600 sm:text-sm">
                          Role/Title
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editData.role}
                            onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                          />
                        ) : (
                          <p className="text-sm text-slate-900 sm:text-base">{data.role}</p>
                        )}
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-slate-600 sm:text-sm">
                          Experience Level
                        </label>
                        {isEditing ? (
                          <select
                            value={editData.experience}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                experience: e.target.value as typeof data.experience,
                              })
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                          >
                            <option value="junior">Junior</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="senior">Senior</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        ) : (
                          <p className="text-sm text-slate-900 sm:text-base">
                            {experienceLabels[data.experience]}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-slate-600 sm:text-sm">
                          Country
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editData.country}
                            onChange={(e) =>
                              setEditData({ ...editData, country: e.target.value })
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                          />
                        ) : (
                          <p className="text-sm text-slate-900 sm:text-base">{data.country}</p>
                        )}
                      </div>
                      <div className="sm:col-span-2">
                        <label className="mb-1 block text-xs font-semibold text-slate-600 sm:text-sm">
                          Availability
                        </label>
                        {isEditing ? (
                          <select
                            value={editData.availability}
                            onChange={(e) =>
                              setEditData({ ...editData, availability: e.target.value })
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                          >
                            <option value="Available">Available</option>
                            <option value="Busy">Busy</option>
                            <option value="Unavailable">Unavailable</option>
                          </select>
                        ) : (
                          <p className="text-sm text-slate-900 sm:text-base">{data.availability}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* About Section */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
                  <div className="border-b border-slate-200 bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 px-4 py-3 sm:px-6 sm:py-4">
                    <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">About</h3>
                  </div>
                  <div className="p-4 sm:p-6">
                    {isEditing ? (
                      <textarea
                        value={editData.about}
                        onChange={(e) => setEditData({ ...editData, about: e.target.value })}
                        rows={6}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                        {data.about}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Skills & Certifications Tab */}
            {activeTab === "skills" && (
              <div className="space-y-6">
                {/* Skills */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
                  <div className="border-b border-slate-200 bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 px-4 py-3 sm:px-6 sm:py-4">
                    <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">Skills</h3>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 px-3 py-1.5 text-sm font-semibold text-slate-900"
                        >
                          {skill}
                          {isEditing && (
                            <button
                              onClick={() => handleRemoveSkill(skill)}
                              className="text-slate-500 hover:text-red-600"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="mt-4 flex gap-2">
                        <input
                          type="text"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                          placeholder="Add a skill..."
                          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                        />
                        <button
                          onClick={handleAddSkill}
                          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        >
                          <Plus className="h-4 w-4" />
                          Add
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Certifications */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
                  <div className="border-b border-slate-200 bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 px-4 py-3 sm:px-6 sm:py-4">
                    <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
                      Certifications
                    </h3>
                  </div>
                  <div className="p-4 sm:p-6">
                    {data.certifications.length > 0 ? (
                      <div className="space-y-3">
                        {data.certifications.map((cert, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3"
                          >
                            <div className="flex items-center gap-3">
                              <Award className="h-5 w-5 text-amber-500" />
                              <span className="text-sm font-semibold text-slate-900 sm:text-base">
                                {cert}
                              </span>
                            </div>
                            {isEditing && (
                              <button
                                onClick={() => handleRemoveCertification(cert)}
                                className="text-slate-400 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">No certifications added yet</p>
                    )}
                    {isEditing && (
                      <div className="mt-4 flex gap-2">
                        <input
                          type="text"
                          value={newCertification}
                          onChange={(e) => setNewCertification(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleAddCertification()}
                          placeholder="Add a certification..."
                          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                        />
                        <button
                          onClick={handleAddCertification}
                          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        >
                          <Plus className="h-4 w-4" />
                          Add
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Links & Portfolio Tab */}
            {activeTab === "links" && (
              <div className="space-y-6">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
                  <div className="border-b border-slate-200 bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 px-4 py-3 sm:px-6 sm:py-4">
                    <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
                      External Links
                    </h3>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-xs font-semibold text-slate-600 sm:text-sm">
                          LinkedIn Profile
                        </label>
                        {isEditing ? (
                          <input
                            type="url"
                            value={editData.linkedin}
                            onChange={(e) =>
                              setEditData({ ...editData, linkedin: e.target.value })
                            }
                            placeholder="https://linkedin.com/in/yourprofile"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                          />
                        ) : data.linkedin ? (
                          <a
                            href={data.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-semibold text-[#2563EB] transition-colors hover:text-[#1d4ed8] sm:text-base"
                          >
                            <Linkedin className="h-4 w-4" />
                            {data.linkedin}
                          </a>
                        ) : (
                          <p className="text-sm text-slate-500">No LinkedIn profile added</p>
                        )}
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-semibold text-slate-600 sm:text-sm">
                          Portfolio Website
                        </label>
                        {isEditing ? (
                          <input
                            type="url"
                            value={editData.portfolio}
                            onChange={(e) =>
                              setEditData({ ...editData, portfolio: e.target.value })
                            }
                            placeholder="https://yourportfolio.com"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                          />
                        ) : data.portfolio ? (
                          <a
                            href={data.portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-semibold text-[#2563EB] transition-colors hover:text-[#1d4ed8] sm:text-base"
                          >
                            <Globe className="h-4 w-4" />
                            {data.portfolio}
                          </a>
                        ) : (
                          <p className="text-sm text-slate-500">No portfolio website added</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

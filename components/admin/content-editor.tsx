"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Profile, Recommendation } from "@/lib/types";
import {
  Save,
  Loader2,
  Plus,
  Trash2,
  User,
  Heart,
  ImageIcon,
} from "lucide-react";
import { ImageUpload } from "./image-upload";

interface Props {
  initialProfile: Profile;
  initialRecommendations: Recommendation[];
}

export default function AdminContentEditor({
  initialProfile,
  initialRecommendations,
}: Props) {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [recs, setRecs] = useState<Recommendation[]>(initialRecommendations);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingRecs, setIsSavingRecs] = useState(false);

  const saveProfile = async () => {
    setIsSavingProfile(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "profile", value: profile }),
      });
      if (res.ok) {
        router.refresh();
        alert("Profile updated successfully!");
      }
    } catch (err) {
      alert("Failed to save profile.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const saveRecs = async () => {
    setIsSavingRecs(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "recommendations", value: recs }),
      });
      if (res.ok) {
        router.refresh();
        alert("Recommendations updated successfully!");
      }
    } catch (err) {
      alert("Failed to save recommendations.");
    } finally {
      setIsSavingRecs(false);
    }
  };

  const addRec = () => {
    setRecs([
      ...recs,
      {
        id: String(Date.now()),
        type: "Song",
        title: "",
        artist: "",
        emoji: "🎵",
        image: "",
      },
    ]);
  };

  const removeRec = (index: number) => {
    setRecs(recs.filter((_, i) => i !== index));
  };

  const updateRec = (
    index: number,
    field: keyof Recommendation,
    value: string,
  ) => {
    const newRecs = [...recs];
    newRecs[index] = { ...newRecs[index], [field]: value };
    setRecs(newRecs);
  };

  const handleProfileImageUpload = (url: string) => {
    setProfile({ ...profile, avatar: url });
  };

  return (
    <div className="space-y-12">
      {/* Profile Section */}
      <section className="bg-card border border-border rounded-sm p-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <User size={80} />
        </div>
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-amber" />
          <h2 className="font-serif text-xl font-bold">Manage Profile</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
          <div className="space-y-4">
            <ImageUpload
              label="Profile Picture"
              value={profile.avatar}
              onUpload={handleProfileImageUpload}
            />
            {!profile.avatar.startsWith("http") && (
              <div className="text-center p-8 bg-muted border border-border rounded-sm text-4xl grayscale opacity-50">
                {profile.avatar}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-mono text-[10px] tracking-[2px] uppercase text-muted-foreground">
                  Name
                </label>
                <input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] tracking-[2px] uppercase text-muted-foreground">
                  Role/Tagline
                </label>
                <input
                  value={profile.role}
                  onChange={(e) =>
                    setProfile({ ...profile, role: e.target.value })
                  }
                  className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[10px] tracking-[2px] uppercase text-muted-foreground">
                Short Bio
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                rows={3}
                className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber resize-none font-sans"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={saveProfile}
            disabled={isSavingProfile}
            className="flex items-center gap-2 bg-amber hover:bg-amber-light text-primary-foreground font-mono text-[10px] tracking-[2px] uppercase px-6 py-2.5 rounded-sm transition-all shadow-[2px_2px_0_theme(colors.maroon-deep)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
          >
            {isSavingProfile ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Profile
              </>
            )}
          </button>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="bg-card border border-border rounded-sm p-6 relative">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Heart size={80} />
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-amber" />
            <h2 className="font-serif text-xl font-bold">Top Recommendations</h2>
          </div>
          <button
            onClick={addRec}
            className="flex items-center gap-1.5 text-amber hover:text-amber-light text-[10px] font-mono tracking-[2px] uppercase"
          >
            <Plus className="w-3.5 h-3.5" /> Add Item
          </button>
        </div>

        <div className="space-y-6">
          {recs.map((rec, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row gap-6 p-6 border border-border/50 bg-muted/30 rounded-sm group relative"
            >
              <div className="w-[150px] shrink-0">
                <ImageUpload
                  label="Cover"
                  value={rec.emoji}
                  onUpload={(url) => updateRec(i, "emoji", url)}
                />
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-[8px] tracking-[1px] text-muted-foreground uppercase">
                    Type
                  </label>
                  <select
                    value={rec.type}
                    onChange={(e) => updateRec(i, "type", e.target.value)}
                    className="w-full bg-muted border border-border rounded-sm px-3 py-1.5 text-xs text-foreground focus:outline-none"
                  >
                    <option>Song</option>
                    <option>Movie</option>
                    <option>Book</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[8px] tracking-[1px] text-muted-foreground uppercase">
                    Title
                  </label>
                  <input
                    value={rec.title}
                    onChange={(e) => updateRec(i, "title", e.target.value)}
                    className="w-full bg-muted border border-border rounded-sm px-3 py-1.5 text-xs focus:outline-none"
                    placeholder="Title..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[8px] tracking-[1px] text-muted-foreground uppercase">
                    Artist/Author
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={rec.artist}
                      onChange={(e) => updateRec(i, "artist", e.target.value)}
                      className="flex-1 bg-muted border border-border rounded-sm px-3 py-1.5 text-xs focus:outline-none"
                      placeholder="Name..."
                    />
                    <button
                      onClick={() => removeRec(i)}
                      className="p-1.5 text-muted-foreground hover:text-red-400 transition-colors"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end pt-6 border-t border-border">
          <button
            onClick={saveRecs}
            disabled={isSavingRecs}
            className="flex items-center gap-2 bg-amber hover:bg-amber-light text-primary-foreground font-mono text-[10px] tracking-[2px] uppercase px-6 py-2.5 rounded-sm transition-all shadow-[2px_2px_0_theme(colors.maroon-deep)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
          >
            {isSavingRecs ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Recommendations
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
}

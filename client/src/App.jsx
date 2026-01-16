import { useState, useEffect } from 'react'

function App() {
  const [profile, setProfile] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({ name: '', email: '', education: '' });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Function to fetch data from our Backend
  const fetchProfile = async (skill = '') => {
    setLoading(true);
    try {
      const url = skill
        ? `${API_URL}/api/profile/search?skill=${skill}`
        : `${API_URL}/api/profile`;

      const res = await fetch(url);
      const data = await res.json();
      setProfile(data);
      setEditData({ name: data.name, email: data.email, education: data.education });
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchProfile(); // Refresh data
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProfile(search);
  };

  if (loading && !profile) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-10">
      <div className="max-w-4xl mx-auto">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-slate-200">
          <div className="bg-blue-600 h-32 w-full flex justify-end items-start p-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg backdrop-blur-md transition-all text-xs md:sm font-bold border border-white/20"
            >
              Edit Profile
            </button>
          </div>

          <div className="px-6 md:px-8 pb-8">
            <div className="relative -mt-12 mb-4">
              <div className="h-20 w-20 md:h-24 md:w-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center text-2xl md:text-3xl font-bold text-blue-600">
                {profile?.name?.charAt(0)}
              </div>
            </div>

            {/* Name and Info */}
            <h1 className="text-2xl md:text-4xl font-extrabold break-words">{profile?.name}</h1>
            <p className="text-slate-500 font-medium mb-4 text-sm md:text-base leading-relaxed">
              {profile?.email} <span className="hidden md:inline">•</span> <br className="md:hidden" /> {profile?.education}
            </p>

            <div className="flex flex-wrap gap-2">
              {profile?.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs md:text-sm font-semibold border border-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Filter by skill (e.g., Python, React)..."
              className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm md:text-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg active:scale-95 text-sm md:text-base">
              Search
            </button>
          </form>
          {search && (
            <button
              onClick={() => { setSearch(''); fetchProfile(); }}
              className="mt-2 text-sm text-blue-600 font-medium hover:underline px-1"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Projects Grid */}
        <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
          Projects {profile?.projects.length > 0 && <span className="text-slate-400 text-base md:text-lg">({profile.projects.length})</span>}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {profile?.projects.length > 0 ? (
            profile.projects.map((project, index) => (
              <div key={index} className="bg-white p-5 md:p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow group flex flex-col justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-bold group-hover:text-blue-600 transition-colors">{project.title}</h3>
                  <p className="text-slate-600 mt-2 mb-6 text-sm md:text-base leading-relaxed">{project.description}</p>
                </div>
                <div className="flex gap-4">
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noreferrer" className="text-xs md:text-sm font-bold text-slate-900 border-b-2 border-blue-400 hover:border-blue-600 transition-colors">GitHub</a>
                  )}
                  {project.links.live && (
                    <a href={project.links.live} target="_blank" rel="noreferrer" className="text-xs md:text-sm font-bold text-blue-600 border-b-2 border-blue-400 hover:border-blue-600 transition-colors">Live Demo</a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-slate-400 italic">
              No projects found for "{search}"
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-6">Edit Profile Info</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-bold mb-1 text-slate-700">Name</label>
                <input
                  type="text"
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-bold mb-1 text-slate-700">Email</label>
                <input
                  type="email"
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-bold mb-1 text-slate-700">Education</label>
                <input
                  type="text"
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                  value={editData.education}
                  onChange={(e) => setEditData({ ...editData, education: e.target.value })}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3 pt-4">
                <button type="submit" className="order-1 md:order-2 flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-bold shadow-md hover:bg-blue-700 transition-colors">Save Changes</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="order-2 md:order-1 flex-1 bg-slate-100 text-slate-600 py-2.5 rounded-lg font-bold hover:bg-slate-200 transition-colors">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

import { useState, useEffect } from 'react'

function App() {
  const [profile, setProfile] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Function to fetch data from our Backend
  const fetchProfile = async (skill = '') => {
    setLoading(true);
    try {
      const url = skill
        ? `http://localhost:5000/api/profile/search?skill=${skill}`
        : `http://localhost:5000/api/profile`;

      const res = await fetch(url);
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
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
          <div className="bg-blue-600 h-32 w-full"></div>
          <div className="px-8 pb-8">
            <div className="relative -mt-12 mb-4">
              <div className="h-24 w-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-blue-600">
                {profile?.name?.charAt(0)}
              </div>
            </div>
            <h1 className="text-4xl font-extrabold">{profile?.name}</h1>
            <p className="text-slate-500 font-medium mb-4">{profile?.email} • {profile?.education}</p>

            <div className="flex flex-wrap gap-2">
              {profile?.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold border border-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              type="text"
              placeholder="Filter by skill (e.g., Python, React)..."
              className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg active:scale-95">
              Search
            </button>
          </form>
          {search && (
            <button
              onClick={() => { setSearch(''); fetchProfile(); }}
              className="mt-2 text-sm text-blue-600 font-medium hover:underline"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Projects Grid */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          Projects {profile?.projects.length > 0 && <span className="text-slate-400 text-lg">({profile.projects.length})</span>}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile?.projects.length > 0 ? (
            profile.projects.map((project, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow group">
                <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">{project.title}</h3>
                <p className="text-slate-600 mt-2 mb-6 leading-relaxed">{project.description}</p>
                <div className="flex gap-4">
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noreferrer" className="text-sm font-bold text-slate-900 border-b-2 border-blue-400 hover:border-blue-600">GitHub</a>
                  )}
                  {project.links.live && (
                    <a href={project.links.live} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-600 border-b-2 border-blue-400 hover:border-blue-600">Live Demo</a>
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
    </div>
  )
}

export default App

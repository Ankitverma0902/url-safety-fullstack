import { useEffect, useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    setDarkMode(savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  const scanURL = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://localhost:5000/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Server error or invalid response." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0e1125] text-black dark:text-white transition-colors duration-500 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-teal-500 dark:text-teal-400 text-center w-full">
            🔍 URL Safety Checker
          </h1>
          <button
            onClick={toggleTheme}
            className="absolute right-6 top-6 bg-gray-200 dark:bg-[#28314e] text-black dark:text-white px-3 py-1 rounded-full text-sm shadow"
          >
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>

        <form
          onSubmit={scanURL}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
            className="flex-1 px-4 py-2 rounded bg-gray-100 dark:bg-[#1a1e3a] text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 px-6 py-2 rounded text-white transition"
          >
            {loading ? "Scanning..." : "Check"}
          </button>
        </form>

        {result?.error && (
          <div className="bg-red-100 dark:bg-red-800 text-red-800 dark:text-white p-4 rounded mb-6 shadow-md">
            ❌ {result.error}
          </div>
        )}

        {result?.status && (
          <div className="bg-gray-100 dark:bg-[#1c223e] rounded-xl p-6 mb-6 shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center">
              <p className="text-4xl font-bold text-cyan-500 dark:text-cyan-300">
                {result?.malicious}
              </p>
              <p className="text-sm text-gray-700 dark:text-slate-300">/ 97</p>
              <div className="mt-2 text-sm bg-gray-200 dark:bg-[#28314e] px-2 py-1 rounded-full text-teal-600 dark:text-teal-300">
                Community Score
              </div>
            </div>

            <div>
              <p
                className={`text-lg font-semibold mb-2 ${
                  result.status === "safe"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {result.status === "safe"
                  ? "🟢 No security vendors flagged this URL as malicious"
                  : "🔴 Some engines flagged this URL as malicious"}
              </p>
              <p className="text-sm mb-2 break-all">{url}</p>
              <div className="flex flex-wrap gap-4 mt-2 text-sm">
                <span className="bg-gray-200 dark:bg-[#28314e] px-2 py-1 rounded-full text-sky-600 dark:text-sky-300">
                  text/html
                </span>
                <span className="bg-gray-200 dark:bg-[#28314e] px-2 py-1 rounded-full text-indigo-600 dark:text-indigo-300">
                  external-resources
                </span>
                <span className="bg-gray-200 dark:bg-[#28314e] px-2 py-1 rounded-full text-emerald-600 dark:text-emerald-300">
                  status: 200
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                🕓 Last scan: just now
              </p>
            </div>
          </div>
        )}

        {result?.engine_results && (
          <div className="bg-gray-100 dark:bg-[#1c223e] rounded-xl shadow overflow-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-200 dark:bg-[#28314e] sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-teal-700 dark:text-teal-300">
                    Engine
                  </th>
                  <th className="px-4 py-2 text-teal-700 dark:text-teal-300">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(result.engine_results).map(
                  ([engine, verdict]) => (
                    <tr
                      key={engine}
                      className="border-t border-gray-300 dark:border-[#2e3656]"
                    >
                      <td className="px-4 py-2 text-black dark:text-white">
                        {engine}
                      </td>
                      <td
                        className={`px-4 py-2 ${
                          verdict === "malicious"
                            ? "text-red-500 font-semibold"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        {verdict}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

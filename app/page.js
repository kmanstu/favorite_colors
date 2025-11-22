"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadPeople() {
    const res = await fetch("/api/favorites");
    const json = await res.json();

    if (!json.error) {
      setPeople(json.data ?? []);
    } else {
      console.error(json.error);
    }
  }

  useEffect(() => {
    loadPeople();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!name || !color) return;

    setLoading(true);
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, color }),
      });

      const json = await res.json();

      if (!json.error) {
        setName("");
        setColor("");
        await loadPeople();
      } else {
        console.error(json.error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Favorite Colors 🎨
        </h1>

        <form
          onSubmit={handleAdd}
          className="bg-white rounded-lg shadow-md p-6 mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              className="border border-gray-300 p-3 rounded-lg w-full sm:w-auto flex-1 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="border border-gray-300 p-3 rounded-lg w-full sm:w-auto flex-1 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Favorite color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            People ({people.length})
          </h2>

          <ul className="space-y-3">
            {people.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-gray-300"
                    title={p.color}
                    style={{ backgroundColor: p.color }}
                  />
                  <div>
                    <strong className="text-gray-800">{p.name}</strong>
                    <span className="text-gray-500 text-sm ml-2">
                      — {p.color}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

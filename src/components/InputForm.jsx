import { useState } from "react";

export default function InputForm({ onSubmit }) {
  const [yelpUrl, setYelpUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(yelpUrl);
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <h1 className="text-3xl font-bold text-primary text-center mb-4">
        Yelp Review Sentiment Analyzer
      </h1>
      <p className="text-center mb-4">Powered by IBM Watson® NLU</p>
      <p className="text-center mb-6">
        Enter a Yelp URL to analyze reviews and sentiments.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={yelpUrl}
          onChange={(e) => setYelpUrl(e.target.value)}
          placeholder="https://www.yelp.com/biz/..."
          className="input input-bordered w-full"
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Analyze
        </button>
      </form>
    </div>
  );
}
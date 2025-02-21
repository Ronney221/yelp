import { useState } from "react";
import InputForm from "./components/InputForm";
import ReviewDisplay from "./components/ReviewDisplay";
import AnalysisDisplay from "./components/AnalysisDisplay";

function App() {
  const [yelpData, setYelpData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);

  const handleSubmit = async (yelpUrl) => {
    try {
      const yelpRes = await fetch(`/api/yelp?yelpUrl=${encodeURIComponent(yelpUrl)}`, {
        cache: 'no-store',
      });
      if (!yelpRes.ok) {
        console.error("Yelp API Error:", yelpRes.status, await yelpRes.text());
        return;
      }
      const yelpJson = await yelpRes.json();
      console.log("Yelp Response:", yelpJson); // Debug
      setYelpData(yelpJson.body);
  
      const analyzeRes = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviews: yelpJson.body.reviews }),
        cache: 'no-store', // Ensure fresh analysis
      });
      if (!analyzeRes.ok) {
        console.error("Analyze API Error:", analyzeRes.status, await analyzeRes.text());
        return;
      }
      const analyzeJson = await analyzeRes.json();
      console.log("Analyze Response:", analyzeJson); // Debug
      setAnalysisData(analyzeJson.body);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  const reset = () => {
    setYelpData(null);
    setAnalysisData(null);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="container max-w-4xl">
        {!yelpData ? (
          <InputForm onSubmit={handleSubmit} />
        ) : (
          <>
            <ReviewDisplay yelpData={yelpData} />
            {analysisData && <AnalysisDisplay analysisData={analysisData} />}
            <button className="btn btn-primary mt-6" onClick={reset}>
              Try Another Yelp Establishment
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
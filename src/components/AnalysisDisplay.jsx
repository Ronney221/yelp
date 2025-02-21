export default function AnalysisDisplay({ analysisData }) {
    return (
      <div className="card bg-base-100 shadow-xl p-6">
        <h2 className="text-3xl font-bold text-center mb-4">{analysisData.overall_rating} / 5</h2>
        <h3 className="text-xl text-primary text-center mb-6">Overall Rating</h3>
        <h2 className="text-2xl text-primary mb-4">
          IBM Watson NLU Analysis
        </h2>
        {analysisData.results.map((result, i) => (
          <div key={i} className="mb-6">
            <div className="chat chat-start">
              <div className="chat-bubble">{result.name}.. {result.text}</div>
            </div>
            <div className="mt-2">
              <p>
                <strong>Rating:</strong> {result.rating}
              </p>
              <p><strong>Emotions Detected:</strong></p>
              <ul className="list-disc pl-5">
                {result.emotions.map((e, j) => <li key={j}>{e}</li>)}
              </ul>
              <p><strong>Relevant Concepts:</strong></p>
              <ul className="list-disc pl-5">
                {result.concepts.map((c, j) => (
                  <li key={j}>{typeof c === "string" ? c : `${c.text} (${c.relevance}%)`}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  }
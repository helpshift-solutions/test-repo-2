// src/page.tsx
import React from "react";

export default function Page() {
  // Simulated user input that could come from query params, API, etc.
  const userInput = `<img src=x onerror=alert('XSS') />`;

  return (
    <div>
      <h1>Hello, CodeQL Test!</h1>

      {/* BAD: inserting raw user input into DOM */}
      <div dangerouslySetInnerHTML={{ __html: userInput }}></div>

      <p>
        This page contains a React component with a known XSS vulnerability for
        testing CodeQL.
      </p>
    </div>
  );
}

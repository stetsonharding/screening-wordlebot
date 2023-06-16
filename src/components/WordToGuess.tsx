import React from "react";
import { fetchWordleResult, WordleRequest, WordleResponse } from "../api/api";

// function WordToGuess() {
//     // Call the fetchWordleResult function to load an initial guess
//     const loadInitialGuess = async () => {
//         try {
//             const initialGuessRequest: WordleRequest = [];
//             const initialGuessResponse: WordleResponse = await fetchWordleResult(
//                 initialGuessRequest
//             );
//             const initialGuess: string = initialGuessResponse.guess;

//             // Do something with the initial guess
//             console.log("Initial Guess:", initialGuess);
//         } catch (error) {
//             console.error("Error loading initial guess:", error);
//         }
//     };

//     // Call the function to load the initial guess
//     loadInitialGuess();

    return <div>WordToGuess</div>;
}

export default WordToGuess;

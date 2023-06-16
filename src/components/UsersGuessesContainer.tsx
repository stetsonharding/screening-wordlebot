import React, { useState, useEffect } from "react";
import WordToGuess from "./WordToGuess";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchWordleResult, WordleRequest, WordleResponse } from "../api/api";

function UsersGuessesContainer() {
    const [userRequestItem, setUserRequestItem] = useState([{ id: 1, word: "", clue: "" }]);

    // Call the fetchWordleResult function to load an initial guess
    const loadInitialGuess = async () => {
        try {
            const initialGuessRequest: WordleRequest = [];
            const initialGuessResponse: WordleResponse = await fetchWordleResult(
                initialGuessRequest
            );
            const initialGuess: string = initialGuessResponse.guess;

            //save inital guess in state
            setUserRequestItem([{ id: 1, word: initialGuess, clue: "" }]);
        } catch (error) {
            console.error("Error loading initial guess:", error);
        }
    };

    useEffect(() => {
        loadInitialGuess();
    }, []);

    return (
        <div
            className="guesses-container"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "2rem",
            }}
        >
            {userRequestItem.map((item, index) =>
                item.word ? (
                    <>
                        <WordToGuess userRequestItem={userRequestItem} key={index} />
                    </>
                ) : (
                    <CircularProgress key={item.id} />
                )
            )}
        </div>
    );
}

export default UsersGuessesContainer;

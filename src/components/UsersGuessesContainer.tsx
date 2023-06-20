import React, { useState, useEffect } from "react";
import WordToGuess from "./WordToGuess";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchWordleResult, WordleRequest, WordleRequestItem, WordleResponse } from "../api/api";
import ClueInput from "./ClueInput";

export interface IRequestItem {
    id: number;
    word: string;
    clue: string;
}

function UsersGuessesContainer() {
    const [userRequestItem, setUserRequestItem] = useState<IRequestItem[]>([
        { id: 1, word: "", clue: "" },
    ]);

    const loadInitialGuess = async () => {
        try {
            const initialGuessRequest: WordleRequest = [];
            const initialGuessResponse: WordleResponse = await fetchWordleResult(
                initialGuessRequest
            );
            const initialGuess: string = initialGuessResponse.guess;

            // Save initial guess in state
            setUserRequestItem([{ id: 1, word: initialGuess, clue: "" }]);
        } catch (error) {
            console.error("Error loading initial guess:", error);
        }
    };

    useEffect(() => {
        loadInitialGuess();
    }, []);

    return (
        <div className="guesses-container">
            {userRequestItem.map((item, index) =>
                item.word ? (
                    <div key={item.id}>
                        <h2>Guess #{index + 1}</h2>
                        <WordToGuess userRequestItem={item.word} key={index} />
                        <h4 style={{ marginTop: "2.5rem" }}>What response did you get back?</h4>
                        <ClueInput
                            setUserRequestItem={setUserRequestItem}
                            userRequestItem={userRequestItem}
                        />
                    </div>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "2rem",
                        }}
                    >
                        <CircularProgress />
                    </div>
                )
            )}
            <div></div>
        </div>
    );
}

export default UsersGuessesContainer;

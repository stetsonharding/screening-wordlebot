import React, { useState, ChangeEvent, useEffect } from "react";
import { fetchWordleResult, WordleRequestItem } from "../api/api";

import { IRequestItem } from "./UsersGuessesContainer";
import WordleResponse from "./WordleResponse";
// import WordToGuess from "./WordToGuess";

interface IClueInputProps {
    setUserRequestItem: React.Dispatch<
        React.SetStateAction<{ id: number; word: string; clue: string }[]>
    >;
    userRequestItem: IRequestItem[] | [];
    userRequestItemWord: string;
}

function ClueInput({ setUserRequestItem, userRequestItem, userRequestItemWord }: IClueInputProps) {
    const [isClueInputShown, setIsClueInputShown] = useState(false);
    const [inputClue, setInputClue] = useState("");

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputClue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setUserRequestItem((prevState) => [
            ...prevState.slice(0, prevState.length - 1),
            {
                ...prevState[prevState.length - 1],
                clue: inputClue,
            },
        ]);

        // Hide the clue input
        setIsClueInputShown(false);
    };

    useEffect(() => {
        const FetchNewWord = () => {
            if (userRequestItem[userRequestItem.length - 1].clue !== "") {
                const requestItem: WordleRequestItem = {
                    word: userRequestItem[userRequestItem.length - 1].word,
                    clue: userRequestItem[userRequestItem.length - 1].clue,
                };
                fetchWordleResult([requestItem])
                    .then((result) => {
                        const guess = result.guess;

                        setUserRequestItem((prevState) => [
                            ...prevState,
                            {
                                id: prevState.length + 1,
                                word: guess,
                                clue: "",
                            },
                        ]);
                    })
                    .catch((error) => {
                        console.error("Error fetching wordle result:", error);
                    });
            }
        };
        FetchNewWord();
    }, [userRequestItem, setUserRequestItem]);

    return (
        <div style={{ marginTop: "1.1rem" }}>
            <span style={{ cursor: "pointer" }} onClick={() => setIsClueInputShown(true)}>
                Add clue
            </span>
            <br />
            {isClueInputShown && (
                <form id="form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Add Clue Here" onChange={handleInput} />
                    <button type="submit">Submit</button>
                </form>
            )}
            {inputClue !== "" && isClueInputShown === false && (
                <WordleResponse userRequestItemWord={userRequestItemWord} inputClue={inputClue} />
            )}
        </div>
    );
}

export default ClueInput;

import React, { useState, ChangeEvent, useEffect } from "react";
import { fetchWordleResult, WordleRequestItem } from "../api/api";
import { IRequestItem } from "./UsersGuessesContainer";
import WordleResponse from "./WordleResponse";

interface IClueInputProps {
    setUserRequestItem: React.Dispatch<
        React.SetStateAction<{ id: number; word: string; clue: string }[]>
    >;
    userRequestItem: IRequestItem[] | [];
    userRequestItemWord: string;
    userRequestGuess: IRequestItem;
}

function ClueInput({
    setUserRequestItem,
    userRequestItem,
    userRequestItemWord,
    userRequestGuess,
}: IClueInputProps) {
    const [isClueInputShown, setIsClueInputShown] = useState(false);
    const [inputClue, setInputClue] = useState("");

    console.log(userRequestGuess);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputClue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        let newRequest = userRequestItem.map((item) => {
            if (item.id === id) {
                return { ...item, clue: inputClue };
            }
            return item;
        });

        setUserRequestItem(newRequest);

        // Hide the clue input
        setIsClueInputShown(false);
    };

    useEffect(() => {
        const FetchNewWord = () => {
            const lastItem = userRequestItem[userRequestItem.length - 1];
            if (lastItem.clue !== "" && lastItem.id === userRequestGuess.id) {
                const requestItem: WordleRequestItem = {
                    word: lastItem.word,
                    clue: lastItem.clue,
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
    }, [userRequestItem, setUserRequestItem, userRequestGuess]);

    return (
        <div style={{ marginTop: "1.1rem" }}>
            <span style={{ cursor: "pointer" }} onClick={() => setIsClueInputShown(true)}>
                Add clue
            </span>
            <br />
            {isClueInputShown && (
                <form id="form" onSubmit={(e) => handleSubmit(e, userRequestGuess.id)}>
                    <input type="text" placeholder="Add Clue Here" onChange={handleInput} />
                    <button type="submit">Submit</button>
                </form>
            )}
            {inputClue !== "" && isClueInputShown === false && (
                <WordleResponse
                    userRequestItemWord={userRequestItemWord}
                    inputClue={inputClue.toUpperCase()}
                />
            )}
        </div>
    );
}

export default ClueInput;

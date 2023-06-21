import React, { useState, ChangeEvent, useEffect } from "react";
import { fetchWordleResult, WordleRequestItem } from "../api/api";
import { IRequestItem } from "./UsersGuessesContainer";
import WordleResponse from "./WordleResponse";
import CircularProgress from "@mui/material/CircularProgress";

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
    //State for input and hide/show form
    const [isClueInputShown, setIsClueInputShown] = useState(false);
    const [inputClue, setInputClue] = useState("");
    const [error, setError] = useState("");
    const [loadingNewWord, setLoadingNewWord] = useState(false);

    //Get the value from the Input from the user
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputClue(e.target.value.toUpperCase());
    };

    const handleSubmit = (e: React.FormEvent, id: number) => {
        // Prevent the default form submission behavior
        e.preventDefault();

        // Create a new array by mapping over the userRequestItem
        let newRequest = userRequestItem.map((item) => {
            // Check if the current items id matches the provided id
            if (item.id === id) {
                // If a match is found create a new object with the same properties as the item,
                // but with the 'clue' property updated to the value of inputClue
                return { ...item, clue: inputClue };
            }
            //no match is found, return the original item with nothing changed
            return item;
        });

        // Update the state of userRequestItem with the new array
        setUserRequestItem(newRequest);
        // Set the state of isClueInputShown to false to hide the clue input
        setIsClueInputShown(false);
        //let user know a call is being made to server
        setLoadingNewWord(true);
    };

    useEffect(() => {
        // Function to fetch a new word
        const FetchNewWord = () => {
            // Get the last item from the userRequestItem array
            const lastItem = userRequestItem[userRequestItem.length - 1];
            // Check if the last item has a clue, matches the userRequestGuess id, and the inputClue is not "GGGGG"
            if (
                lastItem.clue !== "" &&
                lastItem.id === userRequestGuess.id &&
                inputClue !== "GGGGG"
            ) {
                // Create a request item with the word and clue from the last item
                const requestItem: WordleRequestItem = {
                    word: lastItem.word,
                    clue: lastItem.clue,
                };
                // Fetch result using the request item
                fetchWordleResult([requestItem])
                    .then((result) => {
                        // saving guess from the result
                        const guess = result.guess;

                        //Turn off loading wheel beacuse we have the result
                        setLoadingNewWord(false);

                        //  add new item with the word as the guess and empty clue for user to store the next wordle result in.
                        setUserRequestItem((prevState) => [
                            ...prevState,
                            {
                                id: prevState.length + 1,
                                word: guess,
                                clue: "",
                            },
                        ]);
                        // setLoadingNewWord(false);
                    })
                    .catch((error) => {
                        // Handling errors
                        setError(error.message);
                    });
            }
        };

        FetchNewWord();
    }, [userRequestItem, setUserRequestItem, userRequestGuess]);

    console.log(loadingNewWord);

    return (
        <div style={{ marginTop: "1.1rem" }}>
            {/* Only render the 'add clue' button for the last item in the userRequestItem array */}
            {userRequestItem[userRequestItem.length - 1] === userRequestGuess && (
                <span style={{ cursor: "pointer" }} onClick={() => setIsClueInputShown(true)}>
                    Add clue
                </span>
            )}
            {/* == */}
            {/* Show the form when user clicks the 'add clue' button */}
            {isClueInputShown && (
                <form id="form" onSubmit={(e) => handleSubmit(e, userRequestGuess.id)}>
                    <input type="text" placeholder="Add Clue Here" onChange={handleInput} />
                    <button type="submit">submit</button>
                </form>
            )}
            {/* Render the input clue for the user if they entered one */}
            {inputClue !== "" && isClueInputShown === false && (
                <WordleResponse
                    userRequestItemWord={userRequestItemWord}
                    inputClue={inputClue.toUpperCase()}
                />
            )}
            {loadingNewWord === true && <CircularProgress />}
            {/* Displaying errors to user */}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default ClueInput;

import React from "react";

interface IWordToGuessProps {
    userRequestItem: { word: string; clue: string }[];
}

const WordToGuess: React.FC<IWordToGuessProps> = ({ userRequestItem }) => {
    return (
        <>
            <div className="wordToGuess-container">
                <h2>Guess #{userRequestItem.length}</h2>
                <br />
                <div className="guess" style={{ display: "flex" }}>
                    <span style={{ fontWeight: "500", fontSize: "1.3rem" }}>Word to guess:</span>
                    {userRequestItem.map((item, index) => (
                        <div className="word-to-guess" key={index}>
                            {item.word.split("").map((letter, letterIndex) => (
                                <span
                                    style={{
                                        margin: ".8rem",
                                        padding: "1.3rem",
                                        outline: "1px solid black",
                                    }}
                                    key={letterIndex}
                                >
                                    {letter.toLocaleUpperCase()}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default WordToGuess;

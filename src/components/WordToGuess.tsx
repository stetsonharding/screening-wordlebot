import React from "react";

// interface IWordToGuessProps {
//     userRequestItem: { word: string;}
// }

interface IWordToGuessProps {
    userRequestItem: string;
}
const WordToGuess: React.FC<IWordToGuessProps> = ({ userRequestItem }) => {
    return (
        <>
            <div className="wordToGuess-container">
                <br />
                <div className="guess" style={{ display: "flex" }}>
                    <div className="word-to-guess">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <span style={{ fontWeight: "500", fontSize: "1.3rem" }}>
                                Word to guess:
                            </span>
                            {userRequestItem.split("").map((char) => {
                                return (
                                    <p
                                        style={{
                                            margin: "1rem",
                                            fontSize: "1.3rem",
                                            outline: "1px solid black",
                                            padding: "1rem",
                                        }}
                                    >
                                        {char}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WordToGuess;

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
                    <span style={{ fontWeight: "500", fontSize: "1.3rem" }}>Word to guess:</span>
                    <div className="word-to-guess">
                        <span
                            style={{
                                margin: ".8rem",
                                padding: "1.3rem",
                                outline: "1px solid black",
                            }}
                        >
                            {userRequestItem}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WordToGuess;

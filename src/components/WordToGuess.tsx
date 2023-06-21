import React from "react";

interface IWordToGuessProps {
    userRequestItem: string;
}

const WordToGuess: React.FC<IWordToGuessProps> = ({ userRequestItem }) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <span style={{ fontWeight: "500", fontSize: "1.3rem" }}>Word to guess:</span>
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
    );
};

export default WordToGuess;

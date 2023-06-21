import React from "react";

interface IWordleResponseProps {
    userRequestItemWord: string;
    inputClue: string;
}

function WordleResponse({ userRequestItemWord, inputClue }: IWordleResponseProps) {
    return (
        <div style={{ display: "flex" }}>
            {inputClue === "GGGGG" ? (
                <span>You win!</span>
            ) : (
                userRequestItemWord.split("").map((item, index) => (
                    <p
                        key={index}
                        style={{
                            margin: "1rem",
                            fontSize: "1.3rem",
                            outline: "1px solid black",
                            padding: "1rem",
                            backgroundColor:
                                inputClue[index] === "G"
                                    ? "green"
                                    : inputClue[index] === "Y"
                                    ? "yellow"
                                    : undefined,
                        }}
                    >
                        {item}
                    </p>
                ))
            )}
        </div>
    );
}

export default WordleResponse;

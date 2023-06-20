import React from "react";

interface IWordleResponseProps {
    userRequestItemWord: string;
    inputClue: string;
}

function WordleResponse({ userRequestItemWord, inputClue }: IWordleResponseProps) {
    return (
        <div style={{ display: "flex" }}>
            {userRequestItemWord.split("").map((item, index) => {
                return (
                    <p
                        style={{
                            margin: "1rem",
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
                );
            })}
        </div>
    );
}

export default WordleResponse;

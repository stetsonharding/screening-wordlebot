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
                );
            })}
        </div>
    );
}

export default WordleResponse;

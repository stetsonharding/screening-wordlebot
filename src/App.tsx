import { Container } from "@mui/material";
import Layout from "./components/Layout";
import Header from "./components/Header";
import WordToGuess from "./components/WordToGuess";

function App() {
    return (
        <Layout>
            <Container maxWidth="sm">
                <Header />
                {/* Insert App here */}
                <WordToGuess />
            </Container>
        </Layout>
    );
}

export default App;

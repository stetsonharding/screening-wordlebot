import { Container } from "@mui/material";
import Layout from "./components/Layout";
import Header from "./components/Header";

import UsersGuessesContainer from "./components/UsersGuessesContainer";

function App() {
    return (
        <Layout>
            <Container maxWidth="sm">
                <Header />
                {/* Insert App here */}
                <UsersGuessesContainer />
            </Container>
        </Layout>
    );
}

export default App;

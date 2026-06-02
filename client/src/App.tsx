import Button from "@components/common/Button";
import PositionBottom from "@components/common/PositionBottom";
import GlobalStyle from "@styles/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <PositionBottom>
        <Button fullWidth disabled>
          hihButtonii
        </Button>
      </PositionBottom>
    </>
  );
}

export default App;

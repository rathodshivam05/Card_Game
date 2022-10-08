import "./App.css";
import { All_cards_Og } from "./Components/Data";
import { DisplayCard } from "./Components/DisplayCard";
import { Show } from "./Components/Show";
import { useEffect, useState } from "react";

var count=0
function App() {
  const [AllCards, setAllCards] = useState(All_cards_Og)
  const [CardSet, setCardSet] = useState([]);
  const [PlayCard, setPlayCard] = useState([]);
  const [Scores, setScores] = useState(0);
  const [gameOver, setgameOver] = useState(false);
  console.log(AllCards.length,All_cards_Og.length,Date.now(),"AllCards");
// console.log(CardSet,count, "CardSet");


  const SetData = async (DataCards) => {
    count++

    // var All_cards = CardData;
    var Set_A = [];
    var Set_B = [];
    var Set_C = [];
    var Set_D = [];
    var Set_E = [];
    console.log("SetData",CardSet,DataCards.length,AllCards.length);
    
    for (let i = 0; i < 52 && DataCards.length !== 0; i++) {
      let Random = Math.floor(Math.random() * DataCards.length - 1 + 1);
      let randomSet = Math.floor(Math.random() * 5 + 1);
      if (randomSet === 1) Set_A.push(DataCards[Random]);
      if (randomSet === 2) Set_B.push(DataCards[Random]);
      if (randomSet === 3) Set_C.push(DataCards[Random]);
      if (randomSet === 4) Set_D.push(DataCards[Random]);
      if (randomSet === 5) Set_E.push(DataCards[Random]);
      DataCards.splice(Random, 1);
    }
  
    let Data = await [Set_A, Set_B, Set_C, Set_D, Set_E];
      console.log(Set_A.length+Set_B.length+Set_C.length+Set_D.length+Set_E.length,"Set Fun Data");
      return Data;
  };

  const RandamData = async () => {
    if(CardSet[0]?.length  === 0 ||
      CardSet[1]?.length  === 0 ||
      CardSet[2]?.length  === 0 ||
      CardSet[3]?.length  === 0 ||
      CardSet[4]?.length || CardSet.length >= 0){
        let Data = await SetData(AllCards.slice());
        console.log(Data,AllCards,All_cards_Og,"RandamData Call");
        console.log(Data,"RandomFun");
        setCardSet(Data);
      }
  };

  const CheckGameOver = () => {
    if (
      CardSet[0]?.length === 0 ||
      CardSet[1]?.length === 0 ||
      CardSet[2]?.length === 0 ||
      CardSet[3]?.length === 0 ||
      CardSet[4]?.length === 0
    ) {
      setgameOver(true);
    }
  };

  const CheckScores = () => {
    if (PlayCard.length === 5) {
      const redColour = PlayCard.filter((item) => item.colour === "red");
      const blackColour = PlayCard.filter((item) => item.colour === "black");
      if (redColour.length === 5 || blackColour === 5) {
        setScores(Scores + 5);
      } else if (redColour.length === 4 || blackColour === 4) {
        setScores(Scores + 1);
      } else if (redColour.length === 3 || blackColour === 3) {
        setScores(Scores + 2);
      }
      console.log(Scores, "Scores");
      setTimeout(() => {
        setPlayCard([]);
      }, 100);
    }
  };
  const handleRestart = () => {
    RandamData();
    setPlayCard([]);
    setScores(0);
    // setreset(!reset)

  };
  function handleQuit() {
    window.confirm("Are You Sure Want To Quit The Game");
  }

  useEffect(() => {
      RandamData();
  }, []);

  useEffect(() => {
    CheckScores();
    CheckGameOver();
  }, [PlayCard.length]);

  return (
    <div className="App">
      <div className="head">
        <button onClick={handleRestart}>Restart</button>
        <h1>Card Game</h1>
        <button onClick={handleQuit}>Quit</button>
      </div>
      <div className={gameOver ? "overlay" : "overlayShow"}>
        <div className="popup">
          <h2>You Score: {Scores}</h2>
          <span
            className="close"
            onClick={() => {
              setgameOver(false);
              handleRestart();
            }}
          >
            &times;
          </span>
        </div>
      </div>

      <div className="AppShow">
        <Show
          Set={CardSet[0]}
          CardSet={CardSet}
          SetName={0}
          setCardSet={setCardSet}
          setPlayCard={setPlayCard}
          PlayCard={PlayCard}
        />
        <Show
          Set={CardSet[1]}
          CardSet={CardSet}
          SetName={1}
          setCardSet={setCardSet}
          setPlayCard={setPlayCard}
          PlayCard={PlayCard}
        />
        <Show
          Set={CardSet[2]}
          CardSet={CardSet}
          SetName={2}
          setCardSet={setCardSet}
          setPlayCard={setPlayCard}
          PlayCard={PlayCard}
        />
        <Show
          Set={CardSet[3]}
          CardSet={CardSet}
          SetName={3}
          setCardSet={setCardSet}
          setPlayCard={setPlayCard}
          PlayCard={PlayCard}
        />
        <Show
          Set={CardSet[4]}
          CardSet={CardSet}
          SetName={4}
          setCardSet={setCardSet}
          setPlayCard={setPlayCard}
          PlayCard={PlayCard}
        />
        <DisplayCard Set={PlayCard} />
      </div>
    </div>
  );
}

export default App;

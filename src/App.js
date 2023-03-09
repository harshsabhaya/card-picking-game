import { useEffect, useMemo, useState } from "react";
import Wrapper from "./Wrapper";
import CardArray from './CardArray'
import { isEmptyObj } from "./utiles";
import CardGrid from "./CardGrid";
import EndGameUI from "./EndGameUI";
import { USER1, USER2 } from "./config";

const App = () => {
  const [cardList, setCardList] = useState(CardArray.sort(() => .5 - Math.random()))
  const [firstClick, setFirstClick] = useState({})
  const [secondClick, setSecondClick] = useState({})
  const [user1, setUser1] = useState(0)
  const [user2, setUser2] = useState(0)
  const [activeUser, setActiveUser] = useState(0)
  const [isPrevent, setPreventing] = useState(false)

  const isgameFinised = useMemo(() => {
    return cardList?.length > 0 && cardList.every(obj => isEmptyObj(obj))
  }, [cardList])

  useEffect(() => {
    if (!isEmptyObj(firstClick) && !isEmptyObj(secondClick) && firstClick.value === secondClick.value) {
      // remain same user
      setTimeout(() => {
        setPreventing(false)

        // remove Matched images
        removingMatchedImage(secondClick)

        // increment user point
        handleIncrementScore()

        // reset first click
        setFirstClick({})
      }, 500)
    } else {
      // change user
      setActiveUser(prev => prev === 0 ? 1 : 0)
      setTimeout(() => {
        setPreventing(false)

        // set new random array
        let newArray = [...cardList].map((obj) => (!isEmptyObj(obj) ? { ...obj, show: false } : {}))
        setCardList(newArray)

        // reset first click
        setFirstClick({})
      }, 500)
    }
  }, [secondClick])

  const handleImgclick = (event, imgObj, index) => {
    // preventing from 3rd click
    if (isPrevent) {
      event.preventdefault()
    }

    // showing click Card
    manageSplicing(imgObj, index)

    if (isEmptyObj(firstClick)) {
      setFirstClick({ ...imgObj, index: index })
    } else {
      setPreventing(true)
      setSecondClick({ ...imgObj, index: index })
    }
  }

  const handleIncrementScore = () => {
    activeUser === 0
      ? setUser1(prev => prev + 1)
      : setUser2(prev => prev + 1)

  }

  const removingMatchedImage = (imgObj) => {
    let newList = [...cardList].map((obj) =>
      (obj.id === firstClick.id || obj.id === imgObj.id) ? {} : obj
    )
    setCardList(newList)
  }

  const manageSplicing = (imgObj, index) => {
    let obj = {
      ...imgObj,
      show: !imgObj.show
    }
    let newList = [...cardList]
    newList.splice(index, 1, obj)
    setCardList(newList)
  }

  const handleRestartGame = () => {
    setCardList(CardArray.sort(() => .5 - Math.random()))
    setUser1(0)
    setUser2(0)
    setFirstClick({})
    setActiveUser(0)
  }

  return (
    <Wrapper>
      <div className="App">
        <h1 className="py-4">Card Picking Game</h1>
        <div className="container d-flex justify-content-center">
          <div>
            <div className="row p-2">
              <div className={`col-6 py-2 ${activeUser === 0 ? "active-user" : null}`}>
                <b>Username</b> : {USER1}
                <div><b>Score</b> : {user1}</div>
              </div>
              <div className={`col-6 py-2 ${activeUser === 1 ? "active-user" : null}`}>
                <b>Username</b> : {USER2}
                <div><b>Score</b> : {user2}</div>
              </div>
            </div>
            <div className="row p-2 row-width">
              {isgameFinised ? (
                <EndGameUI user1={user1} user2={user2} />
              ) : (
                cardList.map((cardObj, index) => (
                  <CardGrid
                    cardObj={cardObj}
                    index={index}
                    handleImgclick={handleImgclick}
                  />
                ))
              )}
            </div>
            <div className="justify-content-centeer p-4">
              <button className="restart-button" onClick={handleRestartGame}>Restart</button>
            </div>
          </div>
        </div>
      </div>
      <style jsx="true">{`
        .App {
          text-align: center;
        }
        .row-width {
          width: 550px;
        }
        .active-user {
          border: 2px solid #d3d3d3;
          border-radius: 30px;
          background: #d3d3d342;
          box-shadow: 0 0 4px #999;
        }
        .restart-button {
          border: none;
          border-radius: 2px;
          font-size: 16px;
          text-transform: uppercase;
          color: white;
          background-color: #2196f3;
          box-shadow: 0 0 4px #999;
          height: 45px;
          width: 130px;
          border-radius: 25px;
        }
        .restart-button:focus {
          outline: none;
        }
        .restart-button:active {
          background-color: #6eb9f7;
          transition: background 0s;
        }
      `}</style>
    </Wrapper>
  );
}

export default App;

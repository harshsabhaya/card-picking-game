import React, { useEffect } from 'react'
import { question } from './config';
import { isEmptyObj } from './utiles';
import Wrapper from './Wrapper'

const CardGrid = ({ cardObj, index, handleImgclick }) => {
  useEffect(() => {
    var cards = document.querySelectorAll('.card');

    [...cards].forEach((card) => {
      card.addEventListener('click', function () {
        card.classList.toggle('is-flipped');
      });
    });
  }, [])

  const generateKey = (pre) => {
    return `${pre}_${Math.random()}`;
  }

  return (
    <Wrapper>
      <div key={generateKey(cardObj.id)} className="col-2 p-2 card-img">
        {!isEmptyObj(cardObj) ? (cardObj.show ? (
          <img
            src={cardObj.img}
            alt=""
            className="img-class"
          />
        ) : (
          <div className="border-img">
            <img
              src={question}
              alt=""
              className="img-class"
              onClick={(event) => handleImgclick(event, cardObj, index)}
            />
          </div>
        )) : null}
      </div>

      <style jsx >{`
      .card-img {
        border-radius: 0px;
        height: 85px;
        width: 85px;
      }
      .border-img {
        border: 1px solid #d3d3d3;
        box-shadow: 0 0 4px #999;
      }
      .img-class {
        cursor: pointer;
      }
      `}</style>
    </Wrapper>
  )
}

export default CardGrid
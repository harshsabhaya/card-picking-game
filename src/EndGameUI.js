import React from 'react'
import { USER1, USER2 } from './config'
import Wrapper from './Wrapper'

const EndGameUI = ({ user1, user2 }) => {
    return (
        <Wrapper>
            <div className='row justify-content-center w-100 align-items-center'>
                <div>
                    <h2 className='py-4'>Hurrah!! The Game is Finished</h2>
                    <h4>Winner is {user1 > user2 ? `${USER1} with ${user1} points` : `${USER2} with ${user2} points`} </h4>
                </div>
            </div>
            <style jsx>{`

            `}</style>
        </Wrapper>
    )
}

export default EndGameUI
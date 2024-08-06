import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import GameBets from '../other/gameBets'
import RouletteGame from './rouletteGame'
import { changeRouletteBets } from '../../../../reducers/games'

function Roulette(props){
    const [open, setOpen] = useState(false)
    let dispatch = useDispatch()
    let bets = useSelector(state => state.games.roulette.bets)	

    function getData(x){
        dispatch(changeRouletteBets(x))
	}

    function openTable(){setOpen(true)}
    function closeTable(){setOpen(false)}
    
    function results(x){
        if(typeof props.results === "function"){
            props.results(x)
        }
    }

    return <div className='game_container'>
        <RouletteGame {...props} bets={bets} openTable={()=>openTable()} results={(e)=>results(e)}></RouletteGame>
        <GameBets {...props} open={open} getData={(e)=>getData(e)} closeTable={()=>closeTable()}></GameBets>
    </div>
}

export default Roulette
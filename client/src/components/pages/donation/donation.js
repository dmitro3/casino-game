import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import { changePage, changeGame, changeGamePage } from '../../../reducers/page'
import { translate } from '../../../translations/translate'
import ukraine from '../../../img/icons/ukraine.svg'
import Header from '../../partials/header'
import BankDonation from './bank'
import CryptoDonation from './crypto'
import PaypalDonation from './paypal'

function Donation(props){
    const {lang, list} = props
    let dispatch = useDispatch()
    let donation_type = ["crypto", "paypal", "bank"]
    const [visible, setVisible] = useState('crypto')
    const [index, setIndex] = useState(0)

    function handleBack(){
        dispatch(changePage('Salon'))
        dispatch(changeGame(null))
        dispatch(changeGamePage(null))
    }

    function handleClick(choice, i){
        setVisible(choice)
        setIndex(parseInt(i))
    }

    return <div className="content_wrap">
        <Header template="donation" title={translate({lang: props.lang, info: "donation"})}></Header>
        <div className="page_content">
            {(() => {
                if(list && list.length>0){
                    return <div className="donation_container">                        
                        <div className="deco">
                            <div className="donation_box">
                                <div className="donation_box_tabs">
                                    <ul>
                                        {donation_type.map(function(item, i){
                                            let active = ""
                                            if(parseInt(i) === index){
                                                active = "active"
                                            }
                                            return <li key={i} className={active} onClick={()=>{handleClick(item, i)}}>
                                                <span>{translate({lang: props.lang, info: item})}</span>
                                            </li>
                                        })}
                                    </ul>
                                </div>                                
                                <div className="donation_box_content">
                                    {(() => {					
                                        switch (visible) {
                                            case "crypto":
                                                return <CryptoDonation lang={props.lang} list={list}/>
                                            case "paypal":
                                                return <PaypalDonation lang={props.lang} list={list}/>
                                            case "bank":
                                                return <BankDonation lang={props.lang} list={list}/>
                                        }
                                    })()}
                                </div>                                
                                <p>{translate({lang: props.lang, info: "donation_footer_text"})}</p>
                            </div>
                        </div>
                        <div className="donation_ukraine">
                            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/fundraisers/explore/search/charities/?query=ukraine">
                                {translate({lang: props.lang, info: "donation_ukraine"})} <img id="ukraine_icon" alt="ukraine_icon" src={ukraine}></img>
                            </a>
                        </div>
                    </div>
                } else {
                    return <div className="donation_container">
                        <p>{translate({lang: lang, info: "no_data"})}</p>
                    </div>
                }
            })()} 
        </div>
        <div className="text_center">
            <Button type="button" onClick={()=>handleBack()} className="mybutton round button_transparent shadow_convex">
                {translate({lang: props.lang, info: "back"})}
            </Button>
        </div>
    </div>
}
export default Donation
import React, {Component} from 'react';
import { Navigation } from './Navigation';
import Title from './Title';
import "./Profile.css";
import {app} from "../components/Authetication/base";

class Profile extends Component {

    //Tietojen suojaus!! ei näy, jos ei ole kirjautunut sissään!
    //Tänne tulee profiilin tiedot, käyttäjätunnus ja email
    //Omat kurssit, rooli -> Selostus, että mitä voi tehdä oppilaana? Saako sellasta infopalkkia esim?
    //Uuden kurssin lisääminen
    //Opettajalle lisäominaisuus: lisää uusia oppilaita opettajiksi


    render() {

        /*var currentUser = app.auth().currentUser;
        console.log("currentUser " + currentUser);*/

        console.log(this.props.authenticated);

        return (
            <div className="default">
                <Navigation/>
                <Title/>
                <h3>Profile information</h3>
            </div>
        );
        /*}*/
    }

}

export default Profile;
import configs from "../utils/configs";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import styles from "../assets/stylesheets/presence-list.scss";

export default class SequenceController extends Component {
    constructor() {
        super();
        this.state = {
            sequence: 0,
            userChoice: "",
            selectable: false
        };
      }

    componentDidMount() {
        document.querySelector(".Left").addEventListener("sequence", (e) => {
            if(this.state.selectable){
                this.setState({userChoice: e.detail.choice, sequence: this.state.sequence + 1, selectable: false});
            }       
            }
        );
        
        document.querySelector(".LeftDoor").addEventListener("sequence", (e) => {
            if(this.state.selectable){
                this.setState({userChoice: e.detail.choice, sequence: this.state.sequence + 1, selectable: false});
            }       
            }
        );

        document.querySelector(".RightDoor").addEventListener("sequence", (e) => {
            if(this.state.selectable){
                this.setState({userChoice: e.detail.choice, sequence: this.state.sequence + 1, selectable: false});
            }       
            }
        );
    }

    readyForInput(){
        this.setState({selectable: true});
    }

    nextSequence(){
        setTimeout(() => {
            this.setState({sequence: this.state.sequence + 1});
        }, 5000);
    }

    render(){
        
        switch(this.state.sequence){
            case 0:
                document.querySelector(".Floor").setAttribute("visible", true);
                if(!this.state.selectable) this.readyForInput();
                return (
                    <div className={styles.sequence}>
                        <h3>Choose to texture the floor wood or granite.</h3>
                    </div>
                )
            case 1:
                var choice;
                if(this.state.userChoice == "Left"){
                    document.querySelector(".Floor").setAttribute("visible", false);
                    document.querySelector("[class='11']").setAttribute("visible", true);

                    choice = "wood";
                }else{
                    document.querySelector(".Floor").setAttribute("visible", false);
                    document.querySelector("[class='12']").setAttribute("visible", true);

                    choice = "granite";
                }

                this.nextSequence();

                return (
                    <div className={styles.sequence}>
                        <h3>You chose {choice} as your floor texture!</h3>
                    </div>
                )
            case 2:
                document.querySelector("[class='11']").setAttribute("visible", false);
                document.querySelector("[class='12']").setAttribute("visible", false);
                
                if(!this.state.selectable) this.readyForInput();
                return (
                    <div className={styles.sequence}>
                        <h3>Choose a wolf or a fox.</h3>
                    </div>
                )
            case 3:
                if(this.state.userChoice == "Left"){
                    document.querySelector(".Floor").setAttribute("visible", false);
                    document.querySelector("[class='21']").setAttribute("visible", true);

                    choice = "wolf";
                }else{
                    document.querySelector(".Floor").setAttribute("visible", false);
                    document.querySelector("[class='22']").setAttribute("visible", true);

                    choice = "fox";
                }

                return (
                    <div className={styles.sequence}>
                        <h3>You chose a {choice}!</h3>
                    </div>
                )
        }      
    }
}
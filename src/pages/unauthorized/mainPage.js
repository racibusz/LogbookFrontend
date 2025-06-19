import { UserContext } from "../../UserContext";
import React from "react";
import languageStrings from "../../translationFile";
import {motion} from "framer-motion";
function MainPage(){
    const {language, setLanguage} = React.useContext(UserContext)
    const { description, giveUsATry, header1, paragraph1, paragraph2, advantage1, header2, paragraph3, paragraph4, advantage2, advantage3, paragraph5, paragraph6, header3,header4, advantage4, paragraph7, paragraph8 } = languageStrings[language]['mainPage'];

    return(
        <div className="mainPage" style={{overflowX: 'hidden'}}>
            <motion.div animate={{x:0, opacity: 1}} transition={{duration: 1, ease: "easeOut"}} initial={{x:300, opacity: 0}} className="row" style={{height: '90vh',backgroundImage: 'url("/backgroundMainPage.png")', backgroundSize: 'contain', backgroundPosition: 'right', backgroundRepeat: 'no-repeat'}}>
                <div className="col-md-6 d-flex flex-column justify-content-center px-5 ">
                    <h1 className="mx-5 mb-0">LogBook</h1>
                    <span className="mx-5">Made simpler</span>
                    <h2 style={{fontSize: '1.4rem'}}>{description}</h2>
                    <motion.div animate={{x:0, opacity: 1}}initial={{x:30, opacity: 0}} transition={{delay:.5, duration: .6}}className="d-flex justify-content-center">
                        <button className="btn btn-outline-primary mt-2 p-3 w-50">{giveUsATry}</button>
                    </motion.div>
                </div>
            </motion.div>
            <div className="row p-3" style={{backgroundImage: 'url("backgroundMainSecond.png")', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'repeat'}}>
                <motion.div whileInView={{x:0, opacity: 1}} initial={{x:-50, opacity: 0}} transition={{duration: .8, delay: .2}} className="col-md-4 d-flex justify-content-center align-items-center flex-column" >
                    <h1 style={{fontSize: '15rem', fontWeight: 700}}>1</h1>
                    <h1>{advantage1}</h1>
                </motion.div>
                <motion.div whileInView={{x:0, opacity: 1}} initial={{x:50, opacity: 0}} transition={{duration: .8, delay: .2}} className="col-md-8 p-5">
                    <h1>{header1}</h1>
                    <p>{paragraph1}</p>
                    <p>{paragraph2}</p>
                </motion.div>
            </div>
            <div className="row p-3" style={{backgroundImage: 'url("backgroundMainSecond.png")', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'repeat'}}>
                <motion.div whileInView={{x:0, opacity: 1}} initial={{x:-50, opacity: 0}} transition={{duration: .8, delay: .2}} className="col-md-4 d-flex justify-content-center align-items-center flex-column" >
                    <h1 style={{fontSize: '15rem', fontWeight: 700}}>2</h1>
                    <h1>{advantage2}</h1>
                </motion.div>
                <motion.div whileInView={{x:0, opacity: 1}} initial={{x:50, opacity: 0}} transition={{duration: .8, delay: .2}} className="col-md-8 p-5">
                    <h1>{header2}</h1>
                    <p>{paragraph3}</p>
                    <p>{paragraph4}</p>
                </motion.div>
            </div>
            <div className="row p-3" style={{backgroundImage: 'url("backgroundMainSecond.png")', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'repeat'}}>
                <motion.div whileInView={{x:0, opacity: 1}} initial={{x:-50, opacity: 0}} transition={{duration: .8, delay: .2}} className="col-md-4 d-flex justify-content-center align-items-center flex-column" >
                    <h1 style={{fontSize: '15rem', fontWeight: 700}}>3</h1>
                    <h1>{advantage3}</h1>
                </motion.div>
                <motion.div whileInView={{x:0, opacity: 1}} initial={{x:50, opacity: 0}} transition={{duration: .8, delay: .2}} className="col-md-8 p-5">
                    <h1>{header3}</h1>
                    <p>{paragraph5}</p>
                    <p>{paragraph6}</p>
                </motion.div>
            </div>
            <div className="row p-3 py-5" style={{backgroundImage: 'url("backgroundMainThird.png")', backgroundSize: 'cover', backgroundPosition: 'left', backgroundPositionY: 'bottom', backgroundRepeat: 'no-repeat'}}>
                <motion.div whileInView={{x:0, opacity: 1}} initial={{x:-50, opacity: 0}} transition={{duration: .8, delay: .2}} className="col-md-4 d-flex justify-content-center align-items-center flex-column" >
                    <h1 style={{fontSize: '15rem', fontWeight: 700}}>4</h1>
                    <h1>{advantage4}</h1>
                </motion.div>
                <motion.div whileInView={{x:0, opacity: 1}} initial={{x:50, opacity: 0}} transition={{duration: .8, delay: .2}} className="col-md-8 p-5">
                    <h1>{header4}</h1>
                    <p>{paragraph7}</p>
                    <p>{paragraph8}</p>
                </motion.div>
            </div>
        </div>
    )
}
export default MainPage;
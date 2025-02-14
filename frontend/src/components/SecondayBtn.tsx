import styles from "./Components-styles/Button.module.css";
function SecondaryBtn (){

return(   
    <div className={styles.btn}>
        <div className="Secondary">
            <button className={styles.signup}>sign up</button>
        </div>
    </div>
    );
};

export default SecondaryBtn;

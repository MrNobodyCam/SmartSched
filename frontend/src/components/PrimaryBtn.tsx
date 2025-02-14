import styles from "./Components-styles/Button.module.css";
function PrimaryBtn (){

    return(   
        <div className={styles.btn}>
            <div className="Primary">
                <button className={styles.login}>Login</button>
            </div>

        </div>
        );
    };
    
    export default PrimaryBtn;
    
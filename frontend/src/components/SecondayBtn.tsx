import styles from "./Components-styles/Button.module.css";
interface Props {
  children: string;
  color: string;
  border: string;
}
const SecondaryBtn = ({ children, color, border }: Props) => {
  return (
    <div className={styles.btn}>
      <button
        className={styles.secondary}
        style={
          {
            "--text-color": color,
            "--border-color": border,
          } as React.CSSProperties
        }
      >
        {children}
      </button>
    </div>
  );
};

export default SecondaryBtn;

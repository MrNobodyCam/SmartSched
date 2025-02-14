import styles from "./Components-styles/Button.module.css";
interface Props {
  children: string;
  color: string;
  background: string;
}
const PrimaryBtn = ({ children, color, background }: Props) => {
  return (
    <div className={styles.btn}>
      <button
        className={styles.primary}
        style={
          {
            "--text-color": color,
            "--bg-color": background,
          } as React.CSSProperties
        }
      >
        {children}
      </button>
    </div>
  );
};

export default PrimaryBtn;

import styles from "./trueFalseContent.module.css";

export default function TrueFalseContent({
  text,
  answer,
  onChangeAnswer,
}) {
  const options = [
    {
      value: true,
      label: "True",
    },
    {
      value: false,
      label: "False",
    },
  ];

  const handleChangeRadioButton = (e) => {
    const optionIndex = parseInt(e.target.dataset.index);
    onChangeAnswer({
      answer: options[optionIndex].value,
    });
  };

  return (
    <div className={styles.trueFalseContent}>
      <div className={styles.inputSentence}>{text}</div>
      <div className={styles.options}>
        {options &&
          options.map(({ value, label }, index) => (
            <label
              key={index}
              className={styles.option + (value === answer ? ` answer` : "")}
            >
              <input
                className={styles.input}
                type="radio"
                checked={value === answer}
                data-index={index}
                onChange={handleChangeRadioButton}
              />
              {label}
            </label>
          ))}
      </div>
    </div>
  );
}
